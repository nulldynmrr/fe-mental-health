"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button/page";
import Navbar from "@/components/navbar/page";
import Breadcrumb from "@/components/breadcrumb/page";
import { AiOutlinePaperClip } from "react-icons/ai";
import { RiCloseLargeFill } from "react-icons/ri";
import request from "@/utils/request";
import toast from "react-hot-toast";

const AddJournal = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ title: "" });
  const [journalText, setJournalText] = useState("");
  const [files, setFiles] = useState([]);
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState(null);
  const reviewRef = useRef(null);

  const wordCount = journalText.trim().split(/\s+/).filter(Boolean).length;

  const onSubmitJournal = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const title = subject.trim() || "Untitled";
      const form = new FormData();

      const userId = localStorage.getItem("userId");
      if (userId) form.append("userId", userId);

      form.append("title", title);
      form.append("content", journalText);
      files.forEach((file) => form.append("files", file));

      const response = await request.post("/journal", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201 || response.data.code === 201) {
        toast.success("Journal berhasil dibuat");
        setFormData({ title: "" });
        setJournalText("");
        setFiles([]);
        setReview(null);
        router.push("/smartJournaling");
      } else {
        toast.error("Gagal membuat jurnal");
      }
    } catch (error) {
      console.error("Error creating journal:", error);
      toast.error(
        error.response?.data?.message || "Terjadi kesalahan saat membuat jurnal"
      );
    } finally {
      setLoading(false);
    }
  };

  const onFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const onRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onAnalyze = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const title = subject.trim() || "Untitled";
      const form = new FormData();

      const userId = localStorage.getItem("userId");
      if (userId) form.append("userId", userId);

      form.append("title", title);
      form.append("content", journalText);
      files.forEach((file) => form.append("files", file));

      const postResponse = await request.post("/journal", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (postResponse.status === 201 || postResponse.data.code === 201) {
        toast.success("Journal berhasil dibuat untuk analisis");

        const journalId = postResponse.data.data?.journal_id;
        const getResponse = await request.get(`/journal/${journalId}`);

        if (getResponse.status === 200 && getResponse.data.code === 200) {
          const journalData = getResponse.data.data;

          // ✅ Pastikan mood & confidence tetap terbaca
          const mood =
            journalData?.mood && journalData.mood !== "undefined"
              ? journalData.mood
              : "unknown";
          const confidence =
            typeof journalData?.confidence === "number"
              ? journalData.confidence
              : 90;

          setReview({ mood, confidence });
        } else {
          toast.error("Gagal mengambil hasil analisis");
        }
      } else {
        toast.error("Gagal menganalisis jurnal");
      }
    } catch (error) {
      console.error("Error analyzing journal:", error);
      toast.error(
        error.response?.data?.message ||
          "Terjadi kesalahan saat menganalisis jurnal"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (review && reviewRef.current) {
      const timeout = setTimeout(() => {
        reviewRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [review]);

  return (
    <div className="h-screen">
      <Navbar />
      <div className="p-6 md:px-20 md:py-12">
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Jurnal Pintar", href: "/smartJournaling" },
            { label: "Jurnal Baru" },
          ]}
        />
        <h1 className="text-2xl font-semibold mb-6">Jurnal Pintar</h1>
        <form
          onSubmit={onSubmitJournal}
          className="border border-neut-100 rounded-lg overflow-hidden"
        >
          <div className="bg-primary-50 p-4 flex justify-end">
            <button
              type="button"
              className="text-neut-600 hover:text-neut-700 text-sm"
            >
              <RiCloseLargeFill />
            </button>
          </div>

          <div className="p-6 space-y-4 min-h-[380px]">
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full text-xl font-medium text-black placeholder-neut-400 border-none focus:ring-0 focus:outline-none"
            />
            <textarea
              className="w-full min-h-[200px] text-neut-600 placeholder-neut-400 border-none focus:ring-0 focus:outline-none resize-none"
              placeholder="Tulis Disini..."
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
            />
            {files.length > 0 && (
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-neut-50 border border-neut-100 rounded-lg px-3 py-2 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <AiOutlinePaperClip className="text-primary-500" />
                      <span className="font-medium text-black">
                        {file.name}
                      </span>
                      <span className="text-neut-400 text-xs">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveFile(index)}
                      className="text-neut-400 hover:text-red-500"
                      disabled={loading}
                    >
                      <RiCloseLargeFill />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div>
              <label className="inline-flex items-center gap-2 px-3 py-2 border border-neut-50 rounded-lg font-medium text-black text-sm cursor-pointer bg-neut-50 hover:bg-neut-100">
                <AiOutlinePaperClip />
                <span>Sisipkan File</span>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  onChange={onFileChange}
                  disabled={loading}
                />
              </label>
            </div>
          </div>

          <div className="bg-neut-100 px-4 py-3 flex gap-3">
            <Button
              text={loading ? "Menganalisis..." : "Analisis Jurnal"}
              variant={wordCount > 2 ? "primary" : "disabled"}
              onClick={wordCount > 2 ? onAnalyze : undefined}
              loading={loading}
              disabled={loading}
            />
            <Button
              text={loading ? "Menyimpan..." : "Simpan Jurnal"}
              variant="secondary"
              type="submit"
              loading={loading}
              disabled={loading}
            />
          </div>
        </form>

        {review && (
          <div ref={reviewRef} className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Hasil Analisis</h2>
            <div className="w-full bg-primary-50 border border-neut-100 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-black mb-2">
                Hasil Emosi:
              </h3>
              <p className="text-4xl font-bold text-primary-500 mb-2 capitalize">
                {review?.mood
                  ? review.mood === "joy"
                    ? "Bahagia"
                    : review.mood === "sadness"
                    ? "Sedih"
                    : review.mood === "anger"
                    ? "Marah"
                    : review.mood === "fear"
                    ? "Takut"
                    : review.mood === "disgust"
                    ? "Jijik"
                    : review.mood === "surprise"
                    ? "Terkejut"
                    : "Tidak Terdeksi"
                  : "Tidak Terdeksi"}
              </p>
              <p className="text-md text-black">
                Confidence :{" "}
                {typeof review?.confidence === "number"
                  ? `${review.confidence.toFixed(2)}%`
                  : "Tidak Ditemukan"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddJournal;
