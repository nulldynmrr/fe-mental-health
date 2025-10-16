"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button/page";
import Navbar from "@/components/navbar/page";
import Breadcrumb from "@/components/breadcrumb/page";
import { AiOutlinePaperClip } from "react-icons/ai";
import { RiCloseLargeFill } from "react-icons/ri";
import { FaTimes } from "react-icons/fa";
import request from "@/utils/request";
import toast from "react-hot-toast";

const AddJournal = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ title: "" });
  const [journalText, setJournalText] = useState("");
  const [files, setFiles] = useState([]);
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const reviewRef = useRef(null);

  const wordCount = journalText.trim().split(/\s+/).filter(Boolean).length;

  const onSubmitJournal = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      const title =
        formData.title.trim() || journalText.slice(0, 20) || "Untitled";

      files.forEach((file) => form.append("files", file));

      const response = await request.post(
        "/journal",
        {
          title,
          content: journalText,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201 || response.data.code === 201) {
        toast.success("Journal berhasil dibuat");
        setFormData({ title: "" });
        setJournalText("");
        setFiles([]);
        setReview("");
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

  const onAnalyze = async () => {
    if (wordCount <= 50 && !subject.trim()) return;
    setLoading(true);
    try {
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve(
              "✨ Analisis AI: Jurnal kamu cukup bagus, coba tambahkan detail pada kesimpulan."
            ),
          2000
        )
      );
      setReview(response);
    } catch (error) {
      console.error("Error analyzing journal:", error);
    } finally {
      setLoading(false);
    }
  };

  // otomatis scroll
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

  // animation text
  useEffect(() => {
    if (review) {
      setDisplayedText("");
      let index = 0;
      const interval = setInterval(() => {
        if (index < review.length) {
          setDisplayedText((prev) => prev + review[index]);
          index++;
        } else clearInterval(interval);
      }, 20);
      return () => clearInterval(interval);
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
                />
              </label>
            </div>
          </div>

          <div className="bg-neut-100 px-4 py-3 flex gap-3">
            <Button
              text={loading ? "Menganalisis..." : "Analisis Jurnal"}
              variant={wordCount > 50 ? "primary" : "disabled"}
              onClick={wordCount > 50 ? onAnalyze : undefined}
              loading={loading}
            />
            <Button text="Simpan Jurnal" variant="secondary" type="submit" />
          </div>
        </form>

        {review && (
          <div
            ref={reviewRef}
            className="flex items-center justify-center mt-6"
          >
            <div className="w-full bg-white border border-neut-100 rounded-lg">
              <div className="flex items-center justify-end bg-primary-500 text-white p-4 rounded-t-lg rounded-b-none">
                <button
                  type="button"
                  onClick={() => setReview("")}
                  className="hover:text-neut-200 transition-colors"
                >
                  <FaTimes size={16} />
                </button>
              </div>
              <div className="border-b border-neut-100 mt-6 mx-6" />
              <div className="p-6 text-sm text-black leading-relaxed">
                <h2 className="text-xl font-medium mb-2">Hasil Analisis</h2>
                <div className="space-y-4">{displayedText}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddJournal;
