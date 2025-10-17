"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  FaPlay,
  FaStepBackward,
  FaStepForward,
  FaRandom,
  FaRedoAlt,
  FaChromecast,
  FaChevronUp,
  FaHeart,
  FaEllipsisH,
} from "react-icons/fa";
import { FaBars, FaVolumeHigh, FaHeart as FaHeartSolid } from "react-icons/fa6";

const Player = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);

    // if (!isFavorite) {
    //   fetch("/api/favorites", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ title: "Angels", artist: "The XX" }),
    //   });
    // }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1e1e1e] text-white flex items-center justify-between px-6 py-3 z-50 shadow-lg">
      <div className="flex items-center gap-4 w-1/3">
        <Image
          src="/assets/thumbnails/rel-classical.svg"
          alt="Now Playing"
          width={56}
          height={56}
          className="rounded-sm"
        />
        <div className="flex flex-col justify-center">
          <div className="flex flex-row items-center gap-2">
            <h4 className="font-semibold text-sm">Angels</h4>
            <span onClick={toggleFavorite} className="cursor-pointer ml-3">
              <FaHeart
                className={`w-3.5 h-3.5 transition-all duration-300 ${
                  isFavorite
                    ? "text-primary-500"
                    : "text-gray-400 hover:text-white"
                }`}
              />
            </span>

            <span className="cursor-pointer">
              <FaEllipsisH className="w-3 h-3 text-gray-400 hover:text-white opacity-80 transition-all" />
            </span>
          </div>
          <p className="text-xs text-gray-300">The XX</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wide">
            Playing from: Coexist
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center w-1/3">
        <div className="flex items-center gap-7 mb-2">
          <FaRandom className="cursor-pointer text-gray-300 hover:text-white" />
          <FaStepBackward className="cursor-pointer text-gray-300 hover:text-white" />
          <button className="bg-white text-black p-2 rounded-full hover:scale-105 transition">
            <FaPlay className="w-3 h-3" />
          </button>
          <FaStepForward className="cursor-pointer text-gray-300 hover:text-white" />
          <FaRedoAlt className="cursor-pointer text-gray-300 hover:text-white" />
        </div>

        <div className="flex items-center gap-2 w-full max-w-[500px]">
          <span className="text-[10px] text-gray-400">0:42</span>
          <div className="flex-1 h-1 bg-gray-700 rounded-full relative overflow-hidden group">
            <div className="absolute top-0 left-0 h-1 bg-white rounded-full w-[40%] group-hover:bg-primary-400 transition-all"></div>
          </div>
          <span className="text-[10px] text-gray-400">3:56</span>
        </div>
      </div>

      <div className="flex items-center gap-5 justify-end w-1/3">
        <FaVolumeHigh className="cursor-pointer text-gray-300 hover:text-white" />
        <FaChromecast className="cursor-pointer text-gray-300 hover:text-white" />
        <FaBars className="cursor-pointer text-gray-300 hover:text-white" />
        <button className="p-2 rounded-md hover:bg-gray-700 transition">
          <FaChevronUp className="cursor-pointer text-gray-300 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default Player;
