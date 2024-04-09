import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import Notification from "../models/Notification.js";

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
      Notification.findOneAndUpdate({ reply: _id }, {$unset: {reply: 1}}).then((notification) =>
        console.log("Reply notification updated")
      );

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
