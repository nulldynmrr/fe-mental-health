import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full bg-primary-50">
      {/* Bagian atas */}
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-start gap-10">
        {/* Kiri */}
        <div className="flex flex-col max-w-sm">
          <h2 className="text-2xl sm:text-3xl font-semibold">SoulSpace</h2>
          <p className="text-neut-500 font-semibold mt-4">
            Experience personalized medical care from the comfort of your home.
          </p>
        </div>

        {/* Kanan */}
        <div className="flex flex-col sm:flex-row gap-10 sm:gap-20">
          <div>
            <h4 className="font-semibold text-primary-500">Support</h4>
            <ul className="mt-4 space-y-3">
              {[
                ["Getting Started", "/getting-started"],
                ["FAQs", "/faqs"],
                ["Help Articles", "/help-articles"],
                ["Report an Issue", "/report"],
                ["Contact Help Desk", "/contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-gray-600 hover:text-primary-600"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Garis pemisah */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t-2 border-blue-200"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex gap-5">
          {["fb", "ig", "linkedin", "yt"].map((icon) => (
            <Image
              key={icon}
              src={`/assets/icons/${icon}.svg`}
              alt={icon}
              width={24}
              height={24}
            />
          ))}
        </div>

        <div className="text-neut-600 font-semibold text-sm sm:text-base text-center sm:text-right">
          SoulSpace 2024 © All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
