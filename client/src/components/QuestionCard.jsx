import React, { useState } from "react";

const QuestionCard = ({ question, answer, sno }) => {
  const [seeAnswer, setSeeAnswer] = useState(false);

  return (
    <div className="post relative w-full flex-shrink-0 overflow-hidden">
      <div className="p-0">
        <h1 className="font-candela text-2xl md:text-3xl">
          {sno}. {question}
        </h1>

        {seeAnswer ? (
          <>
            <h3 className="md:text-2xl mt-2 p-4 bg-[#8CA309]/20 rounded-2xl">
              {answer}
            </h3>
            <button
              onClick={() => setSeeAnswer(!seeAnswer)}
              className="px-4 py-2 my-4 bg-[#8CA309] text-black font-bold rounded-2xl hover:px-6"
            >
              Hide Solution
            </button>
          </>
        ) : (
          <button
            onClick={() => setSeeAnswer(!seeAnswer)}
            className="px-4 py-2 my-4 bg-[#8CA309] text-black font-bold rounded-2xl hover:px-6"
          >
            See Solution
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
