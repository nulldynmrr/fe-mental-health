import React from "react";
import Button from "../button/page";
import Image from "next/image";
import UpperText from "./text";

const UpperHero = () => {
  return (
    <div className="bg-primary-50 max-w-full h-[690px] flex items-center justify-between px-20 py-20 gap-20">
      <div className="flex items-start justify-center w-[650px] h-[150px] flex-col gap-10 pl-20">
        <UpperText/>
        <Button text="Tentang Kami" variant="about" />
      </div>

      <div className="pr-30">
        <Image
          src="/assets/hero.svg"
          alt="Peduli Kesehatan Mental"
          width={550}
          height={550}
          priority
        />
      </div>
    </div>
  );
};

export default UpperHero;
