"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { playlistData } from "@/utils/playlist";
import { FaPlay } from "react-icons/fa6";

const MusicCard = () => {
  const scrollRefs = useRef([]);
  const [scrollState, setScrollState] = useState({});


  const scroll = (idx, dir) => {
    const container = scrollRefs.current[idx];
    if (container) {
      container.scrollBy({
        left: dir === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };


  const handleScroll = (idx) => {
    const el = scrollRefs.current[idx];
    if (el) {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const isAtStart = scrollLeft <= 5;
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 5;
      setScrollState((prev) => ({
        ...prev,
        [idx]: { isAtStart, isAtEnd },
      }));
    }
  };

 
  useEffect(() => {
    playlistData.forEach((_, idx) => handleScroll(idx));
  }, []);

  return (
    <>
      {playlistData.map((list, idx) => {
        const { isAtStart, isAtEnd } = scrollState[idx] || {};
        return (
          <section key={idx} className="mb-12 relative">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[20px] font-semibold text-neut-900">
                {list.category}
              </h2>

              <div className="flex gap-2">
                <button
                  onClick={() => scroll(idx, "left")}
                  className={`p-1 rounded-full bg-primary-500 hover:bg-primary-600 transition flex items-center justify-center 
                    ${
                      isAtStart
                        ? "opacity-40"
                        : "opacity-100 animate-pulse-slow"
                    }`}
                >
                  <FaChevronLeft className="w-4 h-4 text-white" />
                </button>

                <button
                  onClick={() => scroll(idx, "right")}
                  className={`p-1 rounded-full bg-primary-500 hover:bg-primary-600 transition flex items-center justify-center 
                    ${
                      isAtEnd ? "opacity-40" : "opacity-100 animate-pulse-slow"
                    }`}
                >
                  <FaChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            <div className="relative">
              {!isAtStart && (
                <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white via-white/70 to-transparent pointer-events-none z-10" />
              )}

              {!isAtEnd && (
                <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white via-white/70 to-transparent pointer-events-none z-10" />
              )}

              <div
                ref={(el) => (scrollRefs.current[idx] = el)}
                onScroll={() => handleScroll(idx)}
                className=" flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-3 transition-all duration-300 "
                
              >
                {list.tracks.map((track, i) => (
                  <div
                    key={i}
                    className="min-w-[260px] bg-white rounded-lg rounded-t-sm shadow-[0_1px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_2px_20px_rgba(0,0,0,0.12)] transition overflow-hidden cursor-pointer"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={track.thumbnail}
                        alt={track.category}
                        width={300}
                        height={300}
                        className="object-cover w-full h-full"
                      />

                      <button className="group absolute -bottom-5 right-6 bg-white hover:bg-primary-500 shadow-md hover:shadow-lg transition-all duration-300 rounded-full p-3 flex items-center justify-center cursor-pointer">
                        <FaPlay className="w-4 h-4 text-neut-600 transition-colors duration-300 group-hover:text-white" />
                      </button>
                    </div>

                    <div className="p-4 mt-4">
                      <p className="text-sm text-primary-500 font-medium mb-1">
                        New For You
                      </p>
                      <h3 className="font-semibold text-neut-900 text-base line-clamp-2">
                        {track.title}
                      </h3>
                      <p className="text-sm text-neut-600 mt-1 line-clamp-2">
                        {track.artist}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
};

export default MusicCard;
