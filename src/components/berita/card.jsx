"use client";
import React, { useState, useEffect } from "react";
import Button from "../button/page";
import Image from "next/image";
import request from "@/utils/request";

const NewsCard = () => {
  const [articles, setArticles] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await request.get("/mindful-news?page=2");
        const raw = res.data?.data;
        const list = Array.isArray(raw) ? raw : raw?.data || [];

        const mapped = list.map((item) => ({
          id: item.news_id,
          title: item.title,
          description: item.description,
          date: new Date(item.createdAt).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
          thumbnail: item.imageUrl || "/assets/thumbnails/default.svg",
          profile: "/assets/icons/profile.svg",
          role: "Administrator",
          jobdesk: "Copywriter",
          readingTime: "2 menit baca",
        }));

        setArticles(mapped);
      } catch (err) {
        console.error("Gagal ambil data berita:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!articles.length) return <p>Belum ada berita tersedia.</p>;

  const displayedNews = expanded ? articles : articles.slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedNews.map((article) => (
          <div
            key={article.id}
            style={{ boxShadow: "0px 14px 50px rgba(197, 236, 255, 0.5)" }}
            className="bg-white rounded-xl overflow-hidden border border-gray-200 pt-4 flex flex-col h-full"
          >
        
            <div className="w-full px-4">
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-md bg-gray-100">
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </div>
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
                    src={article.profile}
                    alt="Profile"
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
                  <Button text="Baca Selengkapnya" variant="primary" />
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
