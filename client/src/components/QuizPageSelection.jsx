import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { QuizContext } from "../pages/TestSeries";
import LoaderTwo from "./LoaderTwo";
import toast from "react-hot-toast";

const QuizPageSelection = () => {
  const [loading, setLoading] = useState(false);
  const {
    quizState, setQuizState, searchQuiz, setSearchQuiz, getQuiz, setGetQuiz,
    searchQuiz: {grade, subject, difficulty}
  } = useContext(QuizContext)

  const handleQuizSearch = (e) => {
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
        import.meta.env.VITE_SERVER_DOMAIN + `/api/v1/quiz/get?grade=${grade}&subject=${subject}&difficulty=${difficulty}`
      )
      .then(({ data }) => {
        setGetQuiz(data);
        console.log(data);
        setLoading(false);
        button.removeAttribute("disabled");
        setQuizState("quizes");
        toast.success(
          "🎉 Quizzes Discovered! Time to Dive In! 🚀"
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
      <h1 className="font-candela text-3xl">Search For Quiz</h1>
      <div className="w-full md:w-1/2 mt-10">
        <select
          className="mb-5 appearance-none w-full h-16 p-4 bg-[#692690]/20 text-xl md:text-2xl outline-none rounded-2xl focus:bg-[#692690]/40 focus:text-white active:bg-[#692690]/40 active:text-white"
          onChange={(e) =>
            setSearchQuiz({ ...searchQuiz, grade: e.target.value })
          }
        >
          <option selected className="bg-[#692690] text-white text-xl">
            🎓 Choose your class! 📚👩‍🎓
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
          className="appearance-none mb-5 w-full h-16 p-4 bg-[#692690]/20 text-xl md:text-2xl outline-none rounded-2xl focus:bg-[#692690]/40 focus:text-white active:bg-[#692690]/40 active:text-white"
          onChange={(e) =>
            setSearchQuiz({ ...searchQuiz, subject: e.target.value })
          }
        >
          <option selected className="bg-[#692690] text-white text-xl">
            📚 Choose a subject! 📝🤔
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
          <option value="chemistry" className="bg-[#692690] text-white text-xl">
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
          <option value="geography" className="bg-[#692690] text-white text-xl">
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
          className="appearance-none mb-5 w-full h-16 p-4 bg-[#692690]/20 text-xl md:text-2xl outline-none rounded-2xl focus:bg-[#692690]/40 focus:text-white active:bg-[#692690]/40 active:text-white"
          onChange={(e) =>
            setSearchQuiz({ ...searchQuiz, difficulty: e.target.value })
          }
        >
          <option selected className="bg-[#692690] text-white text-xl">
            ⚙️ Choose your challenge! 🎯🌟
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

        <button onClick={handleQuizSearch} className="w-full mb-5 flex justify-center items-center gap-1 h-16 p-4 bg-[#692690] rounded-2xl text-xl md:text-2xl text-white mouseenter">
          {loading ? "Loading..." : "🧠 Let's go! 📝"}
          {loading ? <LoaderTwo size={30} color="text-black" /> : ""}
        </button>
        <Link
          to="/create/quiz"
          className="w-full flex justify-center items-center gap-1 h-16 p-4 bg-[#692690]/50 hover:bg-[#692690] rounded-2xl text-2xl hover:text-white active:scale-95"
        >
          Let's Create Quiz! 🎓✨
        </Link>
      </div>
    </>
  );
};

export default QuizPageSelection;
