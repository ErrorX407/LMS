import React, { useContext, useRef, useState } from "react";
import PostAmbient from "./PostAmbient";
import { UserContext } from "../App";
import toast from "react-hot-toast";
import axios from "axios"; // Make sure axios is imported
import { QuizContext } from "./PublishQuiz";

const AddQuestionsToQuiz = () => {
  const {
    userAuth: { profile_img, access_token },
  } = useContext(UserContext);

  const {
    publishQuiz,
    setPublishQuiz,
    quiz,
    setQuiz,
    quiz: { questions },
  } = useContext(QuizContext);

  const [numForms, setNumForms] = useState(1);
  const addQuetionRef = useRef([]);

  const handleTextareaChange = (e) => {
    let input = e.target;
    input.style.height = "fit-content";
    input.style.height = `${input.scrollHeight}px`;
  };

  const renderForms = () => {
    let forms = [];
    for (let i = 0; i < numForms; i++) {
      forms.push(
        <form
          ref={(el) => (addQuetionRef.current[i] = el)}
          key={i}
          className="w-[98%]"
        >
          <textarea
            name="question"
            rows="1"
            placeholder={`Question: ${i + 1}`}
            aria-label={`Question: ${i + 1}`}
            className="text-area w-[100%] p-4 text-2xl h-fit bg-[#fff]/10 py-3 resize-none outline-none rounded-2xl placeholder:text-white/60 focus:bg-[#fff]/20 mt-4 mb-2"
            onChange={handleTextareaChange}
            onFocus={handleTextareaChange}
          />
          <input
            name="optionOne"
            placeholder="A"
            className="text-area w-[100%] p-4 mb-4 text-2xl h-fit bg-[#fff]/10 py-3 resize-none outline-none rounded-2xl placeholder:text-white/60 focus:bg-[#fff]/20"
          />
          <input
            name="optionTwo"
            placeholder="B"
            className="text-area w-[100%] p-4 mb-4 text-2xl h-fit bg-[#fff]/10 py-3 resize-none outline-none rounded-2xl placeholder:text-white/60 focus:bg-[#fff]/20"
          />
          <input
            name="optionThree"
            placeholder="C"
            className="text-area w-[100%] p-4 mb-4 text-2xl h-fit bg-[#fff]/10 py-3 resize-none outline-none rounded-2xl placeholder:text-white/60 focus:bg-[#fff]/20"
          />
          <input
            name="optionFour"
            placeholder="D"
            className="text-area w-[100%] p-4 mb-4 text-2xl h-fit bg-[#fff]/10 py-3 resize-none outline-none rounded-2xl placeholder:text-white/60 focus:bg-[#fff]/20"
          />
          <input
            name="correctOption"
            placeholder="Correct Option (A, B, C, D)"
            className="text-area w-[100%] p-4 mb-4 text-2xl h-fit bg-[#fff]/10 py-3 resize-none outline-none rounded-2xl placeholder:text-white/60 focus:bg-[#fff]/20"
          />
        </form>
      );
    }
    return forms;
  };

  const handleAddMore = () => {
    setNumForms(numForms + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!access_token) {
      return toast.error("Login to create quiz");
    }

    let formDataArray = [];
    let errors = [];

    for (let i = 0; i < numForms; i++) {
      let form = new FormData(addQuetionRef.current[i]);
      let formData = {};

      for (let [key, value] of form.entries()) {
        formData[key] = value;
      }

      if (!formData.question) {
        errors.push(`Question ${i + 1} field is empty`);
      }
      if (
        !formData.optionOne ||
        !formData.optionTwo ||
        !formData.optionThree ||
        !formData.optionFour
      ) {
        errors.push(`Options are missing for Question ${i + 1}`);
      }
      if (!["A", "B", "C", "D"].includes(formData.correctOption)) {
        errors.push(
          `Correct option for Question ${i + 1} is invalid or missing`
        );
      }

      // Convert options to array
      formData.options = [
        formData.optionOne,
        formData.optionTwo,
        formData.optionThree,
        formData.optionFour,
      ];
      delete formData.optionOne;
      delete formData.optionTwo;
      delete formData.optionThree;
      delete formData.optionFour;

      formDataArray.push(formData);
    }

    if (errors.length > 0) {
      return toast.error(errors.join("\n"));
    }

    console.log(formDataArray);
    setQuiz({...quiz, questions: formDataArray});
    setPublishQuiz(true)

    console.log(quiz.questions);
    // try {
    //   const response = await axios.post(
    //     import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/quiz/addQuestions",
    //     { questions: formDataArray },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${access_token}`,
    //       },
    //     }
    //   );
    //   toast.success(response.data.Message);
    // } catch (error) {
    //   toast.error(error.response.data.Error);
    // }
  };

  return (
    <>
      <PostAmbient banner={profile_img} />
      <div className="px-5 lg:px-10 md:px-8 mt-[50px] md:mt-0 lg:mt-0">
        <h1 className="font-candela text-3xl">Add questions to quiz❓</h1>
        <div className="grid grid-cols-1 md:grid-cols-2">{renderForms()}</div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <button
            onClick={handleSubmit}
            className="w-[98%] mb-5 flex justify-center items-center gap-1 h-16 p-4 bg-[#fff] font-bold rounded-2xl text-2xl text-black mouseenter"
          >
            Upload Question
          </button>
          <button
            onClick={handleAddMore}
            className="w-[98%] flex justify-center items-center gap-1 h-16 p-4 font-bold bg-[#fff]/20 hover:bg-[#fff] rounded-2xl text-2xl hover:text-black active:scale-95"
          >
            Add More! ✨
          </button>
        </div>
      </div>
    </>
  );
};

export default AddQuestionsToQuiz;
