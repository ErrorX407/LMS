import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";
import toast from "react-hot-toast";
import FormatSaveCount from "./FormatSaveCount";

const StudyStackPostCard = ({
  stackTitle,
  stack_id,
  creatorUsername,
  postLikes,
  authorUsername,
  postBanner,
  authorProfileImage,
  postCategory,
  post_id,
  postTitle,
}) => {
  const {
    userAuth: { access_token, username },
  } = useContext(UserContext);

  const navigate = useNavigate();

  const removeStack = (e) => {
    const button = e.target;
    button.setAttribute("disabled", true);

    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/stack/remove/post",
        { stack_id, post_id },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(({ data }) => {
        // button.removeAttribute("disabled")
        setTimeout(() => {
          location.reload();
        }, 1500);
        return toast.success(data.Message + `${stackTitle} 👍`);
      })
      .catch(({ response }) => {
        button.removeAttribute("disabled");
        return toast.error(response.data.Error);
      });
  };
  return (
    <div className="stack-post-card  relative w-full h-[80px] flex-shrink-0 overflow-hidden flex justify-between items-center rounded-lg shadow-md">
      <div className="flex justify-center items-center gap-5">
        <div className="banner w-[50px] md:w-[80px] flex-shrink-0 rounded-lg overflow-hidden aspect-video">
          <img
            src={postBanner}
            alt={postTitle}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-sm font-medium md:text-base lg:text-lg text-gray-800 line-clamp-2">
            {postTitle}
          </h1>
        </div>
      </div>
      {/* flex justify-center item-center space-x-3 */}
      <div className="w-1/2 hidden md:flex justify-between item-center">
        <div className="relative z-10 flex items-center min-w-[110px]">
          <Link
            to={`/${authorUsername}`}
            className="stack-post-author-link opacity-70 flex items-center space-x-2"
          >
            <img
              src={authorProfileImage}
              alt={authorUsername}
              className="hidden md:block flex-shrink-0 w-5 h-5 rounded-full object-cover"
            />
            <span className="text-xs md:text-sm lg:text-base text-gray-600">
              {authorUsername}
            </span>
          </Link>
        </div>
        <div className="relative z-10 flex items-center">
          <Link
            to={`/${postCategory}`}
            className="stack-post-author-link opacity-70 text-xs md:text-sm lg:text-base text-gray-600 capitalize"
          >
            {postCategory}
          </Link>
        </div>
        <div className="flex items-center">
          <h1 className="font-candela text-xs md:text-sm lg:text-base text-gray-600">
            {FormatSaveCount(postLikes)} likes
          </h1>
        </div>

        {username !== creatorUsername ? (
          <div className="stack-arrow p-3 rounded-full bg-white/10">
            <i className="fi fi-br-angle-right flex justify-center items-center text-[10px]"></i>
          </div>
        ) : (
          ""
        )}

        {username === creatorUsername ? (
          <button
            onClick={removeStack}
            className="stack-arrow relative z-10 p-3 rounded-full hover:bg-white/10 hover:text-white"
          >
            <i className="fi fi-br-cross flex justify-center items-center text-[10px]"></i>
          </button>
        ) : (
          ""
        )}
      </div>
      <div className=" md:hidden ml-5">
      {username !== creatorUsername ? (
          <div className="p-3 rounded-full bg-white/10">
            <i className="fi fi-br-angle-right flex justify-center items-center text-[10px]"></i>
          </div>
        ) : (
          ""
        )}
        {username === creatorUsername ? (
          <button
            onClick={removeStack}
            className="relative z-10 p-3 rounded-full bg-white/10 text-white"
          >
            <i className="fi fi-br-cross flex justify-center items-center text-[10px]"></i>
          </button>
        ) : (
          ""
        )}
      </div>
      <Link
        to={`/post/${post_id}`}
        className="absolute top-0 left-0 w-full h-full"
      ></Link>
    </div>
  );
};

export default StudyStackPostCard;
