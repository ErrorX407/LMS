import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../imgs/logo.webp";
import { UserContext } from "../App";
import axios from "axios";

const Navbar = ({ toggleSidebar }) => {
  const { userAuth, setUserAuth } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userAuth.access_token) {
          const { data } = await axios.get(
            import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/notification/get",
            {
              headers: {
                Authorization: `Bearer ${userAuth.access_token}`,
              },
            }
          );
          setUserAuth({ ...userAuth, ...data });
        }
      } catch (err) {
        // console.log(err);
        let error = err;
      }
    };
    fetchData();
  }, [userAuth.access_token, setUserAuth]);

  return (
    <nav className="navbar px-5 lg:px-10 md:px-8">
      <Link to="/">
        <div className="flex justify-center items-center gap-4">
          <img src={Logo} alt="logo" className="w-[30px] h-[30px]" />
          <div className="logo">Blogspace</div>
        </div>
      </Link>

      <div className="right flex justify-center items-center gap-5">
        <button onClick={toggleSidebar} className="active relative bg-[#fff]/10 px-4 py-3 rounded-2xl cursor-pointer mouseenter">
          <img
            src="https://img.icons8.com/3d-fluency/94/menu.png" alt="menu"
            className="w-[25px]"
          />
          {userAuth.new_notification_available && (
            <span className="w-4 h-4 bg-purple rounded-full absolute top-[-2px] right-[-2px] border-[3px] border-black/50"></span>
          )}
        </button>
        {userAuth.access_token ? (
          <>
            <Link to="/dashboard/notifications">
              <button className="active relative bg-[#fff]/10 px-4 py-3 rounded-2xl cursor-pointer mouseenter">
                <img
                  src="https://img.icons8.com/3d-fluency/94/bell.png"
                  alt="bell"
                  className="w-[25px]"
                />
                {userAuth.new_notification_available && (
                  <span className="w-4 h-4 bg-purple rounded-full absolute top-[-2px] right-[-2px] border-[3px] border-black/50"></span>
                )}
              </button>
            </Link>

            <Link to={`/${userAuth.username}`}>
              <div className="active bg-[#fff]/10 w-[56px] h-[46px] rounded-2xl cursor-pointer mouseenter overflow-hidden">
                <img
                  src={userAuth.profile_img}
                  className="w-full h-full object-cover"
                  alt={userAuth.username}
                />
              </div>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-3 rounded-2xl bg-p bg bg-purple text-black text-xl font-semibold mouseenter"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-3 rounded-2xl bg-white/10 text-xl font-semibold mouseenter"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
