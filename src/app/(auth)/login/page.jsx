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
  email: z
    .string()
    .email("Format email tidak valid")
    .min(1, "Email wajib diisi"),
  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .min(1, "Password wajib diisi"),
});

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
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

    setErrors({ email: "", password: "" });
    router.push("/");
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex w-1/2 bg-primary-50 justify-center items-center">
        <Image
          src="/assets/login.svg"
          alt="Login Illustration"
          width={400}
          height={400}
          priority
        />
      </div>

      <div className="flex flex-col w-full md:w-1/2 px-6 md:px-12">
        <div className="w-full max-w-md self-end text-right text-sm mt-6">
          <span className="text-neut-500 font-medium">Belum Punya Akun? </span>
          <a
            href="/register"
            className="text-primary-500 hover:underline font-medium"
          >
            Daftar
          </a>
        </div>

        <div className="flex flex-1 items-center justify-center w-full">
          <div className="w-full max-w-md space-y-6">
            <h2 className="text-3xl font-bold text-black">Selamat Datang</h2>
            <p className="text-neut-600 text-sm font-semibold">
              Masuk Untuk Melanjutkan
            </p>

            <form onSubmit={onSubmit} noValidate className="space-y-4">
              <InputField
                label="Email"
                name="email"
                type="email"
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

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="text-neut-400">Ingat Saya</span>
                </label>
                <a href="#" className="text-primary-500 hover:underline">
                  Lupa Password?
                </a>
              </div>

              <Button variant="primary" text="Login" fullWidth />
            </form>

            <div className="flex items-center gap-2">
              <hr className="flex-grow border-neut-200" />
              <span className="text-neut-600 text-sm font-semibold">
                Atau lanjutkan dengan
              </span>
              <hr className="flex-grow border-neut-200" />
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                icon={<FaFacebook className="text-[#1877F2]" size={22} />}
              />
              <Button variant="outline" icon={<FcGoogle size={22} />} />
              <Button
                variant="outline"
                icon={<FaLinkedinIn className="text-[#0A66C2]" size={22} />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
