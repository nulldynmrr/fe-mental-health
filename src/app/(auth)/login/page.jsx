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
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import request from "@/utils/request";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    // .email("Format email tidak valid")
    .min(1, "Username atau Email wajib diisi"),
  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .min(1, "Password wajib diisi"),
});

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("rememberMeData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData(parsed);
      setRememberMe(true);
    }
  }, []);

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
    let identifier = formData.email;

    // add "@gmail.com"
    if (!identifier.includes("@")) {
      identifier = identifier + "@gmail.com";
    }

    const payload = {
      email: identifier,
      password: formData.password,
    };

    const validations = loginSchema.safeParse(formData);

    if (!validations.success) {
      const newErrors = {};
      validations.error.issues.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    // fetch API
    try {
      const response = await request.post("/auth/login", payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200 || response.data.code === 201) {
        Cookies.set("token", response.data.data.access_token, {
          expires: rememberMe ? 7 : 1, 
          sameSite: "Strict",
        });

        toast.dismiss();
        toast.success("Login Berhasil");

        // simpan ke localstorage
        if (rememberMe) {
          localStorage.setItem("rememberMeData", JSON.stringify(formData));
        } else {
          localStorage.removeItem("rememberMeData");
        }

        router.push("/dashboard");
      }
    } catch (error) {
      setLoading(false);
      toast.dismiss();
      toast.error(error.response.data.message);
      setErrors({ email: "", password: "" });
      return;
    }
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
                label="Username"
                name="email"
                type="email"
                placeholder="Masukkan username atau email"
                value={formData.email}
                onChange={onChange}
                message={errors.email}
                icon={CgMail}
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

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="accent-primary-500 border-gray-300 rounded focus:ring-primary-500"
                  />
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
