import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import NoDataMessage from "../components/NoDataMessage";
import StudyStackPageTop from "../components/StudyStackPageTop";
import StackNavbar from "../components/StackNavbar";
import StudyStackPostCard from "../components/StudyStackPostCard";
import StackSidebar from "../components/StackSidebar";
import { UserContext } from "../App";

const StudyStackPage = () => {
  let { stack_id } = useParams();
  const {
    userAuth: { access_token, username },
  } = useContext(UserContext);
  const [studyStacks, setStudyStacks] = useState(null);

  const fetchStudyStacks = () => {
    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN +
          "/api/v1/post/ineraction/studystack/all",
        { stack_id }
      )
      .then(({ data }) => {
        console.log(data);
        setStudyStacks(data.studyStack);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };

  const resetStates = () => {
    setStudyStacks(null);
  };

  useEffect(() => {
    resetStates();
    fetchStudyStacks();
  }, [stack_id]);

  let postBanners;
  return (
    <>
      <StackSidebar />
      {!studyStacks ? (
        <Loader />
      ) : studyStacks.length ? (
        <>
          {studyStacks.map((studyStack, i) => {
            const lastIndex = studyStack.posts.length - 1;
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.55 * i,
                  duration: 2,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                key={i}
              >
                <StudyStackPageTop
                  creatorUsername={studyStack.creator.personal_info.username}
                  creatorFullname={studyStack.creator.personal_info.fullName}
                  creatorProfileImg={
                    studyStack.creator.personal_info.profile_img
                  }
                  stack_id={studyStack.stack_id}
                  title={studyStack.title}
                  description={studyStack.description}
                  postBanner1={studyStack.posts[lastIndex].banner}
                />
                {studyStack.posts.map((postStack, i) => {
                  return (
                    <div key={i} className="px-5 lg:px-10 md:px-8">
                      <StudyStackPostCard
                      stackTitle={studyStack.title}
                        creatorUsername={
                          studyStack.creator.personal_info.username
                        }
                        stack_id={studyStack.stack_id}
                        postLikes={postStack.activity.total_likes}
                        authorUsername={postStack.author.personal_info.username}
                        authorProfileImage={
                          postStack.author.personal_info.profile_img
                        }
                        postBanner={postStack.banner}
                        postCategory={postStack.category}
                        post_id={postStack.post_id}
                        postTitle={postStack.title}
                      />
                    </div>
                  );
                })}
              </motion.div>
            );
          })}
        </>
      ) : (
        <NoDataMessage message="No thing in the Study Stack" />
      )}
    </>
  );
};

export default StudyStackPage;
