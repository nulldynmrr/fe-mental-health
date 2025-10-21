"use client";
import Image from "next/image";

const Berita = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">
        TXT Collab Bareng UNICEF Buat Kampanye Mental Health
      </h1>

      <div className="w-full mb-8">
        <Image
          src="/assets/images/txt.svg" 
          alt="TXT Collab Bareng UNICEF"
          width={1200}
          height={600}
          className="rounded-lg object-cover w-full"
          priority
        />
      </div>
      
      <div className="flex items-center gap-3 mb-6">
        <Image
          src="/assets/icons/profile.svg" 
          alt="Administrator"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <p className="font-medium text-gray-800">Administrator</p>
          <p className="text-sm text-gray-500">Senin, 10 Juli 2024</p>
        </div>
      </div>

      {/* Isi Berita */}
      <div className="text-gray-800 leading-relaxed space-y-4">
        <p>
          Jakarta - Artis BIGHIT MUSIC emang gak pernah lepas dari image sebagai
          'duta kesehatan mental'. Dari BTS dengan lagu-lagunya dan keaktifan
          fandom kini giliran TXT.
        </p>

        <p>
          TXT berkolaborasi dengan UNICEF buat kampanye kesehatan mental yang
          dikasih nama <strong>Together for Tomorrow</strong>. Judul ini dekat
          banget sama nama lengkap TXT yaitu Tomorrow X Together, ngebuat
          campaign-nya jadi makin bermakna.
        </p>

        <p>
          Kampanye Together for Tomorrow akan berfokus pada pembinaan kesehatan
          mental anak-anak dan remaja di seluruh dunia. Lewat kampanye ini, TXT
          bersama UNICEF akan menyuarakan soal empati sebagai akar dari pemikiran
          yang peduli.
        </p>

        <p>
          DIlansir dari Korea JoongAng Daily pada Sabtu (27/9/2025), TXT
          dijadwalkan akan bertemu dengan Catherine Russel, kepala UNICEF, di
          markas besar UNICEF di New York. Mereka akan membahas lebih detail
          mengenai kampanye ini dalam berbagai konten.
        </p>

        <p>
          “Kami ingin berbagi pesan bahwa masa depan yang lebih cerah dapat
          terwujud ketika kita bersatu. Kami juga berharap berbagi kegiatan
          bersama UNICEF akan memberikan penghiburan dan semangat bagi banyak
          orang. Merupakan suatu kehormatan untuk menjadi bagian dari perjalanan
          yang penuh makna ini, dan kami akan terus mempromosikan nilai-nilai
          empati dan solidaritas melalui musik dan berbagai upaya lainnya,” kata
          TXT dalam pernyataan resminya.
        </p>

        <p className="font-medium">Keren deh, TXT!</p>
      </div>
    </div>
  );
};

export default Berita;
