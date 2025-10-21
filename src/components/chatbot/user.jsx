import React from "react";
import { HiOutlineReply } from "react-icons/hi";


const ChatUser = ({ text, time, onEdit, onReply }) => {
  return (
    <div className="relative flex flex-col items-end my-10">
      <div className="relative max-w-[80%]">

        <div className="bg-white text-gray-800 border-2 border-neut-100 rounded-2xl p-4 pb-10 text-[15px] leading-relaxed relative">
          {text}

          <div className="absolute right-4 bottom-0 translate-y-1/2">
            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold shadow-md border-2 border-white">
              U
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center w-full mt-2 px-1 pr-20">
          <div className="flex items-center gap-2">
          <span className="text-xs text-neut-500">{time}</span>
            <button
              onClick={onEdit}
              className="text-neut-600 bg-neut-50 h-5 px-2 flex justify-center items-center rounded-lg font-medium text-xs hover:text-primary-500 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onReply(text)}
              className="text-neut-600 bg-neut-50 h-5 px-2 flex justify-center items-center rounded-lg font-medium text-xs hover:text-primary-500 transition-colors"
            >
              <HiOutlineReply className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUser;
