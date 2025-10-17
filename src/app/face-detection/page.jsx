"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/navbar/page";
import Breadcrumb from "@/components/breadcrumb/page";
import VideoCards from "@/components/video/card";
import FaceScanner from "@/components/face-scanner/page";
import request from "@/utils/request";

const FaceDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isDetected, setIsDetected] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [result, setResult] = useState(null);

  // open camera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsCameraReady(true);
        }
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

  // capture otomatis
  useEffect(() => {
    if (!isCameraReady) return;

    const detectTimer = setTimeout(() => {
      setIsDetected(true);
    }, 3000);

    return () => clearTimeout(detectTimer);
  }, [isCameraReady]);

  //send function API
  useEffect(() => {
    if (isDetected && !isCapturing) {
      onCaptureAnalyze();
    }
  }, [isDetected]);

  const onCaptureAnalyze = async () => {
    try {
      setIsCapturing(true);

      // flash effect
      const flash = document.createElement("div");
      flash.className =
        "fixed inset-0 bg-white opacity-80 animate-fadeOut pointer-events-none z-[9999]";
      document.body.appendChild(flash);
      setTimeout(() => flash.remove(), 400);

      // taken video frame
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/jpeg")
      );

      const formData = new FormData();
      formData.append("file", blob, "capture.jpg");

      // send to API
      const res = await request.post("/face-detection", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = res.data;
      setResult(data);
    } catch (err) {
      console.error("Error saat analisis wajah:", err);
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="h-screen bg-white overflow-hidden">
      <Navbar />
      <div className="relative w-full h-screen overflow-hidden flex justify-center items-center">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover scale-x-[-1] rounded-lg overflow-hidden"
          style={{ objectFit: "contain" }}
        />

        <div className="absolute inset-0 bg-primary/30" />

        <FaceScanner isScanning={isCameraReady && !isDetected} />
        <div className="p-6 md:px-20 absolute top-6 left-6 text-white">
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Deteksi Wajah" },
            ]}
          />
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {result && (
        <div className="p-6 md:px-20 md:py-12 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4">Hasil Analisis</h2>

          <div className="bg-primary-50 border border-neut-100 rounded-lg p-6">
            <p className="text-black">
              <strong>Hasil Emosi:</strong>{" "}
              <span className="text-primary-500 font-semibold cursor-pointer hover:underline">
                {result.emotion || "Tidak terdeteksi"}
              </span>
            </p>
            <p className="mt-3 text-neut-700 leading-relaxed">
              {result.description ||
                "Tidak ada deskripsi tambahan dari hasil deteksi."}
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
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        .animate-fadeOut {
          animation: fadeOut 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default FaceDetection;
