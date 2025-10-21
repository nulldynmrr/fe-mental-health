import Navbar from "@/components/navbar/page";
import Breadcrumb from "@/components/breadcrumb/page";
import React from "react";
import NewsCard from "@/components/berita/card";
import Berita from "@/components/berita/details";

const NewsPage = () => {
  return (
    <div>
      <Navbar />
      <div className="p-6 md:px-20 md:py-12">
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Berita", href: "/dashboard" },
            { label: "" },
          ]}
        />
      </div>

      <Berita />

      <br />
      <h1 className="text-2xl font-semibold font-stretch-75% p-6">
        Berita Lainnya
      </h1>
      <div className="px-30">
        <NewsCard />
      </div>
    </div>
  );
};

export default NewsPage;
