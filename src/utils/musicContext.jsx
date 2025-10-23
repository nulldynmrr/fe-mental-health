"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import MusicCard from "@/components/music/card";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const MusicSection = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchMeditations = async () => {
      try {
        const [resMeditasi, resAlam] = await Promise.all([
          fetch("/api/v1/meditation?type=meditasi"),
          fetch("/api/v1/meditation?type=alam"),
        ]);

        if (!resMeditasi.ok || !resAlam.ok) throw new Error("Gagal fetch data");

        const meditasiData = await resMeditasi.json();
        const alamData = await resAlam.json();

        const playlistsData = [
          {
            category: "Meditasi",
            tracks: meditasiData.data.map((item) => ({
              id: item.meditation_id,
              title: item.title,
              artist: item.description,
              thumbnail: item.thumbnailUrl,
              mediaUrl: item.mediaUrl,
              duration: item.duration,
            })),
          },
          {
            category: "Alam",
            tracks: alamData.data.map((item) => ({
              id: item.meditation_id,
              title: item.title,
              artist: item.description,
              thumbnail: item.thumbnailUrl,
              mediaUrl: item.mediaUrl,
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

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch("/api/v1/meditation/meditate-favorite");
        if (!res.ok) throw new Error("Gagal fetch favorite");

        const data = await res.json();

        const favData = data.data.map((item) => ({
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

        setFavorites(favData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFavorites();
  }, []);

  const handlePlay = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const getYouTubeId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="px-6 py-8">
      <MusicCard playlists={playlists} onPlay={handlePlay} />

      {currentTrack && (
        <div className="hidden">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${getYouTubeId(
              currentTrack.mediaUrl
            )}`}
            playing={isPlaying}
            controls={false}
            width="0"
            height="0"
            volume={0.8}
            onEnded={() => setIsPlaying(false)}
          />
        </div>
      )}
    </div>
  );
};

export default MusicSection;
