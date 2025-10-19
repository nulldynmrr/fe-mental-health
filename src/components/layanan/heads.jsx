import React from "react";

const Heads = () => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center px-6 mt-10 sm:px-10 md:px-20 text-center">
      <div className="font-bold text-3xl sm:text-4xl text-neut-800">
        Layanan Kami
      </div>

      <div className="max-w-3xl text-center font-semibold text-base sm:text-lg text-neut-600">
        Kami menghadirkan layanan pendampingan kesehatan mental yang aman,
        intuitif, dan mudah diakses kapan saja. Setiap fitur dirancang untuk
        membantu Anda memahami, merawat, dan menjaga keseimbangan emosional
        secara personal.
      </div>
    </div>
  );
};

export default Heads;
