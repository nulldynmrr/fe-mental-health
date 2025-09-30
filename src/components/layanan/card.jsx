import React from "react";

const MenuCards = () => {

  const FeatureCard = ({ title, desc, icon }) => {
  return (
    <div className="p-17 shadow-[3.12px_9.37px_21.20px_0_rgba(0,0,0,0.03)] rounded-2xl bg-white flex flex-col items-start pl-10 gap-3 border-2 border-primary-500">
      <img src={icon} alt={title} className="w-12 h-12" />
      <h3 className="text-lg font-semibold text-left">{title}</h3>
      <p className="text-sm text-gray-500 text-left">{desc}</p>
    </div>
  );
};

  const features = [
    {
      title: "Deteksi Wajah",
      desc: "Teknologi pendeteksi wajah yang membantu mengenali ekspresi emosional Anda untuk memberikan saran dan dukungan yang lebih tepat.",
      icon: "/public/assets/icons/deteksiWajah.svg",
    },
    {
      title: "Jurnal Pintar",
      desc: "Catat perasaan dan pengalaman harian Anda menggunakan jurnal digital dengan analisis berbasis NLP untuk memahami pola emosi secara mendalam.",
      icon: "/public/assets/icons/jurnalPintar.svg",
    },
    {
      title: "Visualisasi",
      desc: "Tempat untuk melihat seluruh riwayat dan hasil dari Face Detection, Smart Journaling, hingga aktivitas lainnya secara visual sehingga memudahkan Anda memantau perkembangan kondisi mental.",
      icon: "/public/assets/icons/visualisasi.svg",
    },
    {
      title: "Obrolan Anonim",
      desc: "Sesi obrolan anonim dengan pendamping atau komunitas untuk berbagi cerita, mengurangi beban, dan merasa didengar tanpa rasa khawatir.",
      icon: "/public/assets/icons/obrolanAnonim.svg",
    },
    {
      title: "Meditasi",
      desc: "Koleksi musik-musik menenangkan yang dirancang untuk membantu mengurangi stres, meningkatkan fokus, dan menciptakan suasana rileks saat meditasi.",
      icon: "/public/assets/icons/meditasi.svg",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        {features.slice(0, 2).map((f, idx) => (
          <FeatureCard key={idx} {...f} />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 mt-6">
        {features.slice(2).map((f, idx) => (
          <FeatureCard key={idx} {...f} />
        ))}
      </div>
    </div>
  );
};

export default MenuCards;
