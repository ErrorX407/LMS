import React, { useContext, useState } from "react";
import {toast } from "react-toastify"
import { UserContext } from "../App";
import axios from "axios";

const NotificationCommentField = ({ _id, post_author, index = undefined, replyingTo = undefined, setReplying, notification_id, notificationData }) => {
    const [comment, setComment] = useState('')
    let {_id: user_id} = post_author
    let {userAuth: {access_token} } = useContext(UserContext)
    let {notifications, notifications: {results}, setNotifications} = notificationData
    const handleComment = () => {
        if (!access_token) {
            return toast.error("Login First To Leave Comment");
          }
          if (!comment.length) {
            return toast.error("Write something to leave a comment...");
          }
          axios
            .post(
              import.meta.env.VITE_SERVER_DOMAIN +
                "/api/v1/post/ineraction/add/comments",
              {
                _id,
                post_author: user_id,
                comment,
                replying_to: replyingTo,
                notification_id
              },
              {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                },
              }
            )
            .then(({ data }) => {
                setReplying(false);

                results[index].reply = {comment, _id: data._id}
                setNotifications({...notifications, results})
            })
            .catch((err) => {
              console.log(err);
            });
    }
  return (
    <>
      <textarea
        name="title"
        rows="5"
          value={comment}
        placeholder="Add a delightful reply here! ✨"
        className="w-[100%] comment h-fit bg-white/10 rounded-2xl text-white/50 focus:text-white p-3 leading-tight resize-none outline-none  focus:placeholder:text-white placeholder:text-white/50 focus:bg-purple/10"
        onChange={(e) => setComment(e.target.value)}
        // onKeyDown={onCommentKeyDown}
        //   onChange={handleCommentChange}
        //   onFocus={handleCommentChange}
      />
      <button
        className="mt-3 px-5 py-2 rounded-2xl bg-purple text-black font-semibold mouseenter capitalize"
          onClick={handleComment}
      >
        Reply
      </button>
    </>
  );
};

export default NotificationCommentField;
