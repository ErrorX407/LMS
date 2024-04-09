import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { getFullDate } from "../common/Date";
import { PostContext, postStructure } from "../pages/PostPage";
import { UserContext } from "../App";
import CommentField from "./CommentField";

const CommentCard = ({ index, leftVal, commentData , commentsArr}) => {
  let {
    commented_by: {
      personal_info: { profile_img, fullName, username: commented_by_username },
    },
    commentedAt,
    comment,
    _id,
  } = commentData;

  const {
    post,
    post: {
      author: {
        personal_info: { username: post_author },
      },
      activity,
      activity: {total_parent_comments} ,
    },
    setPost,
    setTotalParentCommentsLoaded
  } = useContext(PostContext);

  const {
    userAuth: { access_token, username },
  } = useContext(UserContext);

  const [isReplying, setReplying] = useState(false);

  const getParentIndex = () => {
    let startingPoint = index -1;

    try {
      while(commentsArr[startingPoint].childrenLevel >= commentData.childrenLevel){
        startingPoint--;
      }
    } catch (error) {
      startingPoint = undefined;
    }

    return startingPoint;
  }

  const removeCommentsCard = (startingPoint, isDelete = false) => {
    if (isDelete) {
      let parentIndex = getParentIndex();

      if (parentIndex != undefined) {
        commentsArr[parentIndex].children = commentsArr
        [parentIndex].children.filter(child => child != _id)

        // if (!commentsArr[parentIndex].children.length) {
        //   commentsArr[parentIndex].isReplyLoaded = false;
        // }
      }

      commentsArr.splice(index, 1);
    }

    if (commentData.childrenLevel == 0 && isDelete) {
      setTotalParentCommentsLoaded(preVal => preVal - 1)
    }
    setPost({...post, activity: {...activity, total_parent_comments: total_parent_comments - (commentData.childrenLevel == 0 && isDelete ? 1 : 0)}})
  }

  const handleReplyClick = () => {
    if (!access_token) {
      return toast.error("Login first to leave a reply");
    }
    setReplying((preVal) => !preVal);
  };

  const deleteComment = (e) => {
    e.target.setAttribute("disabled", true);
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/post/ineraction/delete/comments", { _id }, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    })
    .then(() => {
      e.target.removeAttribute("disabled");
      removeCommentsCard(index + 1, true)

      // setTimeout(()=> {
      //   location.reload();
      // }, 100)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="w-full" style={{ paddingLeft: `${leftVal * 10}px` }}>
      <div className="my-5 p-5  rounded-2xl  border-purple/30 bg-purple/10 hover:bg-[rgba(139,70,255,0.15)] cursor-default">
        <div className="flex gap-3 items-start justify-start">
          <img
            src={profile_img}
            alt={`${commented_by_username} Profile Image`}
            className="w-10 h-10 rounded-md object-cover"
          />
          <div className="w-full">
            <div className="flex justify-start items-center gap-3 mb-1">
              <Link
                to={`/${commented_by_username}`}
                className="line-clamp-1 text-[15px] leading-none bg-purple rounded-md px-2 py-1 text-black tracking-tight hover:bg-purple/50 hover:text-white duration-500"
              >
                @{commented_by_username}
              </Link>
              <p className="text-sm text-white/50 leading-none min-w-fit">
                {" "}
                {getFullDate(commentedAt)}{" "}
              </p>
              {username == commented_by_username || username == post_author ? (
                <button onClick={deleteComment} className="ml-auto flex justify-center items-center p-2 rounded-2xl bg-red/20 hover:bg-red/40">
                  <i className="fi fi-sr-trash flex justify-center items-center text-[13px] text-red pointer-events-none"></i>
                </button>
              ) : (
                ""
              )}
            </div>
            <p
              className="text-xl"
              dangerouslySetInnerHTML={{ __html: comment }}
            ></p>
            {/* <button
              className="mt-3 px-5 py-2 bg-purple/20 rounded-2xl duration-500 hover:bg-purple hover:text-black"
              onClick={handleReplyClick}
            >
              Reply
            </button> */}
            {isReplying ? (
              <CommentField
                action="Reply"
                index={index}
                replyingTo={_id}
                setReplying={setReplying}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
