import React, { useContext, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { QuestionBankContext } from "../pages/QuestionBank";
import axios from "axios";
import LoaderTwo from "./LoaderTwo";
import { Link } from "react-router-dom";

const QuestionBankSelection = () => {
  const [loading, setLoading] = useState(false);
  const {
    questionBankState,
    setQuestionBankState,
    questions,
    questions: { question, answer, grade, subject, difficulty },
    setQuestions,
    getQuestions,
    setGetQuestions,
  } = useContext(QuestionBankContext);
  
  const handleQuestionBank = (e) => {
    const button = e.target;
    if (!grade || !subject || !difficulty) {
      return toast.error(
        "🚫 Oops! Looks like you missed something. All fields are needed! 😊📝"
      );
    }

    setLoading(true);
    button.setAttribute("disabled", true);

    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN +
          `/api/v1/questionBank/questions?grade=${grade}&subject=${subject}&difficulty=${difficulty}`
      )
      .then(({ data }) => {
        setGetQuestions(data);
        setLoading(false);
        button.removeAttribute("disabled");
        setQuestionBankState("questions");
        toast.success(
          "🎉 Yay! Questions found just for you! Let's dive in! 🤗📚"
        );
      })
      .catch(({ response }) => {
        setLoading(false);
        button.removeAttribute("disabled");
        return toast.error(response.data.message);
      });
  };
  return (
    <>
      <Toaster
        toastOptions={{
          className: "custom-toast",
          success: {
            style: {
              background: "#61d3452d",
            },
          },
          error: {
            style: {
              backgroundColor: "#ff4b4b2d",
            },
          },
        }}
      />
      <h1 className="font-candela text-3xl">Question Bank</h1>
      <div className="w-full md:w-1/2 mt-10">
        <select
          className="mb-5 appearance-none w-full h-16 p-4 bg-[#8CA309]/20 text-xl md:text-2xl outline-none rounded-2xl focus:bg-[#8CA309]/40 focus:text-white active:bg-[#8CA309]/40 active:text-white"
          onChange={(e) =>
            setQuestions({ ...questions, grade: e.target.value })
          }
        >
          <option selected className="bg-[#8CA309] text-white text-xl">
            🎓 Choose your class! 📚👩‍🎓
          </option>
          <option value="class6" className="bg-[#8CA309] text-white text-xl">
            Class 6th
          </option>
          <option value="class7" className="bg-[#8CA309] text-white text-xl">
            Class 7th
          </option>
          <option value="class8" className="bg-[#8CA309] text-white text-xl">
            Class 8th
          </option>
          <option value="class9" className="bg-[#8CA309] text-white text-xl">
            Class 9th
          </option>
          <option value="class10" className="bg-[#8CA309] text-white text-xl">
            Class 10th
          </option>
          <option value="class11" className="bg-[#8CA309] text-white text-xl">
            Class 11th
          </option>
          <option value="class12" className="bg-[#8CA309] text-white text-xl">
            Class 12th
          </option>
        </select>

        <select
          className="appearance-none mb-5 w-full h-16 p-4 bg-[#8CA309]/20 text-xl md:text-2xl outline-none rounded-2xl focus:bg-[#8CA309]/40 focus:text-white active:bg-[#8CA309]/40 active:text-white"
          onChange={(e) =>
            setQuestions({ ...questions, subject: e.target.value })
          }
        >
          <option selected className="bg-[#8CA309] text-white text-xl">
            📚 Choose a subject! 📝🤔
          </option>
          <option value="science" className="bg-[#8CA309] text-white text-xl">
            Science
          </option>
          <option value="accountancy" className="bg-[#8CA309] text-white text-xl">
            Accountancy
          </option>
          <option
            value="bussinessStudies"
            className="bg-[#8CA309] text-white text-xl"
          >
            Bussiness Studies
          </option>
          <option value="biology" className="bg-[#8CA309] text-white text-xl">
            Biology
          </option>
          <option value="chemistry" className="bg-[#8CA309] text-white text-xl">
            Chemistry
          </option>
          <option value="english" className="bg-[#8CA309] text-white text-xl">
            English
          </option>
          <option value="ecoCommerce" className="bg-[#8CA309] text-white text-xl">
            Economics(Commerce)
          </option>
          <option
            value="ecoHumanities"
            className="bg-[#8CA309] text-white text-xl"
          >
            Economics(Humanities)
          </option>
          <option value="geography" className="bg-[#8CA309] text-white text-xl">
            Geography
          </option>
          <option value="hindi" className="bg-[#8CA309] text-white text-xl">
            Hindi
          </option>
          <option value="history" className="bg-[#8CA309] text-white text-xl">
            History
          </option>
          <option value="maths" className="bg-[#8CA309] text-white text-xl">
            Maths
          </option>
          <option
            value="mathsCommerce"
            className="bg-[#8CA309] text-white text-xl"
          >
            Maths (Commerce)
          </option>
          <option value="mathsScience" className="bg-[#8CA309] text-white text-xl">
            Maths (Science)
          </option>
          <option value="physics" className="bg-[#8CA309] text-white text-xl">
            Physics
          </option>
          <option
            value="politicalScience"
            className="bg-[#8CA309] text-white text-xl"
          >
            Political Science
          </option>
          <option
            value="social-science"
            className="bg-[#8CA309] text-white text-xl"
          >
            Social Science
          </option>
        </select>

        <select
          className="appearance-none mb-5 w-full h-16 p-4 bg-[#8CA309]/20 text-xl md:text-2xl outline-none rounded-2xl focus:bg-[#8CA309]/40 focus:text-white active:bg-[#8CA309]/40 active:text-white"
          onChange={(e) =>
            setQuestions({ ...questions, difficulty: e.target.value })
          }
        >
          <option selected className="bg-[#8CA309] text-white text-xl">
            ⚙️ Choose your challenge! 🎯🌟
          </option>
          <option value="easy" className="bg-[#8CA309] text-white text-xl">
            Easy
          </option>
          <option value="medium" className="bg-[#8CA309] text-white text-xl">
            Medium
          </option>
          <option value="hard" className="bg-[#8CA309] text-white text-xl">
            Hard
          </option>
          <option value="jee" className="bg-[#8CA309] text-white text-xl">
            JEE Advanced
          </option>
          <option value="neet" className="bg-[#8CA309] text-white text-xl">
            NEET
          </option>
        </select>

        <button
          onClick={handleQuestionBank}
          className="w-full mb-5 flex justify-center items-center gap-1 h-16 p-4 bg-[#8CA309] rounded-2xl text-xl md:text-2xl text-black mouseenter"
        >
          {loading ? "Loading..." : "🔍 Get Questions! 🤔📚"}
          {loading ? <LoaderTwo size={30} color="text-black" /> : ""}
        </button>
        <Link to="/add-questions"
          className="w-full flex justify-center items-center gap-1 h-16 p-4 bg-[#8CA309]/50 hover:bg-[#8CA309] rounded-2xl text-2xl hover:text-black active:scale-95"
        >
          Let's Add Questions! ✨
        </Link>
      </div>
    </>
  );
};

export default QuestionBankSelection;
