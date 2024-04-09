import React from "react";

const PostAmbient = ({ banner }) => {
  return (
    <div className="fixed top-0 left-0 pointer-events-none z-[-1] w-screen h-screen">
      <div className="overlay relative z-[0] w-full h-full top-0 left-0 pointer-events-none"></div>
      <img
        src={banner}
        alt=""
        className="w-full h-full object-cover blur-[500px]"
      />
    </div>
  );
};

export default PostAmbient;
