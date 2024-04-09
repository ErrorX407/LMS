import React, { useEffect, useState } from "react";
import { motion, stagger } from "framer-motion";
import axios from "axios";
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Ambient from "../components/Ambient";
import { FilterPaginationData } from "../common/FilterPaginationData";
import NoDataMessage from "../components/NoDataMessage";
import LoadMoreButton from "../components/LoadMoreButton";
import PostAmbient from "../components/PostAmbient";

const Solutions = () => {
  const [latestPosts, setLatestPosts] = useState(null);
  const [bannerImage, setBannerImage] = useState("");

  const fetchPostsByCategory = ({ page = 1 }) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/post/category", {
        category: "solutions",
        page,
      })
      .then(async ({ data }) => {
        let formatedData = await FilterPaginationData({
          state: latestPosts,
          data: data.posts,
          page,
          countRoute: "/api/v1/post/category/count",
          totalDocs: data.totalDocs,
          data_to_send: { category: "solutions" },
        });
        setLatestPosts(formatedData);
        setBannerImage(formatedData.results[0].banner);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data.Error);
        return toast.error(err.response.data.Error);
      });
  };

  useEffect(() => {
    fetchPostsByCategory({ page: 1 });
  }, []);
  return (
    <>
      {latestPosts === null ? (
        <PostAmbient banner="https://i.pinimg.com/236x/e0/cf/ea/e0cfea4de80536ea17ac7da0fc5f0bb1.jpg" />
      ) : (
        <PostAmbient banner={bannerImage} />
      )}
      <div className="px-10">
        <h1 className="font-candela text-3xl">Solutions</h1>
        <div className="post-container my-3 w-full flex gap-5 flex-wrap rounded-2xl">
          <>
            {latestPosts === null ? (
              <Loader />
            ) : latestPosts.results.length ? (
              latestPosts.results.map((post, i) => {
                return (
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
                );
              })
            ) : (
              <NoDataMessage message="No Posts Found" />
            )}
          </>
        </div>

        <LoadMoreButton
          state={latestPosts}
          fetchDataFun={fetchPostsByCategory}
        />
      </div>
    </>
  );
};

export default Solutions;
