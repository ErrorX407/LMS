import React from "react";
import { Link } from "react-router-dom";


const PostCard = ({
  banner,
  author,
  authorLink,
  title,
  profileImg,
  postLink,
  tags,
  likes,
  category,
  publishedAt,
}) => {
  return (
    <div className="post relative w-[250px] h-[260px] bg-[rgba(255,255,255,0.1)] flex-shrink-0 rounded-2xl overflow-hidden">
      <div className="banner relative w-full overflow-hidden aspect-video ">
        <img src={banner} alt={title} className="object-cover bannerImg" />

        <div className="absolute pointer-events-none bg-black/30 backdrop-blur-md z-[99] bottom-2 right-2 likes w-fit flex p-3 rounded-2xl justify-start items-center gap-2 cursor-pointer">
        <i className="fi fi-sr-heart text-white text-[18px] bg-transparent flex justify-center items-center"></i>
          <div className="like-count text-white text-[16px]">{likes.toLocaleString()}</div>
        </div>
      </div>
      <div className="info p-4 select-none">
        <div className="title text-[16px] line-clamp-2 text-white/100">
          {title}
        </div>
        <div className="z-[9] underline-offset-2 relative author-link hover:underline">
          <Link to={`/${authorLink}`}>
            <div className="author mt-4 flex justify-start items-center gap-3">
              <div className="author-img w-[30px] h-[30px] overflow-hidden rounded-lg">
                <img src={profileImg} alt={authorLink} />
              </div>
              <div className="author-name capitalize text-[16px] w-[55%] overflow-hidden whitespace-nowrap text-ellipsis text-white/70">
                {author}
              </div>
            </div>
          </Link>
        </div>
        <Link to={`/${category}`}>
          <div className="absolute right-3.5 bottom-3 p-2 rounded-2xl tags bg-white/10 z-[10] hover:opacity-80">
            <span className="capitalize">{category}</span>
          </div>
        </Link>
      </div>
      <Link
        to={`/post/${postLink}`}
        className="post-link absolute top-0 left-0 w-full h-full"
      ></Link>
    </div>
  );
};

export default PostCard;
