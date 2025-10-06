"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { CgMail } from "react-icons/cg";
import { MdPhoneAndroid } from "react-icons/md";
import { LuLock } from "react-icons/lu";
import InputField from "@/components/field/page";
import Button from "@/components/button/page";
import request from "@/utils/request";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { z } from "zod";

const regisSchema = z
  .object({
    first_name: z.string().min(1, "Nama Depan wajib diisi"),
    last_name: z.string().min(1, "Nama Belakang wajib diisi"),
    email: z
      .string()
      .email("Format email tidak valid")
      .min(1, "Email wajib diisi"),
    phone_number: z
      .string()
      .regex(
        /^\+628\d{8,}$/,
        "Nomor telepon harus diawali dengan +628 dan memiliki minimal 11 digit."
      )
      .min(1, "Nomor telepon wajib diisi"),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
        "Password harus mengandung minimal 1 huruf kapital dan 1 karakter spesial"
      )
      .min(8, "Password minimal 8 karakter")
      .min(1, "Password wajib diisi"),
  })
  .passthrough();

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
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
      const response = await request.post("/auth/register", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200 || response.data.code === 201) {
        Cookies.set("token", response.data.data.access_token);
        toast.dismiss();
        toast.success("Register Berhasil");
        router.push("/verify-email");
        return;
      }
    } catch (err) {
      toast.dismiss();
      // cek dari server
      const errorMessage =
        err.response?.data?.errors?.validation?.email?.[0] ||
        err.response?.data?.errors?.message ||
        err.response?.data?.message ||
        "Email sudah digunakan.";

      if (errorMessage.includes("Email already taken")) {
        setErrors((prev) => ({
          ...prev,
          email: "Email sudah digunakan.",
        }));
      } else {
        toast.error(errorMessage);
      }

      setErrors((prev) => ({
        ...prev,
        password: "",
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
          alt="Register Illustration"
          width={400}
          height={400}
          priority
        />
      </div>

      <div className="flex flex-col w-full md:w-1/2 px-6 md:px-12">
        <div className="w-full max-w-md self-end text-right text-sm mt-6">
          <span className="text-neut-500 font-medium">Sudah Punya Akun? </span>
          <a
            href="/login"
            className="text-primary-500 hover:underline font-medium"
          >
            Masuk
          </a>
        </div>

        <div className="flex flex-1 items-center justify-center w-full">
          <div className="w-full max-w-md space-y-6">
            <h2 className="text-3xl font-bold text-black">Daftarkan Akunmu</h2>
            <p className="text-neut-600 text-sm font-semibold">
              Lengkapi Data dibawah ini untuk mendaftarkan Akunmu
            </p>

            <form onSubmit={onSubmit} noValidate className="space-y-4">
              <div className="flex space-x-4">
                <InputField
                  label="Nama Depan"
                  name="first_name"
                  type="text"
                  placeholder="Masukkan Nama depan"
                  value={formData.first_name}
                  onChange={onChange}
                  message={errors.first_name}
                />
                <InputField
                  label="Nama Belakang"
                  name="last_name"
                  type="text"
                  placeholder="Masukkan Nama belakang"
                  value={formData.last_name}
                  onChange={onChange}
                  message={errors.last_name}
                />
              </div>
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="Masukkan email"
                value={formData.email}
                onChange={onChange}
                message={errors.email}
                icon={CgMail}
              />
              <InputField
                label="Nomor Telepon"
                name="phone_number"
                type="tel"
                placeholder="+6281122334444"
                value={formData.phone_number}
                onChange={onChange}
                message={errors.phone_number}
                icon={MdPhoneAndroid}
              />
              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="Masukkan password"
                value={formData.password}
                onChange={onChange}
                message={errors.password}
                icon={LuLock}
              />

              <div className="flex items-center justify-between text-sm text-neut-600">
                <p className="leading-relaxed">
                  Dengan masuk, Anda menyetujui{" "}
                  <a href="/terms" className="text-primary-500 hover:underline">
                    Syarat & Ketentuan
                  </a>{" "}
                  serta{" "}
                  <a
                    href="/privacy"
                    className="text-primary-500 hover:underline"
                  >
                    Kebijakan Privasi
                  </a>{" "}
                  kami.<span className="text-red-500">*</span>
                </p>
              </div>

              <Button variant="primary" text="Register" fullWidth />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
