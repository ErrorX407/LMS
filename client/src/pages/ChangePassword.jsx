import React, { useState, useRef, useEffect, useContext } from "react";
import { Eye, EyeClosed } from "@phosphor-icons/react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { UserContext } from "../App";

const ChangePassword = () => {
  const {userAuth: {access_token}} = useContext(UserContext)

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const inputRefCurrent = useRef(null);
  const inputRefNew = useRef(null);
  const inputRefConfirm = useRef(null);
  const changePasswordRef = useRef();
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  useEffect(() => {
    // Focus on the input field when component mounts or showPassword changes
    if (inputRefCurrent.current) {
      inputRefCurrent.current.focus();
    }
  }, [showCurrentPassword]);

  const handleToggleCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleToggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let form = new FormData(changePasswordRef.current);
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    let { currentPassword, newPassword, confirmPassword } = formData;

    if (
      !currentPassword.length ||
      !newPassword.length ||
      !confirmPassword.length
    ) {
      return toast.error("Please fill out all the fields");
    }

    if (
      !passwordRegex.test(currentPassword) ||
      !passwordRegex.test(newPassword) ||
      !passwordRegex.test(confirmPassword)
    ) {
      return toast.error(
        "Password🔒 should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letter 😵"
      );
    }

    if (currentPassword === newPassword) {
      return toast.error("Oopsie! 🙈 Same password, same vibe! Let's try something fresh and different! 💫🔑")
    }

    if (newPassword !== confirmPassword) {
      return toast.error(
        "Whoops! 😅 Passwords don't match! Please double-check and try again. 🔄🔒"
      );
    }

    e.target.setAttribute("disabled", true);

    let loadingToast = toast.loading("🔐 Updating password... Hang tight! We're on it! 🛠️😊");

    axios
     .post(
        import.meta.env.VITE_SERVER_DOMAIN +
          "/api/v1/user/password/change",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
     .then((res) => {
       toast.dismiss(loadingToast);
        e.target.removeAttribute("disabled");
        return toast.success("🔐 Password updated! succesfully 🔐");
      })
     .catch((response) => {
      toast.dismiss(loadingToast);
       e.target.removeAttribute("disabled");
       return toast.error(response.response.data.Error);
      //  console.log(response.response.data.Error);
      });
  };

  return (
    <>
      <div className="right w-full flex justify-start items-center flex-col">
        <form
          ref={changePasswordRef}
          className="email-form w-full flex justify-center items-start flex-col"
        >
          <h1 className="font-candela text-3xl mb-8">Change Password </h1>
          <div className="w-1/2 relative">
            <input
              ref={inputRefCurrent}
              name="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Enter Your Current Password"
              className="mb-5 w-full h-16 p-4 pr-16 bg-transparent border-2 border-purple/30 text-2xl outline-none rounded-2xl focus:border-purple focus:text-purple active:border-purple active:text-purple"
            />
            <div
              className="bg-purple/30 hover:bg-purple/60 absolute right-3 top-3 w-10 h-10 flex justify-center items-center rounded-xl cursor-pointer"
              onClick={handleToggleCurrentPassword}
            >
              {showCurrentPassword ? (
                <Eye size={22} />
              ) : (
                <EyeClosed size={22} />
              )}
            </div>
          </div>
          <div className="w-1/2 relative">
            <input
              ref={inputRefNew}
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter Your New Password"
              className="mb-5 h-16 w-full p-4 bg-transparent border-2 border-purple/30 text-2xl outline-none rounded-2xl focus:border-purple focus:text-purple active:border-purple active:text-purple"
            />
            <div
              className="bg-purple/30 hover:bg-purple/60 absolute right-3 top-3 w-10 h-10 flex justify-center items-center rounded-xl cursor-pointer"
              onClick={handleToggleNewPassword}
            >
              {showNewPassword ? <Eye size={22} /> : <EyeClosed size={22} />}
            </div>
          </div>
          <div className="w-1/2 relative">
            <input
              ref={inputRefConfirm}
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Your New Password"
              className="mb-5 h-16 w-full p-4 bg-transparent border-2 border-purple/30 text-2xl outline-none rounded-2xl focus:border-purple focus:text-purple active:border-purple active:text-purple"
            />
            <div
              className="bg-purple/30 hover:bg-purple/60 absolute right-3 top-3 w-10 h-10 flex justify-center items-center rounded-xl cursor-pointer"
              onClick={handleToggleConfirmPassword}
            >
              {showConfirmPassword ? (
                <Eye size={22} />
              ) : (
                <EyeClosed size={22} />
              )}
            </div>
          </div>
          <button
            className="flex justify-center items-center font-semibold mb-4 gap-1 text-2xl w-1/2 h-16 bg-purple rounded-2xl text-black mouseenter"
            type="submit"
            onClick={handleSubmit}
          >
            Change Password
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
