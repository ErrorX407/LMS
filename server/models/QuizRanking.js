import mongoose, { Schema } from "mongoose";

const quizRankingSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  timeTaken: {
    type: Number,
    required: true,
  },
}, {
    timestamps: true,
});

export default mongoose.model("quizrankings", quizRankingSchema);
