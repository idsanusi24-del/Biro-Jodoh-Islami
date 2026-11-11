import React from 'react';
import { 
  HeartHandshake, 
  ShieldCheck, 
  Award, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface AboutPageProps {
  setCurrentTab: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setCurrentTab }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-black">
      {/* Title & Introduction */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-black border-2 border-[#0284C7] shadow-depth-sm">
          <Sparkles className="w-4 h-4 text-black" />
          <span>Profil & Landasan Syariat</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-black text-black tracking-tight drop-shadow-xs">
          Tentang Mawaddah
        </h1>
        <p className="text-black max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-bold">
          Mawaddah didirikan atas dasar kepedulian terhadap maraknya budaya pacaran dan aplikasi kencan bebas yang mengaburkan batas syariat Islam serta merugikan kesucian generasi muslim.
        </p>
      </div>

      {/* Maklumat Penentu Jodoh with 3D Banner Depth */}
      <div className="bg-white border-2 border-[#B91C1C] rounded-3xl p-6 sm:p-8 space-y-3 shadow-depth-lg relative overflow-hidden text-black">
        <div className="flex items-center gap-2 text-black font-black text-xs uppercase tracking-wider">
          <ShieldCheck className="w-5 h-5 text-black" />
          <span>Maklumat Prinsipil Biro Mawaddah</span>
        </div>
        <h3 className="font-serif text-xl sm:text-2xl font-black text-black">
          Biro adalah Wasilah Ikhtiar, Bukan Penentu Takdir Jodoh
        </h3>
        <p className="text-xs sm:text-sm text-black leading-relaxed font-bold">
          Kami memegang teguh aqidah ahlussunnah bahwa jodoh adalah ketetapan takdir Allah Ta'ala di Lauhul Mahfuzh. Peran Mawaddah murni sebagai <strong className="underline">fasilitator perantara (wasilah syar'iyyah)</strong> untuk mempertemukan data ikhwan dan akhwat yang berikhtiar dengan adab islami. Mawaddah tidak pernah menjamin bahwa setiap pendaftar pasti akan berjodoh melalui biro ini. Keberhasilan pernikahan semata-mata adalah karunia dan takdir Allah Ta'ala.
        </p>
      </div>

      {/* Visi dan Misi with Elevated Depth Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border-2 border-[#064E3B] shadow-depth-md hover:shadow-depth-lg hover:-translate-y-1 transition-all space-y-4 text-black">
          <div className="w-12 h-12 rounded-2xl bg-[#6EE7B7] text-black flex items-center justify-center font-bold shadow-depth-sm border-2 border-[#064E3B]">
            <Sparkles className="w-6 h-6 text-black" />
          </div>
          <h3 className="font-serif text-2xl font-black text-black">Visi Kami</h3>
          <p className="text-xs sm:text-sm text-black leading-relaxed font-bold">
            Menjadi platform biro ta'aruf islami terdepan, terpercaya, dan paling amanah di Indonesia dalam memfasilitasi terwujudnya pernikahan yang berkah, beradab, dan bebas dari fitnah pergaulan bebas.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border-2 border-[#B91C1C] shadow-depth-md hover:shadow-depth-lg hover:-translate-y-1 transition-all space-y-4 text-black">
          <div className="w-12 h-12 rounded-2xl bg-[#FECDD3] text-black flex items-center justify-center font-bold shadow-depth-sm border-2 border-[#B91C1C]">
            <BookOpen className="w-6 h-6 text-black" />
          </div>
          <h3 className="font-serif text-2xl font-black text-black">Misi Kami</h3>
          <ul className="text-xs sm:text-sm text-black space-y-2.5 font-bold">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
              <span>Menyediakan wadah perkenalan yang 100% patuh pada aturan fikih munakahat.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
              <span>Menjaga privasi, kehormatan, dan data pribadi anggota sesuai hukum syariat & UU PDP.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
              <span>Melibatkan wali nasab dan mahram sejak tahap awal proses perkenalan.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
              <span>Memberikan edukasi pranikah yang komprehensif bagi calon suami dan calon istri.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Landasan Al-Qur'an dan Sunnah */}
      <div className="space-y-6">
        <h2 className="font-serif text-3xl font-black text-black text-center">
          Landasan Pelayanan Sesuai Qur'an & Sunnah
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#064E3B] shadow-depth-md space-y-3 text-black">
            <div className="text-black text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#064E3B]"></span>
              Anjuran Mempermudah Pernikahan
            </div>
            <p className="font-serif text-lg text-black text-right leading-relaxed font-black">
              وَأَنكِحُوا الْأَيَامَىٰ مِنكُمْ وَالصَّالِحِينَ مِنْ عِبَادِكُمْ وَإِمَائِكُمْ ۚ إِن يَكُونُوا فُقَرَاءَ يُغْنِهِمُ اللَّهُ مِن فَضْلِهِ
            </p>
            <p className="text-xs text-black leading-relaxed italic font-bold">
              "Dan kawinkanlah orang-orang yang sendirian diantara kamu, dan orang-orang yang layak (berkawin) dari hamba-hamba sahayamu yang lelaki dan hamba-hamba sahayamu yang perempuan. Jika mereka miskin Allah akan memampukan mereka dengan karunia-Nya."
            </p>
            <div className="text-[11px] font-black text-black pt-1">(QS. An-Nur: 32)</div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#B91C1C] shadow-depth-md space-y-3 text-black">
            <div className="text-black text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B91C1C]"></span>
              Larangan Khalwat (Berdua-duaan Tanpa Mahram)
            </div>
            <p className="font-serif text-lg text-black text-right leading-relaxed font-black">
              لَا يَخْلُوَنَّ رَجُلٌ بِامْرَأَةٍ إِلَّا وَمَعَهَا ذُو مَحْرَمٍ
            </p>
            <p className="text-xs text-black leading-relaxed italic font-bold">
              "Janganlah sekali-kali seorang laki-laki berduaan dengan seorang wanita melainkan wanita itu bersama mahramnya."
            </p>
            <div className="text-[11px] font-black text-black pt-1">(HR. Bukhari no. 5233 dan Muslim no. 1341)</div>
          </div>
        </div>
      </div>

      {/* 5 Prinsip Pelayanan */}
      <div className="bg-white p-8 rounded-3xl border-2 border-[#0284C7] shadow-depth-md space-y-6 text-black">
        <h3 className="font-serif text-2xl font-black text-black">
          5 Pilar Adab Pelayanan Mawaddah
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs sm:text-sm">
          <div className="space-y-1">
            <div className="font-black text-black flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]"></span>
              Amanah & Kejujuran Data
            </div>
            <p className="text-black font-bold">Seluruh data yang dicantumkan diverifikasi dan wajib diisi secara jujur tanpa manipulasi.</p>
          </div>
          <div className="space-y-1">
            <div className="font-black text-black flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#064E3B]"></span>
              Kerahasiaan Tertinggi
            </div>
            <p className="text-black font-bold">Tidak ada pengumbaran data publik atau foto sembarangan tanpa izin syar'i.</p>
          </div>
          <div className="space-y-1">
            <div className="font-black text-black flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]"></span>
              Pendampingan Objektif
            </div>
            <p className="text-black font-bold">Mediator bersikap netral, memberi masukan bijak tanpa memaksakan kehendak pada peserta.</p>
          </div>
          <div className="space-y-1">
            <div className="font-black text-black flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B91C1C]"></span>
              Keterlibatan Wali Nasab
            </div>
            <p className="text-black font-bold">Wali wanita dihormati kedudukannya sebagai rukun pernikahan yang mutlak dalam Islam.</p>
          </div>
          <div className="space-y-1">
            <div className="font-black text-black flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#064E3B]"></span>
              Kemudahan Berhenti
            </div>
            <p className="text-black font-bold">Anggota berhak menghentikan proses kapan saja bila merasa tidak cocok, dengan adab saling mendoakan.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <button
          onClick={() => setCurrentTab('register')}
          className="px-8 py-4 bg-[#6EE7B7] hover:bg-[#34D399] border-2 border-[#064E3B] text-black font-black rounded-xl shadow-depth-md transition-all inline-flex items-center gap-2 cursor-pointer btn-depth-emerald"
        >
          <span>Daftar Menjadi Anggota Ta'aruf</span>
          <ArrowRight className="w-5 h-5 text-black" />
        </button>
      </div>
    </div>
  );
};
