import React, { useContext, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { UserContext } from '../App';
import InputBox from './InputBox';
import CustomDatePicker from './CustomDatePicker';
import PostAmbient from './PostAmbient';
import { QuizContext } from './PublishQuiz';
import axios from 'axios';

const PublishQuizForm = () => {
    const {
      userAuth: { access_token, username },
    } = useContext(UserContext);

    const {
      publishQuiz,
      setPublishQuiz,
      quiz,
      setQuiz,
      quiz: { questions },
    } = useContext(QuizContext);

    const [selectedDate, setSelectedDate] = useState(null);
    const formRef = useRef();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleQuizSubmit= (e) => {
      e.preventDefault();
      const button = e.target

      if (!access_token) {
        return toast.error("Login to create a quiz ☠️")
      }

      const questions = quiz.questions

      const form = new FormData(formRef.current);
      let formData = {username, questions, };

      for (let [key, value] of form.entries()) {
        formData[key] = value;
      }

      let { quizName, marksPerQuestion, negativeMarking, quizDuration, quizEndDate, grade, subject, difficulty } = formData;

      if (!quizName || !marksPerQuestion || !quizDuration || !quizEndDate || grade === "🎓 Choose class! 👩‍🎓" || subject === "📚 Select subject!" || difficulty === "Select Difficulty! 🎯🌟") {
        return toast.error("All fields are required")
      }

      if (!negativeMarking ) {
        return toast.error("Negative marking is required (0 for no negative markings)")
      }

      console.log(formData);

      button.setAttribute("disabled", true)
      // console.log(formData);

      axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/api/v1/quiz/create", formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }).then(({data}) => {
        button.removeAttribute("disabled")
        return toast.success(data.Message);
      }).catch(({response}) => {
        button.removeAttribute("disabled")
        return toast.error(response.data.Error)
      })
  }
  return (
    <>
    <PostAmbient banner="https://i.pinimg.com/564x/d5/31/c2/d531c2bd0ecd8955ae5c818c784941ae.jpg" />
    <h1 className="font-candela text-3xl mb-5">Create Quiz</h1>
        <form ref={formRef}>
        <InputBox type="text" name="quizName" placeholder="Quiz Name" theme="#289428" />
        <InputBox type="number" name="marksPerQuestion" placeholder="Marks for each question" theme="#289428" />
        <InputBox type="number" name="negativeMarking" placeholder="Negative Marking" theme="#289428" />
        <InputBox type="number" name="quizDuration" placeholder="Quiz Duration (in seconds)" theme="#289428" />
        <CustomDatePicker selectedDate={selectedDate} handleDateChange={handleDateChange} name="quizEndDate" placeholder="Quiz End Date (DD/MM/YYYY)" theme="#289428" />

          <select
            name="grade"
            className="mb-5 appearance-none w-full h-16 p-4 bg-[#289428]/20 text-2xl outline-none rounded-2xl focus:bg-[#289428]/40 focus:text-white active:bg-[#289428]/40 active:text-white"
            // onChange={(e) =>
            //   setQuestions({ ...questions, grade: e.target.value })
            // }
          >
            <option selected className="bg-[#289428] text-white text-xl">
              🎓 Choose class! 👩‍🎓
            </option>
            <option value="class6" className="bg-[#289428] text-white text-xl">
              Class 6th
            </option>
            <option value="class7" className="bg-[#289428] text-white text-xl">
              Class 7th
            </option>
            <option value="class8" className="bg-[#289428] text-white text-xl">
              Class 8th
            </option>
            <option value="class9" className="bg-[#289428] text-white text-xl">
              Class 9th
            </option>
            <option value="class10" className="bg-[#289428] text-white text-xl">
              Class 10th
            </option>
            <option value="class11" className="bg-[#289428] text-white text-xl">
              Class 11th
            </option>
            <option value="class12" className="bg-[#289428] text-white text-xl">
              Class 12th
            </option>
          </select>

          <select
            name="subject"
            className="appearance-none mb-5 w-full h-16 p-4 bg-[#289428]/20 text-2xl outline-none rounded-2xl focus:bg-[#289428]/40 focus:text-white active:bg-[#289428]/40 active:text-white"
            // onChange={(e) =>
            //   setQuestions({ ...questions, subject: e.target.value })
            // }
          >
            <option selected className="bg-[#289428] text-white text-xl">
              📚 Select subject!
            </option>
            <option value="science" className="bg-[#289428] text-white text-xl">
              Science
            </option>
            <option
              value="accountancy"
              className="bg-[#289428] text-white text-xl"
            >
              Accountancy
            </option>
            <option
              value="bussinessStudies"
              className="bg-[#289428] text-white text-xl"
            >
              Bussiness Studies
            </option>
            <option value="biology" className="bg-[#289428] text-white text-xl">
              Biology
            </option>
            <option
              value="chemistry"
              className="bg-[#289428] text-white text-xl"
            >
              Chemistry
            </option>
            <option value="english" className="bg-[#289428] text-white text-xl">
              English
            </option>
            <option
              value="ecoCommerce"
              className="bg-[#289428] text-white text-xl"
            >
              Economics(Commerce)
            </option>
            <option
              value="ecoHumanities"
              className="bg-[#289428] text-white text-xl"
            >
              Economics(Humanities)
            </option>
            <option
              value="geography"
              className="bg-[#289428] text-white text-xl"
            >
              Geography
            </option>
            <option value="hindi" className="bg-[#289428] text-white text-xl">
              Hindi
            </option>
            <option value="history" className="bg-[#289428] text-white text-xl">
              History
            </option>
            <option value="maths" className="bg-[#289428] text-white text-xl">
              Maths
            </option>
            <option
              value="mathsCommerce"
              className="bg-[#289428] text-white text-xl"
            >
              Maths (Commerce)
            </option>
            <option
              value="mathsScience"
              className="bg-[#289428] text-white text-xl"
            >
              Maths (Science)
            </option>
            <option value="physics" className="bg-[#289428] text-white text-xl">
              Physics
            </option>
            <option
              value="politicalScience"
              className="bg-[#289428] text-white text-xl"
            >
              Political Science
            </option>
            <option
              value="social-science"
              className="bg-[#289428] text-white text-xl"
            >
              Social Science
            </option>
          </select>

          <select
            name="difficulty"
            className="appearance-none mb-5 w-full h-16 p-4 bg-[#289428]/20 text-2xl outline-none rounded-2xl focus:bg-[#289428]/40 focus:text-white active:bg-[#289428]/40 active:text-white"
            // onChange={(e) =>
            //   setQuestions({ ...questions, difficulty: e.target.value })
            // }
          >
            <option selected className="bg-[#289428] text-white text-xl">
              Select Difficulty! 🎯🌟
            </option>
            <option value="easy" className="bg-[#289428] text-white text-xl">
              Easy
            </option>
            <option value="medium" className="bg-[#289428] text-white text-xl">
              Medium
            </option>
            <option value="hard" className="bg-[#289428] text-white text-xl">
              Hard
            </option>
            <option value="jee" className="bg-[#289428] text-white text-xl">
              JEE Advanced
            </option>
            <option value="neet" className="bg-[#289428] text-white text-xl">
              NEET
            </option>
          </select>

          <button
          onClick={handleQuizSubmit}
            className="w-[98%] mb-5 flex justify-center items-center gap-1 h-16 p-4 bg-[#289428] font-bold rounded-2xl text-2xl mouseenter"
          >
            Publish Quiz
          </button>
        </form>
    </>
  )
}

export default PublishQuizForm