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
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let url = "";
      if (activeTab === "journal") {
        url = `/journal`;
      } else {
        url = `/face-detection`;
      }

      const response = await request.get(url);
      const rawData = response.data?.data;

      let dataArray = Array.isArray(rawData)
        ? rawData
        : rawData
        ? [rawData]
        : [];

      if (selectedDate) {
        const dateString = new Date(selectedDate).toISOString().split("T")[0];
        dataArray = dataArray.filter((item) => {
          const created = new Date(item.createdAt).toISOString().split("T")[0];
          return created === dateString;
        });
      }

      setSummary(dataArray);
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

  
  const fetchDetailById = async (id) => {
    try {
      const url =
        activeTab === "journal" ? `/journal/${id}` : `/face-detection/${id}`;
      const response = await request.get(url);
      setSelectedItem(response.data?.data);
    } catch (err) {
      console.error("Gagal ambil detail:", err);
      toast.error("Gagal mengambil data detail.");
    }
  };

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
                onClick={() => fetchDetailById(item.id)} 
                className="flex justify-between items-center border border-blue-400 rounded-4xl px-10 py-5 transition-shadow cursor-pointer hover:shadow-md"
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
              onClick={() => fetchDetailById(item.id)}
              className="flex justify-between items-center border border-blue-400 rounded-4xl px-10 py-5 transition-shadow cursor-pointer hover:shadow-md"
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

              <div
                className={`flex-1 text-gray-700 leading-relaxed text-sm ${
                  activeTab !== "journal" ? "hidden" : ""
                }`}
              >
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


      {selectedItem && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-[500px]">
            <h2 className="text-xl font-bold mb-2 text-primary-500">
              {selectedItem.mood || "Tanpa Mood"}
            </h2>
            <p className="text-gray-700">
              {selectedItem.content ||
                selectedItem.description ||
                "Tidak ada detail."}
            </p>
            <div className="text-right">
              <button
                onClick={() => setSelectedItem(null)}
                className="mt-5 px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Visualize;
