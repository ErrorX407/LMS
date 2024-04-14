import React, { useState } from "react";
import Trending from "../components/Trending";
import Latest from "../components/Latest";
import {ToastContainer} from "react-toastify"

const Home = () => {
  return (
    <section className="px-8">
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
      <div className="mt-[50px] md:mt-0 lg:mt-0">
        <Trending />
        <Latest />
      </div>
    </section>
  );
};

export default Home;
