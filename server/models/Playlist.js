import mongoose, { Schema } from "mongoose";

const playlistSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post", // Assuming the model name for posts is "Post"
      },
    ],
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User", // Assuming the model name for users is "User"
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("playlists", playlistSchema);
