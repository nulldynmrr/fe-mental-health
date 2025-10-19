import React from "react";
import { FaThumbsUp } from "react-icons/fa6";
import { HiThumbDown } from "react-icons/hi";

const ChatBot = ({ text, time }) => {
  return (
    <div className="relative flex flex-col items-start my-10">
      {/* Wrapper biar actions sejajar bubble */}
      <div className="relative max-w-[80%]">
        {/* Chat Bubble */}
        <div className="bg-neut-50 rounded-2xl p-4 pb-10 text-[15px] leading-relaxed shadow-sm border border-neut-100 relative">
          {text}

          {/* Avatar Bot (setengah keluar di bawah kiri bubble) */}
          <div className="absolute left-4 bottom-0 translate-y-1/2">
            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white text-xl shadow-md border-2 border-white">
              🤖
            </div>
          </div>
        </div>

        <div className="absolute right-0 -bottom-7 flex items-center gap-3 text-xs mt-3 text-neut-500">
          <span className="cursor-default">{time}</span>
          <button className="bg-neut-50 rounded-lg p-1 hover:text-primary-500 hover:underline transition-colors font-medium">
            Salin
          </button>
        
          <div className="flex bg-neut-50 rounded-lg p-1 items-center gap-2">
            <button className="hover:text-primary-500 transition-colors">
              <FaThumbsUp size={14} />
            </button>
            <button className="hover:text-red-500 transition-colors">
              <HiThumbDown size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
