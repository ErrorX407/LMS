import User from "../models/User.js";
import bcrypt from "bcrypt";

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

export const getUserProfile = async (req, res) => {
  const { username } = req.body;
  User.findOne({ "personal_info.username": username })
    .select("-personal_info.password -updatedAt -posts")
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      return res.status(500).json({ Error: err.message });
    });
};

export const updateProfileImage = (req, res) => {
  let { url } = req.body;

  let UpdateObj = {
    "personal_info.profile_img": url,
  };

  User.findOneAndUpdate({ _id: req.user }, UpdateObj, {
    runValidators: true,
    new: true,
  })
    .then(() => {
      return res.status(200).json({ profile_img: url });
    })
    .catch((err) => {
      return res.status(500).json({ Error: err.message });
    });
};

export const searchUser = (req, res) => {
  let { query } = req.body;

  User.find({ "personal_info.username": new RegExp(query, "i") })
    .limit(20)
    .select(
      "personal_info.fullName personal_info.username personal_info.profile_img -_id"
    )
    .then((user) => {
      return res.status(200).json({ user });
    })
    .catch((err) => {
      return res.status(500).json({ Error: err.message });
    });
};

export const changePassword = (req, res) => {
  let { currentPassword, newPassword } = req.body;

  if (
    !passwordRegex.test(currentPassword) ||
    !passwordRegex.test(newPassword)
  ) {
    return res.status(403).json({
      Error:
        "Password🔒 should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letter 😵",
    });
  }

  User.findOne({ _id: req.user })
    .then((user) => {
      bcrypt.compare(
        currentPassword,
        user.personal_info.password,
        (err, result) => {
          if (!result) {
            return res.status(403).json({
              Error:
                "😵 Uh-oh! Current password incorrect. Give it another go! 🔒🔍",
            });
          }
          if (err) {
            return res.status(403).json({
              Error:
                "Some error occured 😵 while changing the password, please try again later ⌛",
            });
          }
          bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
            User.findOneAndUpdate(
              { _id: req.user },
              { "personal_info.password": hashedPassword }
            )
              .then((u) => {
                return res.status(200).json({
                  message: "Password changed 🫡 successfully 🎉",
                });
              })
              .catch((error) => {
                return res.status(500).json({
                  Error:
                    "Some error occured 😵 while saving the new password, please try again later ⌛",
                });
              });
          });
        }
      );
    })
    .catch((err) => {
      return res.status(500).json({ Error: "User 👤 not found ☠️" });
    });
};

export const updateUserProfile = (req, res) => {
  let { fullName, username, social_links } = req.body;

  if (username.length < 3) {
    return res.status(403).json({
      Error:
        "Oops! Username must be at least 3 characters long. Keep typing, you're almost there! 🤔🖋️",
    });
  }
  if (fullName.length < 3) {
    return res.status(403).json({
      Error: "Oops! Fullname 🖋️ must be at least 3 characters long. 🤔",
    });
  }

  let socialLinksArr = Object.keys(social_links);

  try {
    for (let i = 0; i < socialLinksArr.length; i++) {
      if (social_links[socialLinksArr[i]].length) {
        let hostname = new URL(social_links[socialLinksArr[i]]).hostname;

        if (
          !hostname.includes(
            `${socialLinksArr[i]}.com` && socialLinksArr[i] != "website"
          )
        ) {
          return res.status(403).json({
            Error:
              "Oops! Please include full social links with " +
              `${socialLinksArr[i]}.com` +
              "! Try again! 😊🔗",
          });
        }
      }
    }
  } catch (error) {
    return res.status(500).json({
      Error:
        '⚠️ Please include full social links with "http(s)"! Try again! 😊🔗',
    });
  }

  let UpdateObj = {
    "personal_info.username": username,
    "personal_info.fullName": fullName,
    social_links,
  };

  User.findOneAndUpdate({ _id: req.user }, UpdateObj, {
    runValidators: true,
    new: true,
  })
    .then(() => {
      return res.status(200).json({ username, fullName });
    })
    .catch((err) => {
      if (err.code == 11000) {
        return res
          .status(409)
          .json({ Error: "😕 Username already taken. Try another! 🔄🔒" });
      }
      return res.status(500).json({ Error: err.message });
    });
};
