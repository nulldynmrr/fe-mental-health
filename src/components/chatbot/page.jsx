"use client";

import React, { useState, useRef, useEffect } from "react";
import { CgMoreVertical } from "react-icons/cg";
import { FaArrowUp, FaCirclePlus } from "react-icons/fa6";
import ChatUser from "./user";
import request from "@/utils/request";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await request.get("/message");
        if (res?.data?.data) {
          setMessages(
            res.data.data.map((m) => ({
              id: m.id,
              sender: "user",
              text: m.content,
              replyTo: m.parentId ? `Reply ke #${m.parentId}` : null,
              time: new Date(m.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }))
          );
        }
      } catch (err) {
        console.error("Gagal fetch message:", err);
      }
    };
    fetchMessages();
  }, []);

  const handleSend = async () => {
    if (isSending || !input.trim()) return;

    try {
      setIsSending(true);

      if (editingId) {
        const res = await request.put(`/message/${editingId}`, {
          content: input,
        });
        if (res?.data?.data) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === editingId
                ? { ...msg, text: res.data.data.content }
                : msg
            )
          );
        }
        setEditingId(null);
        setInput("");
        return;
      }

      const res = await request.post("/message", {
        content: input,
        parentId: replyTo ? replyTo.id : null,
      });

      if (res?.data?.data) {
        const newMsg = {
          id: res.data.data.id,
          sender: "user",
          text: res.data.data.content,
          replyTo: replyTo ? replyTo.text : null,
          time: new Date(res.data.data.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, newMsg]);
        setInput("");
        setReplyTo(null);
      }
    } catch (err) {
      console.error("Gagal kirim pesan:", err);
    } finally {
      setIsSending(false);
    }
  };

  const handleEdit = (id, text) => {
    setEditingId(id);
    setInput(text);
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm("Hapus pesan ini?")) return;
    try {
      await request.delete(`/message/${id}`);
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (err) {
      console.error("Gagal hapus pesan:", err);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setEditingId(null);
    setInput("");
    setReplyTo(null);
  };

  const handleReply = (msg) => {
    setReplyTo({ id: msg.id, text: msg.text });
  };

  const handleDeleteChat = async () => {
    if (window.confirm("Apakah kamu yakin ingin menghapus semua percakapan?")) {
      try {
        const allIds = messages.map((m) => m.id);
        await Promise.all(allIds.map((id) => request.delete(`/message/${id}`)));
        setMessages([]);
      } catch (err) {
        console.error("Gagal hapus semua pesan:", err);
      }
    }
    setShowMenu(false);
  };

  return (
    <div className="flex flex-col max-w-8xl h-[85vh] border border-neut-200 rounded-xl mx-auto mt-15">
      <div className="relative flex items-center justify-end bg-primary-500 text-white px-4 py-2 rounded-t-xl">
        <button onClick={() => setShowMenu((prev) => !prev)} className="relative">
          <CgMoreVertical className="text-xl cursor-pointer" />
        </button>

        {showMenu && (
          <div className="absolute top-full right-3 mt-2 w-48 bg-white border border-neut-200 rounded-lg shadow-lg text-sm text-neut-700 z-50">
            <button
              onClick={handleNewChat}
              className="block w-full text-left px-4 py-2 hover:bg-neut-50"
            >
              Mulai chat baru
            </button>
            <button
              onClick={handleDeleteChat}
              className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
            >
              Hapus semua percakapan
            </button>
          </div>
        )}
      </div>

    
      <div className="flex flex-col flex-1 bg-white p-6 overflow-y-auto gap-3 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-neut-400">
            <h2 className="text-lg font-semibold text-neut-600">New Chat</h2>
            <p className="text-sm">Mulai berkeluh kesah di sini...</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="flex flex-col">
              {msg.replyTo && (
                <div className="ml-auto mb-1 max-w-[70%] text-xs text-neut-400 italic border-l-2 border-primary-300 pl-2">
                  Membalas: “{msg.replyTo}”
                </div>
              )}
              <ChatUser
                text={msg.text}
                time={msg.time}
                onEdit={() => handleEdit(msg.id, msg.text)}
                onReply={() => handleReply(msg)}
                onDelete={() => handleDeleteMessage(msg.id)}
              />
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

    
      {replyTo && (
        <div className="px-5 pb-2 text-sm text-neut-600 flex justify-between items-center">
          <div className="truncate max-w-[85%]">
            <span className="text-primary-600 font-medium">Membalas:</span> “
            {replyTo?.text || "(pesan dihapus)"}”
          </div>
          <button
            onClick={() => setReplyTo(null)}
            className="text-neut-400 hover:text-red-500 transition"
          >
            ✕
          </button>
        </div>
      )}

      <div className="border-t border-neut-200 rounded-b-2xl px-5 py-5">
        <div className="flex items-center gap-3 border border-neut-100 rounded-lg px-4 py-2">
          <span
            className="text-xl text-gray-400 cursor-pointer"
            onClick={handleNewChat}
          >
            <FaCirclePlus />
          </span>

          <input
            type="text"
            placeholder={
              editingId
                ? "Edit pesanmu..."
                : isSending
                ? "Mengirim..."
                : "Tulis pesan di sini..."
            }
            className="flex-1 outline-none border-none text-[15px] placeholder-neut-300"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isSending}
          />

          <button
            onClick={handleSend}
            className={`bg-primary-500 text-white p-2 rounded-lg transition ${
              isSending ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-600"
            }`}
            disabled={isSending}
          >
            <FaArrowUp className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
