"use client";
import React from "react";
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaHeart, FaRegHeart } from "react-icons/fa";

const Player = ({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  isFavorite,
  onToggleFavorite,
}) => {
  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Track Info */}
        <div className="flex items-center space-x-4 flex-1">
          <img
            src={currentTrack.thumbnail}
            alt={currentTrack.title}
            className="w-12 h-12 rounded-md object-cover"
          />
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm truncate">{currentTrack.title}</h3>
            <p className="text-xs text-gray-600 truncate">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4 flex-1 justify-center">
          <button
            onClick={onToggleFavorite}
            className="p-2 text-gray-600 hover:text-red-500 transition-colors"
          >
            {isFavorite ? (
              <FaHeart className="w-4 h-4 text-red-500" />
            ) : (
              <FaRegHeart className="w-4 h-4" />
            )}
          </button>
          
          <button
            onClick={onPrev}
            className="p-2 text-gray-600 hover:text-primary-500 transition-colors"
          >
            <FaStepBackward className="w-4 h-4" />
          </button>
          
          <button
            onClick={onTogglePlay}
            className="p-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
          >
            {isPlaying ? (
              <FaPause className="w-4 h-4" />
            ) : (
              <FaPlay className="w-4 h-4" />
            )}
          </button>
          
          <button
            onClick={onNext}
            className="p-2 text-gray-600 hover:text-primary-500 transition-colors"
          >
            <FaStepForward className="w-4 h-4" />
          </button>
        </div>

        {/* Progress (placeholder) */}
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export default Player;