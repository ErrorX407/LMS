import Questions from "../models/Questions.js";

export const getAllQuestions = async (req, res) => {
  let apiData = Questions.find(req.query).select("question answer grade subject difficulty likes -_id");
  let questionsData = await apiData;
  // console.log(req.query);

  if (questionsData.length === 0) {
    return res.status(400).json({ message: "🙁 Oops! We couldn't find what you're looking for! 🚫🔍" });
  } else {
    return res.status(200).json({ nbHits: questionsData.length, questionsData });
  }
};
