import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import About from "../components/About";
import { FilterPaginationData } from "../common/FilterPaginationData";
import PostCard from "../components/PostCard";
import NoDataMessage from "../components/NoDataMessage";
import LoadMoreButton from "../components/LoadMoreButton";
import PageNotFound from "./PageNotFound";
import PostAmbient from "../components/PostAmbient";
import { useContext } from "react";
import { UserContext } from "../App";
import StudyStackCard from "../components/StudyStackCard";
import FormatSaveCount from "../components/FormatSaveCount";
import toast from "react-hot-toast";

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
    userAuth: { isAdmin, access_token, username },
  } = useContext(UserContext);
  let { id: profileId } = useParams();

  const [profile, setProfile] = useState(profileDataStructure);
  const [posts, setPosts] = useState(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [studyStack, setStudyStack] = useState(null);
  const [profileLoaded, setProfileLoaded] = useState("");
  const [filter, setFilter] = useState("published"); // Default tab is "published"
  const [notFound, setNotFound] = useState(false);
  const [postNotFound, setPostNotFound] = useState(false);

  const {
    personal_info: { fullName, username: profile_username, profile_img },
    account_info: { total_reads },
    social_links,
    joinedAt,
  } = profile;

  const [loading, setLoading] = useState(true);

  const handleTabClick = (tab) => {
    setFilter(tab);
    if (tab === "studystack") {
      handleStudyStackClick();
    }
  };

  const handleStudyStackClick = () => {
    // e.preventDefault();
    setFilter("studystack");

    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN +
          "/api/v1/post/ineraction/studystack/get",
        { profile_username }
      )
      .then(({ data }) => {
        setStudyStack(data.studyStack);
      })
      .catch(({ response }) => {
        if (response.status === 404) {
          setNotFound(true);
        }
        // return toast.error(response.data.Error);
      });
  };

  const fetchUserProfile = () => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/user/profile", {
        username: profileId,
      })
      .then(({ data: user }) => {
        if (user != null) {
          setProfile(user);
          setTotalPosts(user.posts.length);
          console.log(totalPosts);
        }
        setProfileLoaded(profileId);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (profileId !== profileLoaded) {
      setPosts(null);
      setLoading(true); // Reset loading state when profileId changes
      fetchUserProfile();
    }
  }, [profileId, profileLoaded]);

  useEffect(() => {
    if (profileId === profileLoaded && posts === null) {
      getPosts({ user_id: profile._id });
    }
  }, [profileId, profileLoaded, posts]);

  const getPosts = ({ page = 1, user_id }) => {
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
        console.log(formatedData);
      })
      .catch(({ response }) => {
        if (response.status === 404) {
          setPostNotFound(true);
        }
      });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : profile_username.length ? (
        <>
          <PostAmbient banner={profile_img} />
          <section className="px-4 xsm:px-5 lg:px-10 md:px-8 mt-[50px] md:mt-0 lg:mt-0">
            <div className="flex justify-between items-center flex-wrap w-full mx-auto">
              <div className="top-cont flex flex-col md:flex-row md:items-center w-full md:w-[55%] md:justify-start">
                <div className="profile-img m-auto md:m-0 w-40 h-40 overflow-hidden rounded-3xl md:mr-4 mb-4 md:mb-0">
                  <img
                    src={profile_img}
                    alt=""
                    className="profileImg w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="name font-bold text-3xl text-center capitalize md:text-left">
                    {fullName}
                  </div>
                  <div className="username font-medium text-[rgba(255,255,255,0.7)] text-center md:text-left">
                    @{profile_username}
                  </div>
                  {!postNotFound ? (
                    <div className="flex flex-col md:flex-row items-center mt-4">
                      <div className="info md:mt-0 flex gap-6 md:gap-6 flex-row md:flex-row justify-center w-auto md:w-auto">
                        <div className="flex justify-center items-center md:mb-0 bg-white/10 px-3 md:px-3 w-fit rounded-xl">
                          <h1 className="text-2xl text-white">
                            {FormatSaveCount(totalPosts)}{" "}
                            <span className="text-xl text-white/70">Posts</span>
                          </h1>
                        </div>
                        <div className="flex justify-center items-center bg-white/10 px-3 md:px-3 w-fit rounded-xl">
                          <h1 className="text-2xl text-white">
                            {FormatSaveCount(total_reads)}{" "}
                            <span className="text-xl text-white/70">Reads</span>
                          </h1>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div>
                <About social_links={social_links} joinedAt={joinedAt} />
              </div>
            </div>

            <div className="my-8 flex gap-3 overflow-x-hidden">
              {postNotFound ? (
                ""
              ) : (
                <button
                  onClick={() => handleTabClick("published")}
                  className={`capitalize px-4 py-2 rounded-2xl duration-300 ${
                    filter === "published"
                      ? "bg-white text-black hover:bg-white/80"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  Published
                </button>
              )}

              <button
                onClick={() => handleTabClick("studystack")}
                className={`capitalize px-4 py-2 rounded-2xl duration-300 ${
                  filter === "studystack"
                    ? "bg-white text-black hover:bg-white/80"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                Studystack
              </button>
            </div>

            <div className="mx-auto max-w-full lg:max-w-full mt-12">
              <div className="grid grid-cols-1 moblieLg:grid-cols-2 gap-x-0 moblieLg:gap-x-4 gap-5 xsm:gap-y-4 sm:gap-y-5 md:gap-y-12 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {filter === "published" ? (
                  postNotFound ? (
                    ""
                  ) : posts == null ? (
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
                  )
                ) : (
                  ""
                )}
                {filter === "studystack" ? (
                  notFound ? (
                    <NoDataMessage message="Study Break! Enjoy the quiet in your Studystack. 😊📚" />
                  ) : studyStack == null ? (
                    <Loader />
                  ) : studyStack.length ? (
                    <div className="mx-auto w-[95vw] lg:w-[95vw]">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-0 moblieLg:gap-x-4 gap-5 xsm:gap-y-4 sm:gap-y-5">
                        {studyStack.map((stack, i) => (
                          <motion.div key={i}>
                            <StudyStackCard
                              stackId={stack.stack_id}
                              username={profile_username}
                              description={stack.description}
                              title={stack.title}
                              postBanner={stack.posts[0].banner}
                              postBanner2={
                                stack.posts.length >= 2
                                  ? stack.posts[1].banner
                                  : ""
                              }
                              postBanner3={
                                stack.posts.length >= 3
                                  ? stack.posts[2].banner
                                  : ""
                              }
                              postBanner4={
                                stack.posts.length >= 4
                                  ? stack.posts[3].banner
                                  : ""
                              }
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <NoDataMessage message="No Stacks Found" />
                  )
                ) : (
                  ""
                )}
              </div>
            </div>

            {filter === "published" && (
              <LoadMoreButton state={posts} fetchDataFun={getPosts} />
            )}
          </section>
        </>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default ProfilePage;
