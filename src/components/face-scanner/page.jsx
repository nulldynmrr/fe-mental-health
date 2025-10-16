"use client";
import React from "react";

const FaceScanner = () => {
  return (
    <div className="relative w-90 h-94 flex items-center justify-center">
      <div className="absolute inset-0 rounded-2xl border-4 border-transparent shadow-[0_0_40px_10px_rgba(34,211,238,0.5)]" />
      <div className="absolute top-0 left-0 w-15 h-15 border-t-4 border-l-4 border-primary-500 rounded-tl-2xl" />
      <div className="absolute top-0 right-0 w-15 h-15 border-t-4 border-r-4 border-primary-500 rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-15 h-15 border-b-4 border-l-4 border-primary-500 rounded-bl-2xl" />
      <div className="absolute bottom-0 right-0 w-15 h-15 border-b-4 border-r-4 border-primary-500 rounded-br-2xl" />

      <div className="absolute w-full h-1 bg-primary-500 rounded-full animate-scan" />

      <style jsx>{`
        @keyframes scan {
          0% {
            top: 10%;
            opacity: 0.8;
          }
          50% {
            top: 90%;
            opacity: 1;
          }
          100% {
            top: 10%;
            opacity: 0.8;
          }
        }

        .animate-scan {
          position: absolute;
          animation: scan 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default FaceScanner;
