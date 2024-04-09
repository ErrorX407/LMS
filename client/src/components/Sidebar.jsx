import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-container w-24 fixed -left-[3.35rem] top-28 rounded-2xl  h-[80vh] overflow-hidden z-[999]">
      <div className="sidebar p-2 w-[4.5rem] m-auto rounded-2xl bg-white/10 backdrop-blur-lg h-full">
        <Link to="/solutions">
          <div className="solutions flex justify-start items-center gap-6 overflow-hidden cursor-pointer mouseenter text-2xl p-3 mb-3 bg-black/20 rounded-2xl">
            <img
              src="https://img.icons8.com/3d-fluency/94/book-stack.png"
              alt="Solutions"
              className="w-[25px]"
            />
            <span className="text-[18px] whitespace-nowrap w-full overflow-hidden">Solutions</span>
          </div>
        </Link>
        <Link to="/pyq">
          <div className="pyq flex justify-start items-center gap-6 overflow-hidden cursor-pointer mouseenter text-2xl p-3 mb-3 bg-black/20 rounded-2xl">
            <img
              src="https://img.icons8.com/3d-fluency/94/help.png"
              alt="brain"
              className="w-[25px]"
            />
            <span className="text-[18px] whitespace-nowrap w-full overflow-hidden">PYQ's</span>
          </div>
        </Link>
        <Link to="/question-bank">
          <div className="question-bank flex justify-start items-center gap-6 overflow-hidden cursor-pointer mouseenter text-2xl p-3 mb-3 bg-black/20 rounded-2xl">
            <img
              src="https://img.icons8.com/3d-fluency/94/money-bag.png"
              alt="brain"
              className="w-[25px]"
            />
            <span className="text-[18px] whitespace-nowrap w-full overflow-hidden">Question Bank</span>
          </div>
        </Link>
        <Link to="/notes">
          <div className="notes flex justify-start items-center gap-6 overflow-hidden cursor-pointer mouseenter text-2xl p-3 mb-3 bg-black/20 rounded-2xl">
            <img
              src="https://img.icons8.com/3d-fluency/94/note.png"
              alt="note"
              className="w-[25px]"
            />
            <span className="text-[18px] whitespace-nowrap w-full overflow-hidden">Notes</span>
          </div>
        </Link>
        <Link to="/test-series">
          <div className="test-series flex justify-start items-center gap-6 overflow-hidden cursor-pointer mouseenter text-2xl p-3 mb-3 bg-black/20 rounded-2xl">
            <img
              src="https://img.icons8.com/3d-fluency/94/hand-with-pen--v2.png"
              alt="hand-with-pen--v2"
              className="w-[25px]"
            />
            <span className="text-[18px] whitespace-nowrap w-full overflow-hidden">Test Series</span>
          </div>
        </Link>
        <Link to="/news">
          <div className="news flex justify-start items-center gap-6 overflow-hidden cursor-pointer mouseenter text-2xl p-3 mb-3 bg-black/20 rounded-2xl">
            <img
              src="https://img.icons8.com/3d-fluency/94/news.png"
              alt="news"
              className="w-[25px]"
            />
            <span className="text-[18px] whitespace-nowrap w-full overflow-hidden">News</span>
          </div>
        </Link>
        <Link to="/search">
          <div className="search flex justify-start items-center gap-6 overflow-hidden cursor-pointer mouseenter text-2xl p-3 mb-3 bg-black/20 rounded-2xl">
            <img
              src="https://img.icons8.com/3d-fluency/94/search.png"
              alt="search"
              className="w-[25px]"
            />
            <span className="text-[18px] whitespace-nowrap w-full overflow-hidden">Search</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
