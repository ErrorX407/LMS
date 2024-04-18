import mongoose from 'mongoose';
import Questions from './models/Questions.js';
import * as dotenv from "dotenv";
import { default as questionsJson } from "./questions.json" assert { type: "json" };

dotenv.config()

const start = async() => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        await Questions.create(questionsJson);
        console.log("success")
    } catch (error) {
        console.log(error)
    }
}

start();