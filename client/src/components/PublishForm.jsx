import React, { useContext } from "react";
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../App";
import { EditorContext } from "../pages/Editor";
import Tag from "./Tag";
import axios from "axios";

const PublishForm = () => {
  let tagLimit = 10;

  let {
    post: { category, banner, title, tags, content },
    setEditorState,
    setPost,
    post,
  } = useContext(EditorContext);

  const {
    userAuth: { access_token, profile_img, fullName },
  } = useContext(UserContext);

  const navigate = useNavigate();

  const handleCloseEvent = () => {
    setEditorState("editor");
  };

  const handlePostTitleChange = (e) => {
    let input = e.target;
    setPost({ ...post, title: input.value });
  };

  const handleTagKeyDown = (e) => {
    if (e.keyCode == 13 || e.keyCode == 188) {
      e.preventDefault();
      let tag = e.target.value;
      if (tags.length < tagLimit) {
        if (!tags.includes(tag) && tag.length) {
          setPost({ ...post, tags: [...tags, tag] });
        } else if (!tag.length) {
          toast.error("Enter tag you want to add");
        } else if (tags.includes(tag)) {
          toast.error("Tag is already been added");
        }
      } else {
        toast.error("You can't add more than 10 tags");
      }
      e.target.value = "";
    }
  };

  const publishBlog = (e) => {
    if (e.target.className.includes("disable")) {
      return;
    }
    if (!title.length) {
      return toast.error("You must provide a title to publish a post.");
    }
    if (!category.length) {
      return toast.error("You must provide a category to publish a post.");
    }
    if (!tags.length) {
      return toast.error(
        "You must provide at least one tag to publish a post."
      );
    }

    let loadingToast = toast.loading("Publishing...");
    e.target.classList.add("disable");

    let postObj = {
      title,
      banner,
      content,
      category,
      tags,
      draft: false,
    };

    axios.post(
      import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/post/create",
      postObj,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    ).then(() => {
      e.target.classList.remove("disable");
      toast.dismiss(loadingToast)
      toast.success("Post Published 👍 Redirecting to homepage.... 🫡 ")

      setTimeout(() => {
        navigate("/");
      }, 3500)
    })
    .catch(({response}) => {
      e.target.classList.remove("disable");
      toast.dismiss(loadingToast)
      return toast.error(response.data.Error)
    })
  };
  return (
    <>
      <ToastContainer
        stacked
        toastStyle={{
          backgroundColor: "#ffffff17",
          backdropFilter: "blur(20px)",
          width: '400px'
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

      <section className="w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-8">
        <button
          className="absolute right-[5vw] z-10 top-[5%] lg:top-[7%]"
          onClick={handleCloseEvent}
        >
          <img
            className="w-[50px]"
            src="https://img.icons8.com/3d-fluency/94/close-window.png"
            alt="close-window"
          />
        </button>

        <div>
          <p className="font-candela w-[100%] text-[32px] h-fit text-white mt-10 mb-3 leading-tigh ">
            Preview
          </p>

          <div className="rounded-3xl overflow-hidden">
            <img src={banner} alt="" />
          </div>

          <h1 className="text-[2vw] mt-3 w-full line-clamp-2 text-ellipsis leading-tight">
            {title}
          </h1>
        </div>

        <div>
          <p className="font-candela w-[100%] text-[32px] h-fit text-white mt-10 mb-3 leading-tigh ">
            Publish Your Post
          </p>

          <div className="mb-5 w-full h-16 p-4 bg-purple/30 outline-none rounded-2xl hover:bg-purple hover:text-black">
            <div className="flex items-center">
              <img
                className="w-[28px] h-[28px] rounded-2xl cursor-pointer overflow-hidden"
                src={profile_img}
                alt=""
              />
              <div className="ml-3">
                <p className="text-2xl leading-tight capitalize font-semibold cursor-default">
                  {fullName}
                </p>
              </div>
            </div>
          </div>

          <input
            required
            name="title"
            type="text"
            placeholder="Post Title"
            defaultValue={title}
            className="mb-5 w-full h-16 p-4 bg-transparent border-2 border-purple/30 text-2xl outline-none rounded-2xl focus:border-purple focus:text-purple active:border-purple active:text-purple"
            onChange={handlePostTitleChange}
          />
          <input
            required
            name="category"
            type="text"
            placeholder="Categorty (Ex: Notes, Solution etc)"
            className="mb-5 w-full h-16 p-4 bg-transparent border-2 border-purple/30 text-2xl outline-none rounded-2xl focus:border-purple focus:text-purple active:border-purple active:text-purple"
            onChange={(e) => setPost({ ...post, category: e.target.value })}
          />

          <div className="relative">
            <input
              type="text"
              name="tags"
              placeholder={`${tagLimit - tags.length} tags left`}
              className="sticky mb-5 w-full h-16 p-4 bg-transparent border-2 border-purple/30 text-2xl outline-none rounded-2xl focus:border-purple focus:text-purple active:border-purple active:text-purple"
              onKeyDown={handleTagKeyDown}
            />
            {tags.map((tag, i) => {
              return <Tag tag={tag} key={i} />;
            })}
          </div>

          <button
            className="w-full py-3 rounded-2xl bg-p bg bg-purple text-black text-xl font-semibold mouseenter"
            onClick={publishBlog}
          >
            Publish
          </button>
        </div>
      </section>
    </>
  );
};

export default PublishForm;
