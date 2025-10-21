"use client";
import React, { useState, useEffect, useCallback } from "react";
import request from "@/utils/request";
import { formatWaktu } from "@/utils/time";
import toast from "react-hot-toast";

const VideoCards = () => {
  const [videos, setVideos] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await request.get("/video?page=2");
      const rawData = res.data?.data;

      const list = Array.isArray(rawData)
        ? rawData
        : rawData?.data && Array.isArray(rawData.data)
        ? rawData.data
        : [];

      const mapped = list.map((item) => ({
        id: item.video_id,
        title: item.title,
        description: item.description,
        date: formatWaktu(item.createdAt),
        videoUrl: item.videoUrl?.startsWith("http")
          ? item.videoUrl
          : `${process.env.NEXT_PUBLIC_API_URL}${item.videoUrl}`,
      }));

      setVideos(mapped);
    } catch (err) {
      if (err.response?.status === 404) {
        setVideos([]);
      } else {
        console.error("Gagal ambil data video:", err);
        toast.error("Gagal mengambil data video");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  function getYouTubeId(url) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }

  const displayedVideos = expanded ? videos : videos.slice(0, 4);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-2 py-5 text-center">
        <p className="text-gray-500">Memuat video...</p>
      </section>
    );
  }

  if (videos.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-2 py-5 text-center">
        <p className="text-gray-500">Tidak ada video ditemukan.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto px-2 py-5">
      <div className="flex flex-wrap gap-4 justify-center">
        {displayedVideos.map((video, idx) => (
          <div
            key={idx}
            style={{ boxShadow: "0px 14px 50px rgba(197, 236, 255, 0.5)" }}
            className="
            bg-white rounded-xl pt-4 border-2 border-transparent hover:border-primary-500 transition overflow-hidden
            cursor-pointer
            flex-[1_1_calc(100%-1rem)]
            sm:flex-[1_1_calc(50%-1.25rem)]
            lg:flex-[1_1_calc(25%-1.25rem)]
            h-auto
            max-w-[400px] mx-auto
          "
          >
            <div className="relative aspect-[16/9] cursor-pointer">
              <img
                src={`https://img.youtube.com/vi/${getYouTubeId(
                  video.videoUrl
                )}/hqdefault.jpg`}
                alt={video.title}
                className="w-full h-full"
              />
              <button className="absolute inset-0 flex items-center justify-center cursor-pointer">
                <img
                  src="/assets/icons/play.svg"
                  alt="Play"
                  className="w-10 h-10"
                />
              </button>
            </div>
            <div className="p-3 py-5">
              <div className="flex items-center text-gray-500 text-sm mb-2 gap-2">
                <img
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  className="w-4 h-4"
                />
                {video.date}
              </div>
              <h3 className="font-semibold text-lg mb-1">{video.title}</h3>
              <p className="text-gray-600 text-sm">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end items-end mt-10">
        <button
          onClick={() => setExpanded(!expanded)}
          className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition cursor-pointer"
        >
          {expanded ? "Lebih Sedikit" : "Lihat Semua"}
        </button>
      </div>
    </section>
  );
};

export default VideoCards;
