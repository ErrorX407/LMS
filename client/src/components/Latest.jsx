import React, { useEffect, useState } from "react";
import { motion, stagger } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import PostCard from "./PostCard";

const Latest = () => {
  const [posts, setPosts] = useState(null);
  const fetchLatestPosts = ({maxLimit=6}) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/post/latest", {maxLimit})
      .then(({ data }) => {
        setPosts(data.posts);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchLatestPosts({maxLimit: 6});
  }, []);
  return (
    <div className="mb-8 ">
      <div className="top flex justify-between items-center">
        <h1 className="font-candela text-3xl">Latest</h1>
        <Link
          to="/latest"
          className=" text-white/50 underline-offset-2 hover:text-white hover:underline"
        >
          Show all
        </Link>
      </div>
      <div className="post-container my-3 w-full flex gap-5 overflow-x-auto overflow-y-hidden rounded-2xl">
        <>
          {posts == null ? (
            <Loader />
          ) : (
            posts.map((post, i) => {
              return (
                <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
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
                    category = {post.category}
                  />
                </motion.div>
              );
            })
          )}
        </>
      </div>
    </div>
  );
};

export default Latest;
