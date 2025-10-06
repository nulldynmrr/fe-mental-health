import React from "react";
import Button from "../button/page";
import Image from "next/image";
import UpperText from "./text";

const UpperHero = () => {
  return (
    <div className="bg-primary-50 w-full flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-16 lg:px-20 py-12 md:py-20 gap-10 md:gap-20 text-center md:text-left">
      {/* Bagian kiri */}
      <div className="flex flex-col items-center md:items-start justify-center w-full md:w-[600px] gap-6 md:gap-10">
        <UpperText />
        <div className="flex justify-center md:justify-start">
          <Button text="Tentang Kami" variant="about" />
        </div>
      </div>

      {/* Bagian kanan (gambar) */}
      <div className="flex justify-center md:justify-center">
        <Image
          src="/assets/hero.svg"
          alt="Peduli Kesehatan Mental"
          width={550}
          height={550}
          priority
          className="w-[250px] sm:w-[350px] md:w-[450px] lg:w-[550px] h-auto"
        />
      </div>
    </div>
  );
};

export default UpperHero;
