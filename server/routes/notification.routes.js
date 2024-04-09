import express from "express";
import {getNotification, notification, countNotifocations} from "../controllers/notification.controller.js"
import { isLoggedIn } from "../config/isLoggedIn.js";

const router = express.Router();

router.post("/", isLoggedIn, notification);

router.post("/count", isLoggedIn, countNotifocations);

router.get("/get", isLoggedIn, getNotification);

export default router;