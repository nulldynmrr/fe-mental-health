import React from "react";
import { FaCalendar } from "react-icons/fa6";

const Upper = () => {
  return (
    <div className="flex flex-row justify-between items-center mb-7">
      <h1 className="text-3xl font-bold">Histori</h1>
      <div className="pr-4">
        <FaCalendar className="text-neut-600 w-6 h-6" />
      </div>
    </div>
  );
};

export default Upper;
