import { customAlphabet } from "nanoid";
import crypto from "crypto";
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import Notification from "../models/Notification.js";
import StudyStack from "../models/StudyStack.js";
import User from "../models/User.js";

export const addComments = (req, res) => {
  let user_id = req.user;
  let { _id, comment, post_author, replying_to, notification_id } = req.body;

  if (!comment.length) {
    return res
      .status(403)
      .json({ Error: "Write something to leave a comment..." });
  }

  let commentObj = {
    post_id: _id,
    post_author,
    comment,
    commented_by: user_id,
  };

  if (replying_to) {
    commentObj.parent = replying_to;
  }

  new Comment(commentObj)
    .save()
    .then(async (commentFile) => {
      let { comment, commentedAt, children } = commentFile;
      Post.findOneAndUpdate(
        { _id },
        {
          $push: { comments: commentFile._id },
          $inc: {
            "activity.total_comments": 1,
            "activity.total_parent_comments": replying_to ? 0 : 1,
          },
        }
      ).then((post) => {
        console.log("New Comment created");
      });

      let notificationObj = {
        type: replying_to ? "reply" : "comment",
        post: _id,
        notification_for: post_author,
        user: user_id,
        comment: commentFile._id,
      };

      if (replying_to) {
        notificationObj.replied_on_comment = replying_to;

        await Comment.findOneAndUpdate(
          { _id: replying_to },
          { $push: { children: commentFile._id } }
        ).then(
          (replyingToCommentDoc) =>
            (notificationObj.notification_for =
              replyingToCommentDoc.commented_by)
        );

        if (notification_id) {
          Notification.findOneAndUpdate(
            { _id: notification_id },
            { reply: commentFile._id }
          ).then((notification) => console.log("Notification updated"));
        }
      }

      new Notification(notificationObj)
        .save()
        .then((notification) => console.log("New Notification Created"));

      return res.status(200).json({
        comment,
        commentedAt,
        _id: commentFile._id,
        user_id,
        children,
      });
    })
    .catch((err) => {
      return res.status(500).json({ Error: err.message });
    });
};

export const getComments = (req, res) => {
  let { post_id, skip } = req.body;

  // let maxLimit = 5;

  Comment.find({ post_id, isReply: false })
    .populate(
      "commented_by",
      "personal_info.username personal_info.fullName personal_info.profile_img"
    )
    .skip(skip)
    // .limit(maxLimit)
    .sort({
      commentedAt: -1,
    })
    .then((comment) => {
      return res.status(200).json({ comment });
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(500).json({ Error: err.message });
    });
};

const deleteTheComment = (_id) => {
  Comment.findOneAndDelete({ _id })
    .then((comment) => {
      if (comment.parent) {
        Comment.findOneAndUpdate(
          { _id: comment.parent },
          { $pull: { children: _id } }
        )
          .then((data) => console.log("Comment delete from parent"))
          .catch((err) => console.log(err));
      }

      Notification.findOneAndDelete({ comment: _id }).then((notification) =>
        console.log("Comment notification deleted")
      );
      Notification.findOneAndUpdate(
        { reply: _id },
        { $unset: { reply: 1 } }
      ).then((notification) => console.log("Reply notification updated"));

      Post.findOneAndUpdate(
        { _id: comment.post_id },
        {
          $pull: { comments: _id },
          $inc: { "activity.total_comments": -1 },
          "activity.total_parent_comments": comment.parent ? 0 : -1,
        }
      ).then((post) => {
        if (comment.children.length) {
          comment.children.map((replies) => {
            deleteTheComment(replies);
          });
        }
      });
    })
    .catch((err) => console.log(err.message));
};

export const deleteComments = (req, res) => {
  let user_id = req.user;

  let { _id } = req.body;

  Comment.findOne({ _id }).then((comment) => {
    if (user_id == comment.commented_by || user_id == comment.post_author) {
      deleteTheComment(_id);

      return res.status(200).json({ Status: "Comment has been deleted" });
    } else {
      return res
        .status(403)
        .json({ Error: "You are not authorized to delete this comment" });
    }
  });
};

