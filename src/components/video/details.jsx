"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import request from "@/utils/request";

const VideoPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const videoId = searchParams.get("id");

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
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-gray-600 text-lg">Loading videos...</p>
      </div>
    );

  if (videos.length === 0)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-gray-600 text-lg">Belum ada video tersedia.</p>
      </div>
    );

  const mainVideo =
    videos.find((v) => v.video_id === Number(videoId)) || videos[0];
  const otherVideos = videos.filter((v) => v.video_id !== mainVideo.video_id);

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="w-full aspect-video rounded-xl overflow-hidden mb-6">
        <iframe
          src={mainVideo.videoUrl}
          title={mainVideo.title}
          className="w-full h-full object-cover"
          allowFullScreen
        />
      </div>

      <h1 className="text-xl md:text-2xl text-left font-semibold mb-3">
        {mainVideo.title}
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
          <p className="text-sm text-gray-500">11 months ago</p>
        </div>
      </div>

      <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-8">
        {mainVideo.description}
      </p>

      <h2 className="text-xl font-semibold mb-4">Video Lainnya</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {otherVideos.map((video) => (
          <div
            key={video.video_id}
            className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <iframe
              src={video.videoUrl}
              title={video.title}
              className="w-full aspect-video"
              allowFullScreen
            />
            <div className="p-3">
              <h3 className="font-medium text-gray-800 line-clamp-2">
                {video.title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {video.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPage;
