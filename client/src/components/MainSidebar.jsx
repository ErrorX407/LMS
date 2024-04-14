import React, { useContext, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { UserContext } from "../App";
import Navbar from "./Navbar";
import { clearSession } from "../common/session";
import { toast } from "react-toastify";

const MainSidebar = () => {
  const { userAuth, setUserAuth } = useContext(UserContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    clearSession();
    setTimeout(() => {
      location.reload();
    }, 1000);
    toast.success("👋 Logged out! See you soon! 🚪🔒");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <section className="relative flex gap-1 px-0 py-0 m-0 max-md:flex-col">
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0, 0.71, 0.2, 1.01] }}
              className="fixed left-0 w-[280px] h-screen backdrop-blur-lg z-[999] px-5 bg-black/80"
            >
              <div>
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
                          src="https://img.icons8.com/3d-fluency/94/gear--v1.png"
                          alt="gear--v1"
                          className="w-[25px]"
                        />
                        <span className="text-[18px] whitespace-nowrap w-full overflow-hidden">
                          Settings
                        </span>
                      </div>
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="w-full flex justify-start items-center gap-6 overflow-hidden mouseenter cursor-pointer text-2xl p-3 mb-3 bg-white/10 rounded-2xl"
                    >
                      <div className="solutions flex justify-start items-center gap-6">
                        <img
                          src="https://img.icons8.com/3d-fluency/94/door.png"
                          alt="door"
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
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-md:-mt-8 mt-5 w-full">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default MainSidebar;
