import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ fullName, username, profileImg }) => {
  return (
    <div className="user-card relative m-auto h-fit w-[140px] moblieLg:w-[200px] moblieLg:h-[220px] lg:w-[250px] lg:h-[260px] moblieLg:bg-[rgba(255,255,255,0.1)] flex-shrink-0 rounded-xl moblieLg:rounded-2xl overflow-hidden md:w-[220px] md:h-[240px] duration-700 hover:bg-[rgba(255,255,255,0)]">
      <div className="banner relative w-[120px] h-[120px] lg:w-[150px] lg:h-[150px] mx-auto mt-5 mb-3 rounded-full overflow-hidden aspect-square">
        <img src={profileImg} alt="" className="object-cover bannerImg" />
      </div>
      <div className="info w-full px-5">
        <div className="fullname capitalize flex justify-center items-center whitespace-nowrap overflow-hidden">
          <span className="text-[20px] md:text-[22px] lg:text-[25px] " style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
            {fullName}
          </span>
        </div>
        <div className="username text-white/70 flex justify-center items-center whitespace-nowrap overflow-hidden">
          <span className="text-[12px] md:text-[13px] lg:text-[14px]" style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
            @{username}
          </span>
        </div>
      </div>

      <Link to={`/${username}`} className="absolute top-0 left-0 w-full h-full"></Link>
    </div>
  );
};

export default UserCard;
