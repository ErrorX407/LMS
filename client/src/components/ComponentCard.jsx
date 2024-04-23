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
    <div className="post relative m-auto h-[215px] w-[184px] xsm:w-[200px] xsm:h-[220px] lg:w-[250px] lg:h-[260px] bg-[rgba(255,255,255,0.1)] flex-shrink-0 rounded-2xl overflow-hidden md:w-[220px] md:h-[240px]">
      <div className="banner relative w-full overflow-hidden aspect-video ">
        <img src={banner} alt={title} className="object-cover bannerImg" />

        <div className="absolute hidden xsm:flex pointer-events-none bg-black/30 backdrop-blur-md z-[99] bottom-2 right-2 likes w-fit p-3 rounded-2xl justify-start items-center gap-2 cursor-pointer">
          <i className="fi fi-sr-heart text-white text-[14px] md:text-[15px] lg:text-[16px] bg-transparent flex justify-center items-center"></i>
          <div className="like-count text-white text-[14px] md:text-[15px] lg:text-[16px]">
            {likes.toLocaleString()}
          </div>
        </div>
      </div>
      <div className="info p-4 select-none">
        <div className="title text-[14px] md:text-[15px] lg:text-[16px] line-clamp-2 text-white/100">
          {title}
        </div>
        <div className="w-full z-[9] px-3   flex justify-between items-center h-12">
          <div className="absolute left-4 bottom-3.5 flex justify-start items-center gap-3">
            <Link
              to={`/${authorLink}`}
              className="author-link underline-offset-2 hover:underline hover:text-white"
            >
              <div className="author flex justify-start items-center gap-2 md:gap-2 lg:gap-3">
                <div className="author-img w-[25px] h-[25px] aspect-square object-cover lg:w-[30px] lg:h-[30px] md:w-[28px] md:h-[28px] overflow-hidden rounded-[6px] lg:rounded-lg md:rounded-lg flex-shrink-0">
                  <img src={profileImg} alt={authorLink} />
                </div>
                <div className="author-name capitalize text-[14px] md:text-[15px] lg:text-[16px] w-[100%] overflow-hidden whitespace-nowrap text-ellipsis text-white/70 ">
                  {author}
                </div>
              </div>
            </Link>
          </div>
        </div>
        <Link to={`/${category}`}>
          <div className="absolute right-3.5 bottom-3 p-1 xsm:p-1.5 md:p-2 rounded-[10px] md:rounded-2xl tags bg-white/10 z-[10] hover:opacity-80">
            <span className="capitalize text-[12px] xsm:text-[13px] md:text-[14px] lg:text-[14px]">
              {category}
            </span>
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
