import React, { useContext, useRef } from "react";
import { RiArrowRightSLine } from "@remixicon/react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"
import { storeInSession } from "../common/session";
import { UserContext } from "../App";

const Register = () => {
  const authForm = useRef();

  let {userAuth: {access_token}, setUserAuth} = useContext(UserContext)

  const userAuthThroughServer = (serverRoute, formData) => {
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData).then(({data}) => {
      storeInSession("user", JSON.stringify(data));
      setUserAuth(data);
      toast.success("Congratulations! 🎉 You're officially part of the community! 🌟 Welcome aboard! 🚀 #RegistrationSuccess")
    }).catch(({response}) => {
      toast.error(response.data.Error)
    }) 
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let serverRoute = "/api/v1/auth/register";
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
      return toast.error("Whoops! Looks like you missed filling out some fields. Make sure to complete them all! 📝");
    }
    if (!fullName || fullName.length < 3 || fullName === "") {
      return toast.error("Hey there! Your full name should have more than three letters. Give it another shot! 📝");
    }
    if (!email || email.length === 0 || email === "") {
      return toast.error("Hey, don't forget your email! It's required for login. 📧");
    }

    if (!emailRegex.test(email)) {
      return toast.error("Hold on! Looks like there's an issue with your email. Make sure it's formatted correctly! 📧");
    }

    if (!password || password.length === 0 || password === "") {
      return toast.error("Password is required 😵");
    }

    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password🔒 should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letter 😵"
      );

    }
    userAuthThroughServer(serverRoute, formData);
  };

  return (
    access_token ? 
    <Navigate to="/" />
    :
    <>
      <div className="login flex justify-center items-center">
        <div className="left w-1/2 h-screen">
          <img
            src="https://images.unsplash.com/photo-1622126812734-35a1d6c46f22?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="object-cover"
          />
        </div>
        <div className="right w-1/2 h-screen px-8 py-4">
          <h1 className="font-candela text-[6vw]">
            Hey there, buddy! Let's register now{" "}
          </h1>
          <form ref={authForm} action="" className="my-20 email-form">
            <input
              name="fullName"
              type="text"
              placeholder="John Wick"
              className="capitalize mb-5 w-full h-16 p-4 bg-transparent border-2 border-[#CA4E00]/30 text-2xl outline-none rounded-2xl focus:border-[#CA4E00] focus:text-[#CA4E00] active:border-[#CA4E00] active:text-[#CA4E00]"
            />
            <input
              name="email"
              type="email"
              placeholder="johnwick@email.com"
              className="mb-5 w-full h-16 p-4 bg-transparent border-2 border-[#CA4E00]/30 text-2xl outline-none rounded-2xl focus:border-[#CA4E00] focus:text-[#CA4E00] active:border-[#CA4E00] active:text-[#CA4E00]"
            />
            <input
              name="password"
              type="password"
              placeholder="●●●●●●●●●●"
              className="w-full mb-5 h-16 p-4 bg-transparent border-2 border-[#CA4E00]/30 text-2xl outline-none rounded-2xl focus:border-[#CA4E00] focus:text-[#CA4E00] active:border-[#CA4E00] active:text-[#CA4E00]"
            />
            <button
              className="flex justify-center items-center font-semibold mb-4 gap-1 text-3xl w-full h-16 bg-[#CA4E00] rounded-2xl text-black mouseenter"
              type="submit"
              onClick={handleSubmit}
            >
              Next{" "}
              <span>
                <RiArrowRightSLine size={30} />
              </span>{" "}
            </button>
            <Link
              to="/login"
              className="w-1/2 absolute bottom-10 pr-20 float-right"
            >
              <div className="text-[#CA4E00] w-full hover:underline text-center">
                Already have an account ?
              </div>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
