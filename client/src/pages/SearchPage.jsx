import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";
import { FilterPaginationData } from "../common/FilterPaginationData";
import LoadMoreButton from "../components/LoadMoreButton";
import UserCard from "../components/UserCard";

const SearchPage = () => {
  let { query } = useParams();
  const [posts, setPosts] = useState(null);
  const [users, setUsers] = useState(null);

  const searchPosts = ({ page = 1, create_new_arr = false }) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/post/search", {
        query,
        page,
      })
      .then(async ({ data }) => {
        let formatedData = await FilterPaginationData({
          state: posts,
          data: data.posts,
          page,
          countRoute: "/api/v1/post/latest/count",
          data_to_send: { query },
          create_new_arr,
        });
        setPosts(formatedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchUsers = () => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/user/search", {
        query,
      })
      .then(({ data: { users } }) => {
        setUsers(users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetState = () => {
    setPosts(null);
    setUsers(null);
  };

  useEffect(() => {
    resetState();
    searchPosts({ page: 1, create_new_arr: true });
    searchUsers();
  }, [query]);

  const UserCardWrapper = () => {
    return (
      <>
        {users == null ? (
          <Loader />
        ) : users.length ? (
          users.map((user, i) => {
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
                <UserCard
                  fullName={user.personal_info.fullName}
                  username={user.personal_info.username}
                  profileImg={user.personal_info.profile_img}
                />
              </motion.div>
            );
          })
        ) : (
          ""
          // <NoDataMessage message="No User Found !!" />
        )}
      </>
    );
  };
  return (
    <div>
      <div className="px-20">
        <div className="w-[100%] flex justify-start items-center gap-4 mx-auto">
          <button className="px-7 py-4 bg-white/10 rounded-2xl mouseenter">
            News
          </button>
          <button className="px-7 py-4 bg-white/10 rounded-2xl mouseenter">
            Notes
          </button>
          <button className="px-7 py-4 bg-white/10 rounded-2xl mouseenter">
            PYQ's
          </button>
          <button className="px-7 py-4 bg-white/10 rounded-2xl mouseenter">
            Solution
          </button>
          <button className="px-7 py-4 bg-white/10 rounded-2xl mouseenter">
            Users
          </button>
          <h1 className="bg-purple cursor-default w-fit p-4 rounded-2xl text-black font-semibold text-xl">
            Search result for "{query}"{" "}
          </h1>
        </div>
        <div className="mx-auto max-w-full lg:max-w-full">
          <div className="grid grid-cols-1 moblieLg:grid-cols-2 gap-x-0 moblieLg:gap-x-4 gap-5 xsm:gap-y-4 sm:gap-y-5 md:gap-y-12 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <UserCardWrapper />
          </div>
        </div>
        {posts == null ? (
          <Loader />
        ) : posts.results.length ? (
          <div className="mx-auto max-w-full lg:max-w-full">
            <div className="grid grid-cols-1 moblieLg:grid-cols-2 gap-x-0 moblieLg:gap-x-4 gap-5 xsm:gap-y-4 sm:gap-y-5 md:gap-y-12 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {posts.results.map((post, i) => {
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
              })}
            </div>
          </div>
        ) : (
          ""
        )}
        <LoadMoreButton state={posts} fetchDataFun={searchPosts} />
      </div>
    </div>
  );
};

export default SearchPage;
