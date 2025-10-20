"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/navbar/page";
import Breadcrumb from "@/components/breadcrumb/page";
import FaceScanner from "@/components/face-scanner/page";
import request from "@/utils/request";
import toast from "react-hot-toast";

const FaceDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const resultRef = useRef(null);
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
      toast.error("Tidak dapat mengambil hasil dari server. Coba ulangi lagi.");
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

      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/jpeg")
      );
      const formData = new FormData();
      formData.append("image", blob, "capture.jpg");

      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 60000);

      try {
        const saveRes = await request.post(`/face-detection`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (saveRes.status === 201 || saveRes.data.code === 201) {
          const faceID = saveRes.data.data.detection_id;
          await getResult(faceID);
        } else {
          toast.error("Gagal menganalisis wajah, silakan coba ulang.");
        }
      } catch (err) {
        if (err.name === "AbortError") {
          toast.error("Silakan capture ulang wajah Anda.");
        } else {
          console.error("Error saat analisis wajah:", err);
          toast.error("Gagal memproses data.");
        }
        setIsLoadingResult(false);
      }
    } catch (err) {
      console.error("Error saat capture:", err);
      toast.error("Terjadi kesalahan saat capture. Silakan coba lagi.");
    } finally {
      setIsCapturing(false);
    }
  };

  // scroll otomatis
  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [result]);

  return (
    <div className="bg-white overflow-auto min-h-screen">
      <Navbar />
      <div className="relative w-full h-screen flex justify-center items-center mt-[-50px]">
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
        <div ref={resultRef} className="p-10 animate-fadeIn">
          <h2 className="text-xl font-semibold mb-4">Hasil Analisis</h2>
          <div className="w-full bg-primary-50 border border-neut-100 rounded-lg p-6 text-center">
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
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default FaceDetection;
