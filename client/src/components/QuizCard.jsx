import React from "react";
import { Link } from "react-router-dom";

const QuizCard = ({ creaorUsername, creatorProfileImg, quizName, played }) => {
  return (
    <div className="relative duration-500 w-[350px] h-[120px] hover:scale-95 flex-shrink-0 rounded-xl moblieLg:rounded-2xl overflow-hidden">
      <div className="bg-black/20 backdrop-blur-lg p-4 flex w-full h-full justify-between items-start flex-col">
        <div className="title font-candela text-[16px] md:text-[17px] lg:text-[18px] line-clamp-2 text-white/100">
          {quizName}
        </div>
        <div className="w-full flex justify-between items-center">
          <Link
            to={`/${creaorUsername}`}
            className="mt-2 flex justify-start items-center gap-2 decoration-2 underline-offset-2 hover:underline"
          >
            <img
              src={creatorProfileImg}
              alt=""
              className="w-[30px] h-[30px] rounded-lg"
            />
            <span>{creaorUsername}</span>
          </Link>
          <div className="title text-[13px] md:text-[14px] lg:text-[15px] line-clamp-1 text-white/50 flex justify-start items-center mt-2">
            • {played} Played
          </div>
        </div>
      </div>

      <img
        src={creatorProfileImg}
        alt=""
        className="absolute top-0 left-0 w-full h-full z-[-1] blur-xl"
      />
    </div>
  );
};

export default QuizCard;
