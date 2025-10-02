"use client";
import React from "react";
import Link from "next/link";
import Button from "@/components/button/page";
import { MdOutlineChevronRight } from "react-icons/md";
import { AiOutlinePaperClip } from "react-icons/ai";
import { RiCloseLargeFill } from "react-icons/ri";

const AddJournal = () => {
  return (
    <div className="min-h-screen">
      <div className="p-12">
        <div className="text-sm text-black mb-4 flex items-center gap-2">
          <span className="font-semibold">Dashboard</span>
          <MdOutlineChevronRight />
          <Link
            href="/smartJournaling"
            className="font-semibold cursor-pointer"
          >
            Jurnal Pintar
          </Link>
          <MdOutlineChevronRight />
          <span className="text-neut-400">Jurnal Baru</span>
        </div>

        <h1 className="text-2xl font-semibold mb-6">Jurnal Pintar</h1>
        <div className="border border-neut-100 rounded-lg overflow-hidden">
          <div className="bg-primary-50 p-4 flex justify-end">
            <button className="text-neut-600 hover:text-neut-700 text-sm">
              <RiCloseLargeFill />
            </button>
          </div>

          <div className="p-6 space-y-4 min-h-[380px]">
            <input
              type="text"
              placeholder="Subject"
              className="w-full text-xl font-medium text-black placeholder-gray-400 border-none focus:ring-0 focus:outline-none"
            />
            <textarea
              className="w-full min-h-[280px] text-neut-600 placeholder-neut-400 border-none focus:ring-0 focus:outline-none resize-none"
              placeholder="Tulis Disini..."
            />
            <div>
              <label
                className="inline-flex items-center gap-2 px-3 py-2 
                     border border-neut-50 rounded-md font-medium
                     text-black text-sm cursor-pointer 
                     bg-neut-50 hover:bg-neut-100"
              >
                <AiOutlinePaperClip />
                <span>Sisipkan File</span>
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>
          <div className="bg-gray-100 px-4 py-3 flex gap-3">
            <Button text="Analisis Jurnal" variant="disabled" />
            <Button text="Simpan Jurnal" variant="secondary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJournal;
