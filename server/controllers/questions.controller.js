import Questions from "../models/Questions.js";

export const getAllQuestions = async (req, res) => {
  let apiData = Questions.find(req.query);
  let questionsData = await apiData;

  if (questionsData.length === 0) {
    res.status(400).json({ msg: "Sorry, We Nothing Found That You Want !!!" });
  } else {
    res.status(200).json({ nbHits: questionsData.length, questionsData });
  }
  console.log(req.query);
};
