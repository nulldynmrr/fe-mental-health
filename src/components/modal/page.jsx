"use client";
import React from "react";

export default function ModalConfirm({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "OK",
  cancelText = "Batal",
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-[90%] max-w-md mx-auto p-6 animate-fade-in">
        <h2 className="text-lg font-semibold text-neut-900 text-center mb-2">
          {title}
        </h2>

        <p className="text-sm text-neut-500 text-center mb-6">{description}</p>

        <div className="flex justify-center gap-3">
          <button
            onClick={onConfirm}
            className="bg-primary-500 hover:bg-primary-600 text-white font-medium px-6 py-2 rounded-lg transition-all"
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium px-6 py-2 rounded-lg transition-all"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
