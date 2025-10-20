"use client";

import React, { useState } from "react";
import { CgArrowLongUpL, CgArrowUp, CgMoreVertical } from "react-icons/cg";
import ChatUser from "./user";
import ChatBot from "./bot";
import { FaArrowUp } from "react-icons/fa6";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "user",
      text: "Akhir-akhir ini aku sering ngerasa capek banget, padahal nggak banyak aktivitas.",
      time: "Sekarang",
    },
    {
      id: 2,
      sender: "bot",
      text: "Halo! 😊 Itu wajar kok kamu merasa begitu. Kadang capek itu bukan cuma soal fisik, tapi juga pikiran yang terlalu penuh.",
      time: "Sekarang",
    },
  ]);

  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleSend = () => {
    if (!input.trim()) return;

    if (editingId) {
      setMessages(
        messages.map((msg) =>
          msg.id === editingId ? { ...msg, text: input } : msg
        )
      );
      setEditingId(null);
    } else {
      setMessages([
        ...messages,
        {
          id: Date.now(),
          sender: "user",
          text: input,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }

    setInput("");
  };

  const handleEdit = (id, text) => {
    setEditingId(id);
    setInput(text);
  };

  return (
    <div className="flex flex-col max-w-8xl h-[85vh] border border-neut-200 rounded-xl mx-auto mt-15">
    
      <div className="flex items-center justify-end bg-primary-500 text-white px-4 py-2 rounded-t-xl">
        <CgMoreVertical className="text-xl" />
      </div>

      
      <div className="flex flex-col flex-1 bg-white p-6 overflow-y-auto gap-6 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        {messages.map((msg) =>
          msg.sender === "bot" ? (
            <ChatBot key={msg.id} text={msg.text} time={msg.time} />
          ) : (
            <ChatUser
              key={msg.id}
              text={msg.text}
              time={msg.time}
              onEdit={() => handleEdit(msg.id, msg.text)}
            />
          )
        )}
      </div>

     
      <div className="border-t border-neut-200 rounded-b-2xl px-5 py-5">
        <div className="flex items-center gap-3 border border-neut-100 rounded-lg px-4 py-2">
          <span className="text-xl text-gray-400 cursor-pointer">+</span>
          <input
            type="text"
            placeholder={
              editingId ? "Edit pesanmu..." : "Tanyakan sesuatu di sini..."
            }
            className="flex-1 outline-none border-none text-[15px] placeholder-neut-300"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-primary-500 text-white p-2 rounded-lg hover:bg-primary-600 transition"
          >
            <FaArrowUp className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}
