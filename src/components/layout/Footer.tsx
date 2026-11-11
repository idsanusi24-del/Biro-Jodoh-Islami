import React from 'react';
import { 
  HeartHandshake, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  ExternalLink, 
  AlertCircle,
  FileText,
  Lock
} from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  openComplaintModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab, openComplaintModal }) => {
  return (
    <footer className="bg-[#BAE6FD] text-black border-t-4 border-[#0284C7]">
      {/* Top Quranic Banner in Biru Laut with Hijau Zamrud & Merah Accents */}
      <div className="bg-[#7DD3FC] border-b-2 border-[#0284C7] py-8 px-4 text-black shadow-sm">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <p className="font-serif text-xl md:text-2xl text-black leading-relaxed tracking-wide font-black drop-shadow-xs">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </p>
          <p className="text-xs md:text-sm text-black italic font-sans max-w-2xl mx-auto leading-relaxed font-bold">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang."
          </p>
          <p className="text-xs font-black tracking-widest text-black">
            (QS. Ar-Rum: 21)
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-black border-2 border-[#064E3B] flex items-center justify-center font-bold shadow-depth-sm">
                <HeartHandshake className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-black tracking-tight text-black drop-shadow-xs">MAWADDAH</h3>
                <p className="text-xs text-black font-black tracking-wider">BIRO TA'ARUF ISLAMI</p>
              </div>
            </div>
            <p className="text-xs text-black leading-relaxed font-bold">
              Platform perantara ta'aruf calon suami-istri berlandaskan Al-Qur'an dan As-Sunnah. Menjaga izzah dan iffah dengan pendampingan mediator dan keterlibatan wali nasab.
            </p>
            <div className="flex items-center gap-2 text-xs text-black bg-white p-3 rounded-xl border-2 border-[#064E3B] shadow-sm font-black">
              <Lock className="w-4 h-4 text-black shrink-0" />
              <span>Kepatuhan UU PDP No. 27/2022 (Data Pribadi Aman Terenkripsi)</span>
            </div>
          </div>

          {/* Navigasi Layanan */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-black border-b-2 border-[#064E3B] pb-1.5">
              Navigasi Utama
            </h4>
            <ul className="space-y-2 text-xs font-black text-black">
              <li>
                <button onClick={() => setCurrentTab('home')} className="hover:underline transition-colors text-black font-black">
                  Beranda
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('about')} className="hover:underline transition-colors text-black font-black">
                  Tentang Biro & Visi Misi
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('guide')} className="hover:underline transition-colors text-black font-black">
                  Panduan & Tata Cara Ta'aruf Syar'i
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('articles')} className="hover:underline transition-colors text-black font-black">
                  Artikel & Edukasi Pernikahan
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('faq')} className="hover:underline transition-colors text-black font-black">
                  Pertanyaan Sering Diajukan (FAQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Ketentuan Syar'i */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-black border-b-2 border-[#064E3B] pb-1.5">
              Prinsip Syar'i
            </h4>
            <ul className="space-y-2 text-xs text-black font-bold">
              <li className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B91C1C]"></span>
                <span className="font-black text-black">Bukan Aplikasi Kencan / Dating Bebas</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B91C1C]"></span>
                <span className="text-black">Tidak Ada Chatting Tanpa Pengawasan</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#064E3B]"></span>
                <span className="font-black text-black">Wali Terkonfirmasi Sejak Awal</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]"></span>
                <span className="text-black">Nazhar Bersama Mahram & Mediator</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#064E3B]"></span>
                <span className="text-black">Biro adalah Wasilah, Bukan Penentu Jodoh</span>
              </li>
            </ul>
          </div>

          {/* Layanan & Bantuan */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-black border-b-2 border-[#B91C1C] pb-1.5">
              Layanan & Bantuan
            </h4>
            <div className="space-y-2.5 text-xs text-black">
              <div className="flex items-center gap-2 font-black text-black">
                <Phone className="w-4 h-4 text-black shrink-0" />
                <span>CS Resmi: +62 811-2233-4401</span>
              </div>
              <div className="flex items-center gap-2 font-black text-black">
                <Mail className="w-4 h-4 text-black shrink-0" />
                <span>amanah@mawaddah.id</span>
              </div>
              <div className="flex items-start gap-2 font-bold text-black">
                <MapPin className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <span>Gedung Dakwah Mawaddah, Jl. Warung Buncit Raya No. 42, Jakarta Selatan</span>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href="https://wa.me/6281122334401?text=Bismillah,%20saya%20ingin%20konsultasi%20mengenai%20layanan%20Biro%20Taaruf%20Mawaddah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-[#6EE7B7] hover:bg-[#34D399] text-black border-2 border-[#064E3B] rounded-xl text-xs font-black btn-depth-emerald transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-black" />
                  Hubungi WhatsApp Konsultasi
                </a>

                <button
                  onClick={openComplaintModal}
                  className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-[#FECDD3] hover:bg-[#FDA4AF] text-black border-2 border-[#B91C1C] rounded-xl text-xs font-black btn-depth-red transition-all"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-black" />
                  Pengaduan Pelanggaran Adab
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="mt-12 pt-6 border-t-2 border-[#0284C7] flex flex-col sm:flex-row items-center justify-between text-xs text-black font-bold gap-4">
          <p>© 2026 Mawaddah – Biro Ta'aruf Islami. Hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center space-x-4 font-black">
            <button onClick={() => setCurrentTab('privacy')} className="hover:underline transition-colors text-black">
              Kebijakan Privasi
            </button>
            <span>•</span>
            <button onClick={() => setCurrentTab('terms')} className="hover:underline transition-colors text-black">
              Syarat & Ketentuan Syar'i
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
