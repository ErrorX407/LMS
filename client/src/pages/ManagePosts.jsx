import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { UserContext } from "../App";
import { FilterPaginationData } from "../common/FilterPaginationData";
import NoDataMessage from "../components/NoDataMessage";
import Loader from "../components/Loader";
import ManagePostCard from "../components/ManagePostCard";

const ManagePosts = () => {
  const [posts, setPosts] = useState(null);
  const [drafts, setDrafts] = useState(null);
  const [query, setQuery] = useState("");

  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  const getPosts = ({ page, draft, deletedDocCount = 0 }) => {
    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/post/written",
        {
          page,
          draft,
          deletedDocCount,
          query,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(async ({ data }) => {
        let formatedData = await FilterPaginationData({
          state: draft ? drafts : posts,
          data,
          page,
          user: access_token,
          countRoute: "/api/v1/post/written/count",
          data_to_send: { draft, query },
        });

        console.log(formatedData);

        if (draft) {
          setDrafts(formatedData);
        } else {
          setPosts(formatedData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (access_token) {
      if (posts == null) {
        getPosts({ page: 1, draft: false });
      }
      if (drafts == null) {
        getPosts({ page: 1, draft: true });
      }
    }
  }, [access_token, posts, drafts, query]);

  const handleSearch = (e) => {
    let searchQuery = e.target.value;

    setQuery(searchQuery);

    if (e.keyCode == 13 && searchQuery.length) {
      setPosts(null);
      setDrafts(null);
    }
  };

  const handleChange = (e) => {
    if (!e.target.value.length) {
      setQuery("");
      setPosts(null);
      setDrafts(null);
    }
  };
  return (
    <div className="w-full">
      <h1 className="font-candela text-3xl mb-0 max-md:hidden">
        Manage Posts{" "}
      </h1>

      <div className="relative max-md:mt-5 md:mt-8 mb-10">
        <input
          type="search"
          placeholder="Search Posts...."
          onChange={handleChange}
          onKeyDown={handleSearch}
          className="w-[55%] text-[16px] bg-purple/10 p-4 pl-[3.3rem] pr-6 rounded-[1.2rem] border-purple/30 outline-none focus:bg-purple/20"
        />
        <i
          className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:
        left-5 top-1/2 -translate-y-1/2 text-xl"
        ></i>
        <button className="bg-purple text-black rounded-[1rem] w-[50px] h-[50px] absolute ml-3 top-1/2 -translate-y-1/2 hover:scale-95 active:scale-90">
          <i className="fi fi-rr-search text-2xl flex justify-center items-center m-3"></i>
        </button>
      </div>

      <div>
      {posts == null ? (
        <Loader />
      ) : posts.results.posts.length ?
        <div className="post-container mt-6 my-3 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 rounded-2xl">
        {
          posts.results.posts.map((post, i) => {
            return <motion.div
                    key={i}
                    initial={{ opacity: 0, transform: "translateY(50px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    transition={{
                      delay: 0.1 * i,
                      duration: 2,
                      ease: [0, 0.71, 0.2, 1.01],
                    }}
                  >
                    {
                      console.log(post)
                    }
                    <ManagePostCard post={post} />
                  </motion.div>
          })
        }
        </div>  
      : (
        <NoDataMessage message="No posts published yet" />
      )}
      </div>
    </div>
  );
};

export default ManagePosts;
