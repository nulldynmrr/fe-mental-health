import React from "react";
import Navbar from "@/components/navbar/page";
import ChatPage from "@/components/chatbot/page";
import Breadcrumb from "@/components/breadcrumb/page"; 
import Footer from "@/components/footer/page";

const ChatsPage = () => {
  return (
    <>
      <Navbar />

      <div className="p-6 md:px-20 md:py-12">
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Obrolan Anonim" },
          ]}
        />

        <div className="mt-6">
          <ChatPage/>
        </div>
      </div>
    </>
  );
};

export default ChatsPage;
