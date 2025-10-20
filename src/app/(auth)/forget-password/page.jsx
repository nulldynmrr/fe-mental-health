"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { CgMail } from "react-icons/cg";
import InputField from "@/components/field/page";
import Button from "@/components/button/page";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import request from "@/utils/request";
import { z } from "zod";

const forgetPasswordSchema = z.object({
  email: z
    .string()
    // .email("Format email tidak valid")
    .min(1, "Username atau Email wajib diisi"),
});

const forgetPassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({
    email: "",
  });

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

    const validations = forgetPasswordSchema.safeParse(formData);

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
      const response = await request.post(
        "/auth/email-reset-password",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200 || response.data.code === 201) {
        toast.dismiss();
        //saved email
        localStorage.setItem("email", formData.email);
        router.push("/verify-email");
        return;
      }
    } catch (error) {
      setLoading(false);
      toast.dismiss();
      return;
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex w-1/2 bg-primary-50 justify-center items-center">
        <Image
          src="/assets/login.svg"
          alt="forgetPassword Illustration"
          width={400}
          height={400}
          priority
        />
      </div>

      <div className="flex flex-col w-full md:w-1/2 px-6 md:px-12">
        <div className="flex flex-1 items-center justify-center w-full">
          <div className="w-full max-w-md space-y-6">
            <h2 className="text-3xl font-bold text-black">Lupa Password</h2>
            <p className="text-neut-600 text-sm font-semibold">
              Masukkan email Anda untuk proses verifikasi, kami akan mengirimkan
              kode 4 digit ke email Anda.
            </p>

            <form onSubmit={onSubmit} noValidate className="space-y-4">
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={onChange}
                message={errors.email}
                icon={CgMail}
              />

              <Button variant="primary" text="Lanjutkan" fullWidth />
            </form>

            <div className="flex flex-row w-full md:w-1/2 px-6 md:px-12">
              <div className="w-full max-w-md self-end text-right text-sm mt-6">
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
    </div>
  );
};

export default forgetPassword;
