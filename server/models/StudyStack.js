import mongoose, { Schema } from "mongoose";

const studyStackSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "posts",
      },
    ],
    creator: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    stack_id: {
      type: String,
      required: true,
      unique: true,
    },
    saved_by_user: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  {
    timestamps: true,
  }
);

studyStackSchema.index({ stack_id: 1, posts: 1 }, { unique: true }); // Compound index

export default mongoose.model("studystacks", studyStackSchema);
