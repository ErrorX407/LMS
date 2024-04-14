import React, { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Loader from "../components/Loader";
import { FilterPaginationData } from "../common/FilterPaginationData";
import NoDataMessage from "../components/NoDataMessage";
import LoadMoreButton from "../components/LoadMoreButton";
import PostAmbient from "../components/PostAmbient";

const PostCard = React.lazy(() => import("../components/PostCard"));

const Solutions = () => {
  const [latestPosts, setLatestPosts] = useState(null);
  const [bannerImage, setBannerImage] = useState("");

  const fetchPostsByCategory = ({ page = 1 }) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/post/category", {
        category: "notes",
        page,
      })
      .then(async ({ data }) => {
        let formatedData = await FilterPaginationData({
          state: latestPosts,
          data: data.posts,
          page,
          countRoute: "/api/v1/post/category/count",
          totalDocs: data.totalDocs,
          data_to_send: { category: "notes" },
        });
        setLatestPosts(formatedData);
        setBannerImage(formatedData.results[0].banner);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data.Error)
        return toast.error(err.response.data.Error)
      });
  };

  useEffect(() => {
    fetchPostsByCategory({ page: 1 });
  }, []);
  return (
    <>
      {
        latestPosts === null ? <PostAmbient banner="https://i.pinimg.com/236x/17/5c/91/175c9122f658873799ead326000e9ee5.jpg" />
        : <PostAmbient banner={bannerImage} />
      }
      <div className="px-5 lg:px-10 md:px-8 mt-[50px] md:mt-0 lg:mt-0">
        <h1 className="font-candela text-3xl mb-4">Notes</h1>

        <div className="mx-auto max-w-full lg:max-w-full">
          <div className="grid grid-cols-2 gap-x-0 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
          </div>
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
