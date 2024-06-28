import React, { createContext, useState } from "react";
import PostAmbient from "../components/PostAmbient";
import QuizPageSelection from "../components/QuizPageSelection";
import QuizPage from "./QuizPage";

const SearchQuizStructure = {
  grade: "",
  subject: "",
  difficulty: "",
};

export const QuizContext = createContext({});

const TestSeries = () => {
  const [quizState, setQuizState] = useState("selection");
  const [searchQuiz, setSearchQuiz] = useState(SearchQuizStructure);
  const [getQuiz, setGetQuiz] = useState({});
  return (
    <QuizContext.Provider value={{ quizState, setQuizState, searchQuiz, setSearchQuiz, getQuiz, setGetQuiz }}>
      <PostAmbient banner="https://images.unsplash.com/photo-1529912626516-e58b23f44f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXN0aGV0aWMlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D" />
      <div className="px-5 lg:px-10 md:px-8 mt-[50px] md:mt-0 lg:mt-0">
        {quizState == "selection" ? <QuizPageSelection /> : <QuizPage />}
      </div>
    </QuizContext.Provider>
  );
};

export default TestSeries;
