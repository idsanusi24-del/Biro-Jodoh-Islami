import React from 'react';
import { ShieldCheck, FileCheck, ArrowLeft } from 'lucide-react';

interface TermsPageProps {
  setCurrentTab: (tab: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ setCurrentTab }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-black">
      <button
        onClick={() => setCurrentTab('home')}
        className="inline-flex items-center gap-2 text-xs font-black text-black bg-white hover:bg-sky-50 px-4 py-2 rounded-xl border-2 border-[#0284C7] shadow-depth-sm transition-all cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 text-black" />
        <span>Kembali ke Beranda</span>
      </button>

      <div className="bg-white p-6 sm:p-12 rounded-3xl border-2 border-[#0284C7] shadow-depth-lg space-y-6 text-black leading-relaxed text-xs sm:text-sm font-bold">
        <div className="border-b-2 border-sky-100 pb-4 space-y-1">
          <div className="flex items-center gap-2 text-black font-black text-xs uppercase tracking-wider">
            <FileCheck className="w-4 h-4 text-black" />
            <span>Pakta Ta'aruf Syar'i</span>
          </div>
          <h1 className="font-serif text-3xl font-black text-black tracking-tight drop-shadow-xs">
            Syarat & Ketentuan Layanan Mawaddah
          </h1>
          <p className="text-xs text-black font-bold">Kaidah dan tata tertib kepesertaan</p>
        </div>

        <div className="space-y-4">
          <h3 className="font-serif text-lg font-black text-black">1. Ketentuan Umum Kepesertaan</h3>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-black font-bold">
            <li>Beragama Islam, berakal sehat, dan telah mencapai usia baligh serta dewasa secara hukum.</li>
            <li>Berniat sungguh-sungguh untuk menikah secara syar'i dalam jangka waktu maksimal 1 tahun ke depan.</li>
            <li>Tidak terikat tali pernikahan bagi wanita (atau sedang tidak dalam masa iddah). Bagi laki-laki, wajib jujur atas status pernikahan dan kesiapan nafkah lahir batin.</li>
            <li>Memiliki wali nasab yang sah atau wali hakim yang siap memberikan restu dan pendampingan.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-serif text-lg font-black text-black">2. Larangan Mutlak bagi Anggota</h3>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-black bg-[#FECDD3] p-5 rounded-2xl border-2 border-[#B91C1C] shadow-depth-sm font-bold">
            <li>Dilarang meminta kontak pribadi atau mengajak berkomunikasi di luar pengawasan mediator Mawaddah.</li>
            <li>Dilarang mengajak atau menyetujui pertemuan berdua-duaan (khalwat) tanpa kehadiran mahram.</li>
            <li>Dilarang menyebarkan, memotret, atau mempublikasikan lembar biodata calon kepada khalayak umum.</li>
            <li>Dilarang memalsukan identitas, dokumen kependudukan, status pernikahan, atau data kondisi kesehatan.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-serif text-lg font-black text-black">3. Sanksi Pelanggaran</h3>
          <p className="text-black font-bold">
            Pelanggaran terhadap adab dan ketentuan di atas akan mengakibatkan pemblokiran akun permanen secara sepihak, pencabutan kartu keanggotaan, dan pelaporan kepada pihak keluarga/wali anggota terkait demi menjaga kehormatan jamaah.
          </p>
        </div>
      </div>
    </div>
  );
};
