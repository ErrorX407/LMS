import express from "express";
import {getAllQuestions} from "../controllers/questions.controller.js"

const router = express.Router();

router.post("/questions", getAllQuestions);

export default router;