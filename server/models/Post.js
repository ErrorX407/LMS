import mongoose, { Schema } from "mongoose";

const postSchema = mongoose.Schema(
  {
    post_id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      // required: true,
    },
    category: {
      type: String,
      maxlength: 15,
      lowercase: true,
      // required: true
    },
    grade: {
      type: String,
      lowercase: true,
    },
    content: {
      type: [],
      // required: true
    },
    tags: {
      type: [String],
      // required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    activity: {
      total_likes: {
        type: Number,
        default: 0,
      },
      total_comments: {
        type: Number,
        default: 0,
      },
      total_reads: {
        type: Number,
        default: 0,
      },
      total_parent_comments: {
        type: Number,
        default: 0,
      },
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: "comments",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    draft: {
      type: Boolean,
      default: false,
    },
    studystack: {
      type: Schema.Types.ObjectId,
      ref: "studystacks", // Assuming the model name for playlists is "Playlist"
    },
  },
  {
    timestamps: {
      createdAt: "publishedAt",
    },
  }
);

export default mongoose.model("posts", postSchema);
