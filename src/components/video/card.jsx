"use client";

import { useState } from "react";
import React from "react";

const VideoCards = () => {
  const videos = [
    {
      date: "10 Juli 2025",
      title: "Tips Menjaga Kesehatan Mental",
      description:
        "Dalam sesi ini, kami akan membahas berbagai cara untuk memanfaatkan platform profesional secara maksimal. Mat...",
      thumbnail: "assets/thumbnails/tips.svg",
    },
    {
      date: "10 Juni 2025",
      title: "Apa itu Mental Health",
      description:
        "Dalam sesi ini, kami akan membahas berbagai cara untuk memanfaatkan platform profesional secara maksimal. Mat...",
      thumbnail: "assets/thumbnails/mental-health.svg",
    },
    {
      date: "20 April 2024",
      title: "Pentingnya Menjaga Kesehatan Mental untuk Hidup",
      description:
        "Dalam sesi ini, kami akan membahas berbagai cara untuk memanfaatkan platform profesional secara maksimal. Mat...",
      thumbnail: "assets/thumbnails/importance.svg",
    },
    {
      date: "10 September 2024",
      title: "Apa itu Mental Health",
      description:
        "Dalam sesi ini, kami akan membahas berbagai cara untuk memanfaatkan platform profesional secara maksimal. Mat...",
      thumbnail: "assets/thumbnails/gangguan.svg",
    },
    {
      date: "10 Juli 2025",
      title: "Tips Menjaga Kesehatan Mental",
      description:
        "Dalam sesi ini, kami akan membahas berbagai cara untuk memanfaatkan platform profesional secara maksimal. Mat...",
      thumbnail: "assets/thumbnails/tips.svg",
    },
    {
      date: "10 Juni 2025",
      title: "Apa itu Mental Health",
      description:
        "Dalam sesi ini, kami akan membahas berbagai cara untuk memanfaatkan platform profesional secara maksimal. Mat...",
      thumbnail: "assets/thumbnails/mental-health.svg",
    },
    {
      date: "20 April 2024",
      title: "Pentingnya Menjaga Kesehatan Mental untuk Hidup",
      description:
        "Dalam sesi ini, kami akan membahas berbagai cara untuk memanfaatkan platform profesional secara maksimal. Mat...",
      thumbnail: "assets/thumbnails/importance.svg",
    },
    {
      date: "10 September 2024",
      title: "Apa itu Mental Health",
      description:
        "Dalam sesi ini, kami akan membahas berbagai cara untuk memanfaatkan platform profesional secara maksimal. Mat...",
      thumbnail: "assets/thumbnails/gangguan.svg",
    },
  ];

  const VideoCards = () => {
    const [expanded, setExpanded] = useState(false);
    const displayedVideos = expanded ? videos : videos.slice(0, 4);

    return (
      <div>
        {displayedVideos.map((video, idx) => (
          <div key={idx}>{video.title}</div>
        ))}
      </div>
    );
  };
  const [expanded, setExpanded] = useState(false);
  const displayedVideos = expanded ? videos : videos.slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-2 py-5">
      <div className="flex flex-wrap gap-5 justify-center">
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
            {/* Thumbnail */}
            <div className="relative aspect-[16/9] cursor-pointer">
              <img
                src={video.thumbnail}
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

            {/* Content */}
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

      {/* Button */}
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
