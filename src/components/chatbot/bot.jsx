import React from "react";
import { FaThumbsUp } from "react-icons/fa6";
import { HiThumbDown } from "react-icons/hi";

const ChatBot = ({ text, time }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white text-lg">
        🤖
      </div>

      <div>
        <div className="bg-neut-50 rounded-xl pb-10 p-4 max-w-[70%] text-[15px] leading-relaxed">
          {text}
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1 justify-end">
          <span className="cursor-default">{time}</span>
          <span className="hover:text-primary-500 cursor-pointer text-neut-600 bg-neut-50 w-10 h-5 flex justify-center items-center rounded-lg font-semibold">Salin</span>
          <span className="hover:text-primary-500 cursor-pointer text-neut-600 bg-neut-50 w-30 h-5 flex justify-center items-center rounded-lg font-semibold">Membuat jawaban</span>
          <div className="text-white bg-neut-50 flex gap-2 w-10 items-center justify-center h-5 rounded-lg">
          <button className="hover:text-primary-500 text-neut-600">
            <FaThumbsUp />
          </button>
          <button className="hover:text-red-500 text-neut-600">
            <HiThumbDown />
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
