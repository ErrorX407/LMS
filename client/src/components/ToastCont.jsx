import React from "react";
import { ToastContainer } from "react-toastify";

const ToastCont = () => {
  return (
    <ToastContainer
      toastStyle={{
        backgroundColor: "#ffffff17",
        backdropFilter: "blur(20px)",
      }}
      position="top-right"
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
  );
};

export default ToastCont;
