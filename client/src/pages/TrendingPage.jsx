import React, { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Loader from "../components/Loader";
import NoDataMessage from "../components/NoDataMessage";
import { FilterPaginationData } from "../common/FilterPaginationData";
import LoadMoreButton from "../components/LoadMoreButton";
import PostAmbient from "../components/PostAmbient";

const PostCard = React.lazy(() => import("../components/PostCard"));

const TrendingPage = () => {
  const [trendingPosts, setTrendingPosts] = useState(null);
  const [pageState, setPageState] = useState("trending");
  const [bannerImage, setBannerImage] = useState("");

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
        setBannerImage(formatedData.results[0].banner);
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
      setTrendingPosts(null);
      setPageState("trending");
      return;
    } else {
      setPageState(category);
      setTrendingPosts(null);
    }
  };
  return (
    <>
      {trendingPosts === null ? (
        <PostAmbient banner="https://i.pinimg.com/564x/e4/19/e8/e419e83e9015cdd066c4bb592371d77d.jpg" />
      ) : (
        <PostAmbient banner={bannerImage} />
      )}
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
                  className={
                    "capitalize px-4 py-2 rounded-2xl duration-300" +
                    (pageState == category
                      ? " bg-purple text-black hover:bg-purple/80"
                      : " bg-white/10 hover:bg-white/20 ")
                  }
                >
                  {category == "pyqs" ? "Pyq's" : category}
                </button>
              );
            })}
          </div>
        </div>
        <div className="post-container mt-6 my-3 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 rounded-2xl">
          <>
            {trendingPosts == null ? (
              <Loader />
            ) : trendingPosts.results.length ? (
              trendingPosts.results.map((post, i) => {
                return (
                  <Suspense fallback={<p>This is loading...</p>}>
                    <motion.div
                      initial={{ opacity: 0, transform: "translateY(50px)" }}
                      animate={{ opacity: 1, transform: "translateY(0px)" }}
                      transition={{
                        delay: 0.1 * i,
                        duration: 2,
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
                  </Suspense>
                );
              })
            ) : (
              <NoDataMessage message="No Post Found" />
            )}
          </>
        </div>
        <LoadMoreButton
          state={trendingPosts}
          fetchDataFun={
            pageState == "trending" ? fetchTrendingPosts : fetchPostsByCategory
          }
        />
      </div>
    </>
  );
};

export default TrendingPage;
