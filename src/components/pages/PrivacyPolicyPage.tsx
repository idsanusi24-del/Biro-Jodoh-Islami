import React from 'react';
import { ShieldCheck, Lock, FileText, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyPageProps {
  setCurrentTab: (tab: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ setCurrentTab }) => {
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
            <Lock className="w-4 h-4 text-black" />
            <span>Kepatuhan UU No. 27 Tahun 2022</span>
          </div>
          <h1 className="font-serif text-3xl font-black text-black tracking-tight drop-shadow-xs">
            Kebijakan Privasi & Perlindungan Data Pribadi
          </h1>
          <p className="text-xs text-black font-bold">Berlaku efektif sejak 1 Januari 2026</p>
        </div>

        <p className="font-bold">
          Biro Ta'aruf Islami <strong>Mawaddah</strong> berkomitmen penuh untuk melindungi privasi, integritas, dan kerahasiaan Data Pribadi seluruh anggota sesuai dengan <strong>Undang-Undang Republik Indonesia Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP)</strong> serta amanah syariat Islam yang melarang mengumbar aib sesama muslim.
        </p>

        <div className="space-y-4">
          <h3 className="font-serif text-lg font-black text-black">1. Data Pribadi yang Kami Kumpulkan</h3>
          <p>Data yang kami peroleh langsung dari pengisian formulir pendaftaran meliputi:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-black font-bold">
            <li><strong>Data Identitas Umum:</strong> Nama lengkap, tempat dan tanggal lahir, usia, jenis kelamin, kota domisili.</li>
            <li><strong>Data Kontak Terbatas:</strong> Nomor WhatsApp, alamat email, serta nomor kontak wali nasab / keluarga yang dapat dihubungi.</li>
            <li><strong>Data Matrimonial & Keluarga:</strong> Status pernikahan sebelumnya, jumlah anak, tinggi/berat badan, dan kesiapan finansial mandiri.</li>
            <li><strong>Data Komitmen Keagamaan:</strong> Kebiasaan shalat 5 waktu, kajian yang diikuti, hafalan Al-Qur'an, dan kebiasaan merokok.</li>
            <li><strong>Visi & Kriteria Pasangan:</strong> Cita-cita rumah tangga sakinah dan rentang kriteria yang diharapkan.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-serif text-lg font-black text-black">2. Prinsip Non-Disclosure & Isolasi Data</h3>
          <p>
            Mawaddah menerapkan sistem <strong>Split Collection & Controlled Access</strong>:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-black font-bold">
            <li>Nomor kontak pribadi (WhatsApp/telepon) dan alamat rumah spesifik <strong>TIDAK PERNAH</strong> ditampilkan kepada anggota lain.</li>
            <li>Foto anggota privat secara default dan hanya dapat dibuka saat tahap pertukaran biodata resmi dengan persetujuan kedua pihak.</li>
            <li>Data wali hanya digunakan untuk kepentingan verifikasi keabsahan perwalian dan pendampingan nazhar.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-serif text-lg font-black text-black">3. Hak Subjek Data (Right to be Forgotten)</h3>
          <p>
            Setiap anggota memiliki hak penuh untuk:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-black font-bold">
            <li>Mengakses dan memperbarui biodata diri melalui Dashboard Anggota.</li>
            <li>Mengajukan penghentian proses ta'aruf kapan saja tanpa adanya paksaan.</li>
            <li>Mengajukan <strong>penghapusan permanen akun dan biodata</strong> dari basis data kami melalui menu Pengaturan Privasi di dashboard.</li>
          </ul>
        </div>

        <div className="p-5 bg-[#EBF5FE] rounded-2xl border-2 border-[#0284C7] text-xs text-black font-black">
          <strong>Amanah Dewan Pengurus:</strong> Kami memandang kerahasiaan data pendaftar sebagai amanah agama yang akan dipertanggungjawabkan di hadapan Allah Ta'ala.
        </div>
      </div>
    </div>
  );
};
