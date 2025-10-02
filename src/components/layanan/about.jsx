import React from "react";
import Image from "next/image";

const AboutBox = () => {
  return (
    <div className="flex flex-col border-2 border-primary-500 shadow-[3.12px_9.37px_21.20px_0_rgba(0,0,0,0.06)] rounded-3xl w-7xl min-h-[580px] mx-30 my-20 ">
    
      <div className="text-3xl font-semibold text-center text-neut-700 pt-15">
        <span className="bg-gradient-to-r from-[#0179B4] to-[#88D8FF] bg-clip-text text-transparent">
          Tentang:
        </span>{" "}
        Kesehatan Mental
      </div>

      
      <div className="flex flex-row items-center justify-center gap-15 px-13 py-7">
        <div className="flex mt-5">
          <Image
            src="/assets/tentangKesehatan.svg"
            alt="Peduli Kesehatan Mental"
            width={448}
            height={344}
            priority
          />
        </div>

        <div className="leading-relaxed w-[649px] h-[336px] text-neut-600 flex-row">
          Tahukah kamu bahwa 1 dari 5 orang pernah mengalami masalah kesehatan
          mental, namun sebagian besar tidak menyadarinya hingga kondisinya
          semakin parah? Padahal, deteksi dini menjadi kunci penting untuk
          mencegah masalah berkembang lebih jauh dan mempermudah proses
          pemulihan. <br /> <br />
          Melalui layanan kami, kamu dapat memantau kondisi emosional secara
          berkala, mengenali tanda-tanda awal perubahan suasana hati atau stres,
          serta mendapatkan dukungan yang sesuai dengan kebutuhanmu. Dengan
          fitur seperti{" "}
          <span className="text-primary-500">
            Deteksi Wajah, Smart Journaling, Visualization, Meditation, dan
            Obrolan Anonim
          </span>{" "}
          kami membantu kamu memahami diri lebih baik, menjaga keseimbangan
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
