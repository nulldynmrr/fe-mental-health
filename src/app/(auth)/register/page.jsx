"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { LuLock } from "react-icons/lu";
import InputField from "@/components/field/page";
import Button from "@/components/button/page";
import { z } from "zod";

const loginSchema = z.object({
  firstName: z
    .string()
    .min(1, "Nama Depan wajib diisi"),
  lastName: z
    .string()
    .min(1, "Nama Belakang wajib diisi"),
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  password: z
    .string()
    .min(1, "Password wajib diisi")
    .min(6, "Password minimal 6 karakter"),
});

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({

    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const validations = loginSchema.safeParse(formData);

    if (!validations.success) {
      const newErrors = {};
      validations.error.issues.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    // fetch API

    setErrors({ firstName: "",
    lastName: "",email: "", password: "" });
    router.push("/");
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
                  name="firstName"
                  type="text"
                  placeholder="Masukkan Nama depan"
                  value={formData.firstName}
                  onChange={handleChange}
                  message={errors.email}
                />
                <InputField
                  label="Nama Belakang"
                  name="lastName"
                  type="text"
                  placeholder="Masukkan Nama belakang"
                  value={formData.email}
                  onChange={handleChange}
                  message={errors.email}
                />
              </div>
              <InputField
                label="Nomor Telepon"
                name="numberPhone"
                type="tel"
                placeholder="Masukkan email"
                value={formData.email}
                onChange={handleChange}
                message={errors.email}
                icon={CgMail}
              />
              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="Masukkan password"
                value={formData.password}
                onChange={handleChange}
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
