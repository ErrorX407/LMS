import express from "express";
import { addComments, getComments, deleteComments } from "../controllers/postInteraction.controller.js";
import { isLoggedIn } from "../config/isLoggedIn.js";

const router = express.Router();

router.post("/add/comments", isLoggedIn, addComments);

router.post("/get/comments", getComments);

router.post("/delete/comments", isLoggedIn,deleteComments);

export default router;
