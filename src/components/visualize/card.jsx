"use client";
import React, { useEffect, useState, useCallback } from "react";
import Upper from "./upper";
import Choices from "./options";
import request from "@/utils/request";
import toast from "react-hot-toast";

const Visualize = () => {
  const [activeTab, setActiveTab] = useState("journal");
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let url = "";

      const today = new Date().toISOString().split("T")[0]; // format YYYY-MM-DD
      const dateToUse = selectedDate || today;

      if (activeTab === "journal") {
        url = `/journal`;
      } else {
        url = `/face-detection`;
      }

      const response = await request.get(url);
      const data = response.data.data?.data;
      setSummary(Array.isArray(data) ? data : data ? [data] : []);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setSummary([]);
      } else {
        toast.error("Gagal mengambil data");
      }
      console.error("Gagal ambil data:", err);
    } finally {
      setLoading(false);
    }
  }, [activeTab, selectedDate]);

  useEffect(() => {
    fetchData();
  }, [activeTab, selectedDate]);

  return (
    <>
      <Upper setSelectedDate={setSelectedDate} />
      <Choices activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex flex-col gap-5 mt-6">
        {loading ? (
          <p className="text-gray-500 text-center mt-10">Memuat data...</p>
        ) : activeTab === "journal" ? (
          summary.length > 0 ? (
            summary.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border border-blue-400 rounded-4xl px-10 py-5 transition-shadow"
              >
                <div className="flex flex-row md:flex-col items-start pl-10 w-1/5">
                  <h2 className="text-2xl font-bold text-primary-500">
                    {item.mood === "joy"
                      ? "Bahagia"
                      : item.mood === "sad"
                      ? "Sedih"
                      : item.mood === "anger"
                      ? "Marah"
                      : item.mood === "fear"
                      ? "Takut"
                      : item.mood === "disgust"
                      ? "Jijik"
                      : item.mood === "surprise"
                      ? "Terkejut"
                      : item.mood || "-"}
                  </h2>
                </div>

                <div className="flex-1 text-gray-700 leading-relaxed text-sm">
                  {item.content || "Tidak ada deskripsi untuk entri ini."}
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
              Belum ada data Jurnal.
            </p>
          )
        ) : summary.length > 0 ? (
          summary.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border border-blue-400 rounded-4xl px-10 py-5 transition-shadow"
            >
              <div className="flex flex-col items-start pl-10 w-1/5">
                <h2 className="text-2xl font-bold text-primary-500">
                  {item.mood === "joy"
                    ? "Bahagia"
                    : item.mood === "sad"
                    ? "Sedih"
                    : item.mood === "anger"
                    ? "Marah"
                    : item.mood === "fear"
                    ? "Takut"
                    : item.mood === "disgust"
                    ? "Jijik"
                    : item.mood === "surprise"
                    ? "Terkejut"
                    : item.mood || "-"}
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
            Belum ada data Face Detection.
          </p>
        )}
      </div>
    </>
  );
};

export default Visualize;
