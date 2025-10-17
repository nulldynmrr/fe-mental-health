import React from "react";

const ChatUser = ({ text, time, onEdit }) => {
  return (
    <div className="flex items-start justify-end gap-3">
      <div className="flex flex-col items-end">
        <div className="bg-white text-gray-800 border-2 border-neut-100 rounded-xl pb-10 p-4 max-w-[70%] text-[15px] leading-relaxed">
          {text}
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
          <span>{time}</span>
          <button
            onClick={onEdit}
            className="text-neut-600  bg-neut-50 w-10 h-5 flex justify-center items-center rounded-lg font-semibold hover:underline hover:text-primary-500 transition"
          >
            Ubah
          </button>
        </div>
      </div>

      <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold">
        U
      </div>
    </div>
  );
};

export default ChatUser;
