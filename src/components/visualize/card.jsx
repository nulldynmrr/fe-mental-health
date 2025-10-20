"use client";
import React, { useEffect, useState } from "react";
import Upper from "./upper";
import Choices from "./options";
import request from "@/utils/request"; 

const Visualize = () => {
  const [activeTab, setActiveTab] = useState("journal"); 
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      let url = "";

      if (activeTab === "journal") {
        url = `/journal`; 
      } else {
        url = `/face-detection`; 
      }

      const res = await request.get(url);
      setSummary(res.data.data || []);
    } catch (err) {
      console.error("Gagal ambil data:", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, [activeTab]);

  return (
    <>
      <Upper />
      <Choices activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex flex-col gap-5 mt-6">
        {loading ? (
          <p className="text-gray-500 text-center mt-10">Memuat data...</p>
        ) : summary.length > 0 ? (
          summary.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border border-blue-400 rounded-4xl px-10 py-5 shadow-lg hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-start pl-10 w-1/5">
                <h2 className="text-2xl font-bold text-primary-500">
                  {item.category || item.emotion || "-"}
                </h2>
              </div>

              <div className="flex-1 text-gray-700 leading-relaxed text-sm">
                {item.text ||
                  item.description ||
                  "Tidak ada deskripsi untuk entri ini."}
              </div>

              <div className="w-1/6 text-right font-bold text-neut-600">
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString("id-ID")
                  : "-"}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-10">
            Belum ada data {activeTab === "journal" ? "Jurnal" : "Face Detection"}.
          </p>
        )}
      </div>
    </>
  );
};

export default Visualize;
