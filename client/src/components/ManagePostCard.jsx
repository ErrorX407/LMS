import React from "react";
import { Link } from "react-router-dom";
import { getFullDate } from "../common/Date";

const ManagePostCard = ({ post }) => {
  let {
    banner,
    category,
    title,
    activity: { total_likes },
    post_id: postLink,
    publishedAt,
  } = post;
  return (
    <div className="post relative w-[250px] h-[260px] bg-[rgba(255,255,255,0.1)] flex-shrink-0 rounded-2xl overflow-hidden">
      <div className="banner relative w-full overflow-hidden aspect-video ">
        <img src={banner} alt="" className="object-cover bannerImg" />

        <Link to={`/editor/${postLink}`}
              className="z-[99] absolute bottom-3 right-3 bg-black/30 backdrop-blur-md w-fit flex p-3 rounded-2xl justify-start items-center gap-2 cursor-pointer hover:bg-black/60"
            >
              <img
                src="https://img.icons8.com/3d-fluency/94/edit.png" alt="edit"
                className="w-[20px]"
              />
              <div className="like-count text-white text-[14px]">
                Edit Post
              </div>
            </Link>
      </div>
      <div className="info p-4 select-none">
        <div className="title text-[16px] line-clamp-2 text-white/100">
          {title}
        </div>
        <div>
          <div className="mt-4 flex justify-start items-center gap-3">
            <button className="post-delete-btn z-[9] flex justify-center items-center px-3 py-2.5 rounded-[12px] bg-red/20 hover:bg-red/40">
              {" "}
              <i className="fi fi-sr-trash flex justify-center items-center text-[13px] text-red pointer-events-none"></i>
            </button>
            <div className="Published-date capitalize text-[16px] w-[55%] overflow-hidden whitespace-nowrap text-ellipsis text-white/70">
              {getFullDate(publishedAt)}
            </div>
          </div>
        </div>
        <Link to={`/${category}`}>
          <div className="absolute right-3.5 bottom-3 p-2 rounded-2xl tags bg-white/10 z-[10] hover:opacity-80">
            <span className="capitalize">{category}</span>
          </div>
        </Link>
      </div>
      <Link
        to={`/post/${postLink}`}
        className="absolute top-0 left-0 w-full h-full"
      ></Link>
    </div>
  );
};

export default ManagePostCard;
