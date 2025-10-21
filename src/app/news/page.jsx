import Navbar from "@/components/navbar/page";
import Breadcrumb from "@/components/breadcrumb/page";
import React from "react";
import NewsCard from "@/components/berita/card";
import Berita from "@/components/berita/details";

const NewsPage = () => {
    return (
        <div>
            <Navbar/>
            <div className="p-6 md:px-20 md:py-12">
            <Breadcrumb
            items={[
                { label: "Dashboard", href: "/dashboard" },
                { label: "Berita" },
            ]}
            />
            </div>

            <Berita/>

            <br/>
            <h1>Berita Lainnya</h1>
            <NewsCard/>

        </div>
    );
};

export default NewsPage;