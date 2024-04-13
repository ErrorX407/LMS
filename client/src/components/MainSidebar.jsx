import React, { useContext } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { UserContext } from "../App";
import Navbar from "./Navbar";
import { clearSession, removeFromSession } from "../common/session";
import { toast } from "react-toastify";

const MainSidebar = () => {
  const { userAuth, setUserAuth } = useContext(UserContext);
  const handleLogout = () => {
    clearSession()
    setTimeout(() => {
    location.reload();
    }, 1000)
    toast.success("👋 Logged out! See you soon! 🚪🔒")
  }
  return (
    <>
      <Navbar />
      <section className="relative flex gap-1 lg:px-10 py-0 m-0 max-md:flex-col">
        <div className="sticky top-[80px] backdrop-blur-lg">
          <div className="w-[250px] backdrop-blur-lg st h-cover md:sticky py-5 top-24 overflow-y-auto md:pr-0 max-md:backdrop-blur-lg max-md:bg-black/10 absolute max-md:top-[64px] max-md:w-[calc(100%+50px)] max-md:px-16 max-md:-ml-7">
            {/* <h1 className="font-candela text-3xl mb-3">Dashboard</h1> */}

            <NavLink
              to="/"
              onClick={(e) => setPageState(e.target.innerText)}
              className="sidebar-link"
            >
              <div className="solutions flex justify-start items-center gap-6">
                <img
                  src="https://img.icons8.com/3d-fluency/94/home.png"
                  alt="home"
                  className="w-[25px]"
                />
                <span className="text-[18px] whitespace-nowrap w-full overflow-hidden">
                  Home
                </span>
              </div>
            </NavLink>

            <NavLink
              to="/search"
              onClick={(e) => setPageState(e.target.innerText)}
              className="sidebar-link"
            >
              <div className="solutions flex justify-start items-center gap-6">
                <img
                  src="https://img.icons8.com/3d-fluency/94/search.png"
                  alt="search"
                  className="w-[25px]"
                />
                <span className="text-[18px] whitespace-nowrap w-full overflow-hidden">
                  Search
                </span>
              </div>
            </NavLink>

            <NavLink
              to="/solutions"
              onClick={(e) => setPageState(e.target.innerText)}
              className="sidebar-link"
            >
              <div className="solutions flex justify-start items-center gap-6">
                <img
                  src="https://img.icons8.com/3d-fluency/94/book-stack.png"
                  alt="Solutions"
                  className="w-[25px]"
                />
                <span className="text-[18px] whitespace-nowrap w-full overflow-hidden">
                  Solutions
                </span>
              </div>
            </NavLink>

            <NavLink
              to="/pyqs"
              onClick={(e) => setPageState(e.target.innerText)}
              className="sidebar-link"
            >
              <div className="solutions flex justify-start items-center gap-6">
                <img
                  src="https://img.icons8.com/3d-fluency/94/help.png"
                  alt="brain"
                  className="w-[25px]"
                />
                <span className="text-[18px] whitespace-nowrap w-full overflow-hidden">
                  PYQ's
                </span>
              </div>
            </NavLink>

            <NavLink
              to="/question-bank"
              onClick={(e) => setPageState(e.target.innerText)}
              className="sidebar-link"
            >
              <div className="solutions flex justify-start items-center gap-6">
                <img
                  src="https://img.icons8.com/3d-fluency/94/money-bag.png"
                  alt="brain"
                  className="w-[25px]"
                />
                <span className="text-[18px] whitespace-nowrap w-full overflow-hidden">
                  Question Bank
                </span>
              </div>
            </NavLink>

            <NavLink
              to="/notes"
              onClick={(e) => setPageState(e.target.innerText)}
              className="sidebar-link"
            >
              <div className="solutions flex justify-start items-center gap-6">
                <img
                  src="https://img.icons8.com/3d-fluency/94/note.png"
                  alt="note"
                  className="w-[25px]"
                />
                <span className="text-[18px] whitespace-nowrap w-full overflow-hidden">
                  Notes
                </span>
              </div>
            </NavLink>

            <NavLink
              to="/test-series"
              onClick={(e) => setPageState(e.target.innerText)}
              className="sidebar-link"
            >
              <div className="solutions flex justify-start items-center gap-6">
                <img
                  src="https://img.icons8.com/3d-fluency/94/hand-with-pen--v2.png"
                  alt="hand-with-pen--v2"
                  className="w-[25px]"
                />
                <span className="text-[18px] whitespace-nowrap w-full overflow-hidden">
                  Test Series
                </span>
              </div>
            </NavLink>

            <NavLink
              to="/news"
              onClick={(e) => setPageState(e.target.innerText)}
              className="sidebar-link"
            >
              <div className="solutions flex justify-start items-center gap-6">
                <img
                  src="https://img.icons8.com/3d-fluency/94/news.png"
                  alt="news"
                  className="w-[25px]"
                />
                <span className="text-[18px] whitespace-nowrap w-full overflow-hidden">
                  News
                </span>
              </div>
            </NavLink>

            {userAuth.access_token ? (
          <div className="mb-auto">
            <NavLink
              to="/settings"
              onClick={(e) => setPageState(e.target.innerText)}
              className="sidebar-link"
            >
              <div className="solutions flex justify-start items-center gap-6">
                <img
                  src="https://img.icons8.com/3d-fluency/94/gear--v1.png" alt="gear--v1"
                  className="w-[25px]"
                />
                <span className="text-[18px] whitespace-nowrap w-full overflow-hidden">
                  Settings
                </span>
              </div>
            </NavLink>
            <button
              onClick={handleLogout}
              className="w-full flex justify-start items-center gap-6 overflow-hidden mouseenter cursor-pointer text-2xl p-3 mb-3 bg-white/5 rounded-2xl"
            >
              <div className="solutions flex justify-start items-center gap-6">
                <img
                  src="https://img.icons8.com/3d-fluency/94/door.png" alt="door"
                  className="w-[25px]"
                />
                <span className="text-[18px] whitespace-nowrap w-full overflow-hidden">
                  Logout
                </span>
              </div>
            </button>
          </div>
        ) : (
          ""
        )}
          </div>
        </div>

        <div className="max-md:-mt-8 mt-5 w-full">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default MainSidebar;
