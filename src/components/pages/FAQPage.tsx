import React, { useState } from 'react';
import { FAQ_LIST } from '../../data/initialData';
import { 
  HelpCircle, 
  ChevronDown, 
  Phone, 
  AlertCircle,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface FAQPageProps {
  setCurrentTab: (tab: string) => void;
  openComplaintModal: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ setCurrentTab, openComplaintModal }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-black">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-black border-2 border-[#0284C7] shadow-depth-sm">
          <HelpCircle className="w-3.5 h-3.5 text-black" />
          <span>Pusat Informasi & Tanya Jawab</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-black tracking-tight drop-shadow-xs">
          Pertanyaan Sering Diajukan (FAQ)
        </h1>
        <p className="text-xs sm:text-sm text-black max-w-xl mx-auto leading-relaxed font-bold">
          Temukan jawaban seputar kepatuhan syariat, keamanan data, verifikasi wali, dan mekanisme mediasi di Biro Mawaddah.
        </p>
      </div>

      {/* Accordion FAQ */}
      <div className="space-y-4">
        {FAQ_LIST.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border-2 border-[#0284C7] shadow-depth-md overflow-hidden transition-all text-black"
            >
              <button
                onClick={() => toggleIndex(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-sky-50 transition-colors cursor-pointer"
              >
                <span className="font-serif text-base sm:text-lg font-black text-black">
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-black shrink-0 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-black leading-relaxed border-t-2 border-sky-100 pt-3 font-bold">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Help Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
        <div className="bg-white border-2 border-[#064E3B] p-6 rounded-3xl space-y-3 shadow-depth-md text-black">
          <div className="w-10 h-10 rounded-xl bg-[#6EE7B7] text-black flex items-center justify-center border-2 border-[#064E3B] shadow-depth-sm">
            <Phone className="w-5 h-5 text-black" />
          </div>
          <h3 className="font-serif text-lg font-black text-black">
            Masih Butuh Bantuan?
          </h3>
          <p className="text-xs text-black leading-relaxed font-bold">
            Konsultasikan keraguan Anda langsung dengan tim konsultan administrasi Biro Mawaddah melalui saluran WhatsApp resmi.
          </p>
          <a
            href="https://wa.me/6281122334401?text=Bismillah,%20saya%20ingin%20konsultasi%20mengenai%20layanan%20Biro%20Taaruf%20Mawaddah"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-depth-emerald text-black inline-flex items-center gap-2 text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-depth-sm cursor-pointer"
          >
            Hubungi CS WhatsApp
          </a>
        </div>

        <div className="bg-white border-2 border-[#B91C1C] p-6 rounded-3xl space-y-3 shadow-depth-md text-black">
          <div className="w-10 h-10 rounded-xl bg-[#FECDD3] text-black flex items-center justify-center border-2 border-[#B91C1C] shadow-depth-sm">
            <AlertCircle className="w-5 h-5 text-black" />
          </div>
          <h3 className="font-serif text-lg font-black text-black">
            Pengaduan Pelanggaran Adab
          </h3>
          <p className="text-xs text-black leading-relaxed font-bold">
            Menemukan ketidaksesuaian data, ajakan khalwat, atau pelanggaran privasi oleh anggota? Laporkan segera ke dewan etik kami.
          </p>
          <button
            onClick={openComplaintModal}
            className="btn-depth-red text-black inline-flex items-center gap-2 text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-depth-sm cursor-pointer"
          >
            Isi Form Pengaduan
          </button>
        </div>
      </div>
    </div>
  );
};
