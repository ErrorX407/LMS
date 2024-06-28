import express from "express";
import { isLoggedIn } from "../config/isLoggedIn.js";
import { createQuiz, getQuiz, addQuestionsToQuiz } from "../controllers/quiz.controller.js";

const router = express.Router();

router.post("/create", isLoggedIn, createQuiz);

router.post("/add/questions", isLoggedIn, addQuestionsToQuiz);

router.post("/get", getQuiz);

export default router;