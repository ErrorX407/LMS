import React, { useEffect, useState, useCallback, Suspense } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

const ComponentCard = React.lazy(() => import("./ComponentCard"));

const Latest = () => {
  const [posts, setPosts] = useState(null);

  const fetchLatestPosts = useCallback(async ({ maxLimit = 8 }) => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/api/v1/post/latest`, { maxLimit });
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchLatestPosts({ maxLimit: 8 });
  }, [fetchLatestPosts]);

  return (
    <div className="mb-8 ">
      <div className="top flex justify-between items-center">
        <h1 className="font-candela text-3xl">Latest</h1>
        <Link to="/latest" className="text-white/50 underline-offset-2 hover:text-white hover:underline">Show all</Link>
      </div>
      <div className="post-container my-3 w-full flex gap-5 overflow-x-auto overflow-y-hidden rounded-2xl">
        <>
          {posts === null ? (
            <Loader />
          ) : (
            posts.map((post, i) => (
              <Suspense fallback={<Loader />} key={i}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 * i, duration: 2, ease: [0, 0.71, 0.2, 1.01] }}
                >
                  <ComponentCard
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
          )}
        </>
      </div>
    </div>
  );
};

export default Latest;