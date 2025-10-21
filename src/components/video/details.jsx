"use client";
import Image from "next/image";

const NewsPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
    
      <div className="w-full aspect-video rounded-xl overflow-hidden mb-6">
        <video
          className="w-full h-full object-cover"
          controls
          poster="/assets/images/tips-mental-health-thumbnail.png"
        >
          <source src="/assets/videos/tips-mental-health.mp4" type="video/mp4" />
          Browser kamu tidak mendukung video tag.
        </video>
      </div>

      <h1 className="text-2xl md:text-3xl font-semibold mb-3">
        Tips Menjaga Kesehatan Mental
      </h1>

      <div className="flex items-center gap-3 mb-6">
        <Image
          src="/assets/images/author-avatar.png"
          alt="Author"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div>
          <p className="font-medium text-gray-800">The Camera Guy</p>
          <p className="text-sm text-gray-500">11 months ago</p>
        </div>
      </div>

      <p className="text-gray-700 leading-relaxed text-base md:text-lg">
        Dalam sesi ini, kami akan membahas berbagai cara untuk memanfaatkan
        platform profesional secara maksimal. Materi ini mencakup strategi
        untuk menjaga kesehatan mental, keseimbangan antara kehidupan pribadi
        dan pekerjaan, serta tips praktis agar tetap produktif dan bahagia.
      </p>

      <button className="mt-4 text-blue-600 font-medium hover:underline">
        ...more
      </button>
    </div>
  );
};

export default NewsPage;
