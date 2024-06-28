import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../imgs/logo.webp";
import { UserContext } from "../App";
import axios from "axios";

const StackNavbar = ({ toggleSidebar }) => {
  const { userAuth, setUserAuth } = useContext(UserContext);

  const [scrollPosition, setScrollPosition] = useState(0);

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
    <nav className="stack-navbar sm:px-5 lg:px-10 md:px-8" style={{ backgroundColor: `rgba(0, 0, 0, ${navbarOpacity})` }}>
      <Link to="/">
        <div className="flex justify-center items-center gap-2 md:gap-4">
          <img src={Logo} alt="logo" className="w-[25px] xsm:w-[20px] xsm:h-[20px] md:w-[30px] md:h-[30px]" />
          <div className="logo hidden xsm:text-[20px] md:text-[25px] xsm:block">Blogspace</div>
        </div>
      </Link>

      <div className="right flex justify-center items-center gap-2 xsm:gap-3 sm:gap-5">
        <button onClick={toggleSidebar} className="active relative bg-white/10 xsm:bg-[#fff]/10 sm:bg-[#fff]/10 md:bg-[#fff]/10 p-3 sm:px-3 sm:py-2 md:px-4 md:py-3 rounded-[0.8rem] xsm:rounded-xl sm:rounded-2xl cursor-pointer mouseenter">
          <img
            src="https://img.icons8.com/3d-fluency/94/menu.png" alt="menu"
            className="w-[25px] md:w-[25px]"
          />
          {userAuth.new_notification_available && (
            <span className="w-4 h-4 bg-purple rounded-full absolute top-[-2px] right-[-2px] border-[3px] border-black/50"></span>
          )}
        </button>
        {userAuth.access_token ? (
          <>
            <Link to="/dashboard/notifications">
              <button className="active relative bg-white/10 xsm:bg-[#fff]/10 sm:bg-[#fff]/10 md:bg-[#fff]/10 p-3 sm:px-3 sm:py-2 md:px-4 md:py-3 rounded-[0.8rem] xsm:rounded-xl sm:rounded-2xl cursor-pointer mouseenter">
                <img
                  src="https://img.icons8.com/3d-fluency/94/bell.png"
                  alt="bell"
                  className="w-[25px] object-cover"
                />
                {userAuth.new_notification_available && (
                  <span className="w-4 h-4 bg-purple rounded-full absolute top-[-2px] right-[-2px] border-[3px] border-black/50"></span>
                )}
              </button>
            </Link>

            <Link to={`/${userAuth.username}`}>
              <div className="active bg-[#fff]/10 w-[46px] xsm:h-[46px] sm:w-[56px] sm:h-[46px] rounded-[0.8rem] xsm:rounded-xl sm:rounded-2xl cursor-pointer aspect-square mouseenter overflow-hidden">
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

export default StackNavbar;
