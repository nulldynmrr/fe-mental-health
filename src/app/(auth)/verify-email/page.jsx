"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/button/page";
import Navbar from "@/components/navbar/page";
import request from "@/utils/request";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const VerifyEmail = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle"); // "idle" | "registered" | "sent" | "unregistered"

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
      setStatus("registered");
    } else {
      setStatus("unregistered");
    }
  }, []);

  const onVerify = async () => {
    if (!email) {
      toast.error("Email tidak ditemukan. Silakan daftar ulang.");
      router.push("/register");
      return;
    }

    setLoading(true);

    try {
      const res = await request.post("/auth/verify-email", { email });
      toast.success("Tautan verifikasi telah dikirim ke email Anda!");
      console.log("Response:", res.data);
      setStatus("sent");
    } catch (error) {
      console.error("Verifikasi gagal:", error);
      toast.error(
        error.response?.data?.message || "Terjadi kesalahan saat verifikasi."
      );
      setStatus("registered");
    } finally {
      setLoading(false);
    }
  };

  const openEmailProvider = () => {
    if (email.includes("gmail.com")) {
      window.open("https://mail.google.com", "_blank");
    } else if (email.includes("yahoo.com")) {
      window.open("https://mail.yahoo.com", "_blank");
    } else if (email.includes("outlook.com") || email.includes("hotmail.com")) {
      window.open("https://outlook.live.com", "_blank");
    } else {
      toast("Silakan buka aplikasi email Anda secara manual.");
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
          {status === "sent" && (
            <>
              <h1 className="text-4xl font-semibold text-neut-950 mb-2">
                Verifikasi Dikirim!
              </h1>
              <p className="text-neut-600 text-md leading-relaxed mb-6">
                Kami telah mengirimkan tautan verifikasi ke{" "}
                <span className="font-medium">{email}</span>.
                <br />
                Silakan buka email Anda dan klik tautan untuk mengaktifkan akun.
              </p>
              <Button
                text="BUKA EMAIL SEKARANG"
                variant="outlined"
                maxWidth={280}
                onClick={openEmailProvider}
              />
            </>
          )}
          {status === "registered" && (
            <>
              <h1 className="text-4xl font-semibold text-neut-950 mb-2">
                Thanks For Signing Up!
              </h1>
              <p className="text-neut-600 text-md leading-relaxed mb-6">
                Selamat datang di <span className="font-medium">SoulSpace</span>
                ,
                <br />
                Kami dengan tulus menghargai kepercayaan Anda untuk menjadi
                bagian dari ruang ini. Silakan periksa inbox Anda dan lakukan
                verifikasi melalui tautan yang telah kami kirimkan. Dengan
                langkah kecil ini, Anda membuka pintu menuju pengalaman
                eksklusif yang dirancang untuk mendampingi perjalanan jiwa Anda.
              </p>
              <Button
                text={loading ? "Mengirim..." : "KIRIM ULANG VERIFIKASI"}
                variant="round"
                maxWidth={280}
                loading={loading}
                onClick={onVerify}
              />
            </>
          )}

          {status === "unregistered" && (
            <>
              <h1 className="text-4xl font-semibold text-neut-950 mb-4">
                Kirim Ulang Verifikasi
              </h1>
              <p className="text-neut-600 text-md leading-relaxed mb-6">
                Kami tidak menemukan email Anda. Silakan lakukan pendaftaran
                ulang agar dapat melanjutkan proses aktivasi akun.
              </p>
              <Button
                text="DAFTAR ULANG"
                variant="round"
                maxWidth={280}
                onClick={() => router.push("/register")}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
