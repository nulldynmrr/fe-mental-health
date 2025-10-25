"use client";
import React, { useEffect, useState } from "react";
import MusicCard from "@/components/music/card";
import Player from "@/components/music/player";
import request from "@/utils/request";

const MusicSection = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch meditation data
        const [meditasiData, alamData, favoritesData] = await Promise.all([
          request.get("/meditation?type=meditasi"),
          request.get("/meditation?type=alam"),
          request.get("/meditation/meditate-favorite").catch(err => {
            console.warn("Failed to fetch favorites:", err);
            return { data: [] }; // Return empty array if favorites fail
          })
        ]);

        const normalizeData = (items = []) =>
          items.map((item) => ({
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
          }));

        // Set playlists
        const playlistsData = [
          { 
            category: "Meditasi", 
            tracks: normalizeData(meditasiData.data || []) 
          },
          { 
            category: "Alam", 
            tracks: normalizeData(alamData.data || []) 
          },
        ];

        setPlaylists(playlistsData);
        
        // Set favorites
        if (favoritesData.data) {
          setFavorites(normalizeData(favoritesData.data));
        }

      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Terjadi kesalahan saat memuat data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
    
    const allTracks = playlists.flatMap((p) => p.tracks);
    const currentIndex = allTracks.findIndex((t) => t.id === currentTrack.id);
    
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % allTracks.length;
      setCurrentTrack(allTracks[nextIndex]);
      setIsPlaying(true);
    }
  };

  const handlePrev = () => {
    if (!currentTrack) return;
    
    const allTracks = playlists.flatMap((p) => p.tracks);
    const currentIndex = allTracks.findIndex((t) => t.id === currentTrack.id);
    
    if (currentIndex !== -1) {
      const prevIndex = currentIndex === 0 ? allTracks.length - 1 : currentIndex - 1;
      setCurrentTrack(allTracks[prevIndex]);
      setIsPlaying(true);
    }
  };

  const handleToggleFavorite = async () => {
    if (!currentTrack) return;

    try {
      // Optimistic update
      setFavorites((prev) => {
        const exists = prev.some((t) => t.id === currentTrack.id);
        if (exists) {
          return prev.filter((t) => t.id !== currentTrack.id);
        } else {
          return [...prev, currentTrack];
        }
      });

      // API call to update favorites
      // You'll need to implement this based on your backend API
      // await request.post(`/meditation/${currentTrack.id}/favorite`);
      
    } catch (err) {
      console.error("Error updating favorite:", err);
      // Revert optimistic update on error
      setFavorites((prev) => {
        const exists = prev.some((t) => t.id === currentTrack.id);
        if (exists) {
          return prev.filter((t) => t.id !== currentTrack.id);
        } else {
          return [...prev, currentTrack];
        }
      });
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Error: {error}</p>;

  return (
    <div className="px-6 py-8 pb-28">
      <MusicCard
        playlists={playlists}
        favorites={favorites}
        onPlay={handlePlay}
      />

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