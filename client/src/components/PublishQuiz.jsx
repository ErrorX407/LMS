import React, { createContext, useState } from 'react'
import PublishQuizForm from './PublishQuizForm';
import AddQuestionsToQuiz from './AddQuestionsToQuiz';

const quizStructure = {
  quizName: "",
  quizDuration: 0,
  marksPerQuestion: 0,
  negativeMarking: 0,
  questions: [{question: "", options: [], correctAnswer: ""}],
  difficulty: "",
  grade: "",
  subject: "",
  creator: { pesonal_info: {} },
};

export const QuizContext = createContext({})

const PublishQuiz = () => {
  const [publishQuiz, setPublishQuiz] = useState(false);
  const [quiz, setQuiz] = useState(quizStructure)

  return (
    <QuizContext.Provider value={{publishQuiz, setPublishQuiz, quiz, setQuiz}}>
    <div className="px-5 lg:px-10 md:px-8 mt-[50px] md:mt-0 lg:mt-0">
        {
          publishQuiz ? <PublishQuizForm /> : <AddQuestionsToQuiz />
        }
    </div>
    </QuizContext.Provider>
  )
}

export default PublishQuiz