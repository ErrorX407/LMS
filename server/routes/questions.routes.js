import express from "express";
import {getAllQuestions, addQuestions} from "../controllers/questions.controller.js"
import {isLoggedIn} from "../config/isLoggedIn.js"

const router = express.Router();

router.post("/questions", getAllQuestions);
router.post("/questions/add", isLoggedIn, addQuestions);

export default router;