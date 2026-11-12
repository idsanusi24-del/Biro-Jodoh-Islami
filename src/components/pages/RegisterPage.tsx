import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  CheckCircle2, 
  Sparkles, 
  User, 
  Briefcase, 
  Heart, 
  ShieldCheck, 
  BookOpen, 
  ArrowRight, 
  ArrowLeft,
  Lock,
  AlertCircle,
  Camera,
  Upload,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';
import { ReadinessTimeline, MaritalStatus } from '../../types';

interface RegisterPageProps {
  setCurrentTab: (tab: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ setCurrentTab }) => {
  const { registerNewMember } = useAuth();

  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form State
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState<'ikhwan' | 'akhwat'>('ikhwan');
  const [birthPlace, setBirthPlace] = useState('');
  const [birthDate, setBirthDate] = useState('1998-01-01');
  const [age, setAge] = useState<number>(27);
  const [city, setCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [heightCm, setHeightCm] = useState<number>(170);
  const [weightKg, setWeightKg] = useState<number>(65);

  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus>('single');
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [education, setEducation] = useState('S1 Teknik Informatika');
  const [profession, setProfession] = useState('');
  const [financialNotes, setFinancialNotes] = useState('');

  const [waliName, setWaliName] = useState('');
  const [waliRelation, setWaliRelation] = useState('Ayah Kandung');
  const [waliPhone, setWaliPhone] = useState('');
  const [isWaliReady, setIsWaliReady] = useState(true);

  const [religiousStudy, setReligiousStudy] = useState('');
  const [prayerHabit, setPrayerHabit] = useState('Alhamdulillah menjaga shalat 5 waktu di awal waktu berjamaah di masjid');
  const [quranMemorization, setQuranMemorization] = useState('Juz 30');
  const [isSmoker, setIsSmoker] = useState(false);

  const [marriageVision, setMarriageVision] = useState('');
  const [partnerCriteria, setPartnerCriteria] = useState('');
  const [readinessTimeline, setReadinessTimeline] = useState<ReadinessTimeline>('3_to_6_months');
  const [isPhotoBlurred, setIsPhotoBlurred] = useState(true);
  const [termsAgreed, setTermsAgreed] = useState(false);

  // Photo Upload State
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string>('');
  const [photoFileName, setPhotoFileName] = useState<string>('');
  const [photoUploadError, setPhotoUploadError] = useState<string | null>(null);
  const [previewBlur, setPreviewBlur] = useState<boolean>(true);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoUploadError(null);

    if (!file.type.startsWith('image/')) {
      setPhotoUploadError('Format berkas harus berupa gambar (JPG, PNG, atau WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setPhotoUploadError('Ukuran berkas foto maksimal 5 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 800;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.85);
          setUploadedPhotoUrl(compressed);
          setPhotoFileName(file.name);
        } else {
          setUploadedPhotoUrl(event.target?.result as string);
          setPhotoFileName(file.name);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      setPhotoUploadError('Gagal memproses berkas foto. Silakan coba kembali.');
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setUploadedPhotoUrl('');
    setPhotoFileName('');
    setPhotoUploadError(null);
  };

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleNext = () => {
    setErrorMsg(null);
    if (step === 1) {
      if (!fullName.trim() || !city.trim() || !phoneNumber.trim()) {
        setErrorMsg('Mohon lengkapi Nama Lengkap, Domisili Kota, dan Nomor WhatsApp Anda.');
        return;
      }
    } else if (step === 2) {
      if (!profession.trim() || !education.trim()) {
        setErrorMsg('Mohon lengkapi Pendidikan Terakhir dan Pekerjaan Anda.');
        return;
      }
    } else if (step === 3) {
      if (!waliName.trim() || !waliPhone.trim()) {
        setErrorMsg('Mohon cantumkan Nama Wali / Kontak Keluarga dan Nomor Telepon/WA yang aktif.');
        return;
      }
    } else if (step === 4) {
      if (!religiousStudy.trim()) {
        setErrorMsg('Mohon jelaskan gambaran pemahaman agama atau kajian yang biasa Anda ikuti.');
        return;
      }
    } else if (step === 5) {
      if (!marriageVision.trim() || !partnerCriteria.trim()) {
        setErrorMsg('Mohon isi Visi Pernikahan dan Kriteria Pasangan yang Anda harapkan.');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setErrorMsg(null);
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAgreed) {
      setErrorMsg('Anda wajib menyetujui Pakta Integritas Syar\'i dan Prosedur Ta\'aruf Mawaddah.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg(null);

      const createdUser = await registerNewMember(
        {
          fullName,
          gender,
          email: email || `${fullName.toLowerCase().replace(/\s+/g, '')}@mawaddah.id`,
          phoneNumber,
          city,
          age,
          avatarUrl: uploadedPhotoUrl || undefined,
        },
        {
          birthPlace,
          birthDate,
          heightCm,
          weightKg,
          maritalStatus,
          childrenCount,
          education,
          profession,
          financialNotes,
          waliName,
          waliRelation,
          waliPhone,
          isWaliReady,
          religiousStudy,
          prayerHabit,
          quranMemorization,
          isSmoker,
          marriageVision,
          partnerCriteria,
          readinessTimeline,
          isPhotoBlurred,
          termsAgreed: true
        }
      );

      setSuccessMessage(`Bismillah! Pendaftaran berhasil. Nomor Registrasi Anda: ${createdUser.registrationNumber}`);
      setTimeout(() => {
        setCurrentTab('dashboard');
      }, 2000);
    } catch (err) {
      console.error(err);
      setErrorMsg('Terjadi kendala saat menyimpan pendaftaran. Silakan coba kembali.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-black">
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#064E3B]/80 text-emerald-300 text-xs font-bold border border-emerald-500/40 shadow-depth-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Formulir Pendaftaran Ta'aruf Syar'i</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-black tracking-tight drop-shadow-md">
          Formulir Biodata Calon Pasangan
        </h1>
        <p className="text-xs sm:text-sm text-black font-medium font-normal max-w-xl mx-auto leading-relaxed">
          Isilah biodata ini dengan sebenar-benarnya demi menjaga amanah, barakah, dan keterbukaan di hadapan Allah Ta'ala.
        </p>
      </div>

      {/* Step Indicators */}
      <div className="grid grid-cols-6 gap-2 mb-8">
        {[
          { num: 1, title: 'Identitas Diri' },
          { num: 2, title: 'Pendidikan & Profesi' },
          { num: 3, title: 'Data Wali' },
          { num: 4, title: 'Ibadah & Agama' },
          { num: 5, title: 'Visi & Kriteria' },
          { num: 6, title: 'Pakta Integritas' }
        ].map((item) => (
          <div key={item.num} className="text-center space-y-1">
            <div
              className={`h-2.5 rounded-full transition-all ${
                step === item.num ? 'bg-emerald-400 shadow-sm' : step > item.num ? 'bg-[#064E3B]' : 'bg-white border border-[#0284C7]'
              }`}
            />
            <span className={`hidden sm:inline-block text-[11px] font-bold ${step >= item.num ? 'text-black' : 'text-black font-medium'}`}>
              {item.title}
            </span>
          </div>
        ))}
      </div>

      {/* Main Card Form */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#064E3B]/60 shadow-depth-lg relative text-black">
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-500 text-red-200 text-xs sm:text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-6 rounded-2xl bg-[#064E3B]/90 border border-emerald-400 text-black text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-300 mx-auto" />
            <h3 className="font-serif text-xl font-bold">Alhamdulillah!</h3>
            <p className="text-sm">{successMessage}</p>
            <p className="text-xs text-emerald-200">Mengarahkan ke Dashboard Anda...</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* STEP 1: IDENTITAS DIRI */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="border-b border-[#064E3B]/50 pb-3">
                <h3 className="font-serif text-xl font-bold text-black flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-400" />
                  1. Identitas Dasar Anggota
                </h3>
                <p className="text-xs text-black font-medium">Data ini dilindungi sesuai prinsip syariat dan UU PDP.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-black font-medium">Nama Lengkap & Gelar *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Contoh: Muhammad Ihsan Pratama, S.T."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0284C7] focus:outline-none focus:border-emerald-400 text-sm bg-[#EBF5FE] text-black placeholder:text-stone-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-black font-medium">Jenis Kelamin *</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as 'ikhwan' | 'akhwat')}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0284C7] focus:outline-none focus:border-emerald-400 text-sm bg-[#EBF5FE] text-black"
                  >
                    <option value="ikhwan" className="bg-[#EBF5FE] text-black">Ikhwan (Laki-laki)</option>
                    <option value="akhwat" className="bg-[#EBF5FE] text-black">Akhwat (Perempuan)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-black font-medium">Usia (Tahun) *</label>
                  <input
                    type="number"
                    min="19"
                    max="65"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0284C7] focus:outline-none focus:border-emerald-400 text-sm bg-[#EBF5FE] text-black"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-black font-medium">Tempat Lahir</label>
                  <input
                    type="text"
                    value={birthPlace}
                    onChange={(e) => setBirthPlace(e.target.value)}
                    placeholder="Contoh: Yogyakarta"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0284C7] focus:outline-none focus:border-emerald-400 text-sm bg-[#EBF5FE] text-black placeholder:text-stone-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-black font-medium">Tanggal Lahir</label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0284C7] focus:outline-none focus:border-emerald-400 text-sm bg-[#EBF5FE] text-black"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-black font-medium">Kota Domisili Saat Ini *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Contoh: Jakarta Selatan"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0284C7] focus:outline-none focus:border-emerald-400 text-sm bg-[#EBF5FE] text-black placeholder:text-stone-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-black font-medium">Nomor WhatsApp Aktif *</label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+62 812-XXXX-XXXX"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0284C7] focus:outline-none focus:border-emerald-400 text-sm bg-[#EBF5FE] text-black placeholder:text-stone-500"
                  />
                  <p className="text-[10px] text-black font-medium">Dirahasiakan, hanya digunakan admin/mediator.</p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-black font-medium">Tinggi Badan (cm)</label>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0284C7] focus:outline-none focus:border-emerald-400 text-sm bg-[#EBF5FE] text-black"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-black font-medium">Berat Badan (kg)</label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0284C7] focus:outline-none focus:border-emerald-400 text-sm bg-[#EBF5FE] text-black"
                  />
                </div>
              </div>

              {/* Syar'i Photo Upload Widget */}
              <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-[#EBF5FE] border-2 border-[#0284C7]/80 shadow-depth-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#064E3B]/30 pb-3">
                  <div>
                    <h4 className="font-serif text-base sm:text-lg font-black text-black flex items-center gap-2">
                      <Camera className="w-5 h-5 text-emerald-700" />
                      <span>Upload Pas Foto Peserta (Syar'i)</span>
                    </h4>
                    <p className="text-xs text-black font-medium mt-0.5">
                      Foto diperlukan untuk verifikasi keabsahan berkas oleh mediator dan sesi Nazhar yang disetujui.
                    </p>
                  </div>
                  <span className="text-[11px] bg-emerald-100 text-emerald-900 font-black px-3 py-1 rounded-full border border-emerald-400 shadow-xs w-fit">
                    Dilindungi Kode Etik Syar'i
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Photo Preview Column */}
                  <div className="md:col-span-4 flex flex-col items-center">
                    <div className="relative w-36 h-48 rounded-2xl border-2 border-dashed border-[#0284C7] bg-white overflow-hidden shadow-depth-sm flex items-center justify-center">
                      {uploadedPhotoUrl ? (
                        <>
                          <img
                            src={uploadedPhotoUrl}
                            alt="Foto Peserta"
                            className={`w-full h-full object-cover transition-all duration-300 ${
                              isPhotoBlurred && previewBlur ? 'blur-md scale-105' : ''
                            }`}
                          />
                          {isPhotoBlurred && previewBlur && (
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-2">
                              <Lock className="w-6 h-6 text-emerald-300 mb-1" />
                              <span className="text-[11px] font-black text-white leading-tight">
                                Proteksi Sensor Aktif
                              </span>
                              <span className="text-[9px] text-emerald-100 mt-0.5">
                                Hanya dibuka saat Nazhar
                              </span>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-center p-4 space-y-2">
                          <div className="w-12 h-12 rounded-full bg-[#BEE3FB] mx-auto flex items-center justify-center text-[#0284C7] border border-[#0284C7]/40">
                            <User className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-bold text-black block">
                            Belum Ada Foto
                          </span>
                          <span className="text-[10px] text-black font-medium block leading-tight">
                            Format pas foto formal / setengah badan
                          </span>
                        </div>
                      )}
                    </div>

                    {uploadedPhotoUrl && (
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          type="button"
                          onClick={() => setPreviewBlur(!previewBlur)}
                          className="text-[11px] font-bold text-black hover:text-emerald-800 flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-[#0284C7] shadow-xs transition-colors"
                        >
                          {previewBlur ? (
                            <>
                              <Eye className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Lihat Asli</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5 text-red-600" />
                              <span>Uji Sensor</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="text-[11px] font-bold text-red-700 hover:text-red-900 flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-red-300 shadow-xs transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Hapus</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Upload Controls & Syar'i Criteria */}
                  <div className="md:col-span-8 space-y-4">
                    <div>
                      <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#064E3B] text-white font-bold text-xs sm:text-sm hover:bg-[#075e46] transition-all cursor-pointer shadow-depth-sm active:translate-y-0.5">
                        <Upload className="w-4 h-4 text-emerald-300" />
                        <span>{uploadedPhotoUrl ? 'Ganti Foto Peserta' : 'Pilih Berkas Foto Peserta'}</span>
                        <input
                          type="file"
                          accept="image/png, image/jpeg, image/webp"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                      {photoFileName && (
                        <p className="text-xs font-bold text-emerald-900 mt-2 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 inline shrink-0" />
                          <span>Berkas foto berhasil diunggah: {photoFileName}</span>
                        </p>
                      )}
                      {photoUploadError && (
                        <p className="text-xs font-bold text-red-600 mt-1.5 flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 text-red-600 inline shrink-0" />
                          <span>{photoUploadError}</span>
                        </p>
                      )}
                      <p className="text-[11px] text-black font-medium mt-1">
                        Format didukung: JPG, PNG, WEBP (Otomatis dioptimasi & dienkripsi, maks 5 MB).
                      </p>
                    </div>

                    {/* Syar'i Criteria Info */}
                    <div className="bg-white p-3.5 rounded-xl border border-[#0284C7] space-y-1.5 text-xs text-black shadow-xs">
                      <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        <span>Panduan Foto Sesuai Syariat Islam:</span>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-black font-medium pl-1 leading-snug text-[11px]">
                        <li><strong>Ikhwan:</strong> Berbusana sopan/rapi, menutup aurat, wajah tampak jelas (tanpa kacamata hitam atau masker).</li>
                        <li><strong>Akhwat:</strong> Menutup aurat secara sempurna (jilbab/khimar syar'i rapi), tidak bermakeup/tabarruj berlebihan, tanpa filter kamera buatan.</li>
                        <li><strong>Kerahasiaan Aman:</strong> Foto tidak pernah dipajang di galeri publik terbuka. Foto hanya dapat dilihat oleh kandidat yang telah disetujui ta'aruf oleh mediator.</li>
                      </ul>
                    </div>

                    {/* Quick Privacy Toggle */}
                    <div className="flex items-center gap-3 pt-1">
                      <input
                        type="checkbox"
                        id="photoBlurCheck"
                        checked={isPhotoBlurred}
                        onChange={(e) => setIsPhotoBlurred(e.target.checked)}
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                      />
                      <label htmlFor="photoBlurCheck" className="text-xs font-bold text-black cursor-pointer select-none">
                        Aktifkan Proteksi Sensor Buram Foto (Direkomendasikan demi menjaga privasi syar'i)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: PENDIDIKAN, PROFESI & KELUARGA */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="border-b border-[#064E3B]/50 pb-3">
                <h3 className="font-serif text-xl font-bold text-black flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-emerald-400" />
                  2. Pendidikan, Pekerjaan & Finansial
                </h3>
                <p className="text-xs text-black font-medium">Mencerminkan kesiapan ikhtiar mencari nafkah dan bekal ilmu.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-black font-medium">Pendidikan Terakhir & Jurusan *</label>
                  <input
                    type="text"
                    required
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    placeholder="Contoh: S1 Teknik Informatika (Universitas Indonesia)"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0284C7] focus:outline-none focus:border-emerald-400 text-sm bg-[#EBF5FE] text-black placeholder:text-stone-500"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-black font-medium">Pekerjaan & Bidang Industri *</label>
                  <input
                    type="text"
                    required
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    placeholder="Contoh: Software Engineer di BUMN Finansial / Wirausaha Kuliner"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0284C7] focus:outline-none focus:border-emerald-400 text-sm bg-[#EBF5FE] text-black placeholder:text-stone-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-black font-medium">Status Pernikahan *</label>
                  <select
                    value={maritalStatus}
                    onChange={(e) => setMaritalStatus(e.target.value as MaritalStatus)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0284C7] focus:outline-none focus:border-emerald-400 text-sm bg-[#EBF5FE] text-black"
                  >
                    <option value="single" className="bg-[#EBF5FE] text-black">Lajang (Belum Pernah Menikah)</option>
                    <option value="widowed" className="bg-[#EBF5FE] text-black">Duda / Janda (Ditinggal Wafat)</option>
                    <option value="divorced" className="bg-[#EBF5FE] text-black">Duda / Janda (Cerai Hidup Resmi)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-black font-medium">Status Memiliki Anak</label>
                  <select
                    value={childrenCount}
                    onChange={(e) => setChildrenCount(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0284C7] focus:outline-none focus:border-emerald-400 text-sm bg-[#EBF5FE] text-black"
                  >
                    <option value={0} className="bg-[#EBF5FE] text-black">Belum memiliki anak</option>
                    <option value={1} className="bg-[#EBF5FE] text-black">1 Anak</option>
                    <option value={2} className="bg-[#EBF5FE] text-black">2 Anak</option>
                    <option value={3} className="bg-[#EBF5FE] text-black">3 Anak atau lebih</option>
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-black font-medium">Gambaran Kemandirian Finansial / Tempat Tinggal</label>
                  <textarea
                    rows={3}
                    value={financialNotes}
                    onChange={(e) => setFinancialNotes(e.target.value)}
                    placeholder="Jelaskan secara ringkas kesiapan nafkah lahir, rencana tempat tinggal pasca menikah (mandiri sewa/rumah sendiri), atau tanggungan keluarga jika ada."
                    className="w-full px-4 py-2 rounded-xl border border-[#0284C7] focus:outline-none focus:border-emerald-400 text-sm bg-[#EBF5FE] text-black placeholder:text-stone-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: INFORMASI WALI ATAU KONTAK KELUARGA */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="border-b border-[#064E3B]/50 pb-3">
                <h3 className="font-serif text-xl font-bold text-black flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  3. Informasi Wali Nasab & Keluarga
                </h3>
                <p className="text-xs text-black font-medium">Mawaddah mewajibkan peran wali nasab untuk menjaga adab dan keabsahan pernikahan.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-black font-medium">Nama Lengkap Wali / Orang Tua *</label>
                  <input
                    type="text"
                    required
                    value={waliName}
                    onChange={(e) => setWaliName(e.target.value)}
                    placeholder="Contoh: Drs. H. Bambang Pratama (Ayah Kandung)"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0284C7] focus:outline-none focus:border-emerald-400 text-sm bg-[#EBF5FE] text-black placeholder:text-stone-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-black font-medium">Hubungan Perwalian *</label>
                  <select
                    value={waliRelation}
                    onChange={(e) => setWaliRelation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0284C7] focus:outline-none focus:border-emerald-400 text-sm bg-[#EBF5FE] text-black"
                  >
                    <option value="Ayah Kandung" className="bg-[#EBF5FE] text-black">Ayah Kandung</option>
                    <option value="Kakek dari Pihak Ayah" className="bg-[#EBF5FE] text-black">Kakek dari Pihak Ayah</option>
                    <option value="Saudara Laki-laki Kandung" className="bg-[#EBF5FE] text-black">Saudara Laki-laki Kandung</option>
                    <option value="Paman dari Pihak Ayah" className="bg-[#EBF5FE] text-black">Paman dari Pihak Ayah</option>
                    <option value="Ibu Kandung (Bagi Ikhwan)" className="bg-[#EBF5FE] text-black">Ibu Kandung (Bagi Ikhwan)</option>
                    <option value="Wali Hakim / Pengadilan" className="bg-[#EBF5FE] text-black">Wali Hakim / Pengadilan</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-black font-medium">Nomor Telepon / WhatsApp Wali *</label>
                  <input
                    type="tel"
                    required
                    value={waliPhone}
                    onChange={(e) => setWaliPhone(e.target.value)}
                    placeholder="+62 811-XXXX-XXXX"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0284C7] focus:outline-none focus:border-emerald-400 text-sm bg-[#EBF5FE] text-black placeholder:text-stone-500"
                  />
                </div>

                <div className="sm:col-span-2 pt-2">
                  <label className="flex items-center gap-3 p-4 bg-[#EBF5FE] rounded-xl border border-[#064E3B]/70 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isWaliReady}
                      onChange={(e) => setIsWaliReady(e.target.checked)}
                      className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-400"
                    />
                    <span className="text-xs text-black font-medium font-medium">
                      Saya menyatakan bahwa wali / keluarga telah mengetahui dan merestui ikhtiar ta'aruf saya melalui Biro Mawaddah.
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: KOMITMEN AGAMA & IBADAH */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="border-b border-[#064E3B]/50 pb-3">
                <h3 className="font-serif text-xl font-bold text-black flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-400" />
                  4. Pemahaman Agama & Kebiasaan Ibadah
                </h3>
                <p className="text-xs text-black font-medium">Agama adalah kriteria nomor satu yang ditekankan oleh Rasulullah ﷺ.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-black font-medium">Kebiasaan Shalat 5 Waktu & Ibadah Sunnah *</label>
                  <input
                    type="text"
                    required
                    value={prayerHabit}
                    onChange={(e) => setPrayerHabit(e.target.value)}
                    placeholder="Contoh: Menjaga shalat 5 waktu di awal waktu di masjid (Ikhwan), istiqomah dhuha/tahajjud"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0284C7] focus:outline-none focus:border-emerald-400 text-sm bg-[#EBF5FE] text-black placeholder:text-stone-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-black font-medium">Kajian / Majelis Ilmu yang Diikuti *</label>
                  <textarea
                    rows={3}
                    required
                    value={religiousStudy}
                    onChange={(e) => setReligiousStudy(e.target.value)}
                    placeholder="Contoh: Mengikuti kajian rutin Fikih Islam di Masjid Al-Azhar, manhaj Ahlussunnah wal Jamaah, membaca buku fikih munakahat."
                    className="w-full px-4 py-2 rounded-xl border border-[#0284C7] focus:outline-none focus:border-emerald-400 text-sm bg-[#EBF5FE] text-black placeholder:text-stone-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-black font-medium">Hafalan Al-Qur'an (Opsional)</label>
                    <input
                      type="text"
                      value={quranMemorization}
                      onChange={(e) => setQuranMemorization(e.target.value)}
                      placeholder="Contoh: Juz 30 / 3 Juz / Belum hafal"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#0284C7] focus:outline-none focus:border-emerald-400 text-sm bg-[#EBF5FE] text-black placeholder:text-stone-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-black font-medium">Kebiasaan Merokok *</label>
                    <select
                      value={isSmoker ? 'yes' : 'no'}
                      onChange={(e) => setIsSmoker(e.target.value === 'yes')}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#0284C7] focus:outline-none focus:border-emerald-400 text-sm bg-[#EBF5FE] text-black"
                    >
                      <option value="no" className="bg-[#EBF5FE] text-black">Tidak Merokok Sama Sekali (Bebas Rokok/Vape)</option>
                      <option value="yes" className="bg-[#EBF5FE] text-black">Merokok / Sedang Berproses Berhenti</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: VISI & KRITERIA PASANGAN */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="border-b border-[#064E3B]/50 pb-3">
                <h3 className="font-serif text-xl font-bold text-black flex items-center gap-2">
                  <Heart className="w-5 h-5 text-emerald-400" />
                  5. Visi Pernikahan & Kriteria Pasangan
                </h3>
                <p className="text-xs text-black font-medium">Mencocokkan cita-cita hidup bersama menuju surga.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-black font-medium">Visi & Misi Pernikahan Anda *</label>
                  <textarea
                    rows={3}
                    required
                    value={marriageVision}
                    onChange={(e) => setMarriageVision(e.target.value)}
                    placeholder="Contoh: Membangun rumah tangga sakinah mawaddah wa rahmah yang saling mendukung dalam ibadah, mendidik anak-anak menjadi hafidz Qur'an, dan saling berbakti pada orang tua."
                    className="w-full px-4 py-2 rounded-xl border border-[#0284C7] focus:outline-none focus:border-emerald-400 text-sm bg-[#EBF5FE] text-black placeholder:text-stone-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-black font-medium">Kriteria Calon Pasangan yang Diharapkan *</label>
                  <textarea
                    rows={3}
                    required
                    value={partnerCriteria}
                    onChange={(e) => setPartnerCriteria(e.target.value)}
                    placeholder="Contoh: Rentang usia 23-28 tahun, berakhlak santun, menjaga shalat tepat waktu, berhijab syar'i, tidak merokok, dan siap berdiskusi dengan kepala dingin."
                    className="w-full px-4 py-2 rounded-xl border border-[#0284C7] focus:outline-none focus:border-emerald-400 text-sm bg-[#EBF5FE] text-black placeholder:text-stone-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-black font-medium">Target Kesiapan Menikah *</label>
                    <select
                      value={readinessTimeline}
                      onChange={(e) => setReadinessTimeline(e.target.value as ReadinessTimeline)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#0284C7] focus:outline-none focus:border-emerald-400 text-sm bg-[#EBF5FE] text-black"
                    >
                      <option value="under_3_months" className="bg-[#EBF5FE] text-black">Segera (Kurang dari 3 Bulan)</option>
                      <option value="3_to_6_months" className="bg-[#EBF5FE] text-black">Dalam 3 hingga 6 Bulan</option>
                      <option value="6_to_12_months" className="bg-[#EBF5FE] text-black">Dalam 6 hingga 12 Bulan</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-black font-medium">Pengaturan Privasi Foto *</label>
                    <select
                      value={isPhotoBlurred ? 'blurred' : 'open'}
                      onChange={(e) => setIsPhotoBlurred(e.target.value === 'blurred')}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#0284C7] focus:outline-none focus:border-emerald-400 text-sm bg-[#EBF5FE] text-black"
                    >
                      <option value="blurred" className="bg-[#EBF5FE] text-black">Privat (Buram / Dibuka hanya izin resmi)</option>
                      <option value="open" className="bg-[#EBF5FE] text-black">Terbuka untuk Kandidat Rekomendasi Terpilih</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: PAKTA INTEGRITAS SYAR'I */}
          {step === 6 && (
            <div className="space-y-6">
              <div className="border-b border-[#064E3B]/50 pb-3">
                <h3 className="font-serif text-xl font-bold text-black flex items-center gap-2">
                  <Lock className="w-5 h-5 text-emerald-400" />
                  6. Pakta Integritas Syar'i & Persetujuan
                </h3>
                <p className="text-xs text-black font-medium">Komitmen mutlak untuk menjaga kehormatan dan adab islam.</p>
              </div>

              <div className="bg-[#EBF5FE] p-5 rounded-2xl border border-[#064E3B]/70 text-xs sm:text-sm text-black font-medium space-y-3">
                <h4 className="font-bold text-emerald-300 text-sm">Syarat & Ketentuan Anggota Mawaddah:</h4>
                <ol className="list-decimal list-inside space-y-2 text-black font-medium pl-1 leading-relaxed">
                  <li>Saya bersumpah atas nama Allah Ta'ala bahwa data yang saya isikan adalah benar, akurat, dan tanpa kepalsuan.</li>
                  <li>Saya memahami bahwa Mawaddah BUKAN aplikasi kencan bebas dan saya tidak akan meminta kontak pribadi atau mengajak khalwat di luar mediasi resmi.</li>
                  <li>Saya bersedia melibatkan mediator dan wali nasab dalam setiap sesi tanya jawab dan pertemuan langsung (Nazhar).</li>
                  <li>Saya akan menjaga kerahasiaan lembar biodata calon pasangan yang saya terima dan tidak akan menyebarkannya kepada orang lain.</li>
                  <li>Bila saya merasa tidak cocok dengan calon yang ditawarkan, saya akan menyampaikannya secara beradab dan saling mendoakan kebaikan.</li>
                </ol>
              </div>

              <div className="p-4 bg-[#EBF5FE] rounded-xl border border-emerald-500/70">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={termsAgreed}
                    onChange={(e) => setTermsAgreed(e.target.checked)}
                    className="w-5 h-5 text-emerald-500 rounded focus:ring-emerald-400 mt-0.5"
                  />
                  <span className="text-xs sm:text-sm text-stone-100 font-semibold leading-relaxed">
                    Bismillah, saya menyatakan paham, siap mematuhi seluruh adab syar'i di atas, dan memohon ridho Allah Ta'ala dalam ikhtiar pernikahan ini.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Buttons Navigation */}
          <div className="pt-6 border-t border-[#064E3B]/50 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl border border-[#0284C7] bg-[#EBF5FE] text-black font-medium hover:text-black hover:bg-[#BAE6FD] font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Sebelumnya
              </button>
            ) : <div />}

            {step < 6 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn-depth-emerald px-6 py-2.5 text-black font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-depth-sm transition-all cursor-pointer"
              >
                <span>Lanjutkan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting || !termsAgreed}
                className="btn-depth-red px-8 py-3 disabled:opacity-50 text-black font-bold rounded-xl text-sm flex items-center gap-2 shadow-depth-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>{isSubmitting ? 'Memproses Pendaftaran...' : 'Kirim Pendaftaran Ta\'aruf'}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
