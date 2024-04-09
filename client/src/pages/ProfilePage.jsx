import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Ambient from "../components/Ambient";
import { UserContext } from "../App";
import About from "../components/About";
import { FilterPaginationData } from "../common/FilterPaginationData";
import PostCard from "../components/PostCard";
import NoDataMessage from "../components/NoDataMessage";
import LoadMoreButton from "../components/LoadMoreButton";
import PageNotFound from "./PageNotFound";
import PostAmbient from "../components/PostAmbient";

export const profileDataStructure = {
  personal_info: {
    fullName: "",
    username: "",
    profile_img: "",
  },
  account_info: {
    total_posts: "",
    total_reads: "",
  },
  social_links: {},
  joinedAt: "",
};

const ProfilePage = () => {
  const {
    userAuth: { username },
  } = useContext(UserContext);

  let { id: profileId } = useParams();

  const [profile, setProfile] = useState(profileDataStructure);
  const [posts, setPosts] = useState(null);
  const [profileLoaded, setProfileLoaded] = useState("");

  const {
    personal_info: { fullName, username: profile_username, profile_img },
    account_info: { total_posts, total_reads },
    social_links,
    joinedAt,
  } = profile;

  const [loading, setLoading] = useState(true);

  const fetchUserProfile = () => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/user/profile", {
        username: profileId,
      })
      .then(({ data: user }) => {
        if (user != null) {
          setProfile(user);
        }
        setProfileLoaded(profileId);
        getPosts({ user_id: user._id });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const resetStates = () => {
    setProfile(profileDataStructure);
    setLoading(true);
    setProfileLoaded("");
  };

  useEffect(() => {
    if (profileId != profileLoaded) {
      setPosts(null);
    }
    if (posts == null) {
      resetStates();
      fetchUserProfile();
    }
  }, [profileId, posts]);

  const getPosts = ({ page = 1, user_id }) => {
    user_id = user_id == undefined ? posts.user_id : user_id;
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/post/search", {
        author: user_id,
        page,
      })
      .then(async ({ data }) => {
        let formatedData = await FilterPaginationData({
          state: posts,
          data: data.posts,
          page,
          countRoute: "/api/v1/post/latest/count",
          data_to_send: { author: user_id },
        });
        formatedData.user_id = user_id;
        setPosts(formatedData);
      });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : profile_username.length ? (
        <>
          <PostAmbient banner={profile_img} />
          <section className="px-10">
            <div className="flex justify-between items-center flex-wrap w-full mx-auto">
            <div className="top-cont flex flex-col md:flex-row md:items-center w-[55%]">
              <div className="profile-img w-40 h-40 overflow-hidden rounded-3xl md:mr-4 mb-4 md:mb-0">
                <img
                  src={profile_img}
                  alt=""
                  className="profileImg w-full h-full object-cover"
                />
              </div>
              <div className="settings">
                <div className="name font-bold text-3xl capitalize">
                  {fullName}
                </div>
                <div className="username font-medium text-[rgba(255,255,255,0.7)]">
                  @{profile_username}
                </div>
                <div className="flex flex-col md:flex-row items-center mt-4">
                  <div className="info md:mt-0 flex gap-6 flex-col md:flex-row justify-between w-full md:w-auto">
                    <div className="flex justify-center items-center mb-2 md:mb-0 bg-purple border-2 border-purple/50 px-3 rounded-xl">
                      <h1 className="text-2xl text-black">
                        {total_posts.toLocaleString()}{" "}
                        <span className="text-xl text-black/70">Posts</span>
                      </h1>
                    </div>
                    <div className="flex justify-center items-center bg-purple border-2 border-purple/50 px-3 rounded-xl">
                      <h1 className="text-2xl text-black">
                        {total_reads.toLocaleString()}{" "}
                        <span className="text-xl text-black/70">Reads</span>
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {/* Assuming About component is responsive */}
              <About social_links={social_links} joinedAt={joinedAt} />
            </div>
            </div>

            <div className="post-container mt-6 my-3 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 rounded-2xl">
              {posts == null ? (
                <Loader />
              ) : posts.results.length ? (
                posts.results.map((post, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, transform: "translateY(50px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    transition={{
                      delay: 0.1 * i,
                      duration: 2,
                      ease: [0, 0.71, 0.2, 1.01],
                    }}
                  >
                    <PostCard
                      banner={post.banner}
                      title={post.title}
                      author={post.author.personal_info.fullName}
                      authorLink={post.author.personal_info.username}
                      profileImg={post.author.personal_info.profile_img}
                      postLink={post.post_id}
                      likes={post.activity.total_likes}
                      tags={post.tags}
                      publishedAt={post.publishedAt}
                      category={post.category}
                    />
                  </motion.div>
                ))
              ) : (
                <NoDataMessage message="No Posts Found" />
              )}
            </div>

            <LoadMoreButton state={posts} fetchDataFun={getPosts} />
          </section>
        </>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default ProfilePage;
