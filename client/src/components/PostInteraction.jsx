import React, { useContext, useEffect } from "react";
import { PostContext } from "../pages/PostPage";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const PostInteraction = ({ onShareButtonClick }) => {
  let {
    post,
    post: {
      _id,
      post_id,
      activity,
      activity: { total_likes, total_comments },
      author: {
        personal_info: { username: author_username },
      },
    },
    setPost,
    isLikedByUser,
    setLikedByUser,
    setCommentWrapper
  } = useContext(PostContext);

  let {userAuth: {username, access_token}} = useContext(UserContext)

  useEffect(()=>{
    if (access_token) {
      axios.post(import.meta.env.VITE_SERVER_DOMAIN + '/api/v1/post/isLiked', {_id}, {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      })
      .then(({data: {result}}) => {
        setLikedByUser(Boolean(result))
      })
      .catch((err) => {
         console.log(err);
       })
    }
  },[])

  const handleLike = () => {
    if (access_token) {
      setLikedByUser(preVal => !preVal);

      !isLikedByUser ? total_likes++ : total_likes--;

      setPost({ ...post, activity: {...activity, total_likes}})

      axios.post(import.meta.env.VITE_SERVER_DOMAIN + '/api/v1/post/like', {
        _id, isLikedByUser}, {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        })
        .then(({data}) => {
           console.log(data);
         })
         .catch((err) => {
            console.log(err);
          });
    }else{
      toast.error("Please login to like this post");
    }
  }
  return (
    <div className="my-5 backdrop-blur-md p-3 rounded-2xl bg-black/0 w-full">
      <div className="flex gap-6 justify-between">
        <div className="flex gap-3 items-center">
          <button onClick={handleLike} className={"like-btn backdrop-blur-md w-fit flex p-3 rounded-2xl justify-start items-center gap-2 cursor-pointer mouseenter " + (isLikedByUser ? "bg-red/30" : "bg-black/30")}>
            <img
              src="https://img.icons8.com/3d-fluency/94/like--v2.png"
              alt="like--v2"
              className="w-[25px]"
            />
            <div className="like-count text-[20px]">
              {total_likes}
            </div>
          </button>
          <button onClick={()=>setCommentWrapper(preVal => !preVal)} className="bg-black/30 backdrop-blur-md mouseenter w-fit flex p-3 rounded-2xl justify-start items-center gap-2 cursor-pointer">
            <img
              src="https://img.icons8.com/3d-fluency/94/chat-message.png"
              alt="comments"
              className="w-[25px]"
            />
            <div className="like-count text-white text-[20px]">
              {total_comments}
            </div>
          </button>
        </div>
        <div className="flex gap-6 items-center">
          {
            username === author_username?
            <Link to={`/${post_id}/edit`}
              className="bg-black/30 backdrop-blur-md w-fit flex p-3 rounded-2xl justify-start items-center gap-2 cursor-pointer mouseenter"
            >
              <img
                src="https://img.icons8.com/3d-fluency/94/edit.png" alt="edit"
                className="w-[25px]"
              />
              <div className="like-count text-white text-[20px]">
                Edit Post
              </div>
            </Link>
            :
            null
          }
          <button className="bg-black/30 backdrop-blur-md mouseenter w-fit flex p-3 rounded-2xl justify-start items-center gap-2 cursor-pointer" onClick={onShareButtonClick} >
            <img
              src="https://img.icons8.com/3d-fluency/94/paper-plane.png" alt="paper-plane"
              className="w-[25px] -hue-rotate-90"
            />
            <div className="like-count text-white text-[20px]">
              Share
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostInteraction;
