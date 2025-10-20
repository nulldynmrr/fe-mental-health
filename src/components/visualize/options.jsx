import React from "react";

const Choices = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-row gap-7 items-center justify-start">
      <button
        onClick={() => setActiveTab("journal")}
        className={`px-8 py-3 border border-primary-500 rounded-md transition-all ${
          activeTab === "journal"
            ? "bg-primary-500 text-white"
            : "bg-white text-primary-500"
        }`}
      >
        Jurnal
      </button>

      <button
        onClick={() => setActiveTab("face")}
        className={`px-8 py-3 border border-primary-500 rounded-md transition-all ${
          activeTab === "face"
            ? "bg-primary-500 text-white"
            : "bg-white text-primary-500"
        }`}
      >
        Face Detection
      </button>
    </div>
  );
};

export default Choices;
