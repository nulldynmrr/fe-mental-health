"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/button/page";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const navItems = ["Home", "Layanan", "FAQ", "Tentang kami", "Hubungi kami"];
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // aktif setelah scroll 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 flex items-center justify-between px-20 pr-10 h-16 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      {/* left */}
      <div className="flex items-center gap-20">
        <div className="text-2xl font-semibold">SoulSpace</div>

        <ul className="flex gap-8">
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

      {/* right */}
      <div>
        <Button
          text="Masuk"
          variant="round"
          onClick={() => router.push("/login")}
        />
      </div>
    </nav>
  );
};

export default Navbar;
