import React from "react";
import PostAmbient from "../components/PostAmbient";
import NoDataMessage from "../components/NoDataMessage";

const TestSeries = () => {
  return (
    <>
      <PostAmbient banner="https://i.pinimg.com/474x/ef/f0/90/eff0904e7fbb468230b994d6908781af.jpg" />

      <div className="px-4 xsm:px-5 lg:px-10 md:px-8 mt-[50px] md:mt-0 lg:mt-0">
        <h1 className="font-candela text-3xl">Test Series</h1>
        <NoDataMessage message="Coming Soon! 🎉 Stay tuned! 🌟" />
      </div>
    </>
  );
};

export default TestSeries;
