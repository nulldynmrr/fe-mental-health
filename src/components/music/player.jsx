"use client";
import React, { useEffect, useState } from "react";
import MusicCard from "@/components/music/card";
import Player from "@/components/music/player";

const MusicSection = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    const fetchMeditations = async () => {
      try {
        const [resMeditasi, resAlam] = await Promise.all([
          fetch("/api/v1/meditation?type=meditasi"),
          fetch("/api/v1/meditation?type=alam"),
        ]);

        if (!resMeditasi.ok || !resAlam.ok) {
          throw new Error("Gagal fetch data");
        }

        const meditasiData = await resMeditasi.json();
        const alamData = await resAlam.json();

        const playlistsData = [
          {
            category: "Meditasi",
            tracks: meditasiData.data.map((item) => ({
              id: item.meditation_id,
              title: item.title,
              artist: item.description,
              thumbnail: item.thumbnailUrl?.startsWith("http")
                ? item.thumbnailUrl
                : `${process.env.NEXT_PUBLIC_API_URL}${item.thumbnailUrl}`,
              mediaUrl: item.mediaUrl?.startsWith("http")
                ? item.mediaUrl
                : `${process.env.NEXT_PUBLIC_API_URL}${item.mediaUrl}`,
              duration: item.duration,
            })),
          },
          {
            category: "Alam",
            tracks: alamData.data.map((item) => ({
              id: item.meditation_id,
              title: item.title,
              artist: item.description,
              thumbnail: item.thumbnailUrl?.startsWith("http")
                ? item.thumbnailUrl
                : `${process.env.NEXT_PUBLIC_API_URL}${item.thumbnailUrl}`,
              mediaUrl: item.mediaUrl?.startsWith("http")
                ? item.mediaUrl
                : `${process.env.NEXT_PUBLIC_API_URL}${item.mediaUrl}`,
              duration: item.duration,
            })),
          },
        ];

        setPlaylists(playlistsData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeditations();
  }, []);

  
  const handlePlay = (track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying((prev) => !prev);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  
  const handleNext = () => {
    if (!currentTrack) return;
    const flatTracks = playlists.flatMap((p) => p.tracks);
    const idx = flatTracks.findIndex((t) => t.id === currentTrack.id);
    const nextTrack = flatTracks[idx + 1] || flatTracks[0];
    setCurrentTrack(nextTrack);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (!currentTrack) return;
    const flatTracks = playlists.flatMap((p) => p.tracks);
    const idx = flatTracks.findIndex((t) => t.id === currentTrack.id);
    const prevTrack = flatTracks[idx - 1] || flatTracks[flatTracks.length - 1];
    setCurrentTrack(prevTrack);
    setIsPlaying(true);
  };


  const handleToggleFavorite = () => {
    if (!currentTrack) return;
    setFavorites((prev) => {
      const exists = prev.some((t) => t.id === currentTrack.id);
      if (exists) return prev.filter((t) => t.id !== currentTrack.id);
      return [...prev, currentTrack];
    });
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500 py-10">Error: {error}</p>;

  return (
    <div className="px-6 py-8 pb-28"> 
      <MusicCard playlists={playlists} favorites={favorites} onPlay={handlePlay} />

      {currentTrack && (
        <Player
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying((prev) => !prev)}
          onNext={handleNext}
          onPrev={handlePrev}
          isFavorite={favorites.some((t) => t.id === currentTrack.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </div>
  );
};

export default MusicSection;
