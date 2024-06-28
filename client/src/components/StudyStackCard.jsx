import React from "react";
import { Link } from "react-router-dom";

const StudyStackCard = ({
  stackId,
  username,
  description,
  title,
  postBanner,
  postBanner2,
  postBanner3,
  postBanner4,
}) => {
  const postBanners = [
    { src: postBanner },
    { src: postBanner2 },
    { src: postBanner3 },
    { src: postBanner4 },
  ];
  return (
    <div className="relative w-full h-fit duration-700 bg-white/5 hover:bg-white/10 flex-shrink-0 rounded-xl moblieLg:rounded-2xl overflow-hidden flex justify-start items-center p-4">
      {/* {postBanner && postBanner2 && postBanner3 && postBanner4 ? ( */}
      <div className=" flex -space-x-10 overflow-hidden pointer-events-none">
        {postBanners.map((banner, i) => (
          <img
            key={i}
            src={banner.src}
            alt={title}
            className={`inline-block z-[${
              20 - i
            }] h-[60px] w-[60px] rounded-full ${
              banner.src === "" && !banner.src ? "hidden" : ""
            }`}
          />
        ))}
      </div>

      <div className="info px-4 select-none pointer-events-none">
        <div className="title font-medium text-[15px] md:text-[16px] lg:text-[17px] line-clamp-1 pr-3 text-white/100">
          {title}
        </div>
      </div>
      <Link
        to={`/studystack/${stackId}`}
        className="post-link absolute top-0 left-0 w-full h-full"
      ></Link>
    </div>
  );
};

export default StudyStackCard;