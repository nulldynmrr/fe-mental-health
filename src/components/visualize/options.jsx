import React from "react";

const Choices = () => {
  return (
    <>
      <div className="flex flex-row gap-7 items-center justify-start">
        <div className="px-8 py-3 bg-primary-500 text-white active:bg-white active:text-primary-500 active:border-1 border-primary-500">
          Jurnal
        </div>

        <div className="px-8 py-3 bg-primary-500 text-white active:bg-white active:text-primary-500 active:border-1 border-primary-500">
          Face Detection
        </div>
      </div>
    </>
  );
};

export default Choices;
