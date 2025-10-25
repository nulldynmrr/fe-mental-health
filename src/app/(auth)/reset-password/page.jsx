"use client";

import { Suspense } from "react";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { LuLock } from "react-icons/lu";
import InputField from "@/components/field/page";
import Button from "@/components/button/page";
import request from "@/utils/request";
import toast from "react-hot-toast";
import { z } from "zod";

// supaya halaman ini tidak di-pre-render (karena pakai useSearchParams)
export const dynamic = "force-dynamic";

// schema validasi
const regisSchema = z
  .object({
    new_password: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
        "Password harus mengandung minimal 1 huruf kapital dan 1 karakter spesial"
      )
      .min(8, "Password minimal 8 karakter")
      .min(1, "Password wajib diisi"),
    confirm_password: z.string().min(1, "Konfirmasi new_password wajib diisi"),
    id: z.union([z.string(), z.number()]).refine((val) => !!val, {
      message: "id user is a required field",
    }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Konfirmasi new_password tidak cocok",
    path: ["confirm_password"],
  })
  .passthrough();

function NewPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    new_password: "",
    confirm_password: "",
    id: "",
  });
  const [errors, setErrors] = useState({
    new_password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userId = searchParams.get("user");
    if (!userId) {
      toast.error("User ID tidak ditemukan");
      return;
    }
    // ubah ke number agar sesuai BE
    setFormData((prev) => ({ ...prev, id: Number(userId) }));
  }, [searchParams]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!formData.id) {
      toast.error("User ID tidak valid");
      return;
    }

    setLoading(true);

    const validations = regisSchema.safeParse(formData);

    if (!validations.success) {
      const newErrors = {};
      validations.error.issues.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      // 👇 log dulu buat memastikan data dikirim sesuai
      console.log("Payload dikirim ke BE:", {
        new_password: formData.new_password,
        confirm_password: formData.confirm_password,
        id: Number(formData.id),
      });

      const response = await request.post(
        "/auth/reset-password",
        {
          new_password: formData.new_password,
          confirm_password: formData.confirm_password,
          id: Number(formData.id), // pastikan number
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200 || response.data.code === 201) {
        toast.dismiss();
        toast.success("Password baru berhasil dibuat");
        router.push("/login");
        return;
      }
    } catch (err) {
      toast.dismiss();
      const errorMessage =
        err.response?.data?.errors?.message ||
        err.response?.data?.message ||
        "Terjadi kesalahan saat memperbarui password.";

      toast.error(errorMessage);
      setErrors((prev) => ({
        ...prev,
        new_password: "",
        confirm_password: "",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex w-1/2 bg-primary-50 justify-center items-center">
        <Image
          src="/assets/regis.svg"
          alt="newPassword Illustration"
          width={400}
          height={400}
          priority
        />
      </div>

      <div className="flex flex-col w-full md:w-1/2 px-6 md:px-12">
        <div className="flex flex-1 items-center justify-center w-full">
          <div className="w-full max-w-md space-y-6">
            <h2 className="text-3xl font-bold text-black">Password Baru</h2>
            <p className="text-neut-600 text-sm font-semibold">
              Atur kata sandi baru untuk akun Anda agar dapat login dan
              mengakses semua fitur.
            </p>

            <form onSubmit={onSubmit} noValidate className="space-y-4">
              <div className="flex flex-col space-y-4">
                <InputField
                  label="Masukkan Password baru"
                  name="new_password"
                  type="password"
                  placeholder="Masukkan Password baru"
                  value={formData.new_password}
                  onChange={onChange}
                  message={errors.new_password}
                  icon={LuLock}
                />

                <InputField
                  label="Konfirmasi Password"
                  name="confirm_password"
                  type="password"
                  placeholder="Masukkan Password Konfirmasi"
                  value={formData.confirm_password}
                  onChange={onChange}
                  message={errors.confirm_password}
                  icon={LuLock}
                />
              </div>

              <Button
                variant="primary"
                text={loading ? "Menyimpan..." : "Update Password"}
                fullWidth
              />
            </form>

            <div className="w-full self-end text-center text-sm mt-6">
              <span className="text-neut-500 font-medium">
                Sudah Punya Akun?{" "}
              </span>
              <a
                href="/login"
                className="text-primary-500 hover:underline font-medium"
              >
                Masuk
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Memuat halaman...</p>}>
      <NewPasswordForm />
    </Suspense>
  );
}
