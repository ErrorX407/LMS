import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Ambient from "../components/Ambient";
import { motion } from "framer-motion";
import axios from "axios";
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";
import NoDataMessage from "../components/NoDataMessage";
import { FilterPaginationData } from "../common/FilterPaginationData";
import LoadMoreButton from "../components/LoadMoreButton";

const TrendingPage = () => {
  const [trendingPosts, setTrendingPosts] = useState(null);
  const [pageState, setPageState] = useState("trending");
  const fetchTrendingPosts = ({ page = 1, maxLimit = 15 }) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/post/trending", {
        page,
        maxLimit,
      })
      .then(async ({ data }) => {
        let formatedData = await FilterPaginationData({
          state: trendingPosts,
          data: data.posts,
          page,
          countRoute: "/api/v1/post/trending/count",
        });
        setTrendingPosts(formatedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchPostsByCategory = ({ page = 1 }) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/post/category", {
        category: pageState,
        page,
      })
      .then(async ({ data }) => {
        let formatedData = await FilterPaginationData({
          state: trendingPosts,
          data: data.posts,
          page,
          countRoute: "/api/v1/post/trending/count",
          data_to_send: { category: pageState },
        });
        setTrendingPosts(formatedData);
      });
  };

  useEffect(() => {
    if (pageState == "trending") {
      fetchTrendingPosts({ page: 1 });
    } else {
      fetchPostsByCategory({ page: 1 });
    }
  }, [pageState]);

  let categories = ["news", "notes", "pyqs", "solutions"];

  const loadPostByCategory = (e) => {
    let category = e.target.value;
    if (pageState == category) {
      setPageState("trending");
      return;
    }
    setPageState(category);
    setTrendingPosts(null);
  };
  return (
    <>
      <Ambient />
      <div className="px-10">
        <h1 className="font-candela text-3xl">Trending</h1>
      <div>
        <div className="my-8 flex gap-3">
          {categories.map((category, index) => {
            return (
              <button
                value={category}
                onClick={loadPostByCategory}
                key={index}
                className={"capitalize px-4 py-2 rounded-2xl duration-300"  + (pageState == category ? " bg-purple text-black hover:bg-purple/80" : " bg-white/10 hover:bg-white/20 ")}
              >
                {category == "pyqs" ? "Pyq's" : category}
              </button>
            );
          })}
        </div>
      </div>
        <div className="post-container my-3 w-full flex gap-5 flex-wrap rounded-2xl">
          <>
            {trendingPosts == null ? (
              <Loader />
            ) : trendingPosts.results.length ? (
              trendingPosts.results.map((post, i) => {
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
              <NoDataMessage message="No Post Found" />
            )}
          </>
        </div>
        <LoadMoreButton
          state={trendingPosts}
          fetchDataFun={(pageState == "trending" ? fetchTrendingPosts : fetchPostsByCategory)}
        />
      </div>
    </>
  );
};

export default TrendingPage;
