import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { getFullDate } from "../common/Date";
import NotificationCommentField from "./NotificationCommentField";
import { UserContext } from "../App";
import axios from "axios";

const NotificationCard = ({ data, index, notificationState }) => {
  
  const [isReplying, setReplying] = useState(false);
  const [isHide, setHide] = useState(false);

  let {
    seen,
    reply,
    createdAt,
    comment,
    type,
    replied_on_comment,
    user,
    user: {
      personal_info: { username, fullName, profile_img },
    },
    post: { _id, post_id, title },
    _id: notification_id,
  } = data;

  let {
    userAuth: {
      access_token,
      username: author_username,
      fullName: author_fullName,
      profile_img: author_profile_img,
    },
  } = useContext(UserContext);

  let {
    notifications,
    notifications: { results, totalDocs },
    setNotifications,
  } = notificationState;

  const handleReplyClick = () => {
    setReplying((preVal) => !preVal);
  };

  const handleDelete = (comment_id, type, target) => {
    target.setAttribute("disabled", true);
    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN +
          "/api/v1/post/ineraction/delete/comments",
        { _id: comment_id },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(() => {
        if (type == "comment") {
          results.splice(index, 1);
        } else {
          delete results[index].reply;
        }
        target.removeAttribute("disabled");
        setNotifications({
          ...notifications,
          results,
          totalDocs: totalDocs - 1,
          deletedDocCount: notifications.deletedDocCount + 1,
        });
      })
      .catch((err) => {
        target.removeAttribute("disabled");
        console.log(err);
      });
  };

  const handleHideClick = () => {
    setHide((preVal) => !preVal);
  };

  return (
    <div className="relative p-6 bg-white/10 border-l-purple w-[550px] max-md:w-full rounded-2xl">
      {
        !seen ? 
        <div className="w-5 h-5 bg-purple rounded-full absolute top-[-3px] right-[-3px] border-[3px] border-black/50"></div>
        : ""
      }
      <div className="flex gap-3 mb-3 items-center">
        <img
          src={profile_img}
          alt=""
          className="w-14 h-14 flex-none rounded-xl"
        />
        <div className="w-full">
          <h1 className=" text-xl opacity-90">
            <span className="capitalize lg:inline-block hidden">
              {fullName}
            </span>
            <Link
              to={`/${username}`}
              className="mx-1 mr-2 text-[15px] leading-none bg-purple rounded-md px-2 py-1 text-black tracking-tight hover:bg-purple/50 hover:text-white duration-500"
            >
              @{username}
            </Link>
            <span className="opacity-60">
              {type == "like"
                ? "Liked 💖 your post"
                : type == "comment"
                ? "Commented 💬 on "
                : "Replied ✍️ on"}
            </span>

            <div className="flex float-right">
              <p className="opacity-60">{getFullDate(createdAt)}</p>
            </div>
          </h1>

          {type == "reply" ? (
            <div className="bg-purple/10 mt-2.5 line-clamp-2 p-4 rounded-2xl text-[15px] hover:line-clamp-none">
              <p className="line-clamp-2 hover:line-clamp-none">
                {replied_on_comment.comment}
              </p>
            </div>
          ) : (
            <div className="mt-2 line-clamp-2">
              <Link
                to={`/post/${post_id}`}
                className="text-xl underline-offset-2 opacity-80 hover:underline hover:opacity-100"
              >{`"${title}"`}</Link>
            </div>
          )}
        </div>
      </div>

      {type != "like" ? (
        <div className="bg-purple/10 mt-2.5 line-clamp-2 p-4 rounded-2xl text-[15px] hover:line-clamp-none">
          <p className="line-clamp-2 hover:line-clamp-none">
            {comment.comment}
          </p>
        </div>
      ) : (
        ""
      )}

      <div className="flex gap-3 items-center">
        {type != "like" ? (
          <>
            {!reply ? (
              <button
                onClick={handleReplyClick}
                className="mt-3 px-5 py-2 bg-purple/10 rounded-2xl duration-500 hover:bg-purple hover:text-black"
              >
                Reply
              </button>
            ) : (
              <button
                onClick={handleHideClick}
                className="mt-3 px-5 py-2 bg-purple/10 rounded-2xl duration-500 hover:bg-purple hover:text-black"
              >
                {isHide ? "Hide Reply" : "Show Reply"}
              </button>
            )}
            <button
              onClick={(e) => handleDelete(comment._id, "comment", e.target)}
              className=" flex justify-center items-center mt-3 px-3 py-2.5 rounded-[12px] bg-red/20 hover:bg-red/40"
            >
              <i className="fi fi-sr-trash flex justify-center items-center text-[13px] text-red pointer-events-none"></i>
            </button>
          </>
        ) : (
          ""
        )}
      </div>

      {isReplying ? (
        <div className="mt-3">
          <NotificationCommentField
            _id={_id}
            post_author={user}
            index={index}
            replyingTo={comment._id}
            setReplying={setReplying}
            notification_id={notification_id}
            notificationData={notificationState}
          />
        </div>
      ) : (
        ""
      )}
      {isHide ? (
        reply ? (
          <div className=" p-5 bg-purple/10 mt-3 rounded-2xl">
            <div className="flex gap-3 ">
              <img
                src={author_profile_img}
                alt=""
                className="w-11 h-11 flex-none rounded-xl"
              />
              <div className="w-full">
                <h1 className="opacity-90">
                  <span className="capitalize lg:inline-block hidden text-sm ">
                    {author_fullName}
                  </span>
                  <Link
                    to={`/${author_username}`}
                    className="mx-1 mr-2 text-sm leading-none bg-purple rounded-md px-2 py-1 text-black tracking-tight hover:bg-purple/50 hover:text-white duration-500"
                  >
                    @{author_username}
                  </Link>
                  <span className="opacity-60 text-sm">"Replied ✍️ to"</span>
                  <Link
                    to={`/${username}`}
                    className="mx-1 mr-2 text-sm leading-none bg-purple rounded-md px-2 py-1 text-black tracking-tight hover:bg-purple/50 hover:text-white duration-500"
                  >
                    @{username}
                  </Link>
                  <div className="flex float-right ">
                    <p className="opacity-60 text-sm">
                      {getFullDate(createdAt)}
                    </p>
                  </div>
                </h1>

                <div className="mt-1 line-clamp-2 hover:line-clamp-none">
                  <p className="line-clamp-2 hover:line-clamp-none">
                    {reply.comment}
                  </p>
                </div>

                <button
                  onClick={(e) =>
                    handleDelete(comment._id, "creplyomment", e.target)
                  }
                  className=" flex ml-auto justify-center items-center mt-3 px-3 py-2.5 rounded-[12px] bg-red/20 hover:bg-red/40"
                >
                  {" "}
                  <span className="text-red mr-1">Delete</span>
                  <i className="fi fi-sr-trash flex justify-center items-center text-[13px] text-red pointer-events-none"></i>
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default NotificationCard;
