"use client";
import React from "react";

const JournalCard = ({ title, description, date, selected, onSelect }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between transition">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg truncate text-black">{title}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">{description}</p>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold">{date}</span>
        <input
          type="radio"
          checked={selected}
          onChange={onSelect}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded-full focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default JournalCard;
