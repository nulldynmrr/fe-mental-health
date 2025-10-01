"use client";
import React from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { LuLock } from "react-icons/lu";
import InputField from "@/components/field/page";
import Button from "@/components/button/page";

const Login = () => {
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

            <form className="space-y-4">
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="Masukkan email"
                icon={CgMail}
              />
              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="Masukkan password"
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
