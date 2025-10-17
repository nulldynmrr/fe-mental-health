import Navbar from "@/components/navbar/page";
import Breadcrumb from "@/components/breadcrumb/page";
import React from "react";
import MusicCard from "@/components/music/card";
import Player from "@/components/music/player";
import Footer from "@/components/footer/page";
import SearchBar from "@/components/music/search";


const Meditasi = () => {
  return (
    <>
      <Navbar />

     <div className="p-6 md:px-20 md:py-12">
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Meditasi" },
          ]}
        />

        <div className="mt-10">
            <SearchBar/>
            <MusicCard/>
            <Player/>
        </div>
      </div>
    </>
  );
};

export default Meditasi;
