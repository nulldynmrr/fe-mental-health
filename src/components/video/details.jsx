"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import request from "@/utils/request";

const VideoPage = () => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchNewsDetail = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await request.get(`/mindful-news/${id}`);
        setNews(res.data?.data);
      } catch (error) {
        console.error("Error fetching news detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-gray-600 text-lg">Loading video...</p>
      </div>
    );

  if (!news)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-gray-600 text-lg">Video tidak ditemukan.</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="w-full aspect-video rounded-xl overflow-hidden mb-6">
        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-full h-full object-cover"
        />
      </div>

      <h1 className="text-xl md:text-2xl text-left font-semibold mb-3">
        {news.title}
      </h1>

      <div className="flex items-center gap-3 mb-6">
        <Image
          src="/assets/images/author-avatar.png"
          alt="Author"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div>
          <p className="font-medium text-gray-800">The Camera Guy</p>
          <p className="text-sm text-gray-500">{news.readingTime} min read</p>
        </div>
      </div>

      <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-8">
        {news.description}
      </p>

      <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-8 whitespace-pre-line">
        {news.content}
      </p>
    </div>
  );
};

export default VideoPage;
