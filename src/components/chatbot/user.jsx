import React from "react";

const ChatUser = ({ text, time, onEdit }) => {
  return (
    <div className="relative flex flex-col items-end my-10">
      <div className="relative max-w-[80%]">
  
        <div className="bg-white text-gray-800 border border-neut-100 rounded-2xl p-4 pb-10 text-[15px] leading-relaxed shadow-sm relative">
          {text}
          
          <div className="absolute right-4 bottom-0 translate-y-1/2">
            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold shadow-md border-2 border-white">
              U
            </div>
          </div>
        </div>

        <div className="absolute left-0 -bottom-7 flex items-center gap-2 text-xs text-neut-500">
          <span>{time}</span>
          <button
            onClick={onEdit}
            className="text-neut-600 bg-neut-50 h-5 px-2 flex justify-center items-center rounded-lg font-medium hover:text-primary-500 transition-colors"
          >
            Ubah
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatUser;
