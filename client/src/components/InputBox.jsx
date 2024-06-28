// InputBox.jsx
import React from "react";

const InputBox = ({ placeholder, type, name, theme }) => {

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`text-area w-[100%] p-4 mb-4 text-2xl h-fit bg-[${theme}]/20 py-3 resize-none outline-none rounded-2xl placeholder:text-white/60 focus:bg-[${theme}]/40`}
      />
    </div>
  );
};

export default InputBox;