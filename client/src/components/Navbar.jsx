import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Ambient from "../components/Ambient";
import { UserContext } from "../App";
import axios from "axios";

const Navbar = () => {
  const {
    userAuth,
    userAuth: { access_token, profile_img, username, new_notification_available },
    setUserAuth
  } = useContext(UserContext);

  const navigate = useNavigate();
  const [searchVisible, setSearchVisible] = useState(false);
  const openSearch = () => {
    setSearchVisible(true);
  };

  const closeSearch = () => {
    setSearchVisible(false);
  };

  useEffect(()=>{

    if (access_token) {
      axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/notification/get", {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      })
      .then(({data}) => {
        setUserAuth({ ...userAuth, ...data})
      })
      .catch((err) => {
        console.log(err);
      })
    }

  }, [access_token])

  const handleSearch = (e) => {
    let query = e.target.value;
    if (e.keyCode == "13" && query.length) {
      navigate(`/search/${query}`);
      setSearchVisible(false);
    }
  };

  const handleIconSearch = (e) => {
    let query = e.target.value;

    if (query.length) {
      navigate(`/search/${query}`);
    }
  };

  console.log(new_notification_available);

  return (
    <>
      <nav className="navbar px-10">
        <Link to="/">
          <div className="logo font-candela">Shiv Mahima</div>
        </Link>

        <div className="right flex justify-center items-center gap-5">
          <div
            className="search active bg-[#fff]/10 px-4 py-3 rounded-2xl cursor-pointer mouseenter"
            onClick={openSearch}
          >
            {/* <RiSearch2Line size={25} /> */}
            <img
              src="https://img.icons8.com/3d-fluency/94/search.png"
              alt="hamburger"
              className="w-[25px]"
            />
            <button className="close-search hidden" onClick={closeSearch}>
              <img
                className="w-[25px] mouseenter"
                src="https://img.icons8.com/3d-fluency/94/close-window.png"
                alt="close-window"
              />
            </button>
          </div>

          {access_token ? (
            <>
              <Link to="/dashboard/notifications">
              <button className="search relative active bg-[#fff]/10 px-4 py-3 rounded-2xl cursor-pointer mouseenter">
                {/* <RiSearch2Line size={25} /> */}
                <img
                  src="https://img.icons8.com/3d-fluency/94/bell.png"
                  alt="bell"
                  className="w-[25px]"
                />

                {
                  new_notification_available ? 
                  <span className="w-4 h-4 bg-purple rounded-full absolute top-[-2px] right-[-2px] border-[3px] border-black/50"></span>
                  : ""

                }

              </button>
              </Link>

              <Link to={`/${username}`}>
                <div className="search active bg-[#fff]/10 w-[56px] h-[46px] rounded-2xl cursor-pointer mouseenter overflow-hidden">
                  {/* <RiSearch2Line size={25} /> */}
                  <img
                    src={profile_img}
                    className="w-full h-full object-cover"
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
      {/* <AnimatePresence>
        {searchVisible && (
          <motion.div
            initial={{ opacity: 0, y: "-100vh" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 1, y: "100vh" }}
            transition={{ duration: 0.3 }}
            className="absolute overflow-hidden search-dialog top-0 left-0 backdrop-blur-md bg-black/100 w-full h-full z-[1000]"
          >
            <Ambient />
            <button
              className="absolute right-[1%] z-10 top-[0%] lg:top-[2%]"
              onClick={closeSearch}
            >
              <img
                className="w-[50px] mouseenter"
                src="https://img.icons8.com/3d-fluency/94/close-window.png"
                alt="close-window"
              />
            </button>
            <div className="search-result-continer px-20 mt-[2%]">
            </div>
              <div className="relative w-1/2">
                <input
                  type="text"
                  placeholder="Search Anything...."
                  className="mb-5 w-full h-16 p-4 pr-16 bg-transparent border-2 border-purple/30 text-2xl outline-none rounded-2xl focus:border-purple focus:text-white active:border-purple active:text-purple"
                  // value={searchQuery}
                  onKeyDown={handleSearch}
                  // onChange={handleInputChange}
                  // onKeyUp={handleKeyUp}
                />
                <div
                  className="absolute top-[38%] mr-2.5 -translate-y-1/2 right-0 search-icon w-[40px] h-[40px] flex justify-center items-center rounded-2xl bg-purple cursor-pointer hover:scale-90 active:scale-100"
                  onClick={handleIconSearch}
                >
                  <i className="fi fi-bs-search text-xl text-black"></i>
                </div>
              </div>
          </motion.div>
        )}
      </AnimatePresence> */}
      <AnimatePresence>
        {searchVisible && (
          <motion.div
            initial={{ opacity: 0, scaleY: "0" }}
            animate={{ opacity: 1, scaleY: "1", transformOrigin: "top" }}
            exit={{ opacity: 1, scaleY: "0" }}
            transition={{ duration: 0.3 }}
            className="relative w-1/2 mx-20"
          >
            <input
              type="text"
              placeholder="Search Anything...."
              className="mb-5 w-full h-16 p-4 pr-16 bg-transparent border-2 border-purple/30 text-2xl outline-none rounded-2xl focus:border-purple focus:text-white active:border-purple active:text-purple"
              // value={searchQuery}
              onKeyDown={handleSearch}
              // onChange={handleInputChange}
              // onKeyUp={handleKeyUp}
            />
            <div
              className="absolute top-[38%] mr-2.5 -translate-y-1/2 right-0 search-icon w-[40px] h-[40px] flex justify-center items-center rounded-2xl bg-purple cursor-pointer hover:scale-90 active:scale-100"
              onClick={handleIconSearch}
            >
              <i className="fi fi-bs-search text-xl text-black"></i>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
