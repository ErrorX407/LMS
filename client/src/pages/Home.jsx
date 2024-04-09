import React, { useState } from "react";
import Ambient from "../components/Ambient";
import Sidebar from "../components/Sidebar";
import Trending from "../components/Trending";
import Latest from "../components/Latest";
import {ToastContainer} from "react-toastify"

const Home = () => {
  return (
    <section className="px-8 w-[calc(100%-230px)]">
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
      {/* <Ambient /> */}
      {/* <Sidebar /> */}
      <div>
        <Trending />
        <Latest />
      </div>
    </section>
  );
};

export default Home;
