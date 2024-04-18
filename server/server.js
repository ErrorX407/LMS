import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import uploadRouter from "./routes/upload.routes.js";
import postRouter from "./routes/post.routes.js";
import postInteractionRouter from "./routes/postInteraction.routes.js";
import notificationRouter from "./routes/notification.routes.js";
import questionsRoute from "./routes/questions.routes.js"

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());

dotenv.config();

mongoose
  .connect(process.env.MONGO_DB_URI, { autoIndex: true })
  .then(() => console.log("Connected to mongodb successfully"))
  .catch((err) => console.log("Error while connecting to mongodb", err));

// middelware
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/upload", uploadRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/post/ineraction", postInteractionRouter);
app.use("/api/v1/notification", notificationRouter);
app.use('/api/v1/questionBank', questionsRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
