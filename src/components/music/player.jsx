"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {FaPlay, FaPause, FaStepBackward, FaStepForward, FaRandom, FaRedoAlt, FaChromecast, FaChevronUp, FaHeart, FaEllipsisH,} from "react-icons/fa";
import { FaBars, FaRepeat, FaVolumeHigh } from "react-icons/fa6";

const Player = ({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onToggleFavorite,
  isFavorite,
  onNext,
  onPrev,
}) => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (currentTrack && currentTrack.durationSeconds) {
      setDuration(currentTrack.durationSeconds);
    } else if (currentTrack && currentTrack.duration) {
      const parts = (currentTrack.duration + "").split(":").map(Number);
      if (parts.length === 2) setDuration(parts[0] * 60 + parts[1]);
      else setDuration(240);
    } else {
      setDuration(240);
    }
    setCurrentTime(0);
    setProgress(0);
  }, [currentTrack]);

  useEffect(() => {
    let timer = null;
    if (isPlaying && currentTrack) {
      timer = setInterval(() => {
        setCurrentTime((t) => {
          const next = t + 1;
          if (next >= duration) {
            setProgress(1);
            clearInterval(timer);
            if (onNext) onNext();
            return 0;
          }
          setProgress(next / Math.max(duration, 1));
          return next;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, currentTrack, duration, onNext]);

  const fmt = (sec) => {
    if (!sec && sec !== 0) return "0:00";
    const s = Math.floor(sec);
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m}:${rem.toString().padStart(2, "0")}`;
  };

   const handleToggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1e1e1e] text-white flex items-center justify-between px-6 py-3 z-50 shadow-lg">
      <div className="flex items-center gap-4 w-1/3">
        <Image
          src={currentTrack?.thumbnail || "/assets/thumbnails/rel-classical.svg"}
          alt={currentTrack?.title || "Now Playing"}
          width={56}
          height={56}
          className="rounded-sm"
        />
        <div className="flex flex-col justify-center">
          <div className="flex flex-row items-center gap-2">
            <h4 className="font-semibold text-sm">{currentTrack?.title || "Nothing Playing"}</h4>
            <span onClick={onToggleFavorite} className="cursor-pointer ml-3">
              <FaHeart
                className={`w-3.5 h-3.5 transition-all duration-300 ${
                  isFavorite ? "text-primary-500" : "text-gray-400 hover:text-white"
                }`}
              />
            </span>

            <span className="cursor-pointer">
              <FaEllipsisH className="w-3 h-3 text-gray-400 hover:text-white opacity-80 transition-all" />
            </span>
          </div>
          <p className="text-xs text-gray-300">{currentTrack?.artist || ""}</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wide">
            {currentTrack?.album
              ? `Playing from: ${currentTrack.album}`
              : currentTrack?.source
              ? `Playing from: ${currentTrack.source}`
              : ""}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center w-1/3">
        <div className="flex items-center gap-7 mb-2">
          <FaRandom className="cursor-pointer text-gray-300 hover:text-white" />
          <FaStepBackward onClick={onPrev} className="cursor-pointer text-gray-300 hover:text-white" />

          <button
            onClick={onTogglePlay}
            className="bg-white text-black p-2 rounded-full hover:scale-105 transition"
          >
            {isPlaying ? (
              <FaPause className="w-3 h-3" />
            ) : (
              <FaPlay className="w-3 h-3" />
            )}
          </button>

          <FaStepForward onClick={onNext} className="cursor-pointer text-gray-300 hover:text-white" />
          <FaRepeat className="cursor-pointer text-gray-300 hover:text-white" />
        </div>

        <div className="flex items-center gap-2 w-full max-w-[500px]">
          <span className="text-[10px] text-gray-400">{fmt(currentTime)}</span>
          <div className="flex-1 h-1 bg-gray-700 rounded-full relative overflow-hidden group">
            <div
              className="absolute top-0 left-0 h-1 bg-white rounded-full group-hover:bg-primary-400 transition-all"
              style={{ width: `${(progress || 0) * 100}%` }}
            />
          </div>
          <span className="text-[10px] text-gray-400">{fmt(duration)}</span>
        </div>
      </div>

      
      <div className="flex items-center gap-5 justify-end w-1/3">
         <button onClick={handleToggleMute}>
          {isMuted ? (
            <FaVolumeMute className="cursor-pointer text-gray-300 hover:text-white" />
          ) : (
            <FaVolumeHigh className="cursor-pointer text-gray-300 hover:text-white" />
          )}
        </button>
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
