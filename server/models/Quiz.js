import mongoose, { Schema } from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    quizName: {
      type: String,
      required: true,
    },
    quizDuration: {
      type: Number,
      required: true,
    },
    marksPerQuestion: {
      type: Number,
      required: true,
    },
    negativeMarking: {
      type: Number,
      default: 0,
    },
    questions: [
      {
        question: {
          type: String,
          required: true,
        },
        options: [
          {
            type: String,
            required: true,
          },
        ],
        correctAnswer: {
          type: String,
          required: true,
        },
      },
    ],
    quiz_id:{
      type: String,
      required: true,
      unique: true,
    },
    grade: String,
    subject: String,
    difficulty: String,
    creator: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    total_plays: {
      type: Number,
      default: 0,
    },
    rankings: [
      {
        type: Schema.Types.ObjectId,
        ref: "quizrankings",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("quizes", quizSchema);
