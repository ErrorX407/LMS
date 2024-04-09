import React, { useContext } from "react";
import { EditorContext } from "../pages/Editor";

const Tag = ({ tag }) => {
  let {
    post,
    post: { tags },
    setPost,
  } = useContext(EditorContext);

  const handleTagDelete = () => {
    tags = tags.filter((t) => t != tag);
    setPost({ ...post, tags });
  };
  return (
    <div className="px-2 inline-block mb-5">
      <div className="relative p-3 px-5 bg-purple w-fit rounded-2xl hover:opacity-90 cursor-default">
        <p className="text-black font-semibold text-[14px] pr-6 outline-none">
          {tag}
        </p>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 w-[20px] h-[20px] bg-black rounded-[5px] flex justify-center items-center hover:scale-125"
          onClick={handleTagDelete}
        >
          <i className="fi fi-br-cross text-[8px] font-semibold text-white pointer-events-none"></i>
        </button>
      </div>
    </div>
  );
};

export default Tag;
