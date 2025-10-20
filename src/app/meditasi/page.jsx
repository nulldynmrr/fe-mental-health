"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar/page";
import Breadcrumb from "@/components/breadcrumb/page";
import MusicCard from "@/components/music/card";
import Player from "@/components/music/player";
import Footer from "@/components/footer/page";
import SearchBar from "@/components/music/search";
import { playlistData } from "@/utils/playlist";

const Meditasi = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const [currentPlaylistContext, setCurrentPlaylistContext] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("mh_favorites");
      if (raw) setFavorites(JSON.parse(raw));
    } catch (e) {
      console.error("Failed parse favorites", e);
    }
  }, []);


  useEffect(() => {
    try {
      localStorage.setItem("mh_favorites", JSON.stringify(favorites));
    } catch (e) {
      console.error("Failed save favorites", e);
    }
  }, [favorites]);

  const _keyOf = (t) => (t.id ? `${t.id}` : `${t.title}||${t.artist}`);

  const toggleFavorite = (track) => {
    const key = _keyOf(track);
    const exists = favorites.some((f) => _keyOf(f) === key);
    if (exists) {
      setFavorites((prev) => prev.filter((f) => _keyOf(f) !== key));
    } else {
      setFavorites((prev) => [track, ...prev]);
    }
  };

  const handlePlay = (track, context) => {
    setCurrentTrack(track);
    setCurrentPlaylistContext(context || null);
    setIsPlaying(true);
  };

  const handlePauseToggle = () => {
    setIsPlaying((s) => !s);
  };


  const getCurrentPlaylistArray = () => {
    if (!currentPlaylistContext) return null;
    if (currentPlaylistContext.type === "favorites") return favorites;
    if (currentPlaylistContext.type === "category") {
      const idx = currentPlaylistContext.categoryIdx;
      const list = playlistData[idx];
      return list ? list.tracks : null;
    }
    return null;
  };

  
  const handleNext = () => {
    const arr = getCurrentPlaylistArray();
    if (!arr || !currentTrack) return;
    const idx = arr.findIndex((t) => _keyOf(t) === _keyOf(currentTrack));
    if (idx === -1) return;
    const next = arr[idx + 1] || arr[0]; 
    if (next) {
      handlePlay(next, currentPlaylistContext);
    }
  };

  const handlePrev = () => {
    const arr = getCurrentPlaylistArray();
    if (!arr || !currentTrack) return;
    const idx = arr.findIndex((t) => _keyOf(t) === _keyOf(currentTrack));
    if (idx === -1) return;
    const prev = arr[idx - 1] || arr[arr.length - 1]; 
    if (prev) {
      handlePlay(prev, currentPlaylistContext);
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-6 md:px-20 md:py-12">
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Meditasi" },
          ]}
        />

        <div className="mt-10">
          <SearchBar onSearch={setSearchTerm} />
          <MusicCard
            playlists={playlistData}
            favorites={favorites}
            searchTerm={searchTerm}
            onPlay={(track, ctx) => handlePlay(track, ctx)}
          />

          <Player
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onTogglePlay={handlePauseToggle}
            onToggleFavorite={() =>
              currentTrack && toggleFavorite(currentTrack)
            }
            isFavorite={
              currentTrack
                ? favorites.some((f) => _keyOf(f) === _keyOf(currentTrack))
                : false
            }
            onNext={handleNext}
            onPrev={handlePrev}
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Meditasi;
