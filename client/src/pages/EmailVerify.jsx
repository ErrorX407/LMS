import React, { Fragment, useEffect, useState } from "react";
import PageNotFound from "./PageNotFound";
import PostAmbient from "../components/PostAmbient";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const param = useParams();
  useEffect(() => {
    const verifyEmailUrl = async () => {
      await axios
        .get(
          import.meta.env.VITE_SERVER_DOMAIN +
            `/api/v1/auth/${param.id}/verify/${param.token}`
        )
        .then(({ data }) => {
          setErrorMessage(data.message);
          setValidUrl(true);
        })
        .catch(({ response }) => {
          setErrorMessage(response.data.Error);
          setValidUrl(false);
        });
    };

    verifyEmailUrl();
  }, []);
  return (
    <>
      <PostAmbient banner={validUrl ? "https://images.unsplash.com/photo-1648878136531-15e7d3a88e76?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGdyZWVuJTIwc3VjZXNzfGVufDB8fDB8fHww" : "https://plus.unsplash.com/premium_photo-1674347953915-1431abd16563?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVkfGVufDB8fDB8fHww"} />
      <Navbar />
      <div>
        {validUrl ? (
          <div>
            <div className="success-overlay absolute top-[50%] -translate-y-1/2 left-1/2 -translate-x-1/2 w-full">
              <div className="relative h-screen top-1/2 flex justify-center items-center flex-col">
                <div className="w-[100px] h-[100px] mb-5">
                  <img
                    src="https://img.icons8.com/3d-fluency/100/approval.png"
                    alt="approval"
                  />
                </div>
                <div className="font-candela w-[80%] text-[30px] lg:text-[2vw] text-center">
                  {errorMessage}
                </div>
                <Link
                  to="/login"
                  className="text-[16px] mt-5 text-white font-semibold bg-[#64ce40]/30 px-[20px] py-[10px] rounded-2xl font-messinaReg hover:bg-[#64ce40] active:bg-[#64ce40]/70 hover:text-black"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="success-overlay absolute top-[50%] -translate-y-1/2 left-1/2 -translate-x-1/2 w-full">
              <div className="relative h-screen top-1/2 flex justify-center items-center flex-col">
                <div className="w-[100px] h-[100px] mb-5">
                  <img
                    src="https://img.icons8.com/3d-fluency/100/high-priority.png"
                    alt="high-priority"
                  />
                </div>
                <div className="font-candela w-[80%] text-[30px] lg:text-[2vw] text-center">
                  {errorMessage}
                </div>
                <Link
                  to="/register"
                  className="text-[16px] mt-5 text-white font-semibold bg-[#EA0F1C]/30 px-[20px] py-[10px] rounded-2xl font-messinaReg hover:bg-[#EA0F1C] active:bg-[#EA0F1C]/70 hover:text-black"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EmailVerify;
