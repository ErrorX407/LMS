import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PostAmbient from "../components/PostAmbient";
import axios from "axios";
import { FilterPaginationData } from "../common/FilterPaginationData";
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";
import UserCard from "../components/UserCard";
import LoadMoreButton from "../components/LoadMoreButton";
import NoDataMessage from "../components/NoDataMessage";

const Search = () => {
  const [key, setKey] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  const [posts, setPosts] = useState(null);
  const [users, setUsers] = useState(null);
  const [isError, setError] = useState(false);
  const [isPostError, setPostError] = useState(false);
  const [isUserError, setUserError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userImage, setUserImage] = useState("");
  const [postImage, setPostImage] = useState("");

  const searchPosts = ({ page = 1, create_new_arr = false }) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/post/search", {
        query: key,
        page,
      })
      .then(async ({ data }) => {
        setError(false);
        let formatedData = await FilterPaginationData({
          state: posts,
          data: data.posts,
          page,
          countRoute: "/api/v1/post/latest/count",
          data_to_send: { query: key },
          create_new_arr,
        });
        setPosts(formatedData);
        setPostImage(formatedData.results[0].banner);
      })
      .catch((err) => {
        setPostError(true);
        setErrorMessage(err.response.data.message);
      });
  };

  const searchUsers = () => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/user/search", {
        query: key,
      })
      .then(({ data: { user } }) => {
        setUsers(user);
        setUserImage(user[0].personal_info.profile_img);
      })
      .catch((err) => {
        setUserError(true);
        console.log(err);
      });
  };

  const resetState = () => {
    setError(false);
    setPostError(false);
    setUserError(false);
    setPosts(null);
    setUsers(null);
  };
  useEffect(() => {
    resetState();
    if (key.trim() !== "") {
      searchPosts({ page: 1, create_new_arr: true });
      searchUsers();
    }
  }, [key]);

  const userImg = users && users.length > 0 ? userImage : null;
  const postImg = posts && posts.results.length > 0 ? postImage : null;

  return (
    <>
      <PostAmbient
        banner={
          userImg ||
          postImg ||
          "https://i.pinimg.com/236x/55/72/2f/55722f58e29ce8299db6cc525c346bf5.jpg"
        }
      />

      <div className="px-5 lg:px-10 md:px-8 mt-[50px] md:mt-0 lg:mt-0">
        <h1 className="font-candela text-3xl">Search</h1>
        <div className="relative max-md:mt-5 md:mt-4 mb-5 md:mb-10">
          <input
            value={key}
            onChange={(e) => setKey(e.target.value)}
            type="search"
            placeholder="Search Posts...."
            className="w-full md:w-1/2 text-[16px] bg-purple/10 p-4 pl-[3.3rem] pr-6 rounded-[1.2rem] border-purple/30 outline-none focus:bg-purple/20"
          />
          <i
            className="fi fi-rr-search absolute pointer-events-none right-[10%] md:pointer-events-none md:
        left-5 top-1/2 -translate-y-1/2 text-xl"
          ></i>
        </div>

        <div className="mx-auto max-w-full lg:max-w-full">
          <div className="grid grid-cols-2 gap-x-0 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {users && users.length > 0
              ? users.map((user, i) => (
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
                    <UserCard
                      fullName={user.personal_info.fullName}
                      username={user.personal_info.username}
                      profileImg={user.personal_info.profile_img}
                    />
                  </motion.div>
                ))
              : ""}
          </div>
        </div>

        {isPostError && isUserError ? (
          <NoDataMessage message={errorMessage} />
        ) : (
          <div className="mx-auto max-w-full lg:max-w-full mt-5">
            <div className="grid grid-cols-2 gap-x-0 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {posts && posts.results.length > 0
                ? posts.results.map((post, i) => {
                    // console.log(notifications.results.length);
                    return (
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
                    );
                  })
                : ""}
              <LoadMoreButton state={posts} fetchDataFun={searchPosts} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
