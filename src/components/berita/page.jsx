import React from "react";
import NewsHead from "./text";
import NewsCard from "./card";

const NewsSection = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 py-12">
            <NewsHead/>
            <NewsCard/>
        </section>
    );
};

export default NewsSection;