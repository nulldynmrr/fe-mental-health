"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/button/page";
import Navbar from "@/components/navbar/page";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const VerifyEmail = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const onVerify = async () => {
    setLoading(true);
    try {
      window.open("https://mail.google.com", "_blank");
      toast.success("Silakan cek email Anda untuk verifikasi!");
    } catch (error) {
      console.error("Error membuka Gmail:", error);
      toast.error("Tidak dapat membuka Gmail, coba secara manual.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center px-6 py-16 md:px-20 text-center">
        <div className="w-full flex flex-col items-center justify-center p-10 rounded-2xl border border-neut-300">
          <Image
            src="/assets/verify-email.svg"
            alt="Verify Email Illustration"
            width={250}
            height={250}
            className="object-contain mb-6"
          />

          <h1 className="text-3xl md:text-4xl font-semibold text-neut-950 mb-4">
            Thanks For Signing Up!
          </h1>

          <div className="w-16 h-[2px] bg-primary-500 mb-2" />
          <p className="text-neut-600 text-md leading-relaxed mb-6">
            Selamat datang di <span className="font-medium">SoulSpace</span>
            ,
            <br />
            Kami dengan tulus menghargai kepercayaan Anda untuk menjadi bagian
            dari ruang ini. Silakan periksa inbox Anda dan lakukan verifikasi
            melalui tautan yang telah kami kirimkan. Dengan langkah kecil ini,
            Anda membuka pintu menuju pengalaman eksklusif yang dirancang untuk
            mendampingi perjalanan jiwa Anda.
          </p>
          <Button
            text={loading ? "MENGIRIM..." : "VERIFY EMAIL"}
            variant="round"
            maxWidth={280}
            loading={loading}
            onClick={onVerify}
          />
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
