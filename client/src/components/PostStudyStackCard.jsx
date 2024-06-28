import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { UserContext } from "../App";
import toast from "react-hot-toast";

const PostStudyStackCard = ({
  postId,
  stackId,
  title,
  postBanner,
  postBanner2,
  postBanner3,
  postBanner4,
}) => {
  const postBanners = [
    {src: postBanner},
    {src: postBanner2},
    {src: postBanner3},
    {src: postBanner4},
  ];
  const [selection, setSelection] = useState(false);
  const {
    userAuth: { access_token },
  } = useContext(UserContext);

  console.log(postBanner2);
  console.log(postId);

  const handlePostStackCardClick = (e) => {
    // setSelection((preVal) => !preVal);
    if (!selection) {
      // console.log(e.target.value);
      axios
       .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/post/ineraction/studystack/add",
          {
            post_id: postId,
            stack_id: stackId,
          },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
       .then(({data}) => {
         setSelection(true);
         return toast.success(`Added to ${data.studyStack.title}`);
        })
       .catch(({response}) => {
         setSelection(false);
          return toast.error(response.data.Error);
        });
    }
  };

  
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
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
      onClick={handlePostStackCardClick}
      value={stackId}
      className={`relative cursor-pointer w-full h-[70px] duration-300 ${
        selection
          ? "bg-[#61d345]/20 hover:bg-[#61d345]/30"
          : "bg-white/5 hover:bg-white/10"
      } flex-shrink-0 rounded-xl moblieLg:rounded-2xl overflow-hidden flex justify-start items-center p-4`}
    >
        <div className=" flex -space-x-8 overflow-hidden pointer-events-none">
          {postBanners.map((banner, i) => (
            <img
              key={i}
              src={banner.src}
              alt={title}
              className={`inline-block z-[${20-i}] h-[50px] w-[50px] rounded-full ${banner.src === "" && !banner.src ? "hidden": ""}`}
            />
          ))}
        </div>

      <div className="info px-4 select-none pointer-events-none">
        <div className="title font-medium text-[15px] md:text-[16px] lg:text-[17px] line-clamp-1 pr-3 text-white/100">
          {title}
        </div>
      </div>

      {selection ? (
        <motion.div
          initial={{ rotate: "-360deg", scale: 0, transformOrigin: "center" }}
          animate={{ rotate: "0", scale: 1, transformOrigin: "center" }}
          transition={{
            duration: 0.3,
            ease: [0, 0.71, 0.2, 1.01],
            scale: {
              type: "spring",
              damping: 4,
              stiffness: 100,
              restDelta: 0.001,
            },
          }}
          className="absolute right-4 top-[35%] origin-center -translate-y-1/2"
        >
          <i className="fi fi-sr-check-circle text-[#61d345] text-2xl  flex justify-center items-center"></i>
        </motion.div>
      ) : (
        ""
      )}
    </motion.button>
  );
};

export default PostStudyStackCard;