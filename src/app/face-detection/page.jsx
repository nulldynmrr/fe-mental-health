"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/navbar/page";
import Breadcrumb from "@/components/breadcrumb/page";
import FaceScanner from "@/components/face-scanner/page";
import request from "@/utils/request";

const FaceDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isLoadingResult, setIsLoadingResult] = useState(false);
  const [result, setResult] = useState(null);

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

  const getResult = async (id) => {
    try {
      const res = await request.get(`/face-detection/${id}`);
      if (res.status === 200 && res.data?.data) {
        setResult(res.data.data);
      } else {
        console.warn("Data hasil belum siap:", res.data);
      }
    } catch (err) {
      console.error("Gagal mengambil hasil analisis:", err);
      alert("Tidak dapat mengambil hasil dari server. Coba ulangi lagi.");
    } finally {
      setIsLoadingResult(false);
    }
  };

  const onCaptureAnalyze = async () => {
    try {
      setIsCapturing(true);
      setIsLoadingResult(true);

      // Flash animasi
      const flash = document.createElement("div");
      flash.className =
        "fixed inset-0 bg-white opacity-80 animate-fadeOut pointer-events-none z-[9999]";
      document.body.appendChild(flash);
      setTimeout(() => flash.remove(), 400);

      // Ambil frame video
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Buat blob dan formData
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/jpeg")
      );
      const formData = new FormData();
      formData.append("image", blob, "capture.jpg");

      const saveRes = await request.post(`/face-detection`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const resultData = saveRes.data?.data; // <- di sini sudah ada mood
      setResult(resultData);

      const id = resultData?.id;
      if (!id) throw new Error("ID analisis tidak ditemukan di respons.");

      console.log("Upload sukses, ID:", id);

      // Lanjut GET hasil
      await getResult(id);
    } catch (err) {
      console.error("Error saat analisis wajah:", err);
      alert("Gagal memproses data. Pastikan backend aktif dan URL benar.");
      setIsLoadingResult(false);
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="h-screen bg-white overflow-hidden">
      <Navbar />
      <div className="relative w-full h-screen flex justify-center items-center">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover scale-x-[-1] rounded-lg"
          style={{ objectFit: "contain" }}
        />
        <div className="absolute inset-0 bg-primary/30" />
        <FaceScanner isScanning={isCameraReady && !isCapturing} />
        <div className="p-6 md:px-20 absolute top-6 left-6 text-white">
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Deteksi Wajah" },
            ]}
          />
        </div>

        {isCameraReady && !isLoadingResult && (
          <button
            onClick={onCaptureAnalyze}
            className="absolute bottom-10 px-6 py-3 border border-primary-400 text-primary-500 rounded-full font-medium hover:bg-primary-50 transition"
            disabled={isCapturing}
          >
            Capture photo
          </button>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {isLoadingResult && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md z-[9999]">
          <FaceScanner isScanning={true} />
          <p className="mt-4 text-primary-600 font-semibold animate-pulse">
            Sedang menganalisis wajahmu, harap tunggu...
          </p>
        </div>
      )}

      {result && (
        <div className="p-10">
          <h2 className="text-xl font-semibold mb-4">Hasil Analisis</h2>
          <div className="w-full bg-primary-50 border border-primary-100 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-black mb-2">
              Hasil Emosi:
            </h3>
            <p className="text-4xl font-bold text-primary-500 mb-2 capitalize">
              {result?.mood === "joy"
                ? "Bahagia"
                : result?.mood === "sadness"
                ? "Sedih"
                : result?.mood === "anger"
                ? "Marah"
                : result?.mood === "fear"
                ? "Takut"
                : result?.mood === "disgust"
                ? "Jijik"
                : result?.mood === "surprise"
                ? "Terkejut"
                : result?.mood || "-"}
            </p>
            <p className="text-md text-black">
              Confidence:{" "}
              {result?.confidence ? result.confidence.toFixed(0) : 90}
            </p>
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
