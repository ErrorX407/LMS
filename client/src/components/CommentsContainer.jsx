import React, { useContext } from "react";
import {motion} from "framer-motion"
import { PostContext } from "../pages/PostPage";
import CommentField from "./CommentField";
import axios from "axios";
import NoDataMessage from "./NoDataMessage";
import CommentCard from "./CommentCard";
import LoadMoreButton from "./LoadMoreButton";

export const fetchComments = async({skip = 0, post_id, setParentCommentCountFun, comment_array = null}) => {
  let res;

  await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/post/ineraction/get/comments", {post_id, skip})
  .then(({data}) => {
    // data.map(comment => {
    //   comment.childrenLevel = 0;
    // })
    // console.log(data.comment);
    data.comment.map(comment => {
      comment.childrenLevel = 0;
    })

    setParentCommentCountFun(preVal => preVal + data.length)

    if (comment_array == null) {
      res = { results: data };
    }else{
      res = { results: [...comment_array, ...data] };
    }
  })

  return res;
}

const CommentsContainer = () => {
  let {
    post: {title, comments: {results}, activity: {total_parent_comments}},
    commentWrapper,
    setCommentWrapper,
    totalParentCommentsLoaded
  } = useContext(PostContext);

  let commentsArr = results.comment;

  return (
    <div className={"comment-container max-sm:w-full fixed "+ (commentWrapper ? "top-0 sm:right-0" : "top-[100%] sm:right-[-100%]") +" duration-700 max-sm:right-0 sm:top-0 w-[30%] mix-w-[350px] h-full z-[1000] bg-black/80 backdrop-blur-2xl shadow-2xl p-8 px-5 overflow-y-auto overflow-x-hidden"}>
        <div className="relative">
            <h1 className="text-3xl font-candela">Comments</h1>
            <p className="text-xl mt-2 w-[80%] line-clamp-1 opacity-80">{title}</p>

            <button onClick={()=>setCommentWrapper(preVal => !preVal)} className="absolute top-0 right-0 flex justify-center items-center p-4 rounded-2xl bg-red/70 mouseenter">
                <i className="fi fi-br-cross flex justify-center items-center text-xl"></i>
            </button>
        </div>

        <hr className="border-white/20 my-8 w-[120%] -ml-10" />

        <CommentField action="comment" commentArr={commentsArr} />

        {
          commentsArr && commentsArr.length ? 
          commentsArr.map((comment, i) => {
            return (
              <motion.div
              initial={{ opacity: 0, scale: 0.1/i }}
              animate={{ opacity: 1, scale: 1 }}
              
              transition={{
                  delay: 0.2*i,
                duration: 0.8,
                ease: [0, 0.71, 0.2, 1.01]
              }}
                key={i}
              >
                <CommentCard index={i} leftVal={comment.childrenLevel * 4} commentData={comment} commentsArr={commentsArr} />

              </motion.div>
            );
          })
          : <NoDataMessage message="No comments" />
        }
    </div>
  );
};

export default CommentsContainer;
