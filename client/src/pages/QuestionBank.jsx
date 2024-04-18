import React, { createContext, useState } from "react";
import PostAmbient from "../components/PostAmbient";
import QuestionBankSelection from "../components/QuestionBankSelection";
import QuestionsPage from "./QuestionsPage";

const QuestionBankStructure = {
  question: "",
  answer: "",
  grade: "",
  subject: "",
  difficulty: "",
}

export const QuestionBankContext = createContext({});

const Solutions = () => {
  const [questionBankState, setQuestionBankState] = useState("selection");
  const [questions, setQuestions] = useState(QuestionBankStructure);
  const [getQuestions, setGetQuestions] = useState({});
  return (
    <QuestionBankContext.Provider value={{questionBankState, setQuestionBankState, questions, setQuestions, getQuestions, setGetQuestions }}>
      <PostAmbient banner="https://images.unsplash.com/photo-1652267101042-e72110191468?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGdyZWVuJTIwYXN0aGV0aWN8ZW58MHx8MHx8fDA%3D" />
      <div className="px-5 lg:px-10 md:px-8 mt-[50px] md:mt-0 lg:mt-0">
      {
        questionBankState == "selection" ? <QuestionBankSelection /> : <QuestionsPage />
      }
      </div>
    </QuestionBankContext.Provider>
  );
};

export default Solutions;