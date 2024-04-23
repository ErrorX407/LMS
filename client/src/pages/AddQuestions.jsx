import React, { useContext, useRef, useState } from "react";
import PostAmbient from "../components/PostAmbient";
import { QuestionBankContext } from "./QuestionBank";
import { UserContext } from "../App";
import axios from "axios";
import toast from "react-hot-toast";

const AddQuestions = () => {
  const {
    userAuth: { access_token },
  } = useContext(UserContext);
  const [numForms, setNumForms] = useState(1); // State to track the number of forms
  const addQuetionRef = useRef();

  const handleTextareaChange = (e) => {
    let input = e.target;

    input.style.height = "fit-content";
    input.style.height = `${input.scrollHeight}px`;
  };

  const renderForms = () => {
    let forms = [];
    for (let i = 0; i < numForms; i++) {
      forms.push(
        <form ref={addQuetionRef} key={i} className="w-[98%]">
          <textarea
            name="question"
            rows="1"
            placeholder="Type question ✨"
            className="text-area w-[100%] p-4 text-2xl h-fit bg-[#72380B]/20 py-3 resize-none outline-none rounded-2xl placeholder:text-white/60 focus:bg-[#72380B]/40 my-4"
            // onKeyDown={onCommentKeyDown}
            onChange={handleTextareaChange}
            onFocus={handleTextareaChange}
          />
          <textarea
            name="answer"
            rows="1"
            placeholder="Type answer ✨"
            className="text-area w-[100%] p-4 mb-4 text-2xl h-fit bg-[#72380B]/20 py-3 resize-none outline-none rounded-2xl placeholder:text-white/60 focus:bg-[#72380B]/40"
            onChange={handleTextareaChange}
            onFocus={handleTextareaChange}
          />
          <select
            name="grade"
            className="mb-5 appearance-none w-full h-16 p-4 bg-[#72380B]/20 text-2xl outline-none rounded-2xl focus:bg-[#72380B]/40 focus:text-white active:bg-[#72380B]/40 active:text-white"
            // onChange={(e) =>
            //   setQuestions({ ...questions, grade: e.target.value })
            // }
          >
            <option selected className="bg-[#72380B] text-white text-xl">
              🎓 Choose class! 👩‍🎓
            </option>
            <option value="class6" className="bg-[#72380B] text-white text-xl">
              Class 6th
            </option>
            <option value="class7" className="bg-[#72380B] text-white text-xl">
              Class 7th
            </option>
            <option value="class8" className="bg-[#72380B] text-white text-xl">
              Class 8th
            </option>
            <option value="class9" className="bg-[#72380B] text-white text-xl">
              Class 9th
            </option>
            <option value="class10" className="bg-[#72380B] text-white text-xl">
              Class 10th
            </option>
            <option value="class11" className="bg-[#72380B] text-white text-xl">
              Class 11th
            </option>
            <option value="class12" className="bg-[#72380B] text-white text-xl">
              Class 12th
            </option>
          </select>

          <select
            name="subject"
            className="appearance-none mb-5 w-full h-16 p-4 bg-[#72380B]/20 text-2xl outline-none rounded-2xl focus:bg-[#72380B]/40 focus:text-white active:bg-[#72380B]/40 active:text-white"
            // onChange={(e) =>
            //   setQuestions({ ...questions, subject: e.target.value })
            // }
          >
            <option selected className="bg-[#72380B] text-white text-xl">
              📚 Select subject!
            </option>
            <option value="science" className="bg-[#72380B] text-white text-xl">
              Science
            </option>
            <option
              value="accountancy"
              className="bg-[#72380B] text-white text-xl"
            >
              Accountancy
            </option>
            <option
              value="bussinessStudies"
              className="bg-[#72380B] text-white text-xl"
            >
              Bussiness Studies
            </option>
            <option value="biology" className="bg-[#72380B] text-white text-xl">
              Biology
            </option>
            <option
              value="chemistry"
              className="bg-[#72380B] text-white text-xl"
            >
              Chemistry
            </option>
            <option value="english" className="bg-[#72380B] text-white text-xl">
              English
            </option>
            <option
              value="ecoCommerce"
              className="bg-[#72380B] text-white text-xl"
            >
              Economics(Commerce)
            </option>
            <option
              value="ecoHumanities"
              className="bg-[#72380B] text-white text-xl"
            >
              Economics(Humanities)
            </option>
            <option
              value="geography"
              className="bg-[#72380B] text-white text-xl"
            >
              Geography
            </option>
            <option value="hindi" className="bg-[#72380B] text-white text-xl">
              Hindi
            </option>
            <option value="history" className="bg-[#72380B] text-white text-xl">
              History
            </option>
            <option value="maths" className="bg-[#72380B] text-white text-xl">
              Maths
            </option>
            <option
              value="mathsCommerce"
              className="bg-[#72380B] text-white text-xl"
            >
              Maths (Commerce)
            </option>
            <option
              value="mathsScience"
              className="bg-[#72380B] text-white text-xl"
            >
              Maths (Science)
            </option>
            <option value="physics" className="bg-[#72380B] text-white text-xl">
              Physics
            </option>
            <option
              value="politicalScience"
              className="bg-[#72380B] text-white text-xl"
            >
              Political Science
            </option>
            <option
              value="social-science"
              className="bg-[#72380B] text-white text-xl"
            >
              Social Science
            </option>
          </select>

          <select
            name="difficulty"
            className="appearance-none mb-5 w-full h-16 p-4 bg-[#72380B]/20 text-2xl outline-none rounded-2xl focus:bg-[#72380B]/40 focus:text-white active:bg-[#72380B]/40 active:text-white"
            // onChange={(e) =>
            //   setQuestions({ ...questions, difficulty: e.target.value })
            // }
          >
            <option selected className="bg-[#72380B] text-white text-xl">
              Select Difficulty! 🎯🌟
            </option>
            <option value="easy" className="bg-[#72380B] text-white text-xl">
              Easy
            </option>
            <option value="medium" className="bg-[#72380B] text-white text-xl">
              Medium
            </option>
            <option value="hard" className="bg-[#72380B] text-white text-xl">
              Hard
            </option>
            <option value="jee" className="bg-[#72380B] text-white text-xl">
              JEE Advanced
            </option>
            <option value="neet" className="bg-[#72380B] text-white text-xl">
              NEET
            </option>
          </select>
        </form>
      );
    }
    return forms;
  };

  const handleAddMore = () => {
    setNumForms(numForms + 1); // Increment the number of forms
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (access_token) {
      let form = new FormData(addQuetionRef.current);
      let formData = {};

      for (let [key, value] of form.entries()) {
        formData[key] = value;
      }

      let { question, answer, grade, subject, difficulty } = formData;

      if (!question || !answer || !grade || !subject || !difficulty) {
        return toast.error("All fields are required")
      }
      if (!question || question=="") {
        return toast.error("Question is required")
      }
      if (!answer || answer=="") {
        return toast.error("Answer is required")
      }
      if (!grade || grade=="") {
        return toast.error("Grade is required")
      }
      if (!subject || subject=="") {
        return toast.error("Subject is required")
      }
      if (!difficulty || difficulty=="") {
        return toast.error("Difficulty is required")
      }
      axios.post(
        import.meta.env.VITE_SERVER_DOMAIN +
          "api/v1/questionBank/questions/add",
        {
          formData,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      ).then(()=>{
        return toast.success("Question Added Successfully")
      }).catch(({response}) => {
        return toast.error(response)
      })
    }else{
      return toast.error("Login to upload questions")
    }
  };

  return (
    <>
      <PostAmbient banner="https://images.unsplash.com/photo-1571829604981-ea159f94e5ad?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

      <div className="px-5 lg:px-10 md:px-8 mt-[50px] md:mt-0 lg:mt-0">
        <h1 className="font-candela text-3xl">Add Questions</h1>

        {/* Render dynamic forms */}
        <div className="grid grid-cols-1 md:grid-cols-2">{renderForms()}</div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <button
            onClick={handleSubmit}
            className="w-[98%] mb-5 flex justify-center items-center gap-1 h-16 p-4 bg-[#72380B] font-bold rounded-2xl text-2xl text-black mouseenter"
          >
            Upload Question
          </button>
          {/* <button
          onClick={handleAddMore}
          className="w-[98%] flex justify-center items-center gap-1 h-16 p-4 font-bold bg-[#72380B]/50 hover:bg-[#72380B] rounded-2xl text-2xl hover:text-black active:scale-95"
        >
          Add More! ✨
        </button> */}
        </div>
      </div>
    </>
  );
};

export default AddQuestions;
