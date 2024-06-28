import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ placeholder, name, theme, selectedDate, handleDateChange }) => {
  return (
    <DatePicker
      selected={selectedDate}
      dateFormat="dd/MM/yyyy"
      onChange={date => {
        handleDateChange(date);
      }}
      name={name}
      placeholderText={placeholder}
      wrapperClassName="w-full"
      className={`text-area w-[100%] p-4 mb-4 text-2xl h-fit bg-[${theme}]/20 py-3 resize-none outline-none rounded-2xl placeholder:text-white/60 focus:bg-[${theme}]/40`}
    />
  );
};

export default CustomDatePicker;
