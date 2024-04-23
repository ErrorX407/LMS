import Questions from "../models/Questions.js";

export const getAllQuestions = async (req, res) => {
  let apiData = Questions.find(req.query).sort({ publishedAt: -1 }).select("question answer grade subject difficulty likes -_id");
  let questionsData = await apiData;
  // console.log(req.query);

  if (questionsData.length === 0) {
    return res.status(400).json({ message: "🙁 Oops! We couldn't find what you're looking for! 🚫🔍" });
  } else {
    return res.status(200).json({ nbHits: questionsData.length, questionsData });
  }
};

export const addQuestions = async (req, res) => {
  try {
    const questionsData = req.body; // Assuming req.body is an array of question objects

    // Loop through the array of question objects and save each one
    for (const questionData of questionsData) {
      const { question, answer, grade, subject, difficulty } = questionData;

      // Create a new instance of the Questions model for each question object
      const newQuestion = new Questions({
        question,
        answer,
        grade,
        subject,
        difficulty,
      });

      // Save each question to the database
      await newQuestion.save();
    }

    return res.status(200).json({ message: "Questions Added Successfully!" });
  } catch (err) {
    return res.status(500).json({ Error: err.message });
  }
};