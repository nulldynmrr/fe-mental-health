"use client";
import React, { useState } from "react";
import Button from "../button/page";
import Image from "next/image";

const NewsCard = () => {
  const [expanded, setExpanded] = useState(false);

  const article = [
    {
      date: "10 Juli 2025",
      title: "Kesehatan mental anak – 'Kondisi anak dan remaja di Indonesia tidak baik...",
      description: "Satu dari tiga anak usia 10-17 tahun di Indonesia disebut memiliki masalah kesehatan mental. Psikolog klinis mengingatkan bahwa...",
      thumbnail: "assets/thumbnails/strategi.svg",
      profile: "assets/icons/profile.svg",
      role: "Administrator",
      jobdesk: "Copywriter",
      readingTime: "2 menit baca",
    },
    {
      date: "10 Juli 2025",
      title: "TXT Collab Bareng UNICEF Buat Kampanye Mental Health",
      description: "Artis BIGHIT MUSIC emang gak pernah lepas dari image sebagai 'duta kesehatan mental'. Dari BTS dengan lagu-lagunya...",
      thumbnail: "assets/thumbnails/txt.svg",
      profile: "assets/icons/profile.svg",
      role: "Administrator",
      jobdesk: "Copywriter",
      readingTime: "2 menit baca",
    },
    {
      date: "10 Juli 2025",
      title: "7 Tanda Orang Cuma Pura-pura Bahagia, Jangan Bohongi Diri Sendiri",
      description: "Padahal, kesedihan yang selalu ditutup-tutupi bisa berdampak buruk bagi kesehatan mental. Bukan tak mungkin...",
      thumbnail: "assets/thumbnails/purapura.svg",
      profile: "assets/icons/profile.svg",
      role: "Administrator",
      jobdesk: "Copywriter",
      readingTime: "2 menit baca",
    },
    {
      date: "10 Juli 2025",
      title: "Teknik Pernapasan Ini Bikin 'Calm Down' di Tengah Banjir Kabar Negatif",
      description: "Rasa sesak di dada, jantung yang tiba-tiba berdetak cepat, hingga keringat yang mengucur hanya sedikit dari tanda kecemasan.",
      thumbnail: "assets/thumbnails/pernapasan.svg",
      profile: "assets/icons/profile.svg",
      role: "Administrator",
      jobdesk: "Copywriter",
      readingTime: "2 menit baca",
    },
    {
      date: "10 Juli 2025",
      title: "Kesehatan mental anak – 'Kondisi anak dan remaja di Indonesia tidak baik...",
      description: "Satu dari tiga anak usia 10-17 tahun di Indonesia disebut memiliki masalah kesehatan mental. Psikolog klinis mengingatkan bahwa...",
      thumbnail: "assets/thumbnails/strategi.svg",
      profile: "assets/icons/profile.svg",
      role: "Administrator",
      jobdesk: "Copywriter",
      readingTime: "2 menit baca",
    },
    {
      date: "10 Juli 2025",
      title: "TXT Collab Bareng UNICEF Buat Kampanye Mental Health",
      description: "Artis BIGHIT MUSIC emang gak pernah lepas dari image sebagai 'duta kesehatan mental'. Dari BTS dengan lagu-lagunya...",
      thumbnail: "assets/thumbnails/txt.svg",
      profile: "assets/icons/profile.svg",
      role: "Administrator",
      jobdesk: "Copywriter",
      readingTime: "2 menit baca",
    },
    {
      date: "10 Juli 2025",
      title: "7 Tanda Orang Cuma Pura-pura Bahagia, Jangan Bohongi Diri Sendiri",
      description: "Padahal, kesedihan yang selalu ditutup-tutupi bisa berdampak buruk bagi kesehatan mental. Bukan tak mungkin...",
      thumbnail: "assets/thumbnails/purapura.svg",
      profile: "assets/icons/profile.svg",
      role: "Administrator",
      jobdesk: "Copywriter",
      readingTime: "2 menit baca",
    },
    {
      date: "10 Juli 2025",
      title: "Teknik Pernapasan Ini Bikin 'Calm Down' di Tengah Banjir Kabar Negatif",
      description: "Rasa sesak di dada, jantung yang tiba-tiba berdetak cepat, hingga keringat yang mengucur hanya sedikit dari tanda kecemasan.",
      thumbnail: "assets/thumbnails/pernapasan.svg",
      profile: "assets/icons/profile.svg",
      role: "Administrator",
      jobdesk: "Copywriter",
      readingTime: "2 menit baca",
    },
  ];

  const displayedNews = expanded ? article : article.slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedNews.map((article, idx) => (
          <div
            key={idx}
            style={{ boxShadow: "0px 14px 50px rgba(197, 236, 255, 0.5)" }}
            className="bg-white rounded-xl overflow-hidden border border-gray-200 pt-4 flex flex-col h-full"
          >
          
            <div className="relative aspect-[16/9] px-4">
              <img
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-full object-cover rounded-md"
              />
            </div>

           
            <div className="p-4 flex flex-col h-full">
              <div className="flex flex-col gap-3">
                <div className="flex items-center text-gray-500 text-sm gap-2">
                  <img
                    src="/assets/icons/calendar.svg"
                    alt="calendar"
                    className="w-4 h-4"
                  />
                  {article.date}
                </div>

              
                <h3 className="font-semibold text-base leading-snug text-neut-900 line-clamp-2">
                  {article.title}
                </h3>

               
                <p className="text-neut-600 text-sm line-clamp-3">
                  {article.description}
                </p>
              </div>

        
              <div className="mt-auto">
                <div className="flex flex-row gap-3 mt-4">
                  <Image
                    src="/assets/icons/profile.svg"
                    alt="Peduli Kesehatan Mental"
                    width={40}
                    height={40}
                    priority
                  />
                  <div className="flex flex-col items-start justify-center">
                    <div className="text-sm font-semibold text-neut-900 text-left">
                      {article.role}
                    </div>
                    <div className="text-sm font-semilight text-neut-600 text-left">
                      {article.jobdesk}
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-neut-200 flex items-center justify-between">
                  <span className="text-gray-500 text-sm font-semibold">
                    {article.readingTime}
                  </span>
                  <Button text="Baca Selengkapnya" variant="primary"/>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="flex justify-end items-end mt-10 border-t border-neut-50 pt-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition cursor-pointer"
        >
          {expanded ? "Lebih Sedikit" : "Lihat Semua"}
        </button>
      </div>
    </section>
  );
};

export default NewsCard;
