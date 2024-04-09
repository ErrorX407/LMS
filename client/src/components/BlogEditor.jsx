import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import EditorJS from "@editorjs/editorjs";
import axios from "axios"

import defaultBanner from "../imgs/blog banner.png";
import Logo from "../imgs/logo.webp"
import { uploadImage } from "../common/aws";
import { EditorContext } from "../pages/Editor";
import { tools } from "./Tools";
import { UserContext } from "../App";
import PostAmbient from "./PostAmbient";

const BlogEditor = () => {
  const {post, post: {title, banner, content, tags}, setPost, textEditor, setTextEditor, setEditorState} = useContext(EditorContext);
  const { userAuth: {access_token} } = useContext(UserContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (!textEditor.isReady) {
      setTextEditor(new EditorJS({
        holderId: "textEditor",
        data: content,
        tools: tools,
        placeholder: "Hey, let's give something truly awesome and special together!"
      }));
    }
  },[])

  const handleBannerUpload = (e) => {
    e.preventDefault();
    const img = e.target.files[0];
    if (img) {
      let loadingToast = toast.loading(
        "Hang tight! 🌟 Uploading... your image 📷 It'll just be a moment! 🎉"
      );
      uploadImage(img)
        .then((url) => {
          if (url) {
            toast.dismiss(loadingToast);
            // materialBannerRef.current.src = url;
            setPost({...post, banner: url});
            toast.success("Great job! 🌟 Image uploaded successfully! 🖼️");
          }
        })
        .catch((err) => {
          toast.dismiss(loadingToast);
          return toast.error(err.message);
        });
    }
  };

  const onTitleKeyDown = (e) => {
    if (e.keyCode == "13" || e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleTitleChange = (e) => {
    let input = e.target;

    input.style.height = "fit-content";
    input.style.height = `${input.scrollHeight}px`;

    setPost({...post, title: input.value});
  };

  const handleBannerError = (e) => {
    let img = e.target;
    img.src = defaultBanner;
  }

  const handlePublishEvent = () =>{
    if (!banner.length) {
      return toast.error("Upload a banner to publish it")
    }
    if (!title || title.length === 0 || title === "") {
      return toast.error("Whoops! Looks like you missed the title for your Post! 📝");
    }
    if (textEditor.isReady) {
      textEditor.save().then(data => {
        if (data.blocks.length) {
          setPost({...post, content: data});
          setEditorState("publish")
        }else{
          return toast.error("Write something to publish your post")
        }
      })
       .catch((err) => {
          return toast.error(err.message);
        });
    }
  }

  const handleSaveDraft = (e) => {
    if (e.target.className.includes("disable")) {
      return;
    }
    if (!title.length) {
      return toast.error("You must provide a title to save a post in draft.");
    }

    let loadingToast = toast.loading("Publishing...");
    e.target.classList.add("disable");

    if (textEditor.isReady) {
      textEditor.save().then(content => {
        let postObj = {
          title,
          banner,
          content,
          category,
          tags,
          draft: true,
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
          toast.success("Saved To Draft 👍 Redirecting to homepage.... 🫡 ")
    
          setTimeout(() => {
            navigate("/");
          }, 3500)
        })
        .catch(({response}) => {
          e.target.classList.remove("disable");
          toast.dismiss(loadingToast)
          return toast.error(response.data.Error)
        })
      })
    }


  }

  return (
    <div>
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
      <PostAmbient banner={banner ? banner : defaultBanner} />
      <nav className="navbar px-10">
        <Link to="/">
        <div className="flex justify-center items-center gap-4">
          <img src={Logo} alt="logo" className="w-[30px] h-[30px]" />
          <div className="logo">Blogspace</div>
          </div>
        </Link>
        <div className="right flex justify-center items-center gap-5">
          <button className="px-4 py-3 rounded-2xl bg-p bg bg-purple text-black text-xl font-semibold mouseenter" onClick={handlePublishEvent}>
            Publish
          </button>
          <button className="px-4 py-3 rounded-2xl bg-white/10 text-xl font-semibold mouseenter" onClick={handleSaveDraft}>
            Save Draft
          </button>
        </div>

        <div className="absolute bg-white top-0 left-0"></div>
      </nav>

      <motion.div className="editor max-w-[900px] center py-4 max-lg:px-[5vw]">
        <div className="mr-auto max-w-[100%]">
          <textarea
            name="title"
            defaultValue={title}
            rows="1"
            placeholder="Add a delightful title here! ✨"
            className="title font-candela w-full h-fit text-purple my-7 leading-tight bg-transparent resize-none outline-none  focus:placeholder:text-purple text-[4vw] mb-7 line-clamp-2 hover:line-clamp-none"
            onKeyDown={onTitleKeyDown}
            onChange={handleTitleChange}
          />
          <div className="aspect-video rounded-2xl overflow-hidden cursor-pointer hover:opacity-80">
            <div className="relative w-full h-full bg-white/10 backdrop-blur-lg">
              <label htmlFor="uploadBanner">
                <img
                  src={banner}
                  alt=""
                  onError={handleBannerError}
                  className="w-full h-full object-cover z-20"
                />
                <input
                  name="banner"
                  id="uploadBanner"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  onChange={handleBannerUpload}
                />
              </label>
            </div>
          </div>

          <div id="textEditor" className="font-messinaReg my-7"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogEditor;