export const createStudyStack = async (req, res) => {
  // const { user_id } = req.user;
  const { title, description, post_id, username } = req.body;

  // Define the characters for nanoid
  const alphabet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  // Create a custom nanoid generator
  const nanoid = customAlphabet(alphabet, 25);

  // Generate the random string
  let randomString = nanoid();

  // Hash the username and title
  let usernameHash = crypto
    .createHash("sha256")
    .update(username)
    .digest("hex")
    .substring(0, 10); // Truncate to 10 characters
  let titleHash = crypto
    .createHash("sha256")
    .update(title)
    .digest("hex")
    .substring(0, 10); // Truncate to 10 characters

  // Combine the hashed username, title, and random string
  let stack_id = `${usernameHash}_${titleHash}_${randomString.substring(
    0,
    20
  )}`; // Truncate random string to fit length

  User.findOne({ "personal_info.username": username })
    .select("-personal_info.password -updatedAt -posts")
    .then(async (user) => {
      // Create the study stack document
      const studyStack = new StudyStack({
        stack_id,
        title,
        description,
        creator: user._id,
        saved_by_user: user._id,
        posts: post_id,
      });
      await studyStack.save();

      // Update the user's studystacks array
      const updatedUser = await User.findByIdAndUpdate(
        { _id: user._id },
        { $push: { studystacks: studyStack } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ Error: "User not found" });
      }

      return res.status(200).json({ studyStack, user: updatedUser });
    })
    .catch((err) => {
      return res.status(500).json({ Error: err.message });
    });
};

export const getStudyStack = async (req, res) => {
  try {
    const { profile_username } = req.body;

    // Find the user
    const user = await User.findOne({
      "personal_info.username": profile_username,
    }).select("-personal_info.password -updatedAt -posts");

    if (!user) {
      return res.status(404).json({ Error: "User not found" });
    }

    // Find the study stacks belonging to the user
    let studyStack = await StudyStack.find({ saved_by_user: user._id })
      .select("-saved_by_user -createdAt -publishedAt")
      .populate({
        path: "posts",
        select: "-activity -content -tags -comments -draft -grade",
        populate: {
          path: "author",
          select:
            "personal_info.username personal_info.fullName personal_info.profile_img -_id",
        }
      }
    );

    if (!studyStack || studyStack.length === 0) {
      return res.status(404).json({ Error: "Study stacks not found" });
    }

    console.log(studyStack);

    // Check if any of the study stacks have no posts
    for (let i = 0; i < studyStack.length; i++) {
      const postsCount = studyStack[i].posts.length;
      if (postsCount === 0) {
        // If no posts are left, delete the study stack
        await StudyStack.deleteOne({ _id: studyStack[i]._id });

        // Remove the study stack from the user's studystacks array
        await User.updateOne(
          { _id: user._id },
          { $pull: { studystacks: studyStack[i]._id } }
        );

        // Remove the study stack from the array
        studyStack.splice(i, 1);
        i--; // Decrement i to account for the removed element
      }
    }

    return res.status(200).json({ studyStack });
  } catch (err) {
    return res.status(500).json({ Error: err.message });
  }
};


export const addInStudyStack = async (req, res) => {
  const { stack_id, post_id } = req.body;

  try {
    // Find the study stack
    let studyStack = await StudyStack.findOne({ stack_id });
    if (!studyStack) {
      return res.status(404).json({ Error: "Study stack not found" });
    }

    // Check if the post is already in the study stack
    const postExists = studyStack.posts.some((post) => post.equals(post_id));
    if (postExists) {
      return res.status(400).json({ Error: "Already in Studystack! 📚" });
    }

    // Find the post
    const post = await Post.findOne({ _id: post_id });
    if (!post) {
      return res.status(404).json({ Error: "Post not found" });
    }

    // Add the post to the study stack
    studyStack.posts.push(post);
    const updatedStack = await studyStack.save();

    return res.status(200).json({ studyStack: updatedStack });
  } catch (err) {
    return res.status(500).json({ Error: err.message });
  }
};

export const getStudyStackAll = async (req, res) => {
  try {
    const { stack_id } = req.body;

    // Find the study stack belonging to the user
    const studyStack = await StudyStack.find({ stack_id })
      .select("-createdAt -publishedAt -_id")
      .populate({
        path: "posts",
        select: "-content -tags -comments -draft -grade -_id",
        populate: {
          path: "author",
          select:
            "personal_info.username personal_info.fullName personal_info.profile_img -_id",
        },
      })
      .populate({
        path: "creator", // Populate the creator field
        select:
          "personal_info.username personal_info.fullName personal_info.profile_img -_id", // Select only the personal_info field
      });

    if (!studyStack) {
      return res.status(404).json({ Error: "Study stack not found" });
    }

    return res.status(200).json({ studyStack });
  } catch (err) {
    return res.status(500).json({ Error: err.message });
  }
};
