"use client";
import { HiPlus } from "react-icons/hi";

const AddJournalCard = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-4 border border-blue-400 bg-blue-50 rounded-md flex flex-col items-center justify-center text-blue-500 hover:bg-blue-100 transition cursor-pointer"
    >
      <div className="border-2 border-dashed border-blue-400 bg-white rounded-full w-12 h-12 flex items-center justify-center mb-3">
        <HiPlus className="text-lg text-blue-500" />
      </div>

      <span className="font-medium text-blue-500">Tambah Jurnal</span>
    </button>
  );
};

export default AddJournalCard;
