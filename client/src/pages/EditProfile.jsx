import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../App";
import axios from "axios";
import { profileDataStructure } from "./ProfilePage";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";
import { uploadImage } from "../common/Aws";
import { storeInSession } from "../common/Session";
import { postStructure } from "./PostPage";

const EditProfile = () => {
  const {
    userAuth,
    userAuth: { access_token, profile_img },
    setUserAuth,
  } = useContext(UserContext);

  let profileImgElem = useRef();
  let editProfileForm = useRef();

  const [profile, setProfile] = useState(profileDataStructure);
  const [loading, setLoading] = useState(true);
  const [updatedProfileImage, setUpdatedProfileImage] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const inputBox = Array.from(document.querySelectorAll("input"));
  const successOverlay = document.querySelector(".success-overlay");

  const {
    personal_info: { fullName, username: profile_username, email },
    social_links,
  } = profile;

  useEffect(() => {
    if (access_token) {
      axios
        .post(import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/user/profile", {
          username: userAuth.username,
        })
        .then(({ data }) => {
          setProfile(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [access_token]);

  const handleImagePreview = (e) => {
    let img = e.target.files[0];

    profileImgElem.current.src = URL.createObjectURL(img);

    setUpdatedProfileImage(img);
  };

  const handleImageUpload = (e) => {
    e.preventDefault();

    if (updatedProfileImage) {
      let loadingToast = toast.loading(
        "📷 Uploading profile image... Smile for the camera! 📸😊"
      );
      e.target.setAttribute("disabled", true);

      uploadImage(updatedProfileImage)
        .then((url) => {
          if (url) {
            axios
              .post(
                import.meta.env.VITE_SERVER_DOMAIN +
                  "/api/v1/user/profile-img/update",
                { url },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                  },
                }
              )
              .then(({ data }) => {
                let newUserAuth = {
                  ...userAuth,
                  profile_img: data.profile_img,
                };

                storeInSession("user", JSON.stringify(newUserAuth));
                setUserAuth(newUserAuth);

                setUpdatedProfileImage(null);

                toast.dismiss(loadingToast);
                e.target.removeAttribute("disabled");
                return toast.success(
                  "🎉 Profile image uploaded successfully! Looking good! 🖼️👍"
                );
              })
              .catch(({ response }) => {
                toast.dismiss(loadingToast);
                e.target.removeAttribute("disabled");
                return toast.error(response.data.Error);
              });
          }
        })
        .catch((err) => {
          toast.dismiss(loadingToast);
          console.log(err);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let form = new FormData(editProfileForm.current);
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    let {
      fullName,
      username,
      youtube,
      instagram,
      facebook,
      twitter,
      github,
      website,
    } = formData;

    if (username.length < 3) {
      return toast.error(
        "Oops! Username must be at least 3 characters long. Keep typing, you're almost there! 🤔🖋️"
      );
    }
    if (fullName.length < 3) {
      return toast.error(
        "Oops! Fullname 🖋️ must be at least 3 characters long. 🤔"
      );
    }

    let loadingToast = toast.loading(
      "🔄 Updating profile... Hang tight, we're sprucing things up! 🛠️🌟"
    );
    e.target.setAttribute("disabled", true);

    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/user/profile/update",
        {
          fullName,
          username,
          social_links: {
            youtube,
            instagram,
            facebook,
            twitter,
            github,
            website,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(({ data }) => {
        if (userAuth.username != data.username) {
          let newUserAuth = {
            ...userAuth,
            username: data.username,
            fullName: data.fullName,
          };

          storeInSession("user", JSON.stringify(newUserAuth));
          setUserAuth(newUserAuth);
        }

        toast.dismiss(loadingToast);
        e.target.removeAttribute("disabled");
        setSubmitSuccess(true);
        // return toast.success(
        //   "🎉 Profile updated successfully! Looking sharp! 🌟😊"
        // );
      })
      .catch(({ response }) => {
        toast.dismiss(loadingToast);
        e.target.removeAttribute("disabled");
        setSubmitSuccess(false);
        return toast.error(response.data.Error);
        // console.log(response);
      });
  };

  useEffect(() => {
    if (submitSuccess) {
      successOverlay.style.pointerEvents = "auto";
      successOverlay.style.top = "0";
      successOverlay.style.opacity = "1";
      setTimeout(() => {
        successOverlay.style.pointerEvents = "none";
        successOverlay.style.top = "-15%";
        successOverlay.style.opacity = "0";
      }, 3500);
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3500);
    }
  }, [submitSuccess]);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="success-overlay max-md:hidden absolute opacity-0 pointer-events-none top-[-15%] left-0 w-full h-full bg-black/50 z-[1000] backdrop-blur-lg">
            <div className="relative top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center flex-col">
              <div className="w-[100px] h-[100px]">
                <img
                  src="https://img.icons8.com/3d-fluency/100/approval.png"
                  alt="approval"
                />
              </div>
              <div className="font-candela text-[3vw] text-center">
                🎉 Profile updated successfully! 😊
                <br /> Looking sharp! 🌟
              </div>
            </div>
          </div>
          <form ref={editProfileForm} className="mt-[50px] md:mt-0 lg:mt-0">
            <h1 className="font-candela text-3xl mb-0 max-md:text-center">
              Edit Profile{" "}
            </h1>
            <div className="flex flex-col lg:flex-row items-start py-4 gap-8 lg:gap-10">
              <div className="max-lg:center mb-5">
                <label
                  htmlFor="uploadImg"
                  id="profileImgLabel"
                  className="relative block w-48 h-48 rounded-[2rem] overflow-hidden"
                >
                  <div className="w-full h-full absolute top-0 left-0 flex flex-col justify-center items-center text-white bg-black/50 gap-2 backdrop-blur-xl duration-300 opacity-0 hover:opacity-100 cursor-pointer">
                    <img
                      src="https://img.icons8.com/3d-fluency/94/edit.png"
                      alt="edit"
                      className="w-[55px] h-[55px]"
                    />
                    <div className="text-2xl">Upload Image</div>
                  </div>
                  <img ref={profileImgElem} src={profile_img} alt="" />
                </label>
                <input
                  type="file"
                  id="uploadImg"
                  accept=".jpeg, .png, .jpg"
                  hidden
                  onChange={handleImagePreview}
                />
                <button
                  onClick={handleImageUpload}
                  className="bg-purple center mt-5 max-lg:center lg-w-full px-12 rounded-[1.2rem] text-2xl py-3 mouseenter text-black font-semibold"
                >
                  Upload
                </button>
              </div>
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
                  <div>
                    <div className="relative">
                      <input
                        value={email}
                        name="email"
                        type="text"
                        placeholder="Enter email"
                        className="input-box lowercase pl-[4.5rem]"
                        disabled={true}
                      />
                      <div className="absolute left-3 top-2.5 bg-purple/30 w-12 h-12 rounded-xl flex justify-center items-center">
                        <i
                          className={
                            "fi fi-sr-envelope flex justify-center items-center text-white"
                          }
                        ></i>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      defaultValue={`${profile_username}`}
                      name="username"
                      type="text"
                      placeholder="Enter username"
                      className="input-box lowercase pl-[4.5rem]"
                    />
                    <div className="absolute left-3 top-2.5 bg-purple/30 w-12 h-12 rounded-xl flex justify-center items-center">
                      <i
                        className={
                          "fi-sr-at flex justify-center items-center text-white"
                        }
                      ></i>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <input
                      defaultValue={fullName}
                      name="fullName"
                      type="text"
                      placeholder="Enter fullname"
                      className="input-box pl-[4.5rem]"
                    />
                    <div className="absolute left-3 top-2.5 bg-purple/30 w-12 h-12 rounded-xl flex justify-center items-center">
                      <i
                        className={
                          "fi fi-sr-user flex justify-center items-center text-white"
                        }
                      ></i>
                    </div>
                  </div>
                </div>
                <p className="text-white/60 -mt-3">
                  Username will use to search user and will be visible to all
                  users
                </p>
                <p className="mt-6 mb-3 text-purple text-2xl">
                  Add your social handles below
                </p>
                <div className="md:grid md:grid-cols-2 gap-x-6">
                  {Object.keys(social_links).map((key, i) => {
                    let link = social_links[key];
                    return (
                      <div className="relative">
                        <input
                          key={i}
                          defaultValue={link}
                          name={key}
                          type="text"
                          placeholder="https://"
                          className="input-box lowercase pl-[4.3rem]"
                        />
                        <div className="absolute left-3 top-2.5 bg-purple/30 w-12 h-12 rounded-xl flex justify-center items-center">
                          <i
                            className={
                              "flex justify-center items-center text-white fi " +
                              (key != "website"
                                ? "fi-brands-" + key
                                : "fi-rr-globe") +
                              " text-2xl"
                            }
                          ></i>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={handleSubmit}
                  className="flex justify-center items-center font-semibold mb-4 gap-1 text-2xl max-md:w-full px-12 h-16 bg-purple rounded-2xl text-black mouseenter"
                  type="submit"
                >
                  Update Profile
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};
export default EditProfile;
