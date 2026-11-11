import React from 'react';
import { 
  HeartHandshake, 
  ShieldCheck, 
  Users, 
  UserCheck, 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  Lock, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  MessageSquare, 
  Award,
  ChevronRight,
  HelpCircle,
  Star
} from 'lucide-react';
import { Article } from '../../types';

interface HomePageProps {
  setCurrentTab: (tab: string) => void;
  articles: Article[];
  openAuthModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  setCurrentTab, 
  articles,
  openAuthModal 
}) => {
  const steps = [
    {
      num: '01',
      title: 'Pendaftaran & Verifikasi',
      desc: 'Pengisian biodata komprehensif, data wali nasab, dan verifikasi identitas resmi demi keamanan bersama.'
    },
    {
      num: '02',
      title: 'Pencocokan oleh Admin',
      desc: 'Admin menganalisis keselarasan visi pernikahan, komitmen ibadah, domisili, dan rentang usia.'
    },
    {
      num: '03',
      title: 'Pertukaran Biodata Anonim',
      desc: 'Kandidat menerima lembar CV ta\'aruf ringkas tanpa nomor kontak dan alamat pribadi yang sensitif.'
    },
    {
      num: '04',
      title: 'Persetujuan Kedua Pihak',
      desc: 'Proses hanya dilanjutkan jika Ikhwan dan Akhwat secara sukarela memberikan persetujuan (saling ridho).'
    },
    {
      num: '05',
      title: 'Mediasi Tanya-Jawab Terarah',
      desc: 'Sesi diskusi terfokus seputar prinsip rumah tangga di bawah pengawasan langsung mediator syar\'i.'
    },
    {
      num: '06',
      title: 'Nazhar Berdampingan',
      desc: 'Pertemuan tatap muka pertama kali yang wajib didampingi wali/mahram di tempat yang terjaga adabnya.'
    },
    {
      num: '07',
      title: 'Khitbah & Akad Nikah',
      desc: 'Bila ada kemantapan hati (istikharah), proses berlanjut ke peminangan resmi keluarga hingga akad nikah.'
    }
  ];

  return (
    <div className="space-y-16 pb-20 bg-[#BEE3FB] text-black">
      {/* Hero Section in Biru Laut Canvas */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#BAE6FD] via-[#CBE8FE] to-[#BAE6FD] pt-14 pb-20 border-b-2 border-[#0284C7] islamic-mesh-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Arabic Badge with Biru Laut & Hijau Zamrud */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-[#064E3B] text-black text-xs font-serif font-black shadow-depth-sm">
              <Sparkles className="w-4 h-4 text-black" />
              <span>مَوَدَّة – بِلَا اخْتِلَاطٍ وَلَا خَلْوَة</span>
              <span className="text-[#B91C1C] font-black">•</span>
              <span className="font-sans font-black text-black">Platform Ta'aruf Syar'i Terpercaya</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-black leading-[1.15] drop-shadow-xs">
              Menjemput Jodoh dengan Ikhtiar, <br className="hidden sm:inline" />
              <span className="text-black underline decoration-[#0284C7]">
                Menjaga Hati dengan Syariat.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-black font-bold leading-relaxed max-w-2xl mx-auto">
              Biro Ta'aruf Mawaddah adalah platform perantara perkenalan calon pasangan yang amanah. Bukan aplikasi kencan, bebas dari chatting pribadi tanpa pengawasan, dan selalu melibatkan peran wali serta mediator berilmu.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setCurrentTab('register')}
                className="px-8 py-4 rounded-xl text-base font-black text-black bg-[#FECDD3] hover:bg-[#FDA4AF] border-2 border-[#B91C1C] btn-depth-red flex items-center gap-2 shadow-depth-md"
              >
                <span>Daftar Ta'aruf Sekarang</span>
                <ArrowRight className="w-5 h-5 text-black" />
              </button>

              <button
                onClick={() => setCurrentTab('guide')}
                className="px-6 py-4 rounded-xl text-base font-black text-black bg-[#6EE7B7] hover:bg-[#34D399] border-2 border-[#064E3B] btn-depth-emerald flex items-center gap-2 shadow-depth-sm"
              >
                <BookOpen className="w-5 h-5 text-black" />
                <span>Pelajari Adab & Alur Syar'i</span>
              </button>
            </div>

            {/* Quick Points with Black Font */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-black text-black">
              <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-lg border-2 border-[#0284C7] shadow-depth-sm">
                <CheckCircle2 className="w-4 h-4 text-black" />
                <span>Tanpa Swiping & Chat Bebas</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-lg border-2 border-[#0284C7] shadow-depth-sm">
                <CheckCircle2 className="w-4 h-4 text-black" />
                <span>Didampingi Mediator Berilmu</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-lg border-2 border-[#0284C7] shadow-depth-sm">
                <CheckCircle2 className="w-4 h-4 text-black" />
                <span>Wali Terlibat Sejak Awal</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-lg border-2 border-[#0284C7] shadow-depth-sm">
                <CheckCircle2 className="w-4 h-4 text-black" />
                <span>Kerahasiaan Data Terjamin</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Ribbon in Clean White & Biru Laut */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl text-black p-8 shadow-depth-banner grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-sky-200 border-2 border-[#0284C7]">
          <div className="space-y-1 pt-2 md:pt-0">
            <div className="font-serif text-3xl md:text-4xl font-black text-black">100%</div>
            <div className="text-xs text-black font-black">Berlandaskan Syariat Islam</div>
          </div>
          <div className="space-y-1 pt-4 md:pt-0">
            <div className="font-serif text-3xl md:text-4xl font-black text-black">0%</div>
            <div className="text-xs text-black font-black">Khalwat & Chatting Bebas</div>
          </div>
          <div className="space-y-1 pt-4 md:pt-0">
            <div className="font-serif text-3xl md:text-4xl font-black text-black">Terverifikasi</div>
            <div className="text-xs text-black font-black">Wali & Dokumen Identitas</div>
          </div>
          <div className="space-y-1 pt-4 md:pt-0">
            <div className="font-serif text-3xl md:text-4xl font-black text-black">Terkurasi</div>
            <div className="text-xs text-black font-black">Didampingi Mediator Amanah</div>
          </div>
        </div>
      </section>

      {/* Layanan & Filosofi Mawaddah */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-black">
            Prinsip Layanan Ta'aruf Mawaddah
          </h2>
          <p className="text-sm text-black font-bold">
            Menata langkah pernikahan bermula dari niat yang lurus dan proses yang bersih dari dosa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border-2 border-[#0284C7] shadow-depth-md hover:shadow-depth-lg hover:-translate-y-1 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#BAE6FD] text-black flex items-center justify-center font-bold border-2 border-[#0284C7] shadow-sm">
              <ShieldCheck className="w-6 h-6 text-black" />
            </div>
            <h3 className="font-serif text-xl font-black text-black">
              Menjaga Izzah & Iffah
            </h3>
            <p className="text-xs text-black leading-relaxed font-bold">
              Foto dan data pribadi tidak diumbar bebas ke publik. Nomor WhatsApp dan alamat keluarga hanya dibuka melalui izin resmi admin dan konfirmasi kesiapan kedua pihak.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border-2 border-[#064E3B] shadow-depth-md hover:shadow-depth-lg hover:-translate-y-1 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#6EE7B7] text-black flex items-center justify-center font-bold border-2 border-[#064E3B] shadow-sm">
              <Users className="w-6 h-6 text-black" />
            </div>
            <h3 className="font-serif text-xl font-black text-black">
              Peran Mahram & Mediator
            </h3>
            <p className="text-xs text-black leading-relaxed font-bold">
              Komunikasi berlangsung terarah dalam ruang mediasi resmi. Tidak ada panggilan mesra atau canda berlebihan. Saat pertemuan Nazhar, mahram wajib mendampingi.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border-2 border-[#B91C1C] shadow-depth-md hover:shadow-depth-lg hover:-translate-y-1 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FECDD3] text-black flex items-center justify-center font-bold border-2 border-[#B91C1C] shadow-sm">
              <Award className="w-6 h-6 text-black" />
            </div>
            <h3 className="font-serif text-xl font-black text-black">
              Kesiapan Menikah Hakiki
            </h3>
            <p className="text-xs text-black leading-relaxed font-bold">
              Anggota yang mendaftar diverifikasi kesiapan visi, kemandirian, restu orang tua/wali, serta target waktu menikah yang jelas (maksimal 1 tahun).
            </p>
          </div>
        </div>
      </section>

      {/* 7 Alur Proses Ta'aruf */}
      <section className="bg-white py-16 border-y-2 border-[#0284C7] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-black bg-[#BAE6FD] border-2 border-[#0284C7] px-3.5 py-1 rounded-full shadow-2xs">
              SOP Resmi Biro
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-black">
              7 Langkah Menjemput Ridho Illahi
            </h2>
            <p className="text-sm text-black font-bold">
              Alur terstruktur yang menjaga ketenangan hati dan kehormatan kedua keluarga besar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.slice(0, 4).map((s) => (
              <div 
                key={s.num} 
                className="bg-[#EBF5FE] p-6 rounded-3xl border-2 border-[#0284C7] shadow-depth-sm hover:shadow-depth-md hover:-translate-y-1 transition-all relative group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#6EE7B7] text-black font-black flex items-center justify-center text-xs mb-4 border-2 border-[#064E3B] shadow-sm">
                  {s.num}
                </div>
                <h4 className="font-serif text-base font-black text-black mb-2">{s.title}</h4>
                <p className="text-xs text-black leading-relaxed font-bold">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {steps.slice(4).map((s) => (
              <div 
                key={s.num} 
                className="bg-[#EBF5FE] p-6 rounded-3xl border-2 border-[#0284C7] shadow-depth-sm hover:shadow-depth-md hover:-translate-y-1 transition-all relative group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FECDD3] text-black font-black flex items-center justify-center text-xs mb-4 border-2 border-[#B91C1C] shadow-sm">
                  {s.num}
                </div>
                <h4 className="font-serif text-base font-black text-black mb-2">{s.title}</h4>
                <p className="text-xs text-black leading-relaxed font-bold">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => setCurrentTab('guide')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-black hover:bg-sky-100 bg-white border-2 border-[#0284C7] px-6 py-3 rounded-xl shadow-depth-sm active:translate-y-0.5 transition-all"
            >
              <span>Baca Rincian Ketentuan Syariat Setiap Tahap</span>
              <ChevronRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </section>

      {/* Perbandingan: Mawaddah vs Aplikasi Kencan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-black">
            Mengapa Mawaddah Berbeda?
          </h2>
          <p className="text-sm text-black font-bold">
            Perbandingan tegas antara platform ta'aruf syar'i dengan aplikasi kencan / dating apps modern.
          </p>
        </div>

        <div className="bg-white rounded-3xl border-2 border-[#0284C7] shadow-depth-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#BAE6FD] text-black border-b-2 border-[#0284C7]">
                  <th className="py-4 px-6 text-sm font-black text-black">Parameter Penilaian</th>
                  <th className="py-4 px-6 text-sm font-black text-black bg-[#A7F3D0]">
                    Biro Ta'aruf Mawaddah (Syar'i)
                  </th>
                  <th className="py-4 px-6 text-sm font-black text-black bg-[#FECDD3]">
                    Aplikasi Kencan Bebas (Dating Apps)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-200 text-xs sm:text-sm text-black">
                <tr className="hover:bg-sky-50 transition-colors">
                  <td className="py-4 px-6 font-black text-black">Tujuan Hubungan</td>
                  <td className="py-4 px-6 text-black bg-[#A7F3D0]/40 font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                    Pernikahan berkah sah secara syariat & negara
                  </td>
                  <td className="py-4 px-6 text-black bg-[#FECDD3]/40 font-bold flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-black shrink-0" />
                    Pacaran santai, pertemanan, hiburan sesaat
                  </td>
                </tr>
                <tr className="hover:bg-sky-50 transition-colors">
                  <td className="py-4 px-6 font-black text-black">Akses Chatting</td>
                  <td className="py-4 px-6 text-black bg-[#A7F3D0]/40 font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                    Terarah dipandu Mediator & ada pengawasan
                  </td>
                  <td className="py-4 px-6 text-black bg-[#FECDD3]/40 font-bold flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-black shrink-0" />
                    Chatting bebas tanpa batas, rawan rayuan & maksiat
                  </td>
                </tr>
                <tr className="hover:bg-sky-50 transition-colors">
                  <td className="py-4 px-6 font-black text-black">Peran Wali / Orang Tua</td>
                  <td className="py-4 px-6 text-black bg-[#A7F3D0]/40 font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                    Wajib terkonfirmasi sejak awal dan mendampingi
                  </td>
                  <td className="py-4 px-6 text-black bg-[#FECDD3]/40 font-bold flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-black shrink-0" />
                    Disembunyikan dari orang tua / hubungan sembunyi
                  </td>
                </tr>
                <tr className="hover:bg-sky-50 transition-colors">
                  <td className="py-4 px-6 font-black text-black">Kerahasiaan Foto & Kontak</td>
                  <td className="py-4 px-6 text-black bg-[#A7F3D0]/40 font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                    Privat, tertutup publik, hanya dibuka saat saling ridho
                  </td>
                  <td className="py-4 px-6 text-black bg-[#FECDD3]/40 font-bold flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-black shrink-0" />
                    Foto dipajang terbuka untuk dinilai fisik semata
                  </td>
                </tr>
                <tr className="hover:bg-sky-50 transition-colors">
                  <td className="py-4 px-6 font-black text-black">Pertemuan Fisik (Nazhar)</td>
                  <td className="py-4 px-6 text-black bg-[#A7F3D0]/40 font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                    Di kediaman wali atau kantor resmi bersama mahram
                  </td>
                  <td className="py-4 px-6 text-black bg-[#FECDD3]/40 font-bold flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-black shrink-0" />
                    Kencan berdua-duaan (khalwat) di tempat umum/tertutup
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimoni Section */}
      <section className="bg-white py-16 border-y-2 border-[#0284C7] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-black bg-[#BAE6FD] border-2 border-[#0284C7] px-3.5 py-1 rounded-full shadow-2xs">
              Kisah Nyata Berkah
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-black">
              Alhamdulillah, Terwujud Rumah Tangga Sakinah
            </h2>
            <p className="text-xs sm:text-sm text-black font-bold">
              Testimoni pasangan yang telah melangsungkan pernikahan melalui wasilah Mawaddah (identitas disamarkan demi menjaga privasi keluarga).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#EBF5FE] p-6 sm:p-8 rounded-3xl border-2 border-[#0284C7] shadow-depth-sm hover:shadow-depth-md hover:-translate-y-1 transition-all space-y-4">
              <div className="flex items-center gap-1 text-black font-black">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-black leading-relaxed italic font-bold">
                "Alhamdulillah, proses ta'aruf di Mawaddah sangat menjaga hati. Tidak ada chatting yang tidak penting. Ustadz mediator sangat membimbing ketika sesi tanya-jawab mengenai peran nafkah dan visi mendidik anak. Sekarang kami sudah 1 tahun menikah dan dikaruniai seorang putri."
              </p>
              <div className="pt-3 border-t-2 border-[#0284C7] text-xs">
                <div className="font-black text-black">Akhi F & Ukhti D</div>
                <div className="text-black font-bold">Menikah September 2025 (Jakarta Selatan)</div>
              </div>
            </div>

            <div className="bg-[#EBF5FE] p-6 sm:p-8 rounded-3xl border-2 border-[#064E3B] shadow-depth-sm hover:shadow-depth-md hover:-translate-y-1 transition-all space-y-4">
              <div className="flex items-center gap-1 text-black font-black">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-black leading-relaxed italic font-bold">
                "Sebagai ayah dari seorang putri, saya sangat mengapresiasi Biro Mawaddah. Pihak biro menghubungi saya langsung untuk mengonfirmasi kesiapan sebagai wali sebelum calon ikhwan bertamu untuk nazhar. Sangat syar'i dan membuat keluarga merasa tenang."
              </p>
              <div className="pt-3 border-t-2 border-[#064E3B] text-xs">
                <div className="font-black text-black">Bapak H. Subagyo (Wali Akhwat)</div>
                <div className="text-black font-bold">Domisili Bandung, Jawa Barat</div>
              </div>
            </div>

            <div className="bg-[#EBF5FE] p-6 sm:p-8 rounded-3xl border-2 border-[#B91C1C] shadow-depth-sm hover:shadow-depth-md hover:-translate-y-1 transition-all space-y-4">
              <div className="flex items-center gap-1 text-black font-black">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-black leading-relaxed italic font-bold">
                "Biodata yang sangat detail membuat kami bisa langsung melihat keselarasan pemahaman agama dan kesiapan menikah tanpa membuang waktu. Terima kasih Mawaddah atas pendampingannya yang amanah."
              </p>
              <div className="pt-3 border-t-2 border-[#B91C1C] text-xs">
                <div className="font-black text-black">Akhi R & Ukhti S</div>
                <div className="text-black font-bold">Menikah Januari 2026 (Surabaya)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cuplikan Artikel Edukasi */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-black bg-[#BAE6FD] border-2 border-[#0284C7] px-3 py-1 rounded-full shadow-2xs">
              Tazkiyatun Nafs & Fikih
            </span>
            <h2 className="font-serif text-3xl font-black text-black mt-2">
              Artikel & Edukasi Pernikahan
            </h2>
          </div>
          <button
            onClick={() => setCurrentTab('articles')}
            className="text-xs font-black text-black hover:underline flex items-center gap-1 self-start sm:self-auto group"
          >
            <span>Lihat Semua Artikel</span>
            <ChevronRight className="w-4 h-4 text-black group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((art) => (
            <div
              key={art.id}
              onClick={() => setCurrentTab('articles')}
              className="bg-white p-6 rounded-3xl border-2 border-[#0284C7] shadow-depth-sm hover:shadow-depth-md hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-black">
                  <span className="bg-[#BAE6FD] text-black font-black px-2.5 py-0.5 rounded-md border border-[#0284C7]">
                    {art.category}
                  </span>
                  <span className="font-bold">{art.readTime}</span>
                </div>
                <h3 className="font-serif text-lg font-black text-black line-clamp-2 hover:underline">
                  {art.title}
                </h3>
                <p className="text-xs text-black line-clamp-3 leading-relaxed font-bold">
                  {art.summary}
                </p>
              </div>

              <div className="pt-4 border-t-2 border-sky-100 flex items-center justify-between text-[11px] text-black mt-4 font-black">
                <span>Oleh: {art.author}</span>
                <span className="flex items-center gap-1 hover:underline">
                  Baca <ChevronRight className="w-3.5 h-3.5 text-black" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#BAE6FD] rounded-3xl p-8 sm:p-12 text-black shadow-depth-banner border-2 border-[#0284C7] text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-black tracking-tight text-black drop-shadow-xs">
              Siap Memulai Ikhtiar Mulia Anda?
            </h2>
            <p className="text-sm text-black leading-relaxed font-bold">
              Daftarkan diri Anda, lengkapi formulir kesiapan syar'i, dan biarkan tim konsultan Mawaddah mendampingi ikhtiar Anda hingga gerbang pernikahan yang berkah.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setCurrentTab('register')}
              className="px-8 py-4 bg-[#FECDD3] hover:bg-[#FDA4AF] border-2 border-[#B91C1C] text-black font-black rounded-xl btn-depth-red flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-black" />
              <span>Daftar Ta'aruf Anggota Baru</span>
            </button>
            <button
              onClick={() => setCurrentTab('faq')}
              className="px-6 py-4 bg-white hover:bg-sky-50 text-black font-black rounded-xl border-2 border-[#0284C7] shadow-depth-sm active:translate-y-0.5 transition-all"
            >
              Konsultasi & Tanya Jawab
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
