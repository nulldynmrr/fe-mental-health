import React from "react";
import VideoHeader from "./text";
import VideoCards from "./card";

const VideoSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <VideoHeader />
      <VideoCards />
    </section>
  );
};

export default VideoSection;
