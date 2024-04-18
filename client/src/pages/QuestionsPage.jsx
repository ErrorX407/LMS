import React, { useContext, Suspense } from "react";
import { motion } from "framer-motion";
import { QuestionBankContext } from "../pages/QuestionBank";
import LoaderTwo from "../components/LoaderTwo";
import NoDataMessage from "../components/NoDataMessage";

const QuestionCard = React.lazy(() => import("../components/QuestionCard"));

const QuestionsPage = () => {
  const { getQuestions } = useContext(QuestionBankContext);
  return (
    <div className="max-w-[900px] m-auto">
      <h1 className="font-candela text-2xl md:text-3xl my-2 mb-8">
        {getQuestions.nbHits} Question found
      </h1>

      <div className="mx-auto max-w-full lg:max-w-full">
        <div className="grid grid-cols-1 gap-x-0 gap-y-10">
          {getQuestions.questionsData.length ? (
            getQuestions.questionsData.map((question, i) => {
              return (
                <Suspense fallback={<p>This is loading...</p>}>
                  <motion.div
                    initial={{ opacity: 0, transform: "translateY(50px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    transition={{
                      delay: 0.1 * i,
                      duration: 2,
                      ease: [0, 0.71, 0.2, 1.01],
                    }}
                    key={i}
                  >
                    <QuestionCard
                      question={question.question}
                      answer={question.answer}
                      sno={i + 1}
                    />
                  </motion.div>
                  {/* <hr className="opacity-30" /> */}
                </Suspense>
              );
            })
          ) : (
            <NoDataMessage message="No Post Found" />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage;
