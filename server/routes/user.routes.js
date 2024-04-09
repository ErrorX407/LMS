import express from "express";
import { getUserProfile, searchUser, changePassword, updateProfileImage, updateUserProfile} from "../controllers/user.controller.js";
import { isLoggedIn } from "../config/isLoggedIn.js";

const router = express.Router();

router.post("/profile", getUserProfile);

router.post("/search", searchUser);

router.post("/profile-img/update", isLoggedIn, updateProfileImage);

router.post("/password/change", isLoggedIn, changePassword);

router.post("/profile/update", isLoggedIn,updateUserProfile);

export default router;