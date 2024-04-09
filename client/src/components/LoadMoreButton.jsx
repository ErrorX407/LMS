import React from "react";

const LoadMoreButton = ({ state, fetchDataFun, additionalParam }) => {
  if (state != null && state.totalDocs > state.results.length) {
    return (
      <div className="w-full flex justify-center items-center my-12">
        <button className="bg-white/10 text-white text-xl px-10 py-3 rounded-2xl hover:bg-purple hover:text-black hover:font-semibold mouseenter" onClick={() => fetchDataFun({ ...additionalParam, page: state.page + 1})}>
        Load More
      </button>
      </div>
    );
  }
};

export default LoadMoreButton;
