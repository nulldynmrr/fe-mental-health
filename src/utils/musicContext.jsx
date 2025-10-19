"use client";
import { createContext, useContext, useState } from "react";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const pauseTrack = () => setIsPlaying(false);

  return (
    <MusicContext.Provider
      value={{ currentTrack, isPlaying, playTrack, pauseTrack }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);
