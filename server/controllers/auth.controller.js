import User from "../models/User.js";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";

const formatDataToSend = (user) => {

  const access_token = jwt.sign({ id : user.id, admin: user.admin }, process.env.JWT_SECRET_KEY)

  return {
    access_token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    email: user.personal_info.email,
    fullName: user.personal_info.fullName,
    isAdmin: user.admin
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

export const register = (req, res) => {
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
      .then((user) => {
        return res.status(200).json(formatDataToSend(user));
      })
      .catch((err) => {
        if (err.code == 11000) {
          return res.status(500).json({ Error: "Oops! It looks like someone already used that email. 📧 Please try another one!" });
        }
        return res.status(500).json({ Error: err.message });
      });
  });
};

export const login = async(req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ "personal_info.email": email });

  if (!user) {
    return res.status(403).json({ Error: "Email not found" });
  }

  bcrypt.compare(password, user.personal_info.password, (err, result) => {
    if (err) {
      return res.status(403).json({ Error: "Error occured while login please try again" });
    }
    if (result) {
      return res.status(200).json(formatDataToSend(user));
    } else {
      return res.status(403).json({ Error: "Incorrect password" });
    }
  });
};