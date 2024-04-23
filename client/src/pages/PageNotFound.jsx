import React from "react";
import { Link } from "react-router-dom";
import PageNotFoundImage from "../imgs/404 (2).png";
import Navbar from "../components/Navbar";
import PostAmbient from "../components/PostAmbient";

const PageNotFound = () => {
  return (
    <div className="h-[75vh]">
    <PostAmbient banner="https://images.unsplash.com/photo-1585146709654-1668ad81e1f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHJlZHxlbnwwfHwwfHx8MA%3D%3D" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
        <div className="px-10 flex flex-col justify-center items-center gap-5">

          <img className="w-[120px] mb-4" src="https://img.icons8.com/3d-fluency/100/high-priority.png" alt="high-priority"/>

          <div className="flex justify-center items-center flex-col">
          <h1 className="text-[35px] font-candela mb-5">🕵️‍♂️ Page Not Found! 🔍</h1>
          <h3 className="text-[16px] w-[75%] text-center opacity-70 mb-5">It looks like you've wandered into uncharted territory. Time to navigate back home! 🔍 Head back to homepage. 🏠
          </h3>
          </div>
          <Link
            to="/"
            className="text-[16px] text-white font-semibold bg-[#E5221E]/30 px-[20px] py-[10px] rounded-2xl font-messinaReg hover:bg-[#E5221E] active:bg-[#E5221E]/70 hover:text-black"
          >
            Go to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
