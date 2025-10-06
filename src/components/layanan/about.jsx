import React from "react";
import Image from "next/image";

const AboutBox = () => {
  return (
  <div className="flex flex-col border-2 border-primary-500 shadow-[3.12px_9.37px_21.20px_0_rgba(0,0,0,0.06)] rounded-3xl w-full max-w-[1100px] mx-auto my-10 px-4 sm:px-8 md:px-12 lg:px-20 py-10">
    {/* Header */}
    <h2 className="text-2xl sm:text-3xl font-semibold text-center text-neut-700 pt-5">
      <span className="bg-gradient-to-r from-[#0179B4] to-[#88D8FF] bg-clip-text text-transparent">
        Tentang:
      </span>{" "}
      Kesehatan Mental
    </h2>

    {/* Konten */}
    <div className="flex flex-col lg:flex-row items-center justify-center gap-10 mt-8">
      {/* Gambar */}
      <div className="flex justify-center w-full lg:w-auto">
        <Image
          src="/assets/tentangKesehatan.svg"
          alt="Peduli Kesehatan Mental"
          width={450}
          height={350}
          className="w-[80%] max-w-[350px] sm:max-w-[400px] md:max-w-[450px] object-contain"
          priority
        />
      </div>

      {/* Deskripsi */}
      <div className="leading-relaxed text-neut-600 text-justify w-full lg:w-[600px] text-[15px] sm:text-base">
        Tahukah kamu bahwa 1 dari 5 orang pernah mengalami masalah kesehatan
        mental, namun sebagian besar tidak menyadarinya hingga kondisinya
        semakin parah? Padahal, deteksi dini menjadi kunci penting untuk
        mencegah masalah berkembang lebih jauh dan mempermudah proses
        pemulihan. <br /> <br />
        Melalui layanan kami, kamu dapat memantau kondisi emosional secara
        berkala, mengenali tanda-tanda awal perubahan suasana hati atau stres,
        serta mendapatkan dukungan yang sesuai dengan kebutuhanmu. Dengan fitur{" "}
        <span className="text-primary-500 font-medium">
          Deteksi Wajah, Smart Journaling, Visualization, Meditation, dan
          Obrolan Anonim
        </span>
        , kami membantu kamu memahami diri lebih baik, menjaga keseimbangan
        mental, serta merasa lebih aman untuk berbagi dan mencari pertolongan.
        <br /> <br />
        Kami percaya, langkah kecil untuk mengenali kondisi mental sejak dini
        dapat membuat perubahan besar bagi kesehatan dan kualitas hidupmu.
      </div>
    </div>
  </div>
);


};

export default AboutBox;
