import express from "express";
import { addComments, getComments, deleteComments, createStudyStack, getStudyStack, addInStudyStack, getStudyStackAll } from "../controllers/postInteraction.controller.js";
import { isLoggedIn } from "../config/isLoggedIn.js";

const router = express.Router();

router.post("/add/comments", isLoggedIn, addComments);

router.post("/get/comments", getComments);

router.post("/delete/comments", isLoggedIn, deleteComments);

router.post("/studystack/create", isLoggedIn, createStudyStack);

router.post("/studystack/get", getStudyStack);

router.post("/studystack/add", isLoggedIn ,addInStudyStack);

router.post("/studystack/all", getStudyStackAll);

export default router;
