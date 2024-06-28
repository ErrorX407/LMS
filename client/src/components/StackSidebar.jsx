import React, { useContext, useEffect, useState, useRef } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { UserContext } from "../App";
import Navbar from "./Navbar";
import { clearSession } from "../common/Session";
import toast from "react-hot-toast";
import StackNavbar from "./StackNavbar";
import Logo from "../imgs/logo.webp";

const StackSidebar = () => {
  const { userAuth, setUserAuth } = useContext(UserContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarOpacity = scrollPosition > 100 ? 1 : scrollPosition / 100;

  const handleLogout = () => {
    clearSession();
    setTimeout(() => {
      location.reload();
    }, 1000);
    return toast.success("👋 Logged out! See you soon! 🚪🔒");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <StackNavbar toggleSidebar={toggleSidebar} />
      <section
        className="relative w-full top-0 flex gap-1 px-0 py-0 m-0 max-md:flex-col overflow-y-auto"
        onBlur={() => setSidebarOpen(false)}
        tabIndex={0}
        ref={sidebarRef}
      >
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              id="sidebar"
              transition={{ duration: 0.3, ease: [0, 0.71, 0.2, 1.01] }}
              className="fixed left-0 w-[280px] h-screen z-[999] px-5 overflow-y-auto"
              style={{ backgroundColor: `rgba(0, 0, 0, ${navbarOpacity})` }}
            >
              <div className="mt-5">
                <NavLink
                  to="/"
                  className="sidebar-link"
                  onClick={() => closeSidebar()}
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
                  className="sidebar-link"
                  onClick={() => closeSidebar()}
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
                  className="sidebar-link"
                  onClick={() => closeSidebar()}
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
                {/* Add your other sidebar links here */}
                <NavLink
                  to="/notes"
                  className="sidebar-link"
                  onClick={() => closeSidebar()}
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
                  className="sidebar-link"
                  onClick={() => closeSidebar()}
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
                  className="sidebar-link"
                  onClick={() => closeSidebar()}
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
                      to="/settings/edit-profile"
                      className="sidebar-link"
                      onClick={() => closeSidebar()}
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
                      className="w-full flex justify-start items-center gap-6 overflow-hidden mouseenter cursor-pointer text-2xl p-3 mb-3 backdrop-blur-lg bg-black/50 rounded-2xl"
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

export default StackSidebar;
