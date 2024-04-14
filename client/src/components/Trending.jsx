import React, { useEffect, useState, useCallback, Suspense } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import PostAmbient from "./PostAmbient";

const PostCard = React.lazy(() => import("./PostCard"));

const Trending = () => {
  const [trendingPosts, setTrendingPosts] = useState(null);
  const [bannerImage, setBannerImage] = useState("");

  const fetchTrendingPosts = useCallback(async ({ maxLimit = 8 }) => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/post/trending`, { maxLimit });
      setTrendingPosts(data.posts);
      setBannerImage(data.posts[0].banner);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchTrendingPosts({ maxLimit: 8 });
  }, [fetchTrendingPosts]);

  return (
    <>
      <PostAmbient banner={trendingPosts ? bannerImage : "https://in.pinterest.com/pin/567312884325534810/"} />
      <div className="mb-8 -mt-3">
        <div className="top flex justify-between items-center">
          <h1 className="font-candela text-3xl">Trending</h1>
          <Link to="/trending" className="text-white/50 underline-offset-2 hover:text-white hover:underline">Show all</Link>
        </div>
        <div className="post-container my-3 flex gap-5 overflow-x-auto overflow-y-hidden rounded-2xl">
          <>
            {trendingPosts ? (
              trendingPosts.map((post, i) => (
                <Suspense fallback={<Loader />} key={i}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 * i, duration: 2, ease: [0, 0.71, 0.2, 1.01] }}
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
              ))
            ) : (
              <Loader />
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default Trending;