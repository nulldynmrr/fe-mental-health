"use client";
import Image from "next/image";

const Detail = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-5 sm:mb-8 leading-snug text-gray-900">
        TXT Collab Bareng UNICEF Buat Kampanye Mental Health
      </h1>

      <div className="w-full mb-8">
        <Image
          src="/assets/images/txt.svg"
          alt="TXT Collab Bareng UNICEF"
          width={1200}
          height={600}
          className="rounded-lg object-cover w-full h-auto max-h-[480px] sm:max-h-[560px] lg:max-h-[600px]"
          priority
        />
      </div>

      <div className="mt-auto">
        <div className="flex flex-row gap-3 mt-4">
          <Image
            src="/assets/icons/profile.svg"
            alt="Profile"
            width={40}
            height={40}
            priority
          />
          <div className="flex flex-col items-start justify-center">
            <div className="text-sm font-semibold text-neut-900 text-left">
              {/* {article.role} */}
            </div>
            <div className="text-sm font-semilight text-neut-600 text-left">
              {/* {article.jobdesk} */}
            </div>
          </div>
        </div>
      </div>

      <article className="text-gray-800 leading-relaxed space-y-4 sm:space-y-5 text-justify">
        <p className="text-sm sm:text-base">
          Jakarta - Artis BIGHIT MUSIC emang gak pernah lepas dari image sebagai
          'duta kesehatan mental'. Dari BTS dengan lagu-lagunya dan keaktifan
          fandom kini giliran TXT.
        </p>

        <p className="text-sm sm:text-base">
          TXT berkolaborasi dengan UNICEF buat kampanye kesehatan mental yang
          dikasih nama <strong>Together for Tomorrow</strong>. Judul ini dekat
          banget sama nama lengkap TXT yaitu Tomorrow X Together, ngebuat
          campaign-nya jadi makin bermakna.
        </p>

        <p className="text-sm sm:text-base">
          Kampanye Together for Tomorrow akan berfokus pada pembinaan kesehatan
          mental anak-anak dan remaja di seluruh dunia. Lewat kampanye ini, TXT
          bersama UNICEF akan menyuarakan soal empati sebagai akar dari
          pemikiran yang peduli.
        </p>

        <p className="text-sm sm:text-base">
          Dilansir dari Korea JoongAng Daily pada Sabtu (27/9/2025), TXT
          dijadwalkan akan bertemu dengan Catherine Russel, kepala UNICEF, di
          markas besar UNICEF di New York. Mereka akan membahas lebih detail
          mengenai kampanye ini dalam berbagai konten.
        </p>

        <p className="text-sm sm:text-base">
          “Kami ingin berbagi pesan bahwa masa depan yang lebih cerah dapat
          terwujud ketika kita bersatu. Kami juga berharap berbagi kegiatan
          bersama UNICEF akan memberikan penghiburan dan semangat bagi banyak
          orang. Merupakan suatu kehormatan untuk menjadi bagian dari perjalanan
          yang penuh makna ini, dan kami akan terus mempromosikan nilai-nilai
          empati dan solidaritas melalui musik dan berbagai upaya lainnya,” kata
          TXT dalam pernyataan resminya.
        </p>

        <p className="font-semibold text-sm sm:text-base mt-4">
          Keren deh, TXT!
        </p>
      </article>
    </div>
  );
};

export default Detail;
