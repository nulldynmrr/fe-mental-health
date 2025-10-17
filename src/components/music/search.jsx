import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="flex flex-row justify-between items-center mb-7">
      {/* Judul */}
      <h1 className="text-3xl font-bold">Meditasi</h1>

      {/* Search Input */}
      <div className="flex items-center gap-5 border border-neut-200 rounded-lg px-4 py-2.5 w-84 focus-within:ring-2 focus-within:ring-primary-500 transition">
        <FaSearch className="text-neut-600 w-4 h-4" />
        <input
          type="text"
          placeholder="Cari..."
          className="bg-transparent outline-none text-sm text-neut-800 w-full placeholder:text-neut-400"
        />
      </div>
    </div>
  );
};

export default SearchBar;
