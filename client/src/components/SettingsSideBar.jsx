import React, { useContext, useState } from "react";
import { Outlet, Navigate, NavLink } from "react-router-dom";
import { UserContext } from "../App";
import Navbar from "./Navbar";
import PostAmbient from "./PostAmbient";

const SettingsSideBar = () => {
  const {
    userAuth: {
      access_token,
      profile_img,
      new_notification_available,
      isAdmin,
    },
  } = useContext(UserContext);
  const [page, setPageState] = useState();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return access_token === null ? (
    <Navigate to="/login" />
  ) : (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <PostAmbient banner={profile_img} />
      <section className="relative flex gap-10 lg:px-20 py-0 m-0 max-md:flex-col">
          <div
            className={`fixed w-[250px]  md:sticky top-[80px] z-[30] ${
              sidebarOpen ? "left-0" : "-left-full"
            }`}
          >
            <div className="min-w-[280px] md:min-w-[250px] h-cover md:sticky py-5 top-24 overflow-y-auto md:pr-0 max-md:backdrop-blur-lg max-md:bg-black/90 absolute max-md:top-[0px] max-md:px-5 ">
              <h1 className="font-candela text-3xl mb-3">Dashboard</h1>
              {/* <hr className="border-white/50 -ml-6 mb-8 mr-16" /> */}

              {
                isAdmin ? <NavLink
                to="/dashboard/posts"
                onClick={(e) => setPageState(e.target.innerText)}
                className="sidebar-link"
              >
                <div className="solutions flex justify-start items-center gap-6">
                  <img
                    src="https://img.icons8.com/3d-fluency/94/documents.png"
                    alt="posts"
                    className="w-[25px]"
                  />
                  <span className="text-[18px] whitespace-nowrap w-full overflow-hidden">
                    Posts
                  </span>
                </div>
              </NavLink> : ""
              }

              <NavLink
                to="/dashboard/notifications"
                onClick={(e) => setPageState(e.target.innerText)}
                className="sidebar-link relative"
              >
                <div className="solutions flex justify-start items-center gap-6">
                  <div className="">
                    <img
                      src="https://img.icons8.com/3d-fluency/94/bell.png"
                      alt="bell"
                      className="w-[25px]"
                    />
                    {new_notification_available ? (
                      <span className="w-4 h-4 bg-black rounded-full absolute top-[50%] -translate-y-1/2 right-6 border-[3px] border-purple/50"></span>
                    ) : (
                      ""
                    )}
                  </div>
                  <span className="text-[18px] whitespace-nowrap w-full overflow-hidden">
                    Notification
                  </span>
                </div>
              </NavLink>

              {isAdmin ? (
                <NavLink
                  to="/editor"
                  onClick={(e) => setPageState(e.target.innerText)}
                  className="sidebar-link"
                >
                  <div className="solutions flex justify-start items-center gap-6">
                    <img
                      src="https://img.icons8.com/3d-fluency/100/hand-with-pen--v3.png"
                      alt="hand-with-pen--v3"
                      className="w-[25px]"
                    />
                    <span className="text-[18px] whitespace-nowrap w-full overflow-hidden">
                      Write
                    </span>
                  </div>
                </NavLink>
              ) : (
                ""
              )}

              <h1 className="font-candela text-3xl mb-3 mt-10">Settings</h1>
              {/* <hr className="border-white/50 -ml-6 mb-8 mr-16" /> */}

              <NavLink
                to="/settings/edit-profile"
                onClick={(e) => setPageState(e.target.innerText)}
                className="sidebar-link"
              >
                <div className="solutions flex justify-start items-center gap-6">
                  <img
                    src="https://img.icons8.com/3d-fluency/100/writer-male.png"
                    alt="writer-male"
                    className="w-[25px]"
                  />
                  <span className="text-[18px] whitespace-nowrap w-full overflow-hidden">
                    Edit Profile
                  </span>
                </div>
              </NavLink>

              <NavLink
                to="/settings/change-password"
                onClick={(e) => setPageState(e.target.innerText)}
                className="sidebar-link"
              >
                <div className="solutions flex justify-start items-center gap-6">
                  <img
                    src="https://img.icons8.com/3d-fluency/188/password.png"
                    alt="password"
                    className="w-[25px]"
                  />
                  <span className="text-[18px] whitespace-nowrap w-full overflow-hidden line-clamp-1">
                    Change Password
                  </span>
                </div>
              </NavLink>
            </div>
          </div>

        <div className="max-md:-mt-8 mt-5 w-full">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default SettingsSideBar;
