import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ fullName, username, profileImg }) => {
  return (
    <div className="post relative w-[250px] h-[260px] bg-[rgba(255,255,255,0.1)] flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer">
      <div className="banner relative w-[150px] h-[150px] mx-auto mt-5 mb-3 rounded-full overflow-hidden aspect-square">
        <img src={profileImg} alt="" className="object-cover bannerImg" />
      </div>
      <div className="info w-full px-5">
        <div className="fullname capitalize flex justify-center items-center whitespace-nowrap overflow-hidden">
          <span className="text-[25px] " style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
            {fullName}
          </span>
        </div>
        <div className="username text-white/70 flex justify-center items-center whitespace-nowrap overflow-hidden">
          <span className="text-[14px]" style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
            @{username}
          </span>
        </div>
      </div>

      <Link to={`/${username}`} className="absolute top-0 left-0 w-full h-full"></Link>
    </div>
  );
};

export default UserCard;
