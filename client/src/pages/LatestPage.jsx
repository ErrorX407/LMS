import React, { Suspense, useEffect, useState } from "react";
import { motion, stagger } from "framer-motion";
import {toast} from "react-toastify"
import axios from "axios";
import Loader from "../components/Loader";
import { FilterPaginationData } from "../common/FilterPaginationData";
import NoDataMessage from "../components/NoDataMessage";
import LoadMoreButton from "../components/LoadMoreButton";
import PostAmbient from "../components/PostAmbient";

const PostCard = React.lazy(() => import("../components/PostCard"));

const Latest = () => {
  const [latestPosts, setLatestPosts] = useState(null);
  const [pageState, setPageState] = useState("latest");
  const [errorMessage, setErrorMessage] = useState("");
  const [bannerImage, setBannerImage] = useState("");

  const fetchLatestPosts = ({ page = 1, maxLimit = 15 }) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/post/latest", {
        page,
        maxLimit,
      })
      .then(async ({ data }) => {
        console.log(data); // Log the response data
        let formatedData = await FilterPaginationData({
          state: latestPosts,
          data: data.posts,
          page,
          countRoute: "/api/v1/post/latest/count",
        });
        setLatestPosts(formatedData);
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
          state: latestPosts,
          data: data.posts,
          page,
          countRoute: "/api/v1/post/category/count",
          totalDocs: data.totalDocs,
          data_to_send: { category: pageState },
        });
        setLatestPosts(formatedData);
        // console.log(data.posts.length);
        console.log(formatedData);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data.Error)
        return toast.error(err.response.data.Error)
      });
  };

  useEffect(() => {
    if (pageState == "latest") {
      fetchLatestPosts({ page: 1 });
    } else {
      fetchPostsByCategory({ page: 1 });
    }
  }, [pageState]);

  let categories = ["news", "notes", "pyqs", "solutions"];

  const loadPostByCategory = (e) => {
    let category = e.target.value;
    if (pageState == category) {
      setLatestPosts(null);
      setPageState("latest");
      return;
    }
    else{
      setPageState(category);
      setLatestPosts(null);
    }
  };
  return (
    <>
      {
        latestPosts === null ? <PostAmbient banner="https://i.pinimg.com/236x/17/5c/91/175c9122f658873799ead326000e9ee5.jpg" />
        : <PostAmbient banner={bannerImage} />
      }
      <div className="px-10">
        <h1 className="font-candela text-3xl">Latest Posts</h1>
        <div className="my-8 flex gap-3">
          <div className="w-[100%] flex justify-start items-center gap-4 mx-auto">
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
            {latestPosts == null ? (
              <Loader />
            ) : latestPosts.results.length ? (
                latestPosts.results.map((post, i) => {
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
              <NoDataMessage message="No Posts Found" />
            )}
          </>
        </div>

        <LoadMoreButton
          state={latestPosts}
          fetchDataFun={
            pageState == "latest" ? fetchLatestPosts : fetchPostsByCategory
          }
        />
      </div>
    </>
  );
};

export default Latest;
