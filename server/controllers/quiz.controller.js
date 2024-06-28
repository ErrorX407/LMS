import { customAlphabet } from "nanoid";
import crypto from "crypto";
import Quiz from "../models/Quiz.js";
import User from "../models/User.js";

export const createQuiz = async (req, res) => {
  const {
    quizName,
    marksPerQuestion,
    negativeMarking,
    quizDuration,
    quizEndDate,
    grade,
    subject,
    difficulty,
    username,
    questions,
  } = req.body;

  const alphabet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const timestamp = Date.now();
  // Generate a random string to ensure uniqueness
  const uniqueRandomString = customAlphabet(alphabet, 10)(username);

  // Check if username and title are defined
  if (!username) {
    return res.status(403).json({ Error: "Username is missing." });
  }
  const timestampHash = crypto
    .createHash("sha256")
    .update(timestamp.toString())
    .digest("hex")
    .substring(0, 10);

  // Combine the hashed username, title, and random string
  // Combine the hashed username, title, random string, and timestamp
  let quiz_id =`${uniqueRandomString}${timestampHash}`;

  try {
    const foundCreator = await User.findOne({
      "personal_info.username": username,
    }).select("_id");

    const newQuiz = new Quiz({
      quizName,
      quizDuration,
      marksPerQuestion,
      negativeMarking,
      quiz_id,
      grade,
      subject,
      difficulty,
      creator: foundCreator._id,
      questions,
    });

    await newQuiz.save();
    return res.status(200).json({ Message: "Quiz created successfully 🎉!" });
  } catch (error) {
    return res.status(500).json({ Error: error.message });
  }
};

export const addQuestionsToQuiz = async (req, res) => {
  const { questions } = req.body;
  const quizId = req.params.quizId; // Assuming you pass the quiz ID in the URL

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ Error: "Quiz not found" });
    }

    quiz.questions.push(...questions);
    await quiz.save();

    return res
      .status(200)
      .json({ Message: "Questions added successfully 🎉!" });
  } catch (error) {
    return res.status(500).json({ Error: error.message });
  }
};

export const getQuiz = async (req, res) => {
  let apiData = Quiz.find(req.query)
    .populate({
      path: "creator",
      select: "personal_info -_id",
      populate: {
        path: "personal_info",
        select: "personal_info.username personal_info.profile_img",
        model: "User", // assuming the model name is 'User'
      },
    })
    .sort({ publishedAt: -1 })
    .select("-_id");
  let quizData = await apiData;
  // console.log(req.query);

  if (quizData.length === 0) {
    return res.status(400).json({
      message: "🙁 Oops! We couldn't find ''Quiz'' you're looking for! 🚫🔍",
    });
  } else {
    return res.status(200).json({ nbHits: quizData.length, quizData });
  }
};
