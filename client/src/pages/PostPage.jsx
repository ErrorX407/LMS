import React, { createContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Loader from "../components/Loader";
import { getFullDate } from "../common/Date";
import PostAmbient from "../components/PostAmbient";
import PostInteraction from "../components/PostInteraction";
import PostContent from "../components/PostContent";
import CommentsContainer, { fetchComments } from "../components/CommentsContainer";

export const postStructure = {
  title: "",
  category: "",
  content: [],
  tags: [],
  author: { personal_info: {} },
  banner: "",
  publishedAt: "",
};

export const PostContext = createContext({});

const PostPage = () => {
  let { post_id } = useParams();
  const [post, setPost] = useState(postStructure);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false); // State to manage dialog visibility
  const [isLikedByUser, setLikedByUser] = useState(false);
  const [commentWrapper, setCommentWrapper] = useState(true);
  const [totalParentCommentsLoaded, setTotalParentCommentsLoaded] = useState(0);

  let {
    title,
    category,
    content,
    author: {
      personal_info: { fullName, username: author_username, profile_img },
    },
    banner,
    publishedAt,
  } = post;

  const fetchPost = () => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/post/get", {
        post_id,
      })
      .then(async ({ data: { post } }) => {
        post.comments = await fetchComments({ post_id: post._id, setParentCommentCountFun: setTotalParentCommentsLoaded})
        console.log(post);
        setPost(post);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const resetStates = () => {
    setPost(postStructure);
    setLoading(true);
    setLikedByUser(false);
    setCommentWrapper(false);
    setTotalParentCommentsLoaded(0);
  };

  useEffect(() => {
    resetStates();
    fetchPost();
  }, [post_id]);

  // Function to handle share button click
  const handleShareButtonClick = () => {
    setShowDialog(true); // Show the dialog when the share button is clicked
  };

  // Function to handle copy link button click
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Copied 🎉");
    setShowDialog(false); // Close the dialog after copying the link
  };

  // Render only when post is not null
  return (
    <>
      <ToastContainer
        stacked
        toastStyle={{
          backgroundColor: "#ffffff17",
          backdropFilter: "blur(20px)",
          fontSize: "20px",
        }}
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
        bodyClassName="toastBody"
      />
      {loading ? (
        <Loader />
      ) : (
        <PostContext.Provider
          value={{
            post,
            setPost,
            isLikedByUser,
            setLikedByUser,
            commentWrapper,
            setCommentWrapper,
            totalParentCommentsLoaded,
            setTotalParentCommentsLoaded,
          }}
        >
          <PostAmbient banner={banner} />
          <CommentsContainer />
          <div className="max-w-[900px] center py-4 max-lg:px-[5vw] mt-[30px] md:mt-0 lg:mt-0">
            <h1 className="w-full text-[40px] md:text-[60px] lg:[5vw] mb-7 leading-[1.15] font-candela line-clamp-2 hover:line-clamp-none cursor-default">
              {" "}
              {title}{" "}
            </h1>
            <div className="flex justify-between my-8">
              <div className="flex gap-5 items-center justify-center">
                <img
                  src={profile_img}
                  alt=""
                  className="w-12 h-12 rounded-xl"
                />
                <p className="font-messinaReg cursor-default">
                  {fullName} <br />
                  <Link
                    to={`/${author_username}`}
                    className="underline-offset-2 hover:underline"
                  >
                    @{author_username}
                  </Link>
                </p>
              </div>
              <p className="text-white/70 max-sm:mt-6 max-sm:ml-12 max-sm:pl-5">
                ● {getFullDate(publishedAt)}
              </p>
            </div>
            <img src={banner} alt="" className="aspect-video rounded-2xl" />

            {/* Share Dialog Box */}
            <div
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-md z-[1000] flex justify-center items-center"
              style={{ display: showDialog ? "block" : "none" }}
            >
              <div className="relative w-[90%] lg:w-1/2 md:w-1/2 backdrop-blur-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 px-10 py-8 rounded-3xl">
                <h1 className="font-candela text-[30px]">
                  Share This Post 🤗 With Your Friends 😉...
                </h1>
                <div className="flex justify-between items-center my-10">
                  <div
                    onClick={handleCopyLink}
                    className="mouseenter w-fit flex p-3 rounded-2xl justify-center items-center gap-2 cursor-pointer flex-col flex-wrap"
                  >
                    <img
                      src="https://img.icons8.com/3d-fluency/100/link.png"
                      alt="link"
                      className="w-[50px] md:w-[5vw] -hue-rotate-90"
                    />
                    <div className="like-count text-white md:text-[1.6vw] lg:text-[1.3vw]">
                      Copy Link
                    </div>
                  </div>
                  <Link
                    to={`https://twitter.com/intent/tweet?text=Read ${title}&url=${location.href}`}
                    className="mouseenter w-fit flex p-3 rounded-2xl justify-center items-center gap-2 cursor-pointer flex-col"
                    target="_blank"
                  >
                    <img
                      src="https://img.icons8.com/3d-fluency/188/twitter-circled.png"
                      alt="twitter-circled"
                      className="w-[50px] md:w-[5vw]"
                    />
                    <div className="like-count text-white md:text-[1.6vw] lg:text-[1.3vw]">
                      Twitter
                    </div>
                  </Link>
                  <a
                    href={`whatsapp://send?text=Read ${title} - ${window.location.href}`}
                    className="mouseenter w-fit flex p-3 rounded-2xl justify-center items-center gap-2 cursor-pointer flex-col"
                    // target="_blank"
                  >
                    <img
                      src="https://img.icons8.com/3d-fluency/188/whatsapp.png"
                      alt="whatsapp"
                      className="w-[50px] md:w-[5vw]"
                    />
                    <div className="like-count text-white md:text-[1.6vw] lg:text-[1.3vw]">
                      Whatsapp
                    </div>
                  </a>
                  <Link
                    to={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                    className="mouseenter w-fit flex p-3 rounded-2xl justify-center items-center gap-2 cursor-pointer flex-col"
                    target="_blank"
                  >
                    <img
                      src="https://img.icons8.com/3d-fluency/188/facebook-circled.png"
                      alt="facebook-circled"
                      className="w-[50px] md:w-[5vw]"
                    />
                    <div className="like-count text-white md:text-[1.6vw] lg:text-[1.3vw]">
                      Facebook
                    </div>
                  </Link>
                </div>
                <button
                  onClick={() => setShowDialog(false)}
                  className="w-full mouseenter mx-auto flex justify-center items-center gap-2 text-red text-xl font-semibold"
                >
                  Close{" "}
                  <i className="fi fi-br-cross text-[14px] text-red flex justify-center items-center"></i>
                </button>
              </div>
            </div>
            <PostInteraction onShareButtonClick={handleShareButtonClick} />

            {/* ==============Post Content============== */}

            <div className="my-8 blog-page-content">
              {content[0].blocks.map((block, i) => {
                return (
                  <div key={i} className="my-4 md:my-6">
                    <PostContent block={block} />
                  </div>
                );
              })}
            </div>

            <PostInteraction onShareButtonClick={handleShareButtonClick} />
          </div>
        </PostContext.Provider>
      )}
    </>
  );
};

export default PostPage;
