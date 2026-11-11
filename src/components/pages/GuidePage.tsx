import React, { useState } from 'react';
import { 
  BookOpen, 
  ShieldAlert, 
  Eye, 
  Users, 
  HeartHandshake, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  ChevronDown,
  Sparkles
} from 'lucide-react';

interface GuidePageProps {
  setCurrentTab: (tab: string) => void;
}

export const GuidePage: React.FC<GuidePageProps> = ({ setCurrentTab }) => {
  const [activeSection, setActiveSection] = useState<string>('pengertian');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-black">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-black border-2 border-[#0284C7] shadow-depth-sm">
          <BookOpen className="w-4 h-4 text-black" />
          <span>Fikih Munakahat & Tata Cara</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-black text-black tracking-tight drop-shadow-xs">
          Panduan Lengkap Ta'aruf Syar'i
        </h1>
        <p className="text-black max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-bold">
          Pelajari tata cara, adab-adab mulia, batasan komunikasi, serta proses nazhar dan khitbah sesuai tuntunan Rasulullah ﷺ.
        </p>
      </div>

      {/* Navigasi Topik Cepat */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 border-b-2 border-[#0284C7] pb-5">
        {[
          { id: 'pengertian', label: '1. Pengertian & Hukum' },
          { id: 'adab', label: '2. Adab & Batas Komunikasi' },
          { id: 'wali', label: '3. Peran Wali & Mahram' },
          { id: 'nazhar', label: '4. Fikih Nazhar (Tatap Muka)' },
          { id: 'khitbah', label: '5. Khitbah & Menuju Akad' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeSection === item.id
                ? 'bg-[#6EE7B7] text-black shadow-depth-sm border-2 border-[#064E3B]'
                : 'bg-white text-black hover:bg-sky-50 border-2 border-[#0284C7]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Content Section: 1. Pengertian */}
      {activeSection === 'pengertian' && (
        <div className="bg-white p-8 rounded-3xl border-2 border-[#0284C7] shadow-depth-lg space-y-6 text-black">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#BAE6FD] text-black flex items-center justify-center font-bold shadow-depth-sm border-2 border-[#0284C7]">
              <BookOpen className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-black text-black">
                Pengertian Ta'aruf & Perbedaannya dengan Pacaran
              </h2>
              <p className="text-xs text-black font-bold">Secara bahasa dan istilah syariat</p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-black leading-relaxed font-bold">
            <p>
              Secara etimologi, kata <strong className="underline">ta'aruf (تَعَارُف)</strong> berasal dari kata <em>ta'arafa - yata'arafu</em> yang bermakna saling mengenal. Istilah ini merujuk pada firman Allah Ta'ala dalam Surah Al-Hujurat ayat 13:
            </p>
            <div className="p-5 bg-[#EBF5FE] rounded-2xl border-2 border-[#0284C7] space-y-2">
              <p className="font-serif text-lg text-black text-right font-black">
                يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا
              </p>
              <p className="text-xs text-black italic font-bold">
                "Wahai manusia! Sungguh, Kami telah menciptakan kamu dari seorang laki-laki dan seorang perempuan, kemudian Kami jadikan kamu berbangsa-bangsa dan bersuku-suku agar kamu saling mengenal." (QS. Al-Hujurat: 13)
              </p>
            </div>
            <p>
              Dalam konteks pernikahan, <strong className="underline">ta'aruf</strong> adalah proses pengenalan antara seorang laki-laki dan perempuan yang berniat menikah, dengan tujuan saling mengetahui kriteria, latar belakang, komitmen agama, dan visi kehidupan secara terarah, beradab, serta terhindar dari perbuatan yang diharamkan seperti berdua-duaan (khalwat) dan campur baur (ikhtilath).
            </p>
          </div>

          {/* Tabel Perbedaan */}
          <div className="border-2 border-[#0284C7] rounded-2xl overflow-hidden mt-6 shadow-depth-md">
            <div className="bg-[#BAE6FD] px-5 py-3 font-black text-xs uppercase tracking-wider text-black border-b-2 border-[#0284C7]">
              Perbedaan Inti Ta'aruf vs Pacaran
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-sky-200 text-xs sm:text-sm">
              <div className="p-5 space-y-2.5 bg-[#A7F3D0]/30">
                <div className="font-black text-black flex items-center gap-1.5 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  Ta'aruf Syar'i (Mawaddah)
                </div>
                <ul className="space-y-2 text-black list-disc list-inside font-bold">
                  <li>Tujuan jelas: Pernikahan ibadah seumur hidup.</li>
                  <li>Didampingi pihak ketiga (mediator & mahram).</li>
                  <li>Fokus pada hal prinsipil: agama, visi, kesiapan nafkah.</li>
                  <li>Waktu terukur (umumnya 1 - 3 bulan menuju khitbah).</li>
                  <li>Bila tidak cocok, diselesaikan dengan adab saling mendoakan.</li>
                </ul>
              </div>
              <div className="p-5 space-y-2.5 bg-[#FECDD3]/30">
                <div className="font-black text-black flex items-center gap-1.5 text-sm">
                  <XCircle className="w-4 h-4 text-black" />
                  Pacaran (Melanggar Syariat)
                </div>
                <ul className="space-y-2 text-black list-disc list-inside font-bold">
                  <li>Tujuan seringkali hanya main-main atau coba-coba.</li>
                  <li>Berdua-duaan tanpa mahram (khalwat & ikhtilath).</li>
                  <li>Didominasi oleh hawa nafsu dan janji manis tanpa kepastian.</li>
                  <li>Bisa berlangsung bertahun-tahun tanpa kepastian menikah.</li>
                  <li>Seringkali berujung pada patah hati, trauma, atau perbuatan dosa.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Section: 2. Adab & Batas Komunikasi */}
      {activeSection === 'adab' && (
        <div className="bg-white p-8 rounded-3xl border-2 border-[#0284C7] shadow-depth-lg space-y-6 text-black">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#BAE6FD] text-black flex items-center justify-center font-bold shadow-depth-sm border-2 border-[#0284C7]">
              <ShieldAlert className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-black text-black">
                Adab Ta'aruf & Batas Komunikasi yang Diperbolehkan
              </h2>
              <p className="text-xs text-black font-bold">Menjaga lisan, tulisan, dan hati dari jeratan syahwat</p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-black leading-relaxed font-bold">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-[#064E3B] bg-[#A7F3D0]/30 rounded-2xl p-5 space-y-3">
                <h4 className="font-black text-black text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-black" />
                  Yang Diperbolehkan & Dianjurkan
                </h4>
                <ul className="space-y-2 text-black text-xs sm:text-sm font-bold">
                  <li>• Menanyakan hal substantif: pemahaman manhaj, kebiasaan shalat, rencana tempat tinggal, pekerjaan dan kemampuan nafkah.</li>
                  <li>• Melibatkan mediator di setiap percakapan tertulis maupun lisan.</li>
                  <li>• Menggunakan bahasa yang santun, lugas, tegas, dan tidak mendayu-dayu.</li>
                  <li>• Bersikap jujur mengenai kondisi kesehatan kronis, status pernikahan sebelumnya, atau tanggungan keluarga.</li>
                </ul>
              </div>

              <div className="border-2 border-[#B91C1C] bg-[#FECDD3]/30 rounded-2xl p-5 space-y-3">
                <h4 className="font-black text-black text-base flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-black" />
                  Larangan Mutlak Selama Ta'aruf
                </h4>
                <ul className="space-y-2 text-black text-xs sm:text-sm font-bold">
                  <li>• Mengirim pesan pribadi (direct message) tanpa sepengetahuan mediator.</li>
                  <li>• Menggunakan panggilan sayang, candaan berlebihan, atau kata-kata rayuan.</li>
                  <li>• Bertelepon atau berkirim pesan suara berdua di malam hari tanpa urgensi.</li>
                  <li>• Bertemu berdua di kafe, bioskop, atau tempat sepi tanpa mahram.</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-[#FEF3C7] rounded-xl border-2 border-amber-500 text-xs text-black leading-relaxed font-black">
              <strong>Peringatan Syar'i:</strong> Selama proses ta'aruf, status antara ikhwan dan akhwat adalah <strong>tetap orang asing (ajnabi / non-mahram)</strong> secara mutlak. Belum ada hak suami-istri sedikit pun hingga ikrar akad nikah sah diucapkan.
            </div>
          </div>
        </div>
      )}

      {/* Content Section: 3. Peran Wali & Mahram */}
      {activeSection === 'wali' && (
        <div className="bg-white p-8 rounded-3xl border-2 border-[#0284C7] shadow-depth-lg space-y-6 text-black">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#BAE6FD] text-black flex items-center justify-center font-bold shadow-depth-sm border-2 border-[#0284C7]">
              <Users className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-black text-black">
                Kedudukan Vital Wali & Mahram dalam Pernikahan Islam
              </h2>
              <p className="text-xs text-black font-bold">Rukun sahnya pernikahan yang tidak boleh diabaikan</p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-black leading-relaxed font-bold">
            <p>
              Salah satu kekeliruan fatal dalam budaya pergaulan modern adalah menjalin hubungan secara sembunyi-sembunyi tanpa restu orang tua. Dalam Islam, wali nasab bagi wanita adalah rukun yang menentukan sah atau tidaknya sebuah akad.
            </p>

            <div className="p-5 bg-[#EBF5FE] rounded-2xl border-2 border-[#0284C7]">
              <p className="text-black font-serif text-right text-lg font-black">
                لَا نِكَاحَ إِلَّا بِوَلِيٍّ
              </p>
              <p className="text-xs text-black italic mt-1 font-bold">
                "Tidak sah pernikahan kecuali dengan adanya wali." (HR. Abu Dawud no. 2085, Tirmidzi no. 1101, shahih)
              </p>
            </div>

            <h4 className="font-black text-black text-sm pt-2">Urutan Wali Nasab Menurut Jumhur Ulama:</h4>
            <ol className="list-decimal list-inside space-y-1.5 text-xs sm:text-sm text-black pl-2 font-bold">
              <li>Ayah kandung.</li>
              <li>Kakek dari pihak ayah (ayahnya ayah) ke atas.</li>
              <li>Saudara laki-laki kandung (seayah seibu).</li>
              <li>Saudara laki-laki seayah.</li>
              <li>Paman kandung (saudara laki-laki ayah sekandung).</li>
              <li>Wali hakim (apabila tidak ada wali nasab yang memenuhi syarat atau terjadi perwalian ghaib).</li>
            </ol>

            <div className="p-4 bg-[#BAE6FD] rounded-xl border-2 border-[#0284C7] text-xs text-black font-bold">
              <strong className="underline">Di Biro Mawaddah:</strong> Kami memverifikasi nomor kontak dan kesiapan wali wanita sebelum tahap perkenalan dilanjutkan ke ruang mediasi, guna memastikan langkah sang ikhwan diridhoi oleh keluarga besar akhwat.
            </div>
          </div>
        </div>
      )}

      {/* Content Section: 4. Fikih Nazhar */}
      {activeSection === 'nazhar' && (
        <div className="bg-white p-8 rounded-3xl border-2 border-[#0284C7] shadow-depth-lg space-y-6 text-black">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#BAE6FD] text-black flex items-center justify-center font-bold shadow-depth-sm border-2 border-[#0284C7]">
              <Eye className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-black text-black">
                Fikih & Tata Cara Nazhar (Pertemuan Tatap Muka)
              </h2>
              <p className="text-xs text-black font-bold">Melihat calon pasangan sesuai tuntunan syariat</p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-black leading-relaxed font-bold">
            <p>
              Nazhar secara syar'i adalah memandang calon pasangan sebelum melangsungkan khitbah untuk memantapkan hati, sehingga memupuk rasa saling condong (mahabbah) dan melanggengkan kasih sayang.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-5 bg-[#EBF5FE] rounded-2xl border-2 border-[#0284C7] space-y-2">
                <div className="font-black text-black text-sm">Bagian yang Dilihat</div>
                <p className="text-xs text-black font-bold">
                  Menurut jumhur ulama (termasuk Mazhab Syafi'i), bagian yang boleh dilihat adalah <strong>wajah</strong> (menggambarkan kecantikan dan keceriaan) serta <strong>kedua telapak tangan</strong> (menggambarkan kebersihan dan kondisi fisik).
                </p>
              </div>

              <div className="p-5 bg-[#EBF5FE] rounded-2xl border-2 border-[#0284C7] space-y-2">
                <div className="font-black text-black text-sm">Tempat Pelaksanaan</div>
                <p className="text-xs text-black font-bold">
                  Dilaksanakan di kediaman wali pihak akhwat atau di kantor resmi Biro Mawaddah. Tidak boleh di tempat hiburan atau tempat yang sepi dari orang lain.
                </p>
              </div>

              <div className="p-5 bg-[#EBF5FE] rounded-2xl border-2 border-[#0284C7] space-y-2">
                <div className="font-black text-black text-sm">Pendamping Wajib</div>
                <p className="text-xs text-black font-bold">
                  Wajib didampingi oleh wali/mahram pihak wanita (ayah/saudara) serta mediator Mawaddah. Tidak diperkenankan ditinggal berduaan di dalam ruangan tertutup.
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#FEF3C7] rounded-xl border-2 border-amber-500 text-xs text-black font-black">
              <strong>Adab Pasca-Nazhar:</strong> Kedua pihak diberikan waktu 1 sampai 3 hari untuk melakukan shalat Istikharah dan bermusyawarah dengan keluarga. Jawaban disampaikan secara tertulis melalui mediator, bukan langsung antara calon.
            </div>
          </div>
        </div>
      )}

      {/* Content Section: 5. Khitbah & Akad */}
      {activeSection === 'khitbah' && (
        <div className="bg-white p-8 rounded-3xl border-2 border-[#0284C7] shadow-depth-lg space-y-6 text-black">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#BAE6FD] text-black flex items-center justify-center font-bold shadow-depth-sm border-2 border-[#0284C7]">
              <HeartHandshake className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-black text-black">
                Tahap Khitbah (Peminangan) hingga Menuju Akad Nikah
              </h2>
              <p className="text-xs text-black font-bold">Mempersiapkan janji suci mitsaqan ghalizha</p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-black leading-relaxed font-bold">
            <p>
              Bila setelah nazhar kedua belah pihak dan keluarga menyatakan mantap, proses selanjutnya adalah <strong className="underline">khitbah (melamar secara resmi)</strong>.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-[#EBF5FE] rounded-2xl border-2 border-[#0284C7]">
                <span className="w-6 h-6 rounded-full bg-[#6EE7B7] text-black font-black flex items-center justify-center text-xs shrink-0 mt-0.5 border border-[#064E3B]">1</span>
                <div>
                  <h4 className="font-black text-black text-xs sm:text-sm">Pertemuan Antar Keluarga</h4>
                  <p className="text-xs text-black font-bold">Keluarga ikhwan berkunjung secara resmi ke rumah keluarga akhwat untuk menyampaikan niat meminang kepada wali.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-[#EBF5FE] rounded-2xl border-2 border-[#0284C7]">
                <span className="w-6 h-6 rounded-full bg-[#FECDD3] text-black font-black flex items-center justify-center text-xs shrink-0 mt-0.5 border border-[#B91C1C]">2</span>
                <div>
                  <h4 className="font-black text-black text-xs sm:text-sm">Haram Meminang Wanita yang Sedang Dipinang</h4>
                  <p className="text-xs text-black font-bold">Ketika khitbah telah diterima, laki-laki lain dilarang meminang akhwat tersebut sesuai sabda Nabi ﷺ hingga ikatan khitbah selesai atau dibatalkan.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-[#EBF5FE] rounded-2xl border-2 border-[#0284C7]">
                <span className="w-6 h-6 rounded-full bg-[#6EE7B7] text-black font-black flex items-center justify-center text-xs shrink-0 mt-0.5 border border-[#064E3B]">3</span>
                <div>
                  <h4 className="font-black text-black text-xs sm:text-sm">Kesepakatan Mahar & Tanggal Akad</h4>
                  <p className="text-xs text-black font-bold">Disepakati mahar yang memuliakan wanita tanpa membebani pria, serta jadwal akad nikah di Kantor Urusan Agama (KUA).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="bg-white text-black p-8 sm:p-10 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-depth-lg border-2 border-[#0284C7]">
        <div>
          <h3 className="font-serif text-2xl sm:text-3xl font-black text-black">Paham dan Siap Menjalani Adab Syar'i?</h3>
          <p className="text-xs sm:text-sm text-black mt-1 max-w-xl font-bold">
            Bergabunglah bersama ratusan ikhwan dan akhwat yang berikhtiar menjemput jodoh sembari menjaga kesucian hati.
          </p>
        </div>
        <button
          onClick={() => setCurrentTab('register')}
          className="btn-depth-red text-black font-black px-7 py-3.5 rounded-2xl transition-all shadow-depth-md shrink-0 flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-black" />
          <span>Isi Formulir Ta'aruf</span>
        </button>
      </div>
    </div>
  );
};
