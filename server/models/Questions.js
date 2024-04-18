import mongoose from "mongoose";

// mongoose.connect(process.env.MONGO_DB_URI, { autoIndex: true });

const questionBankSchema = mongoose.Schema(
  {
    question: String,
    answer: String,
    grade: String,
    subject: String,
    difficulty: String,
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  {
    timestamps: {
      createdAt: "publishedAt",
    },
  }
);

export default mongoose.model("questions", questionBankSchema);
