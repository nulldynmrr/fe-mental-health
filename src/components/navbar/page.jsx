"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/button/page";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const navItems = ["Home", "Layanan", "FAQ", "Tentang kami", "Hubungi kami"];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // nnti diganti

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 flex items-center justify-between px-6 sm:px-10 lg:px-20 h-16 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
    
      <div className="flex items-center gap-4 sm:gap-10 lg:gap-20">
        <div
          className="text-xl sm:text-2xl font-semibold cursor-pointer"
          onClick={() => router.push("/")}
        >
          SoulSpace
        </div>

  
        <ul className="hidden md:flex gap-6 lg:gap-8">
          {navItems.map((item, idx) => (
            <li
              key={idx}
              className="text-gray-700 hover:text-primary-500 cursor-pointer transition-colors"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

     
      <div className="hidden md:flex">
        {isLoggedIn ? (
          <Button
            text="Dashboard"
            variant="round"
            onClick={() => router.push("/dashboard")}
          />
        ) : (
          <Button
            text="Masuk"
            variant="round"
            onClick={() => router.push("/login")}
          />
        )}
      </div>


      <div className="md:hidden flex items-center">
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {!isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
      </div>

    
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden flex flex-col items-start px-6 py-4 gap-4 z-40">
          {navItems.map((item, idx) => (
            <div
              key={idx}
              className="text-gray-700 hover:text-primary-500 cursor-pointer transition-colors"
            >
              {item}
            </div>
          ))}

          <div className="w-full border-t border-gray-200 pt-3">
            {isLoggedIn ? (
              <Button
                text="Dashboard"
                variant="round"
                onClick={() => router.push("/dashboard")}
              />
            ) : (
              <Button
                text="Masuk"
                variant="round"
                onClick={() => router.push("/login")}
              />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
