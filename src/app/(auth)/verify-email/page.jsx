"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/button/page";
import Navbar from "@/components/navbar/page";
import request from "@/utils/request";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("user_email");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const onVerify = async () => {
    if (!email) {
      toast.error("Email tidak ditemukan. Silakan daftar ulang.");
      return;
    }

    setLoading(true);

    try {
      const res = await request.post("/auth/verify-email", { email });
      toast.success("Tautan verifikasi telah dikirim ke email Anda!");
      console.log("Response:", res.data);

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      console.error("Verifikasi gagal:", error);
      toast.error(
        error.response?.data?.message || "Terjadi kesalahan saat verifikasi."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center m-4 px-6 md:px-20">
        <div className="w-full flex flex-col items-center justify-center p-16 rounded-2xl border border-neut-200 text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/assets/verify-email.svg"
              alt="Verify Email Illustration"
              width={280}
              height={280}
              className="object-contain"
            />
          </div>

          <h1 className="text-4xl font-semibold text-neut-950 mb-2">
            Thanks For Signing Up!
          </h1>

          <p className="text-neut-600 text-md leading-relaxed mb-6">
            Selamat datang di <span className="font-medium">SoulSpace</span>,
            <br />
            Kami dengan tulus menghargai kepercayaan Anda untuk menjadi bagian
            dari ruang ini. Silakan periksa inbox Anda dan lakukan verifikasi
            melalui tautan yang telah kami kirimkan. Dengan langkah kecil ini,
            Anda membuka pintu menuju pengalaman eksklusif yang dirancang untuk
            mendampingi perjalanan jiwa Anda.
          </p>

          <div className="flex justify-center w-full">
            <Button
              text={loading ? "Mengirim..." : "VERIFY EMAIL"}
              variant="round"
              maxWidth={280}
              loading={loading}
              onClick={onVerify}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
