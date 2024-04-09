import React, { useContext, useRef, useEffect, useState } from "react";
import { Eye, EyeClosed } from "@phosphor-icons/react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { storeInSession } from "../common/session";
import { UserContext } from "../App";

const Login = () => {
  const authForm = useRef();
  const passwordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Focus on the input field when component mounts or showPassword changes
    if (passwordRef.current) {
      passwordRef.current.focus();
    }
  }, [showPassword]);

  const handleToggleCurrentPassword = () => {
    setShowPassword(!showPassword);
  };

  let {
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);

  const userAuthThroughServer = (serverRoute, formData) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
      .then(({ data }) => {
        storeInSession("user", JSON.stringify(data));
        setUserAuth(data);
        toast.success(
          "Welcome aboard! 🎉 You're in! 🚀 Let's get started on this adventure together! 🌟 #LoginSuccess"
        );
      })
      .catch(({ response }) => {
        toast.error(response.data.Error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let serverRoute = "/api/v1/auth/login";

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

    //formdata

    let form = new FormData(authForm.current);
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    let { fullName, email, password } = formData;

    //Form Validation

    if (!email || !password || email === "" || password === "") {
      return toast.error(
        "Oopsie! 🙉 It seems like you missed filling out some fields. Please make sure all fields are filled in! 📝 #AllFieldsRequiredError"
      );
    }
    if (!email || email.length === 0 || email === "") {
      return toast.error(
        "Hey there! Don't forget to enter your email address. It's the key to unlocking all the goodies! 📧🔑"
      );
    }

    if (!emailRegex.test(email)) {
      return toast.error(
        "Oops! 🙈 Looks like there was a hiccup with your email. Please double-check and try again! 📧 #EmailError"
      );
    }

    if (!password || password.length === 0 || password === "") {
      return toast.error(
        "Uh-oh! 🙊 It seems there's a problem with your password. Give it another shot! 🔒 #PasswordError"
      );
    }

    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letter 😵"
      );
    }
    userAuthThroughServer(serverRoute, formData);
  };
  return access_token ? (
    <Navigate to="/" />
  ) : (
    <>
      <div className="login flex justify-center items-center">
        <div className="left w-1/2 h-screen">
          <img
            src="https://images.unsplash.com/photo-1579353174740-9e4e39428d6f?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="object-cover"
          />
        </div>
        <div className="right w-1/2 h-screen px-8 py-4">
          <h1 className="font-candela text-[6vw]">
            What's up, buddy? Ready to log in...{" "}
          </h1>
          <form ref={authForm} action="" className="my-20">
            <input
              name="email"
              type="email"
              placeholder="example@shiv.com"
              className="mb-5 w-full h-16 p-4 bg-transparent border-2 border-[#ff35e4]/30 text-2xl outline-none rounded-2xl focus:border-[#ff35e4] focus:text-[#ff35e4] active:border-[#ff35e4] active:text-[#ff35e4]"
            />
            <div className="relative w-full">
              <input
                ref={passwordRef}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="●●●●●●●●●●"
                className="w-full mb-5 h-16 p-4 bg-transparent border-2 border-[#ff35e4]/30 text-2xl outline-none rounded-2xl focus:border-[#ff35e4] focus:text-[#ff35e4] active:border-[#ff35e4] active:text-[#ff35e4]"
              />

              <div
                className="bg-[#ff35e4]/30 hover:bg-[#ff35e4]/60 absolute right-3 top-3 w-10 h-10 flex justify-center items-center rounded-xl cursor-pointer"
                onClick={handleToggleCurrentPassword}
              >
                {showPassword ? <Eye size={22} /> : <EyeClosed size={22} />}
              </div>
            </div>
            <button
              className="flex justify-center items-center mb-4 gap-1 text-3xl w-full h-16 bg-[#ff35e4] rounded-2xl text-black mouseenter font-semibold"
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </button>

            <div className="w-1/2 absolute bottom-10 pr-20 float-right flex justify-between items-center">
              <Link to="/register">
                <div className="text-[#ff35e4] w-full hover:underline text-center">
                  Don't have account ?
                </div>
              </Link>
              <Link to="forget-password">
                <div className="text-[#ff35e4] w-full hover:underline text-center">
                  Forget password
                </div>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
