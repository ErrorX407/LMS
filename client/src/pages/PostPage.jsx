import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import Loader from "../components/Loader";
import { getFullDate } from "../common/Date";
import PostAmbient from "../components/PostAmbient";
import PostInteraction from "../components/PostInteraction";
import PostContent from "../components/PostContent";
import CommentsContainer, {
  fetchComments,
} from "../components/CommentsContainer";
import { UserContext } from "../App";
import PostStudyStackCard from "../components/PostStudyStackCard";

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
  let studyStackForm = useRef();
  const {
    userAuth: { access_token, username },
  } = useContext(UserContext);
  const [postId, setPostId] = useState(null);
  const [post, setPost] = useState(postStructure);
  const [save, setSave] = useState(false);
  const [saveIcon, setSaveIcon] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false); // State to manage dialog visibility
  const [isLikedByUser, setLikedByUser] = useState(false);
  const [commentWrapper, setCommentWrapper] = useState(true);
  const [totalParentCommentsLoaded, setTotalParentCommentsLoaded] = useState(0);
  const [studyStack, setStudyStack] = useState([]);

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
        post.comments = await fetchComments({
          post_id: post._id,
          setParentCommentCountFun: setTotalParentCommentsLoaded,
        });
        console.log(post);
        setPostId(post._id);
        setPost(post);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const resetStates = () => {
    setStudyStack([]);
    setPost(postStructure);
    setPostId(null);
    setLoading(true);
    setLikedByUser(false);
    setCommentWrapper(false);
    setTotalParentCommentsLoaded(0);
  };

  useEffect(() => {
    resetStates();
    handleStudyStackClick();
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

  const handleSave = () => {
    if (!access_token) {
      return toast.error("Login to create Studystack");
    }
    setSave((preVal) => !preVal);
  };

  const handleAddNewStack = (e) => {
    setStudyStack([]);
  };

  const createStudyStack = (e) => {
    e.preventDefault();
    setLoading(true);

    let form = new FormData(studyStackForm.current);
    let formData = { post_id: postId, username };

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    let { title, description } = formData;

    if (!title || title === "") {
      return toast.error("Title is required!!");
    }

    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN +
          "/api/v1/post/ineraction/studystack/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(({ data }) => {
        console.log(data);
        setLoading(false);
        setSave(true);
        setSaveIcon(true);
        return toast.success("StudyStack created successfully");
      })
      .catch(({ response }) => {
        setLoading(false);
        setSaveIcon(false);
        console.log(response.data.Error);
        return toast.error(response.data.Error);
      });
  };

  const handleStudyStackClick = (e) => {
    // e.preventDefault();
    // setFilter(e.target.value);

    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN +
          "/api/v1/post/ineraction/studystack/get",
        { profile_username: username }
      )
      .then(({ data }) => {
        setStudyStack(data.studyStack);
        // e.target.setAttribute("disabled", "true");
        console.log(data.studyStack);
      })
      .catch(({ response }) => {
        console.log(response);
        e.target.removeAttribute("disabled");
      });
  };

  // Render only when post is not null
  return (
    <>
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
            <h1 className="w-full text-[32px] xsm:text-[40px] md:text-[60px] lg:[5vw] mb-7 leading-[1.15] font-candela line-clamp-2 hover:line-clamp-none cursor-default">
              {" "}
              {title}{" "}
            </h1>
            <div className="flex justify-between items-center my-8 mb-8">
              <div className="flex gap-3 xsm:gap-5 items-center justify-center">
                <img
                  src={profile_img}
                  alt=""
                  className="w-10 h-10 xsm:w-12 xsm:h-12 rounded-xl"
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
              <div className="flex justify-center items-center gap-3">
                <p className="text-white/60 mt-2 max-sm:ml-12">
                  {getFullDate(publishedAt)}
                </p>
                <button
                  className="mt-2 p-3 rounded-full hover:bg-white/10"
                  onClick={handleSave}
                >
                  {" "}
                  <i
                    className={`fi fi-${
                      saveIcon ? "sr" : "rr"
                    }-bookmark text-2xl flex justify-center items-center`}
                  ></i>{" "}
                </button>
              </div>
            </div>

            {save ? (
              studyStack.length == 0 ? (
                <div className="w-full">
                  <h1 className="px-4 py-2 h-16 flex justify-center items-center bg-white/10 mb-4 rounded-xl md:rounded-2xl text-xl md:text-2xl">
                    Create new studystack
                  </h1>
                  <form ref={studyStackForm} className="w-full mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-4">
                      <input
                        name="title"
                        type="text"
                        placeholder="Name of the Studystack"
                        className="bg-transparent p-4 text-xl md:text-2xl border-[3px] border-white/20 rounded-2xl outline-none hover:border-white/30 focus:border-white/50"
                      />
                      <input
                        name="description"
                        type="text"
                        placeholder="Description"
                        className="bg-transparent p-4 text-xl md:text-2xl border-[3px] border-white/20 rounded-2xl outline-none hover:border-white/30 focus:border-white/50"
                      />
                    </div>
                    <button
                      onClick={createStudyStack}
                      type="submit"
                      className="w-full mt-4 px-4 py-2 h-16 flex justify-center items-center text-black bg-white mb-4 rounded-xl md:rounded-2xl text-xl md:text-2xl hover:bg-white/70 active:scale-95"
                    >
                      Create Studystack
                    </button>
                  </form>
                </div>
              ) : (
                <div>
                  <div className="w-full mb-4 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                    {studyStack.map((stack, index) => {
                      return (
                        <motion.div
                          key={index}
                          initial={{
                            opacity: 0,
                            transform: "translateY(50px)",
                          }}
                          animate={{ opacity: 1, transform: "translateY(0px)" }}
                          transition={{
                            delay: 0.1 * index,
                            duration: 2,
                            ease: [0, 0.71, 0.2, 1.01],
                          }}
                        >
                          <PostStudyStackCard
                            postId={postId}
                            stackId={stack.stack_id}
                            title={stack.title}
                            postBanner={stack.posts[0].banner}
                            postBanner2={
                              stack.posts.length >= 2
                                ? stack.posts[1].banner
                                : ""
                            }
                            postBanner3={
                              stack.posts.length >= 3
                                ? stack.posts[2].banner
                                : ""
                            }
                            postBanner4={
                              stack.posts.length >= 4
                                ? stack.posts[3].banner
                                : ""
                            }
                          />
                        </motion.div>
                      );
                    })}
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      duration: 0.3,
                      ease: [0, 0.71, 0.2, 1.01],
                      scale: {
                        type: "spring",
                        damping: 8,
                        stiffness: 100,
                        restDelta: 0.001,
                      },
                    }}
                    onClick={handleAddNewStack}
                    className="w-full mt-4 px-4 py-2 h-16 flex justify-center items-center text-black bg-white mb-8 rounded-xl md:rounded-2xl text-xl md:text-2xl hover:bg-white/70 active:scale-95"
                  >
                    Add a new studystack
                  </motion.button>
                </div>
              )
            ) : (
              ""
            )}

            <img src={banner} alt="" className="aspect-video rounded-2xl" />

            {/* Share Dialog Box */}
            <div
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-md z-[1000] flex justify-center items-center"
              style={{ display: showDialog ? "block" : "none" }}
            >
              <div className="relative w-full xsm:w-[90%] lg:w-1/2 md:w-1/2 backdrop-blur-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 px-10 py-8 rounded-3xl">
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

            <div className="xsm:my-8 blog-page-content">
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
