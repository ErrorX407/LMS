import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "../src/assets/font/Whyte/stylesheet.css";
import "../src/assets/font/Whyte-Inktrap/stylesheet.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Toaster
      toastOptions={{
        duration: 3000,
        className: "custom-toast",
        success: {
          style: {
            background: "#61d3452d",
          },
        },
        error: {
          style: {
            backgroundColor: "#ff4b4b2d",
          },
        },
      }}
    />
    <App />
  </BrowserRouter>
  //</React.StrictMode>
);
