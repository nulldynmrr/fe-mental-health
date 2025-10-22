"use client";
import React from "react";
import { usePathname } from "next/navigation";

const VideoHeader = () => {
  const pathname = usePathname();
  const isFaceDetection = pathname === "/face-detection"; 

  return (
    <div className="text-center max-w-2xl mx-auto mb-10">
      <h2 className="text-3xl font-semibold mb-2">
        {isFaceDetection ? "Video Rekomendasi Untukmu" : "Video"}
      </h2>

      {!isFaceDetection && (
        <p className="text-neut-600 font-semibold">
          Nikmati tayangan yang informatif, mudah dipahami, dan relevan dengan
          kebutuhanmu untuk membantu menjaga kesehatan mental setiap hari.
        </p>
      )}
    </div>
  );
};

export default VideoHeader;
