import express from "express";
import {deleteStudyStackAll, saveStack, isSaved, savedCount, removeSavedStack, editStack, removePost} from "../controllers/stack.controller.js"
import { isLoggedIn } from "../config/isLoggedIn.js";

const router = express.Router();

router.post("/delete/all", isLoggedIn, deleteStudyStackAll);

router.post("/save", isLoggedIn, saveStack);

router.post("/remove/save", isLoggedIn, removeSavedStack);

router.post("/is-saved", isLoggedIn, isSaved);

router.post("/count/save", savedCount);

router.post("/edit", isLoggedIn, editStack);

router.post("/remove/post", isLoggedIn, removePost);


export default router;