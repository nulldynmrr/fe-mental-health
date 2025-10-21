"use client";

import React, { useState, useEffect } from "react";
import request from "@/utils/request";
import { useRouter } from "next/navigation";

const VideoCards = () => {
  const [videos, setVideos] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const [page1, page2] = await Promise.all([
          request.get("/video?page=1"),
          request.get("/video?page=2"),
        ]);

        const allVideos = [
          ...(page1?.data?.data || []),
          ...(page2?.data?.data || []),
        ];

        setVideos(allVideos);
      } catch (err) {
        console.error("❌ Gagal ambil video:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

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
    <section className="max-w-7xl mx-auto px-2 py-5">
      <div className="flex flex-wrap gap-5 justify-center">
        {displayedVideos.map((video, idx) => (
          <div
            key={idx}
            onClick={() => router.push(`/videos?id=${video.video_id}`)} // 👈 arahkan ke VideoPage
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
                src={video.thumbnail || "/assets/images/default-thumbnail.png"}
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
                {video.created_at
                  ? new Date(video.created_at).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "Tidak diketahui"}
              </div>
              <h3 className="font-semibold text-lg mb-1">{video.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {video.description}
              </p>
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
