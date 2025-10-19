import Link from "next/link";
import React from "react";

const MenuCards = () => {
  const FeatureCard = ({ title, desc, icon, href }) => {
    return (
      <Link
        href={href}
        className="px-8 py-10 shadow-[3.12px_9.37px_21.20px_0_rgba(0,0,0,0.03)] rounded-2xl bg-white flex flex-col items-start gap-2 border border-primary-500 cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
      >
        <img src={icon} alt={title} className="w-10 h-10" />
        <h3 className="text-xl text-primary-500 font-semibold leading-tight text-left">
          {title}
        </h3>
        <p className="text-sm text-gray-500 text-left leading-snug">{desc}</p>
      </Link>
    );
  };

  const features = [
    {
      title: "Deteksi Wajah",
      desc: "Teknologi pendeteksi wajah yang membantu mengenali ekspresi emosional Anda untuk memberikan saran dan dukungan yang lebih tepat.",
      icon: "/assets/icons/deteksiWajah.svg",
      href: "/face-detection",
    },
    {
      title: "Jurnal Pintar",
      desc: "Catat perasaan dan pengalaman harian Anda menggunakan jurnal digital dengan analisis berbasis NLP untuk memahami pola emosi secara mendalam.",
      icon: "/assets/icons/jurnalPintar.svg",
      href: "/smartJournaling",
    },
    {
      title: "Visualisasi",
      desc: "Tempat untuk melihat seluruh riwayat dan hasil dari Face Detection, Smart Journaling, hingga aktivitas lainnya secara visual sehingga memudahkan Anda memantau perkembangan kondisi mental.",
      icon: "/assets/icons/visualisasi.svg",
      href: "/visualization",
    },
    {
      title: "Obrolan Anonim",
      desc: "Sesi obrolan anonim dengan pendamping atau komunitas untuk berbagi cerita, mengurangi beban, dan merasa didengar tanpa rasa khawatir.",
      icon: "/assets/icons/obrolanAnonim.svg",
      href: "/obrolan-anonim",
    },
    {
      title: "Meditasi",
      desc: "Koleksi musik-musik menenangkan yang dirancang untuk membantu mengurangi stres, meningkatkan fokus, dan menciptakan suasana rileks saat meditasi.",
      icon: "/assets/icons/meditasi.svg",
      href: "/meditasi",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {features.slice(0, 2).map((f, idx) => (
          <FeatureCard key={idx} {...f} />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {features.slice(2).map((f, idx) => (
          <FeatureCard key={idx} {...f} />
        ))}
      </div>
    </div>
  );
};

export default MenuCards;
