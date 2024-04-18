import mongoose from "mongoose";

// mongoose.connect(process.env.MONGO_DB_URI, { autoIndex: true });

const questionBankSchema = mongoose.Schema(
  {
    question: String,
    answer: String,
    class: String,
    subject: String,
    difficulty: String,
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
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
