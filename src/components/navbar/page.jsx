"use client";
import React from "react";
import Button from "@/components/button/page";

const Navbar = () => {
  const navItems = ["Home", "Layanan", "FAQ", "Tentang kami", "Hubungi kami"];

  return (
    <nav className="flex items-center justify-between px-20 pr-10 h-16 bg-neut-50 shadow">
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
        <Button text="Masuk" variant="round" />
      </div>
    </nav>
  );
};

export default Navbar;
