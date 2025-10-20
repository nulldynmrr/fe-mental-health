import React, { useState } from "react";
import { FaThumbsUp } from "react-icons/fa6";
import { HiThumbDown } from "react-icons/hi";

const ChatBot = ({ text, time }) => {
  const [copyState, setCopyState] = useState("idle"); 
  const [feedback, setFeedback] = useState(null); 

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyState("success");
      setTimeout(() => setCopyState("done"), 2000);
    } catch (err) {
      console.error("Gagal menyalin teks:", err);
    }
  };

  const renderButtonText = () => {
    switch (copyState) {
      case "success":
        return "✓ Berhasil disalin";
      case "done":
        return "Sudah disalin";
      default:
        return "Salin";
    }
  };

  const handleLike = () => {
    setFeedback((prev) => (prev === "like" ? null : "like"));
  };

  const handleDislike = () => {
    setFeedback((prev) => (prev === "dislike" ? null : "dislike"));
  };

  return (
    <div className="relative flex flex-col items-start my-10">
      <div className="relative max-w-[80%]">
        <div className="bg-neut-50 rounded-2xl p-4 pb-10 text-[15px] leading-relaxed shadow-sm border border-neut-100 relative">
          {text}

          <div className="absolute left-4 bottom-0 translate-y-1/2">
            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white text-xl shadow-md border-2 border-white">
              🤖
            </div>
          </div>
        </div>

        <div className="absolute right-0 -bottom-8 flex items-center gap-3 text-xs text-neut-500">
          <span className="cursor-default">{time}</span>

          <button
            onClick={handleCopy}
            className={`bg-neut-50 rounded-lg px-2 py-1 font-medium transition-all duration-300 ${
              copyState === "success"
                ? "text-primary-500"
                : copyState === "done"
                ? "text-gray-400"
                : "text-neut-600 hover:text-primary-500 hover:underline"
            }`}
          >
            {renderButtonText()}
          </button>

          <div className="flex bg-neut-50 rounded-lg p-1 items-center gap-2 transition-all">
            <button
              onClick={handleLike}
              className={`transition-colors ${
                feedback === "like"
                  ? "text-primary-500"
                  : "text-neut-600 hover:text-primary-500"
              }`}
            >
              <FaThumbsUp size={14} />
            </button>

            <button
              onClick={handleDislike}
              className={`transition-colors ${
                feedback === "dislike"
                  ? "text-red-500"
                  : "text-neut-600 hover:text-red-500"
              }`}
            >
              <HiThumbDown size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
