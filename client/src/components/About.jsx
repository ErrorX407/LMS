import React from "react";
import { Link } from "react-router-dom";
import { getFullDate } from "../common/Date";

const About = ({ social_links, joinedAt }) => {
  return (
    <>
      <div className="flex justify-end items-center gap-5">
        {Object.keys(social_links).map((key) => {
          let link = social_links[key];

          if (link) {
            if (key === "youtube") {
              return (
                <Link to={link} key={key} target="_blank">
                  <img
                    src="https://img.icons8.com/3d-fluency/94/youtube-play.png"
                    alt="youtube-play"
                    className="w-[40px] mouseenter"
                  />
                </Link>
              );
            }

            if (key === "instagram") {
              return (
                <Link to={link} key={key} target="_blank">
                  <img
                    src="https://img.icons8.com/3d-fluency/94/instagram-new.png"
                    alt="instagram-new"
                    className="w-[40px] mouseenter"
                  />
                </Link>
              );
            }

            if (key === "facebook") {
              return (
                <Link to={link} key={key} target="_blank">
                  <img
                    src="https://img.icons8.com/3d-fluency/94/facebook-circled.png"
                    alt="facebook-circled"
                    className="w-[40px] mouseenter"
                  />
                </Link>
              );
            }
            if (key === "twitter") {
              return (
                <Link to={link} key={key} target="_blank">
                  <img
                    src="https://img.icons8.com/3d-fluency/188/telegram.png"
                    alt="telegram"
                    className="w-[40px] mouseenter"
                  />
                </Link>
              );
            }
            if (key === "github") {
              return (
                <Link to={link} key={key} target="_blank">
                  <img
                    src="https://img.icons8.com/3d-fluency/94/github.png"
                    alt="github"
                    className="w-[40px] mouseenter"
                  />
                </Link>
              );
            }
            if (key === "website") {
              return (
                <Link to={link} key={key} target="_blank">
                  <img
                    src="https://img.icons8.com/3d-fluency/94/domain.png"
                    alt="website"
                    className="w-[40px] mouseenter"
                  />
                </Link>
              );
            }
          }
        })}
      </div>
      <div className="w-full flex justify-end items-center ">
        <h1 className="mt-5 mr-16 px-5 py-3 bg-purple rounded-2xl text-black font-semibold w-fit cursor-default">
          You Joined On - {getFullDate(joinedAt)}
        </h1>
      </div>
    </>
  );
};

export default About;
