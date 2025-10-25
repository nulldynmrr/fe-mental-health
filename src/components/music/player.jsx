"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaRandom,
  FaRedoAlt,
  FaChromecast,
  FaChevronUp,
  FaHeart,
  FaBars,
} from "react-icons/fa";
import { FaVolumeHigh, FaVolumeMute } from "react-icons/fa6";

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
  const [volume, setVolume] = useState(0.8);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);

  // Reset state ketika track berubah
  useEffect(() => {
    if (currentTrack) {
      setProgress(0);
      setCurrentTime(0);
      setDuration(0);
      setIsLoading(true);
    }
  }, [currentTrack]);

  // Handle track change - hanya set source sekali
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.mediaUrl) return;

    console.log("Loading track:", currentTrack.title);
    
    // Hanya set source jika berbeda dari sebelumnya
    if (audio.src !== currentTrack.mediaUrl) {
      audio.src = currentTrack.mediaUrl;
      audio.load();
    }

    const handleCanPlay = () => {
      console.log("Audio can play");
      setIsLoading(false);
      setDuration(audio.duration || 0);
    };

    const handleError = (e) => {
      console.error("Audio error:", e);
      console.error("Error details:", e.target.error);
      setIsLoading(false);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('loadstart', handleLoadStart);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadstart', handleLoadStart);
    };
  }, [currentTrack]);

  // Handle play/pause - dipisah dari loading track
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.mediaUrl || isLoading) return;

    const handlePlay = async () => {
      try {
        if (isPlaying) {
          await audio.play();
          console.log("Audio started playing");
        } else {
          audio.pause();
          console.log("Audio paused");
        }
      } catch (error) {
        console.error("Play/pause error:", error);
      }
    };

    handlePlay();
  }, [isPlaying, currentTrack, isLoading]);

  // Update progress bar
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio && audio.duration && audio.duration > 0) {
      const current = audio.currentTime;
      const total = audio.duration;
      setCurrentTime(current);
      setDuration(total);
      setProgress((current / total) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration || 0);
    }
  };

  const handleEnded = () => {
    console.log("Audio ended");
    if (onNext) onNext();
  };

  // Format waktu (menit:detik)
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle progress bar click
  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration || duration <= 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(percent * 100);
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const audio = audioRef.current;
    const newVolume = parseFloat(e.target.value);
    
    if (audio) {
      audio.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleToggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isMuted) {
        audio.volume = volume;
        setIsMuted(false);
      } else {
        audio.volume = 0;
        setIsMuted(true);
      }
    }
  };

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1e1e1e] text-white flex items-center justify-between px-6 py-3 z-50 shadow-lg">
      {/* Audio element - hidden but functional */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      {/* Track info */}
      <div className="flex items-center gap-4 w-1/3">
        <Image
          src={currentTrack.thumbnail || "/assets/thumbnails/rel-classical.svg"}
          alt={currentTrack.title || "Now Playing"}
          width={56}
          height={56}
          className="rounded-sm object-cover"
        />
        <div className="flex flex-col justify-center">
          <div className="flex flex-row items-center gap-2">
            <h4 className="font-semibold text-sm line-clamp-1">
              {currentTrack.title || "Nothing Playing"}
            </h4>
            <button 
              onClick={onToggleFavorite} 
              className="cursor-pointer ml-2"
              type="button"
            >
              <FaHeart
                className={`w-3.5 h-3.5 transition-all duration-300 ${
                  isFavorite ? "text-red-500" : "text-gray-400 hover:text-white"
                }`}
              />
            </button>
          </div>
          <p className="text-xs text-gray-300 line-clamp-1">
            {currentTrack.artist || currentTrack.description || ""}
          </p>
          {isLoading && (
            <p className="text-xs text-yellow-400">Loading audio...</p>
          )}
        </div>
      </div>

      {/* Player controls */}
      <div className="flex flex-col items-center w-1/3">
        <div className="flex items-center gap-4 mb-2">
          <FaRandom className="cursor-pointer text-gray-300 hover:text-white" />
          <FaStepBackward 
            onClick={onPrev} 
            className="cursor-pointer text-gray-300 hover:text-white" 
          />
          <button
            onClick={onTogglePlay}
            disabled={isLoading}
            className="bg-white text-black p-3 rounded-full hover:scale-105 transition disabled:opacity-50"
            type="button"
          >
            {isPlaying ? (
              <FaPause className="w-3 h-3" />
            ) : (
              <FaPlay className="w-3 h-3 ml-0.5" />
            )}
          </button>
          <FaStepForward 
            onClick={onNext} 
            className="cursor-pointer text-gray-300 hover:text-white" 
          />
          <FaRedoAlt className="cursor-pointer text-gray-300 hover:text-white" />
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2 w-full max-w-[500px]">
          <span className="text-xs text-gray-400 min-w-[35px]">
            {formatTime(currentTime)}
          </span>
          <div 
            className="flex-1 h-1 bg-gray-700 rounded-full relative cursor-pointer group"
            onClick={handleProgressClick}
          >
            <div
              className="absolute top-0 left-0 h-1 bg-white rounded-full group-hover:bg-green-400 transition-all"
              style={{ width: `${progress}%` }}
            />
            <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                 style={{ left: `calc(${progress}% - 6px)` }} />
          </div>
          <span className="text-xs text-gray-400 min-w-[35px]">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Volume controls */}
      <div className="flex items-center gap-3 justify-end w-1/3">
        <div className="flex items-center gap-2">
          <button onClick={handleToggleMute} type="button">
            {isMuted || volume === 0 ? (
              <FaVolumeMute className="w-4 h-4 text-gray-300 hover:text-white" />
            ) : (
              <FaVolumeHigh className="w-4 h-4 text-gray-300 hover:text-white" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 accent-white cursor-pointer"
          />
        </div>
        <FaChromecast className="cursor-pointer text-gray-300 hover:text-white" />
        <FaBars className="cursor-pointer text-gray-300 hover:text-white" />
        <button className="p-2 rounded-md hover:bg-gray-700 transition" type="button">
          <FaChevronUp className="cursor-pointer text-gray-300 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default Player;