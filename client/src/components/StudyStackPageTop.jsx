import React, { useState, useRef, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import toast from "react-hot-toast";
import FormatSaveCount from "./FormatSaveCount";

const StudyStackPageTop = ({
  creatorUsername,
  creatorFullname,
  creatorProfileImg,
  stack_id,
  title,
  description,
  postBanner1,
}) => {
  const {
    userAuth: { access_token, username },
  } = useContext(UserContext);
  const [showFullDescription, setShowFullDescription] = useState(true);
  const [descriptionHeight, setDescriptionHeight] = useState(0);
  const [showEdit, setShowEdit] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saves, setSaves] = useState(0);
  const descriptionRef = useRef(null);
  const editRef = useRef(null);
  const stackTopContainerRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const descriptionElement = descriptionRef.current;
    const stackTopContainerElement = stackTopContainerRef.current;
    if (descriptionElement && stackTopContainerElement) {
      const { clientHeight } = descriptionElement;
      setDescriptionHeight(`${clientHeight}px`);
      console.log(`${clientHeight}px`);
    }
  }, [showFullDescription]);

  useEffect(() => {
    const descriptionElement = descriptionRef.current;
    if (descriptionElement) {
      // Calculate the height of the description element
      const { clientHeight, scrollHeight } = descriptionElement;
      if (scrollHeight > clientHeight) {
        setShowFullDescription(true);
      } else {
        setShowFullDescription(false);
      }
    }
  }, [description]);

  const handleReadMoreClick = () => {
    setShowFullDescription(true);
  };

  const handleShowLessClick = () => {
    setShowFullDescription(false);
  };

  const handleStackDelete = (e) => {
    const deleteButton = e.target;
    deleteButton.setAttribute("disabled", true);
    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/stack/delete/all",
        { stack_id, username: creatorUsername },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(({ data }) => {
        deleteButton.removeAttribute("disabled");
        setTimeout(() => {
          navigate(`/${creatorUsername}`);
        }, 1500);
        return toast.success(data.Message);
      })
      .catch(({ response }) => {
        deleteButton.removeAttribute("disabled");
        return toast.error(response.data.Error);
      });
  };

  const handleSave = (e) => {
    const saveButton = e.target;
    saveButton.setAttribute("disabled", true);
    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/stack/save",
        { stack_id, username },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(({ data }) => {
        saveButton.removeAttribute("disabled");
        setSaves(data.count);
        setSaved(true);
        return toast.success(data.Message);
      })
      .catch(({ response }) => {
        saveButton.removeAttribute("disabled");
        setSaved(false);
        return toast.error(response.data.Error);
      });
  };

  const fetchIsSaved = () => {
    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/stack/is-saved",
        { stack_id, username },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(({ data }) => {
        setSaved(data.saved);
      })
      .catch(({ response }) => {
        return toast.error(response.data.Error);
      });
  };

  const countSaves = () => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/stack/count/save", {
        stack_id,
      })
      .then(({ data }) => {
        setSaves(data.count);
      })
      .catch(({ response }) => {
        return toast.error(response.data.Error);
      });
  };

  const handleRemoveSave = (e) => {
    e.target.setAttribute("disabled", true);
    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/stack/remove/save",
        { stack_id, username },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(({ data }) => {
        setSaved(false);
        setSaves(data.count);
        e.target.removeAttribute("disabled");
        return toast.success(data.Message);
      })
      .catch(({ response }) => {
        e.target.removeAttribute("disabled");
        return toast.error(response.data.Error);
      });
  };

  const handleEditClick = () => {
    setShowEdit(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    let button = e.target;

    button.setAttribute("disabled", true);

    let form = new FormData(editRef.current);
    let formData = { stack_id };

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    let { title, description } = formData;

    console.log(formData);

    if (!title || title.trim() === "") {
      button.removeAttribute("disabled");
      return toast.error("Title is required ☠️ !!");
    }

    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/stack/edit",
        formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(({ data }) => {
        button.removeAttribute("disabled");
        return toast.success(data.Message);
      })
      .catch(({ response }) => {
        button.removeAttribute("disabled");
        return toast.error(response.data.Error);
      });
  };

  useEffect(() => {
    fetchIsSaved();
    countSaves();
  }, [stack_id]);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0,
          duration: 5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className={`stack-top-contaier relative mt-[-100px] w-full aspect-video overflow-hidden`}
        style={{ height: `calc(65vh + ${descriptionHeight})` }}
        ref={stackTopContainerRef}
      >
        <img
          src={postBanner1}
          alt=""
          className="stack-page-banner absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover aspect-video"
        />
        <div className="w-full h-1/6 bg-[linear-gradient(180deg,rgba(0,0,0,1),transparent)]">
          <div
            className={`absolute left-0 bottom-5 w-full h-fit px-0 lg:px-10 md:px-8 mt-[50px] max-md:mt-8 md:-mt-5 lg:-mt-5 flex justify-center md:justify-start items-center py-6 z-[2] bg-[linear-gradient(0deg,rgba(0,0,0,1),transparent)] flex-col md:flex-row gap-6`}
          >
            <div className="w-full md:max-w-[800px]">
              <h1 className="font-candela font-medium text-[34px] px-5 md:px-0">{title}</h1>
              <div className="px-5 md:px-0">
                <p
                  ref={descriptionRef}
                  className={`w-full md:w-[70%] text-[15px] ${
                    showFullDescription ? "line-clamp-none" : "line-clamp-2"
                  } mt-1`}
                  dangerouslySetInnerHTML={{
                    __html: description.replace(/\n/g, "<br>"),
                  }}
                >
                </p>
              {description && !showFullDescription && (
                <button
                  onClick={handleReadMoreClick}
                  className="text-white border-2 border-white/50 px-3 py-2 bg-transparent backdrop-blur-3xl rounded uppercase mt-2 duration-500 active:px-5"
                >
                  More
                </button>
              )}
              {description && showFullDescription && (
                <button
                  onClick={handleShowLessClick}
                  className="text-white border-2 border-white/50 px-3 py-2 bg-transparent backdrop-blur-3xl rounded uppercase mt-2 duration-500 active:px-5"
                >
                  Less
                </button>
              )}
              </div>


              <div className="mt-6 w-full px-5 md:px-0 flex justify-start items-center gap-4 overflow-x-auto">
                <Link
                  to={`/${creatorUsername}`}
                  className="px-7 md:px-3 py-3 cursor-pointer rounded-full duration-500 backdrop-blur-3xl md:backdrop-blur-none bg-white/0 hover:bg-white/10 w-fit flex justify-center items-center text-[14px] md:text-xl gap-2"
                >
                  <img
                    src={creatorProfileImg}
                    alt={creatorUsername}
                    className="w-[20px] h-[20px] md:w-[30px] md:h-[30px] rounded-full"
                  />
                  <h1>{creatorUsername}</h1>
                </Link>
                <button
                  onClick={saved ? handleRemoveSave : handleSave}
                  className={`px-5 py-3 cursor-pointer rounded-full bg-white text-black hover:bg-white/80 flex justify-center items-center text-xl ${
                    saved ? "gap-3" : "gap-3"
                  }`}
                >
                  <i
                    className={`fi ${
                      saved
                        ? "fi-sr-check-circle text-[15px]"
                        : "fi-sr-bookmark"
                    } flex justify-center items-center`}
                  ></i>
                  <span  className="flex gap-1">
                    {FormatSaveCount(saves)}{" "}
                    <span>
                      {saved ? "Saved" : "Save"}
                    </span>
                  </span>
                </button>
                {username === creatorUsername ? (
                  <>
                    <button
                      onClick={handleEditClick}
                      className="px-5 py-3 cursor-pointer rounded-full bg-white/5 hover:bg-white/10 w-fit flex justify-center items-center text-xl gap-4"
                    >
                      <i className="fi fi-sr-pencil flex justify-center items-center"></i>
                      Edit
                    </button>
                    <button
                      onClick={handleStackDelete}
                      className="px-5 py-3 cursor-pointer rounded-full bg-red/20 hover:bg-red/40 w-fit flex justify-center items-center text-xl gap-4"
                    >
                      <i className="fi fi-sr-trash text-red flex justify-center items-center"></i>
                      Delete
                    </button>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {showEdit ? (
        <motion.div
          initial={{ background: "#000000" }}
          animate={{ background: "#00000035" }}
          transition={{
            delay: 0,
            duration: 2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="edit-container z-[999] fixed top-0 left-0 w-full h-full backdrop-blur-lg"
        >
          <motion.div
            initial={{ opacity: 0, y: "50%", x: "-50%", scale: 0.5 }}
            animate={{ opacity: 1, y: "-50%", scale: 1 }}
            transition={{
              delay: 0,
              duration: 1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="edit-box absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[70%] lg:w-[40%] h-fit bg-white/20 backdrop-blur-2xl rounded-3xl px-6 py-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-[2vw] font-candela">Edit Stack</h1>
              <button
                onClick={() => setShowEdit(false)}
                className="p-3 rounded-full hover:bg-red/70 hover:text-white"
              >
                <i className="fi fi-br-cross flex justify-center items-center text-[10px]"></i>
              </button>
            </div>
            <div className="w-full flex justify-between items-center gap-3">
              <form ref={editRef} className="w-full">
                <input
                  name="title"
                  type="text"
                  defaultValue={title}
                  placeholder="Have a title in mind for our stack?"
                  className="w-full h-fit mb-5 p-4 bg-black/20 placeholder:text-white/70 text-xl outline-none rounded-2xl focus:bg-black/40 focus:text-white"
                />
                <textarea
                  rows={5}
                  name="description"
                  type="text"
                  defaultValue={description}
                  placeholder="How would you describe our stack?"
                  className="w-full h-fit resize-none mb-3 p-4 bg-black/20 placeholder:text-white/70 text-xl outline-none rounded-2xl focus:bg-black/40 focus:text-white"
                />
                <button
                  onClick={handleEditSubmit}
                  className="w-full px-5 py-3 mb-5 cursor-pointer rounded-2xl bg-white hover:bg-white/80 text-black flex justify-center items-center text-xl gap-4"
                >
                  <i className="fi fi-sr-pencil flex justify-center items-center"></i>
                  Edit stack
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        ""
      )}
    </>
  );
};

export default StudyStackPageTop;
