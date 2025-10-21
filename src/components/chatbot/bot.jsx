import React, { useState } from "react";
import { FaThumbsUp } from "react-icons/fa6";
import { HiThumbDown } from "react-icons/hi";
import Image from "next/image";

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
        return "Berhasil disalin";
      case "done":
        return "Sudah disalin";
      default:
        return "Salin";
    }
  };


  return (
    <div className="relative flex flex-col items-start my-10">
      <div className="relative max-w-[80%]">
        <div className="bg-neut-50 rounded-2xl p-4 pb-10 text-[15px] leading-relaxed border border-neut-100 relative">
          {text}

           <div className="absolute left-4 bottom-0 translate-y-1/2">
            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white text-xl shadow-md border-2 border-white overflow-hidden">
              <Image
                src="/assets/icons/chatgpt-icon2.svg"
                alt="Bot Avatar"
                width={50}
                height={50}
                className="object-contain"
              />
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

         
        </div>
      </div>
    </div>
    </div>
  );
};

export default ChatBot;
