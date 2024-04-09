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
          {/* <Ambient /> */}
          <Sidebar />
          <Navbar />
          <PostAmbient banner={profile_img} />
          <section className="w-full px-20 py-5 m-0 relative">
            <div className="top-cont w-full  flex items-center">
              {/* <div className="banner w-full h-full absolute left-0 right-0 z-[-1] blur-3xl">
                <div className="overlay absolute z-[0] w-full h-full top-0 left-0 bg-black/30"></div>
                <img
                  src={profile_img}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div> */}
              <div className="profile-img w-40 h-40 overflow-hidden rounded-3xl">
                <img
                  src={profile_img}
                  alt=""
                  className="profileImg w-full h-full object-cover"
                />
              </div>
              <div className="settings pl-4">
                <div className="name font-bold text-3xl capitalize">
                  {fullName}
                </div>
                <div className="username font-medium text-[rgba(255,255,255,0.7)]">
                  @{profile_username}
                </div>

                <div className="flex items-center justify-center">
                  {profileId == username ? (
                    <>
                      <div className="edit-btn mt-8 mr-4">
                        <Link
                          to="/settings/edit-profile"
                          className="px-8 py-4 bg-purple rounded-2xl font-semibold text-[rgba(255,255,255,0.9)] transition-[0.5s_ease] hover:text-[rgba(255,255,255,1)]  hover:bg-purple/60"
                        >
                          Settings
                        </Link>
                      </div>
                      <div className="mt-8">
                        <Link
                          to="/logout"
                          className="px-8 py-4 bg-[rgba(255,255,255,0.1)] rounded-2xl font-semibold text-[rgba(255,255,255,0.9)] transition-[0.5s_ease] hover:text-[rgba(255,255,255,1)] hover:hover:bg-[rgba(255,255,255,0.2)]"
                        >
                          Logout
                        </Link>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="info px-20 flex w-1/2 justify-between items-center">
                <div></div>
                <h1 className="flex justify-center items-center flex-col text-3xl">
                  {total_posts.toLocaleString()}{" "}
                  <span className="text-3xl">Posts</span>
                </h1>
                <h1 className="flex justify-center items-center flex-col text-3xl">
                  {total_reads.toLocaleString()}{" "}
                  <span className="text-3xl">Reads</span>
                </h1>
              </div>
            </div>
            <div className="mt-5">
              <About social_links={social_links} joinedAt={joinedAt} />
            </div>

            <div className="post-container my-3 w-full flex gap-5 flex-wrap rounded-2xl">
              <>
                {posts == null ? (
                  <Loader />
                ) : posts.results.length ? (
                  posts.results.map((post, i) => {
                    return (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.1 / i }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.2 * i,
                          duration: 0.8,
                          ease: [0, 0.71, 0.2, 1.01],
                        }}
                        key={i}
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
                    );
                  })
                ) : (
                  <NoDataMessage message="No Posts Found" />
                )}
              </>
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
