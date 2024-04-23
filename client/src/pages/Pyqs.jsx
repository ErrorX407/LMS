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
  const [errorMessage, setErrorMessage] = useState("");
  const [isPostError, setPostError] = useState(false);
  const [bannerImage, setBannerImage] = useState("");
  const [filter, setFilter] = useState("all");

  const filters = [
    "all",
    "class6",
    "class7",
    "class8",
    "class9",
    "class10",
    "class11",
    "class12",
  ];

  const fetchPostsByCategory = ({ page = 1 }) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/post/category", {
        category: "pyqs",
        page,
        filter,
      })
      .then(async ({ data }) => {
        let formatedData = await FilterPaginationData({
          state: latestPosts,
          data: data.posts,
          page,
          countRoute: "/api/v1/post/category/count",
          totalDocs: data.totalDocs,
          data_to_send: { category: "pyqs", filter },
        });
        setPostError(false);
        setLatestPosts(formatedData);
        setBannerImage(formatedData.results[0].banner);
      })
      .catch((err) => {
        setPostError(true);
        // console.log(err);
        setErrorMessage(err.response.data.Error);
        // return toast.error(err.response.data.Error);
      });
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);

    setLatestPosts(null);
  };

  useEffect(() => {
    fetchPostsByCategory({ page: 1 });
  }, [filter]);
  return (
    <>
      {latestPosts === null ? (
        <PostAmbient banner="https://i.pinimg.com/236x/06/52/63/0652638b3e4e19cab4fd5009b8c4bb7c.jpg" />
      ) : (
        <PostAmbient banner={bannerImage} />
      )}
      <div className="px-4 xsm:px-5 lg:px-10 md:px-8 mt-[50px] md:mt-0 lg:mt-0">
        <h1 className="font-candela text-3xl mb-4">Pyq's</h1>

        <div className="my-8 flex gap-3 overflow-x-auto">
          {filters.map((filterName, i) => {
            return (
              <button
                disabled={filter == filterName ? true : false}
                value={filterName}
                key={i}
                onClick={handleFilter}
                className={
                  "capitalize px-4 py-2 rounded-2xl duration-300" +
                  (filter == filterName
                    ? " bg-purple text-black hover:bg-purple/80"
                    : " bg-white/10 hover:bg-white/20 ")
                }
              >
                {filterName}
              </button>
            );
          })}
        </div>

        {isPostError ? (
          <NoDataMessage message="🔍 No Pyq's found! 😕" />
        ) : latestPosts == null ? (
          <Loader />
        ) : latestPosts.results.length ? (
          <div className="mx-auto max-w-full lg:max-w-full">
            <div className="grid grid-cols-1 moblieLg:grid-cols-2 gap-x-0 moblieLg:gap-x-4 gap-5 xsm:gap-y-4 sm:gap-y-5 md:gap-y-12 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {latestPosts.results.map((post, i) => (
                <Suspense key={i} fallback={<p>This is loading...</p>}>
                  <motion.div
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
                </Suspense>
              ))}
            </div>
          </div>
        ) : (
          <NoDataMessage message="No Posts Found" />
        )}

        <LoadMoreButton
          state={latestPosts}
          fetchDataFun={fetchPostsByCategory}
        />
      </div>
    </>
  );
};

export default Solutions;
