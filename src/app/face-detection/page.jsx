"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/navbar/page";
import Breadcrumb from "@/components/breadcrumb/page";
import VideoCards from "@/components/video/card";
import FaceScanner from "@/components/face-scanner/page";

const FaceDetection = () => {
  const videoRef = useRef(null);
  const [isDetected, setIsDetected] = useState(false);
  const [result, setResult] = useState(true);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Gagal mengakses kamera:", err);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  useEffect(() => {
    const fakeDetect = setTimeout(() => {
      setIsDetected(true);
    }, 3000);
    return () => clearTimeout(fakeDetect);
  }, []);

  return (
    <div className="h-screen bg-white overflow-hidden">
      <Navbar />
      <div className="relative w-full h-screen overflow-hidden flex justify-center items-center ">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover scale-x-[-1] rounded-lg overflow-hidden"
          style={{ objectFit: "contain" }}
        />
        <div className="absolute inset-0 bg-primary/30" />

        <FaceScanner />

        <div className="p-6 md:px-20 absolute top-6 left-6 text-white">
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Deteksi Wajah" },
            ]}
          />
        </div>
      </div>

      {result && (
        <div className="p-6 md:px-20 md:py-12 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4">Hasil Analisis</h2>

          <div className="bg-primary-50 border border-neut-100 rounded-lg p-6">
            <p className="text-black">
              <strong>Hasil Emosi:</strong>{" "}
              <span className="text-primary-500 font-semibold cursor-pointer hover:underline">
                Bahagia
              </span>
            </p>
            <p className="mt-3 text-neut-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">
            Video Rekomendasi Untukmu
          </h3>

          <div>
            <VideoCards />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scan {
          0% {
            top: 0;
          }
          100% {
            top: 100%;
          }
        }
        .animate-scan {
          animation: scan 1.5s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default FaceDetection;
