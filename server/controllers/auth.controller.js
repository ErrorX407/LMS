import User from "../models/User.js";
import Token from "../models/Token.js";
import { sendEmail } from "../utils/sendmail.utils.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";

const formatDataToSend = (user) => {
  const access_token = jwt.sign(
    { id: user.id, admin: user.admin },
    process.env.JWT_SECRET_KEY
  );

  return {
    access_token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    email: user.personal_info.email,
    fullName: user.personal_info.fullName,
    isAdmin: user.admin,
  };
};

const generateUsername = async (email) => {
  let username = email.split("@")[0];

  const isUsernameExists = await User.exists({
    "personal_info.username": username,
  }).then((result) => result);

  isUsernameExists ? (username += nanoid().substring(0, 5)) : "";

  return username;
};

export const register = async(req, res) => {
  const { fullName, email, password } = req.body;
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

  if (!fullName || fullName.length < 3) {
    return res
      .status(403)
      .json({ Error: "Fullname must be at least 3 characters" });
  }
  if (!email || email.length === 0 || email === "") {
    return res.status(403).json({ Error: "Email is required" });
  }

  if (!emailRegex.test(email)) {
    return res.status(403).json({ Error: "Invalid email" });
  }

  if (!password || password.length === 0 || password === "") {
    return res.status(403).json({ Error: "Password is required" });
  }

  if (!passwordRegex.test(password)) {
    return res.status(403).json({
      Error:
        "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letter",
    });
  }

  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ Error: err.message });
    }
    const username = await generateUsername(email);
    const newUser = new User({
      personal_info: { fullName, email, password: hashedPassword, username },
    });

    newUser
      .save()
      .then(async (user) => {
        const tokenValue = crypto.randomBytes(32).toString("hex");
        const token = new Token({
          userId: user._id,
          token: tokenValue,
        });
        await token.save();

        const url = `${process.env.BASE_URL}users/${user._id}/verify/${tokenValue}`;
        const emailMessage = `
            📧 Welcome aboard! 🚀

            Thank you for signing up! We're thrilled to have you join our community. 
            To get started, please verify your email address by clicking the link below. 🌟

            <a href="${url}">Verify Email</a>

            If you have any questions or need assistance, feel free to reach out to us. We're here to help! 🤗

            Best regards,
            ${fullName}
        `;
        await sendEmail(
          email,
          "🌟 Welcome! Please Verify Your Email Address 📧",
          emailMessage
        );

        return res.status(200).json({ message: "📧 Email sent! 📬 Please verify your account. 🔒😊" });
      })
      .catch((err) => {
        if (err.code == 11000) {
          return res
            .status(500)
            .json({
              Error:
                "Oops! It looks like someone already used that email. 📧 Please try another one!",
            });
        }
        return res.status(500).json({ Error: err.message });
      });
  });
};

export const verifyEmail = async(req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({ Error: "🚫 Oops! Invalid link. 🛑🔗" });
    }

    const token = await Token.findOneAndDelete({
      userId: user._id,
      token: req.params.token,
    });

    if (!token) {
      return res.status(400).json({ Error: "🚫 Oops! Invalid link. 🛑🔗" });
    }

    user.verified = true;
    await user.save();

    return res.status(200).json({ message: "✅ Email verified! 📧🎉" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ Error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ "personal_info.email": email });

  if (!user) {
    return res.status(403).json({ Error: "Email not found" });
  }

  if (!user.verified) {
    return res.status(403).json({ Error: "Please verify your email first" });
  }

  bcrypt.compare(password, user.personal_info.password, (err, result) => {
    if (err) {
      return res
        .status(403)
        .json({ Error: "Error occurred while login please try again" });
    }
    if (result) {
      return res.status(200).json(formatDataToSend(user));
    } else {
      return res.status(403).json({ Error: "Incorrect password" });
    }
  });
};
