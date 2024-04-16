import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "../src/assets/font/Whyte/stylesheet.css"
import "../src/assets/font/Whyte-Inktrap/stylesheet.css"
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <ToastContainer
      stacked
      toastStyle={{
        backgroundColor: "#ffffff17",
        backdropFilter: "blur(20px)",
        width: "400px",
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
    <App />
  </BrowserRouter>
  //</React.StrictMode>
);
