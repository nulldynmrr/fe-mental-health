import React from "react";
import Upper from "./upper";

const Visualize = () => {
  const summary = [
    {
      tanggal: "22.09.2025",
      cate: "Takut",
      text: "Kamu hari ini sedang ketakutan, seluruh tubuhmu tegang, setiap gerakanmu tampak ragu, dan matamu yang melebar terus memindai ruangan seolah ada ancaman tersembunyi yang tak terlihat. Kau benar-benar terlihat dikuasai oleh rasa takut, seperti seekor rusa yang terperangkap dalam lampu sorot.",
    },

    {
      tanggal: "19.09.2025",
      cate: "Sedih",
      text: "Kamu hari ini sedang sedih, seluruh dirimu memancarkan aura kesedihan yang gelap dan pekat. Bahumu terkulai lesu, air matamu mungkin telah mengering, tetapi tatapanmu yang kosong ke kejauhan memperlihatkan betapa dalam dan beratnya beban duka yang sedang kau pikul di hati.",
    },

    {
      tanggal: "02.09.2025",
      cate: "Marah",
      text: "Kamu hari ini sedang marah, rahangmu mengeras, napasmu memburu, dan kilatan tajam di matamu menunjukkan bahwa ada amarah besar yang terpendam, seolah kau sedang berusaha keras menahan letusan kekecewaan dan frustrasi yang siap menghancurkan apa pun di dekatmu.",
    },
    {
      tanggal: "22.08.2025",
      cate: "Bahagia",
      text: "Kamu hari ini sedang bahagia sekali, seolah semua beban telah terangkat dari pundakmu. Melihatmu secerah ini benar-benar membuat suasana di sekitar kita ikut terasa positif dan menenangkan.",
    },
  ];

  return (
    <>
      <Upper />

      <div className="flex flex-col gap-5">
        {summary.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border border-blue-400 rounded-4xl px-10 py-5 shadow-lg hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col items-start pl-10 w-1/5">
              <h2 className="text-2xl font-bold text-primary-500">
                {item.cate}
              </h2>
            </div>

            <div className="flex-1 text-gray-700 leading-relaxed text-sm">
              {item.text}
            </div>

            <div className="w-1/6 text-right font-bold text-neut-600">
              {item.tanggal}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Visualize;
