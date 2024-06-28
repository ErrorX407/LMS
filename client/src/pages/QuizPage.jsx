import React, { useContext } from "react";
import { motion } from "framer-motion";
import QuizCard from "../components/quizCard";
import FormatSaveCount from "../components/FormatSaveCount";
import { QuizContext } from "./TestSeries";
import NoDataMessage from "../components/NoDataMessage";

const QuizPage = () => {
  const { getQuiz } = useContext(QuizContext);
  return (
    <>
      <h1 className="font-candela text-2xl md:text-3xl my-2 mb-5">
        {FormatSaveCount(getQuiz.nbHits)} Quizzes Discovered 🎉
      </h1>
      <div className="mx-auto my-6 max-w-full lg:max-w-full">
        <div className="grid grid-cols-1 moblieLg:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
          {getQuiz.quizData.length ? (
            getQuiz.quizData.map((quiz, i) => {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, transform: "translateY(50px)" }}
                  animate={{ opacity: 1, transform: "translateY(0px)" }}
                  transition={{
                    delay: 0.2 * i,
                    duration: 2,
                    ease: [0, 0.71, 0.2, 1.01],
                  }}
                >
                  <QuizCard played={quiz.total_plays} quizName={quiz.quizName} creaorUsername={quiz.creator.personal_info.username} creatorProfileImg={quiz.creator.personal_info.profile_img} />
                </motion.div>
              );
            })
          ) : (
            <NoDataMessage message="No Quizzes Found" />
          )}
        </div>
      </div>
    </>
  );
};

export default QuizPage;
