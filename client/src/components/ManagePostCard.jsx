import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { getFullDate } from "../common/Date";
import { UserContext } from "../App";
import axios from "axios";

export const ManagePostCard = ({ post }) => {
  let {
    banner,
    category,
    index,
    title,
    activity: { total_likes },
    post_id: postLink,
    publishedAt,
  } = post;

  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  return (
    <div className="post relative w-[200px] h-[220px] lg:w-[250px] lg:h-[260px] bg-[rgba(255,255,255,0.1)] flex-shrink-0 rounded-2xl overflow-hidden md:w-[220px] md:h-[240px]">
      <div className="banner relative w-full overflow-hidden aspect-video ">
        <img src={banner} alt="" className="object-cover bannerImg" />

        <Link
          to={`/editor/${postLink}`}
          className="z-[99] absolute bottom-3 right-3 bg-black/30 backdrop-blur-md w-fit flex p-3 rounded-2xl justify-start items-center gap-2 cursor-pointer hover:bg-black/60"
        >
          <img
            src="https://img.icons8.com/3d-fluency/94/edit.png"
            alt="edit"
            className="w-[18px] md:w-[19px] lg:w-[20px]"
          />
          <div className="like-count text-white text-[12px] md:text-[13px] lg:text-[14px]">Edit Post</div>
        </Link>
      </div>
      <div className="info p-4 select-none">
        <div className="title text-[14px] md:text-[15px] lg:text-[16px] line-clamp-2 text-white/100">
          {title}
        </div>

        <div className="w-full z-[9] absolute left-1/2 px-3 -translate-x-1/2 bottom-2  flex justify-between items-center h-12">
          <div>
            <div className="flex justify-start items-center gap-2 md:gap-3">
              <button
                onClick={(e) => deletePost(post, access_token, e.target)}
                className="post-delete-btn z-[9] flex justify-center items-center px-3 py-2.5 rounded-[12px] bg-red/20 hover:bg-red/40"
              >
                {" "}
                <i className="fi fi-sr-trash flex justify-center items-center text-[14px] md:text-[15px] lg:text-[16px] text-red pointer-events-none"></i>
              </button>
              <div className="Published-date capitalize text-[14px] md:text-[15px] lg:text-[16px] w-[100%] overflow-hidden whitespace-nowrap text-ellipsis text-white/70">
                {getFullDate(publishedAt)}
              </div>
            </div>
          </div>
          <Link to={`/${category}`}>
            <div className="p-1.5 md:p-2 rounded-2xl tags bg-white/10 z-[10] hover:opacity-80">
              <span className="capitalize text-[13px] md:text-[14px] lg:text-[14px]">{category}</span>
            </div>
          </Link>
        </div>
      </div>
      <Link
        to={`/post/${postLink}`}
        className="absolute top-0 left-0 w-full h-full"
      ></Link>
    </div>
  );
};

export const ManageDraftPostCard = ({ post }) => {
  let {
    banner,
    title,
    activity: { total_likes },
    post_id: postLink,
    publishedAt,
    index,
  } = post;

  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  return (
    <div className="post relative w-[250px] h-[260px] bg-[rgba(255,255,255,0.1)] flex-shrink-0 rounded-2xl overflow-hidden">
      <div className="banner relative w-full overflow-hidden aspect-video ">
        <img
          src={
            banner
              ? banner
              : "https://images.unsplash.com/photo-1712324014968-018a63a4d0e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={title}
          className="object-cover bannerImg"
        />

        <Link
          to={`/editor/${postLink}`}
          className="z-[99] absolute bottom-3 right-3 bg-black/30 backdrop-blur-md w-fit flex p-3 rounded-2xl justify-start items-center gap-2 cursor-pointer hover:bg-black/60"
        >
          <img
            src="https://img.icons8.com/3d-fluency/94/edit.png"
            alt="edit"
            className="w-[20px]"
          />
          <div className="like-count text-white text-[14px]">Edit Post</div>
        </Link>
      </div>
      <div className="info p-4 select-none">
        <div className="title text-[16px] line-clamp-2 text-white/100">
          {title}
        </div>
        <div className="w-full z-[9] absolute left-1/2 px-3 -translate-x-1/2 bottom-2  flex justify-between items-center h-12">
          <div>
            <div className="flex justify-start items-center gap-3">
              <button
                onClick={(e) => deletePost(post, access_token, e.target)}
                className="post-delete-btn z-[9] flex justify-center items-center px-3 py-2.5 rounded-[12px] bg-red/20 hover:bg-red/40"
              >
                {" "}
                <i className="fi fi-sr-trash flex justify-center items-center text-[13px] text-red pointer-events-none"></i>
              </button>
              <div className="Published-date capitalize text-[16px] w-[100%] overflow-hidden whitespace-nowrap text-ellipsis text-white/70">
                {getFullDate(publishedAt)}
              </div>
            </div>
          </div>
          <Link to={`/`}>
            <div className="mouseenter p-2 rounded-2xl tags bg-purple text-black z-[10] hover:opacity-80">
              <span className="capitalize">Publish</span>
            </div>
          </Link>
        </div>
      </div>
      <Link
        to={`/post/${postLink}`}
        className="absolute top-0 left-0 w-full h-full"
      ></Link>
    </div>
  );
};

const deletePost = (post, access_token, target) => {
  let { post_id, index, setStateFun } = post;

  target.setAttribute("disabled", true)

  axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/post/delete", {post_id}, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
  .then(({data}) => {
    target.removeAttribute("disabled")
    setStateFun(preVal => {
      let {deletedDocCount, totalDocs, results} = preVal

      results.posts.splice(index, 1);

      if (!deletedDocCount) {
        deletedDocCount = 0;
      }

      if (!results.posts.length && totalDocs - 1 > 0) {
        return null;
      }

      console.log({...preVal, totalDocs: totalDocs - 1, deletedDocCount: deletedDocCount + 1});
      return {...preVal, totalDocs: totalDocs - 1, deletedDocCount: deletedDocCount + 1}
    })
  })
  .catch((err) => {
     target.removeAttribute("disabled")
     console.log(err)
   })
};
