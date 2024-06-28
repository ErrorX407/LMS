import React, { useContext, useRef, useState } from "react";
import PostAmbient from "../components/PostAmbient";
import { QuestionBankContext } from "./QuestionBank";
import { UserContext } from "../App";
import axios from "axios";
import toast from "react-hot-toast";
import InputBox from "../components/InputBox";

const AddQuestions = () => {
  const {
    userAuth: { access_token },
  } = useContext(UserContext);
  const [numForms, setNumForms] = useState(1); // State to track the number of forms
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
        <form ref={el => addQuetionRef.current[i] = el} key={i} className="w-[98%]">
          {/* <textarea
            name="question"
            rows="1"
            placeholder="Type question ✨"
            className="text-area w-[100%] p-4 text-2xl h-fit bg-[#692690]/20 py-3 resize-none outline-none rounded-2xl placeholder:text-white/60 focus:bg-[#692690]/40 my-4"
            // onKeyDown={onCommentKeyDown}
            onChange={handleTextareaChange}
            onFocus={handleTextareaChange}
          /> */}
          <InputBox name="question" placeholder="Enter the question" theme="#692690" />
          <InputBox name="answer" placeholder="Choose the correct option" theme="#692690" />
          <select
            name="grade"
            className="mb-5 appearance-none w-full h-16 p-4 bg-[#692690]/20 text-2xl outline-none rounded-2xl focus:bg-[#692690]/40 focus:text-white active:bg-[#692690]/40 active:text-white"
            // onChange={(e) =>
            //   setQuestions({ ...questions, grade: e.target.value })
            // }
          >
            <option selected className="bg-[#692690] text-white text-xl">
              🎓 Choose class! 👩‍🎓
            </option>
            <option value="class6" className="bg-[#692690] text-white text-xl">
              Class 6th
            </option>
            <option value="class7" className="bg-[#692690] text-white text-xl">
              Class 7th
            </option>
            <option value="class8" className="bg-[#692690] text-white text-xl">
              Class 8th
            </option>
            <option value="class9" className="bg-[#692690] text-white text-xl">
              Class 9th
            </option>
            <option value="class10" className="bg-[#692690] text-white text-xl">
              Class 10th
            </option>
            <option value="class11" className="bg-[#692690] text-white text-xl">
              Class 11th
            </option>
            <option value="class12" className="bg-[#692690] text-white text-xl">
              Class 12th
            </option>
          </select>

          <select
            name="subject"
            className="appearance-none mb-5 w-full h-16 p-4 bg-[#692690]/20 text-2xl outline-none rounded-2xl focus:bg-[#692690]/40 focus:text-white active:bg-[#692690]/40 active:text-white"
            // onChange={(e) =>
            //   setQuestions({ ...questions, subject: e.target.value })
            // }
          >
            <option selected className="bg-[#692690] text-white text-xl">
              📚 Select subject!
            </option>
            <option value="science" className="bg-[#692690] text-white text-xl">
              Science
            </option>
            <option
              value="accountancy"
              className="bg-[#692690] text-white text-xl"
            >
              Accountancy
            </option>
            <option
              value="bussinessStudies"
              className="bg-[#692690] text-white text-xl"
            >
              Bussiness Studies
            </option>
            <option value="biology" className="bg-[#692690] text-white text-xl">
              Biology
            </option>
            <option
              value="chemistry"
              className="bg-[#692690] text-white text-xl"
            >
              Chemistry
            </option>
            <option value="english" className="bg-[#692690] text-white text-xl">
              English
            </option>
            <option
              value="ecoCommerce"
              className="bg-[#692690] text-white text-xl"
            >
              Economics(Commerce)
            </option>
            <option
              value="ecoHumanities"
              className="bg-[#692690] text-white text-xl"
            >
              Economics(Humanities)
            </option>
            <option
              value="geography"
              className="bg-[#692690] text-white text-xl"
            >
              Geography
            </option>
            <option value="hindi" className="bg-[#692690] text-white text-xl">
              Hindi
            </option>
            <option value="history" className="bg-[#692690] text-white text-xl">
              History
            </option>
            <option value="maths" className="bg-[#692690] text-white text-xl">
              Maths
            </option>
            <option
              value="mathsCommerce"
              className="bg-[#692690] text-white text-xl"
            >
              Maths (Commerce)
            </option>
            <option
              value="mathsScience"
              className="bg-[#692690] text-white text-xl"
            >
              Maths (Science)
            </option>
            <option value="physics" className="bg-[#692690] text-white text-xl">
              Physics
            </option>
            <option
              value="politicalScience"
              className="bg-[#692690] text-white text-xl"
            >
              Political Science
            </option>
            <option
              value="social-science"
              className="bg-[#692690] text-white text-xl"
            >
              Social Science
            </option>
          </select>

          <select
            name="difficulty"
            className="appearance-none mb-5 w-full h-16 p-4 bg-[#692690]/20 text-2xl outline-none rounded-2xl focus:bg-[#692690]/40 focus:text-white active:bg-[#692690]/40 active:text-white"
            // onChange={(e) =>
            //   setQuestions({ ...questions, difficulty: e.target.value })
            // }
          >
            <option selected className="bg-[#692690] text-white text-xl">
              Select Difficulty! 🎯🌟
            </option>
            <option value="easy" className="bg-[#692690] text-white text-xl">
              Easy
            </option>
            <option value="medium" className="bg-[#692690] text-white text-xl">
              Medium
            </option>
            <option value="hard" className="bg-[#692690] text-white text-xl">
              Hard
            </option>
            <option value="jee" className="bg-[#692690] text-white text-xl">
              JEE Advanced
            </option>
            <option value="neet" className="bg-[#692690] text-white text-xl">
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
      let formDataArray = [];
  
      for (let i = 0; i < numForms; i++) {
        let form = new FormData(addQuetionRef.current[i]);
        let formData = {};
  
        for (let [key, value] of form.entries()) {
          formData[key] = value;
        }
  
        if (!formData.question || !formData.answer || formData.grade === "🎓 Choose class! 👩‍🎓" || formData.subject === "📚 Select subject!" || formData.difficulty === "Select Difficulty! 🎯🌟") {
          return toast.error("All fields are required")
        }
        formDataArray.push(formData);
      }

      axios.post(
        import.meta.env.VITE_SERVER_DOMAIN +
          "/api/v1/questionBank/questions/add",
        formDataArray,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      ).then(()=>{
        return toast.success("Questions Added Successfully")
      }).catch(({response}) => {
        console.log(response);
        // return toast.error(response)
      });
    } else {
      return toast.error("Login to upload questions");
    }
  };
  

  return (
    <>
      <PostAmbient banner="https://images.unsplash.com/photo-1529912626516-e58b23f44f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXN0aGV0aWMlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D" />

      <div className="px-5 lg:px-10 md:px-8 mt-[50px] md:mt-0 lg:mt-0">
        <h1 className="font-candela text-3xl">Create Quiz</h1>

        {/* Render dynamic forms */}
        <div className="grid grid-cols-1 md:grid-cols-2">{renderForms()}</div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <button
            onClick={handleSubmit}
            className="w-[98%] mb-5 flex justify-center items-center gap-1 h-16 p-4 bg-[#692690] font-bold rounded-2xl text-2xl mouseenter"
          >
            Upload Question
          </button>
          <button
          onClick={handleAddMore}
          className="w-[98%] flex justify-center items-center gap-1 h-16 p-4 font-bold bg-[#692690]/50 hover:bg-[#692690] rounded-2xl text-2xl active:scale-95"
        >
          Add More! ✨
        </button>
        </div>
      </div>
    </>
  );
};

export default AddQuestions;
