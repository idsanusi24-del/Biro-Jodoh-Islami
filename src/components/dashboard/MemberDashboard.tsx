import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Printer, 
  CreditCard, 
  Calendar, 
  MessageSquare, 
  Eye, 
  EyeOff, 
  Heart, 
  AlertTriangle, 
  Send, 
  Trash2, 
  Sparkles, 
  Lock, 
  ChevronRight, 
  XCircle, 
  FileText,
  Bell,
  Award,
  Check,
  Camera,
  Upload
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TaarufProcess, TaarufMessage } from '../../types';

export const MemberDashboard: React.FC = () => {
  const { 
    currentUser, 
    currentDetail, 
    taarufProcesses, 
    messages, 
    allUsers, 
    allDetails,
    userNotifications,
    respondToMatch, 
    sendMediatedMessage,
    updateMemberDetail,
    updateUserProfile,
    submitNazharDecision,
    markNotificationAsRead
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'profile' | 'card' | 'taaruf' | 'mediation' | 'notifications' | 'privacy'>('taaruf');
  const [showPrintCV, setShowPrintCV] = useState(false);
  const [cvPrintMode, setCvPrintMode] = useState<'curated' | 'full'>('curated');
  const [newTopic, setNewTopic] = useState('Visi Pernikahan & Nilai Hidup');
  const [newMsgContent, setNewMsgContent] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [nazharDecisionNotes, setNazharDecisionNotes] = useState('');
  const [photoUpdateSuccess, setPhotoUpdateSuccess] = useState(false);

  const handleUpdatePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;

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
          updateUserProfile({ avatarUrl: compressed });
          updateMemberDetail({ avatarUrl: compressed });
          setPhotoUpdateSuccess(true);
          setTimeout(() => setPhotoUpdateSuccess(false), 3000);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  if (!currentUser) {
    return null;
  }

  if (!currentDetail) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-white border-2 border-[#0284C7] flex items-center justify-center mx-auto shadow-depth-md">
          <User className="w-8 h-8 text-black" />
        </div>
        <h3 className="font-serif text-2xl font-black text-black">Ahlan wa Sahlan, {currentUser.fullName}</h3>
        <p className="text-sm text-black font-bold leading-relaxed">
          Akun Anda telah berhasil terhubung. Untuk mulai mengajukan ta'aruf, melengkapi data wali, dan mendapatkan rekomendasi calon pasangan, silakan lengkapi formulir biodata syar'i Anda.
        </p>
      </div>
    );
  }

  // Active ta'aruf process for this user
  const activeProcess = taarufProcesses.find(
    p => (p.ikhwanId === currentUser.id || p.akhwatId === currentUser.id) && 
         p.status !== 'stopped_respectfully'
  ) || taarufProcesses.find(
    p => p.ikhwanId === currentUser.id || p.akhwatId === currentUser.id
  );

  const isIkhwan = currentUser.gender === 'ikhwan';
  const partnerId = activeProcess 
    ? (isIkhwan ? activeProcess.akhwatId : activeProcess.ikhwanId) 
    : null;
  const partnerUser = partnerId ? allUsers.find(u => u.id === partnerId) : null;
  const partnerDetail = partnerId ? allDetails[partnerId] : null;

  const processMessages = activeProcess 
    ? messages.filter(m => m.processId === activeProcess.id) 
    : [];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProcess || !newMsgContent.trim()) return;
    setIsSending(true);
    await sendMediatedMessage(activeProcess.id, newTopic, newMsgContent.trim());
    setNewMsgContent('');
    setIsSending(false);
  };

  const handlePostNazharDecision = async (decision: 'lanjut_khitbah' | 'mundur_santun') => {
    if (!activeProcess) return;
    if (decision === 'lanjut_khitbah') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    await submitNazharDecision(activeProcess.id, decision, nazharDecisionNotes || (decision === 'lanjut_khitbah' ? 'Keluarga mantap melanjutkan ke Khitbah' : 'Belum mantap setelah istikharah'));
    setNazharDecisionNotes('');
  };

  const myConsent = activeProcess 
    ? (isIkhwan ? activeProcess.ikhwanConsent : activeProcess.akhwatConsent) 
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner with 3D Banner Depth & Specular Reflection */}
      <div className="bg-gradient-to-r from-[#0B2545] via-[#0A3043] to-[#064E3B] rounded-3xl p-6 sm:p-8 text-black shadow-depth-banner border-t-4 border-[#B91C1C] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-[#064E3B] border-2 border-[#B91C1C] flex items-center justify-center overflow-hidden shrink-0 shadow-depth-md">
            {currentUser.avatarUrl ? (
              <img src={currentUser.avatarUrl} alt={currentUser.fullName} className="w-full h-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-black" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-black text-black drop-shadow-xs">{currentUser.fullName}</h1>
              <span className="text-[11px] bg-[#B91C1C] text-black font-black px-2.5 py-0.5 rounded-full shadow-depth-sm border border-red-400/40">
                {currentUser.registrationNumber}
              </span>
            </div>
            <p className="text-xs text-black font-medium mt-1 font-medium">
              {currentUser.city} • {currentUser.age} Tahun • {currentDetail.profession}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 shadow-2xs ${
                currentUser.verificationStatus === 'verified'
                  ? 'bg-[#064E3B] text-black border border-emerald-400/50'
                  : 'bg-[#B91C1C] text-black'
              }`}>
                <ShieldCheck className="w-3.5 h-3.5" />
                Status: {currentUser.verificationStatus === 'verified' ? 'Terverifikasi Resmi' : 'Menunggu Verifikasi Berkas'}
              </span>
              <span className="text-xs text-emerald-200 font-bold">• Restu Wali: Terkonfirmasi</span>
            </div>
          </div>
        </div>

        {/* Quick Actions with Tactile 3D Buttons */}
        <div className="flex flex-wrap items-center gap-2 relative z-10">
          <button
            onClick={() => setShowPrintCV(true)}
            className="px-4 py-2 bg-[#064E3B] hover:bg-[#043729] text-black rounded-xl text-xs font-black flex items-center gap-2 border border-emerald-500/50 btn-depth-emerald transition-all"
          >
            <Printer className="w-4 h-4 text-emerald-300" />
            Cetak CV Ta'aruf Standar
          </button>
          <button
            onClick={() => setActiveTab('card')}
            className="px-4 py-2 bg-[#B91C1C] hover:bg-[#991B1B] text-black rounded-xl text-xs font-black flex items-center gap-2 btn-depth-red transition-all"
          >
            <CreditCard className="w-4 h-4 text-black" />
            Kartu Anggota Digital
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#064E3B]/50 pb-3">
        {[
          { id: 'taaruf', label: 'Ajuan & Status Ta\'aruf', icon: Heart },
          { id: 'mediation', label: 'Ruang Mediasi Terarah', icon: MessageSquare },
          { id: 'profile', label: 'Biodata Lengkap Saya', icon: User },
          { id: 'card', label: 'Kartu Anggota Digital', icon: CreditCard },
          { id: 'notifications', label: 'Pusat Notifikasi', icon: Bell, count: userNotifications.filter(n => !n.isRead).length },
          { id: 'privacy', label: 'Privasi & Hapus Akun', icon: Lock },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#064E3B] text-black shadow-depth-sm border-b-2 border-[#B91C1C]'
                  : 'bg-white text-black font-medium hover:text-black hover:bg-[#EBF5FE] border border-[#064E3B]/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {Boolean(tab.count) && (
                <span className="px-2 py-0.2 rounded-full text-[10px] font-black bg-[#B91C1C] text-black">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: 1. AJUAN & STATUS TA'ARUF */}
      {activeTab === 'taaruf' && (
        <div className="space-y-6">
          {activeProcess ? (
            <div className="space-y-6">
              {/* Special Khitbah Celebration Banner */}
              {activeProcess.status === 'khitbah_proceeding' && (
                <div className="bg-white text-black p-6 sm:p-8 rounded-3xl shadow-depth-lg border-2 border-amber-400 text-center space-y-3">
                  <Sparkles className="w-10 h-10 mx-auto text-amber-300" />
                  <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-amber-300">
                    بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
                  </h3>
                  <p className="font-bold text-sm sm:text-base text-black">
                    Alhamdulillah, Barakallah! Tahap Khitbah (Peminangan Resmi) Sedang Berlangsung
                  </p>
                  <p className="text-xs max-w-xl mx-auto leading-relaxed text-black font-medium">
                    Kedua belah pihak dan keluarga besar telah menyatakan kemantapan hati pasca-nazhar. Semoga Allah Ta'ala memudahkan langkah menuju ikrar suci akad nikah.
                  </p>
                </div>
              )}

              {/* Process Status Ribbon */}
              <div className="bg-white p-6 rounded-2xl border border-[#064E3B]/60 shadow-depth-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-black">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-[#EBF5FE] px-3 py-1 rounded-full border border-amber-500/40">
                    Kasus #{activeProcess.id}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-black mt-2">
                    Tahapan Saat Ini: {
                      activeProcess.status === 'proposed_by_admin' ? 'Tawaran Rekomendasi Admin (Tinjau Biodata Anonim)' :
                      activeProcess.status === 'approved_by_both' ? 'Kedua Pihak Ridho Lanjut ke Mediasi' :
                      activeProcess.status === 'active_mediation' ? 'Sesi Tanya Jawab Resmi Dipandu Mediator' :
                      activeProcess.status === 'nazhar_scheduled' ? 'Jadwal Nazhar Tatap Muka Bersama Mahram' :
                      activeProcess.status === 'khitbah_proceeding' ? 'Tahap Khitbah & Persiapan Akad' :
                      activeProcess.status === 'completed_nikah' ? 'Barakallah, Telah Menikah' :
                      'Proses Dihentikan dengan Santun'
                    }
                  </h3>
                  <p className="text-xs text-black font-medium mt-1">
                    Dipandu oleh: <span className="font-bold text-emerald-300">Ust. Salman Al-Farisi, S.Sos.I (Mediator)</span>
                  </p>
                </div>

                {activeProcess.matchScore && (
                  <div className="bg-[#EBF5FE] px-5 py-2.5 rounded-xl border border-[#064E3B] text-center shadow-depth-sm">
                    <div className="text-xs text-emerald-300 font-medium">Skor Kecocokan Kriteria</div>
                    <div className="font-serif text-2xl font-bold text-black">{activeProcess.matchScore}%</div>
                  </div>
                )}
              </div>

              {/* Match Candidate Anonymous CV Card with Elevated Depth */}
              {partnerUser && partnerDetail && (
                <div className="bg-white rounded-3xl border-2 border-[#064E3B]/60 shadow-depth-lg overflow-hidden text-black">
                  <div className="bg-[#EBF5FE] text-black p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#064E3B]/60">
                    <div>
                      <div className="text-xs text-red-400 font-bold tracking-wide">
                        LEMBAR BIODATA RINGKAS TERKURASI (SYAR'I)
                      </div>
                      <h4 className="font-serif text-2xl font-black text-black mt-1 drop-shadow-sm">
                        Kandidat Calon {partnerUser.gender === 'ikhwan' ? 'Suami (Ikhwan)' : 'Istri (Akhwat)'} #{partnerUser.registrationNumber}
                      </h4>
                      <p className="text-xs text-black font-medium mt-0.5 font-medium">
                        {partnerUser.city} • {partnerUser.age} Tahun • {partnerDetail.maritalStatus === 'single' ? 'Lajang' : 'Pernah Menikah'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 bg-[#BAE6FD] px-3.5 py-2 rounded-xl text-xs text-black font-medium border border-[#064E3B]">
                      <Lock className="w-4 h-4 text-red-400 shrink-0" />
                      <span className="font-medium">Kontak & detail sensitif dirahasiakan oleh sistem Mawaddah</span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
                      <div className="space-y-4">
                        <div className="p-4 bg-[#EBF5FE] rounded-xl border border-[#064E3B]/50 shadow-depth-sm">
                          <span className="text-black font-medium font-bold block">Pendidikan & Pekerjaan:</span>
                          <span className="font-black text-black text-base">{partnerDetail.education}</span>
                          <p className="text-black font-medium mt-1 font-medium">{partnerDetail.profession}</p>
                        </div>

                        <div className="p-4 bg-[#EBF5FE] rounded-xl border border-[#064E3B]/50 shadow-depth-sm">
                          <span className="text-black font-medium font-bold block">Komitmen Agama & Ibadah:</span>
                          <p className="font-bold text-emerald-300 mt-1 text-sm">{partnerDetail.prayerHabit}</p>
                          <p className="text-black font-medium mt-1 font-medium">Kajian: {partnerDetail.religiousStudy}</p>
                          {partnerDetail.quranMemorization && (
                            <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-[#064E3B] text-emerald-200 font-black text-[11px] border border-emerald-400/30 shadow-depth-sm">
                              Hafalan Qur'an: {partnerDetail.quranMemorization}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 bg-[#EBF5FE] rounded-xl border border-[#064E3B]/50 shadow-depth-sm">
                          <span className="text-black font-medium font-bold block">Visi & Cita-cita Rumah Tangga:</span>
                          <p className="text-black font-medium italic mt-1 leading-relaxed font-normal">
                            "{partnerDetail.marriageVision}"
                          </p>
                        </div>

                        <div className="p-4 bg-[#EBF5FE] rounded-xl border border-[#064E3B]/50 shadow-depth-sm">
                          <span className="text-black font-medium font-bold block">Kriteria Calon yang Diharapkan:</span>
                          <p className="text-black font-medium mt-1 font-medium">{partnerDetail.partnerCriteria}</p>
                          <div className="mt-2 text-[11px] text-red-400 font-black">
                            Target Waktu Menikah: {
                              partnerDetail.readinessTimeline === 'under_3_months' ? '< 3 Bulan' :
                              partnerDetail.readinessTimeline === '3_to_6_months' ? '3 - 6 Bulan' : '6 - 12 Bulan'
                            }
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Alasan Kecocokan dari Admin */}
                    {activeProcess.matchReasons && activeProcess.matchReasons.length > 0 && (
                      <div className="p-4 bg-[#EBF5FE] rounded-2xl border border-[#064E3B]/70 space-y-2 shadow-depth-sm">
                        <div className="font-bold text-emerald-300 text-xs flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-emerald-400" />
                          Catatan Pertimbangan Kecocokan oleh Admin:
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-black font-medium">
                          {activeProcess.matchReasons.map((reason, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span className="font-medium">{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Consent Actions with Tactile 3D Buttons */}
                    <div className="pt-4 border-t border-[#064E3B]/50">
                      {myConsent === null ? (
                        <div className="space-y-3">
                          <p className="text-xs text-black font-medium font-normal">
                            Silakan pelajari lembar biodata di atas dengan seksama dan laksanakan shalat Istikharah. Nyatakan persetujuan Anda untuk melangkah ke sesi tanya jawab terarah dipandu mediator.
                          </p>
                          <div className="flex flex-wrap items-center gap-3">
                            <button
                              onClick={() => respondToMatch(activeProcess.id, true)}
                              className="btn-depth-emerald px-6 py-3 text-black font-black rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                              <span>Bismillah, Bersedia Lanjut ke Mediasi</span>
                            </button>
                            <button
                              onClick={() => respondToMatch(activeProcess.id, false)}
                              className="px-6 py-3 bg-[#EBF5FE] hover:bg-[#BAE6FD] text-black font-medium hover:text-red-400 border-2 border-[#0284C7] hover:border-red-400 rounded-xl text-xs sm:text-sm font-bold shadow-depth-sm transition-all cursor-pointer"
                            >
                              <XCircle className="w-4 h-4 text-red-400" />
                              <span>Belum Mantap (Tolak Secara Santun)</span>
                            </button>
                          </div>
                        </div>
                      ) : myConsent === true ? (
                        <div className="p-4 bg-[#EBF5FE] rounded-xl border border-emerald-400/50 flex items-center justify-between gap-4 shadow-depth-sm">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                            <div>
                              <div className="font-bold text-xs sm:text-sm text-black">
                                Anda Telah Memberikan Persetujuan (Bismillah)
                              </div>
                              <p className="text-[11px] text-emerald-300">
                                {partnerUser.fullName.split(' ')[0]} juga telah menyetujui. Sesi mediasi telah dibuka!
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => setActiveTab('mediation')}
                            className="btn-depth-emerald px-4 py-2 text-black rounded-lg text-xs font-bold shrink-0 cursor-pointer"
                          >
                            Masuk Ruang Mediasi
                          </button>
                        </div>
                      ) : (
                        <div className="p-4 bg-[#EBF5FE] rounded-xl text-xs text-black font-medium flex items-center gap-2 border border-[#0284C7]">
                          <XCircle className="w-4 h-4 text-black font-medium" />
                          <span>Anda telah menolak penawaran ini dengan adab santun. Admin akan mencarikan kandidat lain yang lebih selaras.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Nazhar Schedule Card and Decision Console */}
              {activeProcess.nazharDate && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-400/70 space-y-4 text-black shadow-depth-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                      <Calendar className="w-5 h-5 text-amber-400" />
                      <span>Jadwal Pertemuan Nazhar (Tatap Muka Resmi Didampingi Wali)</span>
                    </div>
                    <span className="px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/40 rounded-full text-xs font-bold">
                      Didampingi Mahram
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-black font-medium pt-2">
                    <div>
                      <span className="text-black font-medium block">Tanggal & Waktu:</span>
                      <span className="font-bold text-sm text-black">{activeProcess.nazharDate} • {activeProcess.nazharTime || '10:00 WIB'}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-black font-medium block">Tempat Pelaksanaan Nazhar:</span>
                      <span className="font-bold text-sm text-black">{activeProcess.nazharLocation}</span>
                    </div>
                  </div>

                  {/* Post Nazhar Decision Action (if in nazhar_scheduled state) */}
                  {activeProcess.status === 'nazhar_scheduled' && (
                    <div className="pt-4 border-t border-[#064E3B]/50 space-y-3">
                      <div className="font-bold text-xs text-amber-300">
                        Hasil Evaluasi Pasca-Nazhar (Setelah Shalat Istikharah):
                      </div>
                      <p className="text-[11px] text-black font-medium">
                        Apakah setelah pertemuan tatap muka didampingi wali terdapat kemantapan hati untuk melangkah ke Khitbah (Peminangan resmi)?
                      </p>

                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => handlePostNazharDecision('lanjut_khitbah')}
                          className="btn-depth-emerald px-5 py-2.5 text-black font-bold rounded-xl text-xs flex items-center gap-2 shadow-depth-sm cursor-pointer"
                        >
                          <Check className="w-4 h-4 text-emerald-200" />
                          <span>Bismillah, Mantap Lanjut ke Khitbah</span>
                        </button>
                        <button
                          onClick={() => handlePostNazharDecision('mundur_santun')}
                          className="px-4 py-2.5 bg-[#EBF5FE] hover:bg-[#BAE6FD] text-black font-medium hover:text-red-400 border border-[#0284C7] hover:border-red-400 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <XCircle className="w-4 h-4 text-red-400" />
                          <span>Belum Mantap (Mundur Secara Santun)</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl border border-[#064E3B]/60 text-center space-y-4 text-black shadow-depth-md">
              <div className="w-16 h-16 rounded-full bg-[#EBF5FE] text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-depth-sm">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-black">
                Belum Ada Kasus Ta'aruf Aktif
              </h3>
              <p className="text-xs sm:text-sm text-black font-medium max-w-md mx-auto leading-relaxed">
                Admin sedang menelaah profil Anda dan mencocokkan kriteria dengan kandidat yang selaras. Anda akan menerima notifikasi segera saat rekomendasi siap.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: 2. RUANG MEDIASI TERARAH */}
      {activeTab === 'mediation' && (
        <div className="bg-white rounded-3xl border border-[#064E3B]/60 shadow-depth-lg overflow-hidden flex flex-col h-[700px] text-black">
          {/* Header */}
          <div className="bg-[#EBF5FE] text-black p-5 flex items-center justify-between border-b border-[#064E3B]/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#064E3B] text-emerald-300 flex items-center justify-center font-bold shadow-depth-sm border border-emerald-400/40">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-black">
                  Ruang Mediasi Syar'i Resmi
                </h3>
                <p className="text-xs text-black font-medium">
                  Dipandu Mediator: Ust. Salman Al-Farisi (Semua percakapan dipantau & diawasi)
                </p>
              </div>
            </div>

            <div className="text-xs bg-[#BAE6FD] text-emerald-300 px-3.5 py-1.5 rounded-xl border border-emerald-500/40 flex items-center gap-1.5 font-medium shadow-depth-sm">
              <Lock className="w-3.5 h-3.5 text-red-400" />
              <span>Bukan Chat Bebas</span>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#EBF5FE]">
            {processMessages.map((msg) => {
              const isMine = msg.senderId === currentUser.id;
              const isMediator = msg.senderRole === 'mediator' || msg.senderRole === 'admin';

              return (
                <div
                  key={msg.id}
                  className={`p-4 rounded-2xl max-w-2xl text-xs sm:text-sm space-y-2 shadow-depth-sm ${
                    isMediator
                      ? 'bg-white border border-amber-400/60 mx-auto text-amber-200 w-full'
                      : isMine
                      ? 'bg-[#064E3B] text-black ml-auto border border-emerald-400/50'
                      : 'bg-white text-black font-medium mr-auto border border-blue-400/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-1.5 text-[11px] opacity-80">
                    <span className="font-bold flex items-center gap-1.5">
                      {isMediator && <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
                      {msg.senderName}
                    </span>
                    <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>

                  <div className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/10 text-emerald-300">
                    Topik: {msg.topic}
                  </div>

                  <p className="leading-relaxed whitespace-pre-wrap text-black">{msg.content}</p>
                </div>
              );
            })}
          </div>

          {/* Supervised Input */}
          <form onSubmit={handleSendMessage} className="p-4 bg-[#EBF5FE] border-t border-[#064E3B]/60 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-black font-medium">Pilih Topik Diskusi Syar'i:</span>
              <select
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-[#0284C7] bg-white text-black text-xs font-medium focus:outline-none focus:border-emerald-400"
              >
                <option value="Visi Pernikahan & Nilai Hidup" className="bg-white text-black">Visi Pernikahan & Nilai Hidup</option>
                <option value="Domisili Pasca Menikah" className="bg-white text-black">Domisili Pasca Menikah</option>
                <option value="Pekerjaan, Nafkah & Kemandirian" className="bg-white text-black">Pekerjaan, Nafkah & Kemandirian</option>
                <option value="Pola Asuh & Pendidikan Anak" className="bg-white text-black">Pola Asuh & Pendidikan Anak</option>
                <option value="Hubungan dengan Orang Tua & Mertua" className="bg-white text-black">Hubungan dengan Orang Tua & Mertua</option>
                <option value="Kesiapan Waktu & Persiapan Nazhar" className="bg-white text-black">Kesiapan Waktu & Persiapan Nazhar</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                required
                value={newMsgContent}
                onChange={(e) => setNewMsgContent(e.target.value)}
                placeholder="Tuliskan pertanyaan / tanggapan dengan bahasa yang santun dan lugas..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#0284C7] bg-white text-black placeholder:text-black font-medium text-xs sm:text-sm focus:outline-none focus:border-emerald-400"
              />
              <button
                type="submit"
                disabled={isSending || !newMsgContent.trim()}
                className="btn-depth-emerald px-5 py-2.5 disabled:opacity-50 text-black font-bold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Kirim</span>
              </button>
            </div>
            <p className="text-[10px] text-black font-medium">
              Pengingat: Dilarang menggunakan panggilan mesra atau bertukar nomor pribadi tanpa seizin mediator.
            </p>
          </form>
        </div>
      )}

      {/* TAB CONTENT: 3. BIODATA LENGKAP SAYA */}
      {activeTab === 'profile' && (
        <div className="bg-white p-8 rounded-3xl border border-[#064E3B]/60 shadow-depth-md space-y-6 text-black">
          <div className="flex items-center justify-between border-b border-[#064E3B]/50 pb-4">
            <div>
              <h3 className="font-serif text-2xl font-bold text-black">Biodata Lengkap Anggota</h3>
              <p className="text-xs text-black font-medium">Data tersimpan aman di database Mawaddah.</p>
            </div>
            <button
              onClick={() => setShowPrintCV(true)}
              className="btn-depth-emerald px-4 py-2 text-black rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Pratinjau / Cetak CV Ta'aruf</span>
            </button>
          </div>

          {/* Official Photo Card in Member Biodata */}
          <div className="p-6 rounded-2xl bg-[#EBF5FE] border-2 border-[#0284C7]/80 shadow-depth-sm flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-32 h-44 rounded-2xl border-2 border-[#064E3B] bg-white overflow-hidden shadow-depth-sm shrink-0 flex items-center justify-center">
              {currentUser.avatarUrl ? (
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-3">
                  <User className="w-10 h-10 text-stone-400 mx-auto" />
                  <span className="text-[10px] text-stone-500 block mt-1">Belum Ada Foto</span>
                </div>
              )}
            </div>

            <div className="space-y-2 flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-400 text-xs font-black">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Pas Foto Profil Syar'i Terdaftar</span>
                </span>
                <span className="text-xs bg-white text-black font-semibold px-2.5 py-0.5 rounded-full border border-[#0284C7]">
                  {currentUser.gender === 'ikhwan' ? 'Ikhwan' : 'Akhwat'} • {currentUser.age} Th
                </span>
              </div>

              <h4 className="font-serif text-xl font-black text-black">{currentUser.fullName}</h4>
              <div className="text-xs text-black font-semibold">
                Email Login Akun: <span className="font-mono text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{currentUser.email}</span>
              </div>
              <div className="text-xs text-black font-medium">
                Status Sensor Privasi ke Calon Lain: <strong className={currentDetail.isPhotoBlurred ? 'text-amber-800' : 'text-emerald-800'}>
                  {currentDetail.isPhotoBlurred ? 'Aktif (Foto diburamkan, hanya dibuka saat Nazhar resmi)' : 'Terbuka'}
                </strong>
              </div>

              {/* Action buttons: Change Photo & Toggle Blur */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
                <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#064E3B] text-white font-bold text-xs hover:bg-[#075e46] transition-all cursor-pointer shadow-depth-sm">
                  <Upload className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{currentUser.avatarUrl ? 'Ganti Pas Foto' : 'Unggah Pas Foto'}</span>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleUpdatePhoto}
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => updateMemberDetail({ isPhotoBlurred: !currentDetail.isPhotoBlurred })}
                  className="px-3.5 py-2 rounded-xl border border-[#0284C7] bg-white text-black font-bold text-xs hover:bg-[#BAE6FD] transition-colors cursor-pointer shadow-xs"
                >
                  {currentDetail.isPhotoBlurred ? 'Buka Sensor Buram' : 'Aktifkan Sensor Buram'}
                </button>
              </div>

              {photoUpdateSuccess && (
                <p className="text-xs font-bold text-emerald-800 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                  <span>Alhamdulillah! Foto profil berhasil diperbarui.</span>
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="space-y-3">
              <h4 className="font-bold text-emerald-300 uppercase tracking-wider text-xs border-b border-[#064E3B]/50 pb-1">
                Data Pribadi & Keluarga
              </h4>
              <div><span className="text-black font-medium block">Nama Lengkap:</span> <span className="font-bold text-black">{currentUser.fullName}</span></div>
              <div><span className="text-black font-medium block">Jenis Kelamin:</span> <span className="text-black font-medium">{currentUser.gender === 'ikhwan' ? 'Ikhwan (Laki-laki)' : 'Akhwat (Perempuan)'}</span></div>
              <div><span className="text-black font-medium block">TTL / Usia:</span> <span className="text-black font-medium">{currentDetail.birthPlace}, {currentDetail.birthDate} ({currentUser.age} Tahun)</span></div>
              <div><span className="text-black font-medium block">Domisili:</span> <span className="text-black font-medium">{currentUser.city}</span></div>
              <div><span className="text-black font-medium block">Tinggi / Berat:</span> <span className="text-black font-medium">{currentDetail.heightCm} cm / {currentDetail.weightKg} kg</span></div>
              <div><span className="text-black font-medium block">Status:</span> <span className="text-black font-medium">{currentDetail.maritalStatus === 'single' ? 'Lajang' : 'Pernah Menikah'} ({currentDetail.childrenCount} Anak)</span></div>
              <div><span className="text-black font-medium block">Wali Nasab:</span> <span className="text-black font-medium">{currentDetail.waliName} ({currentDetail.waliRelation})</span></div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-emerald-300 uppercase tracking-wider text-xs border-b border-[#064E3B]/50 pb-1">
                Pendidikan, Profesi & Agama
              </h4>
              <div><span className="text-black font-medium block">Pendidikan:</span> <span className="text-black font-medium">{currentDetail.education}</span></div>
              <div><span className="text-black font-medium block">Profesi:</span> <span className="text-black font-medium">{currentDetail.profession}</span></div>
              <div><span className="text-black font-medium block">Ibadah Shalat:</span> <span className="text-black font-medium">{currentDetail.prayerHabit}</span></div>
              <div><span className="text-black font-medium block">Kajian Rutin:</span> <span className="text-black font-medium">{currentDetail.religiousStudy}</span></div>
              <div><span className="text-black font-medium block">Hafalan Qur'an:</span> <span className="text-black font-medium">{currentDetail.quranMemorization || 'Belum ada'}</span></div>
              <div><span className="text-black font-medium block">Merokok:</span> <span className="text-black font-medium">{currentDetail.isSmoker ? 'Ya' : 'Tidak Merokok'}</span></div>
              <div><span className="text-black font-medium block">Target Waktu Menikah:</span> <span className="text-black font-medium">{
                currentDetail.readinessTimeline === 'under_3_months' ? '< 3 Bulan' :
                currentDetail.readinessTimeline === '3_to_6_months' ? '3 - 6 Bulan' : '6 - 12 Bulan'
              }</span></div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 4. KARTU ANGGOTA DIGITAL */}
      {activeTab === 'card' && (
        <div className="space-y-6">
          <div className="max-w-md mx-auto bg-gradient-to-br from-[#07192E] via-[#0B2545] to-[#064E3B] rounded-3xl p-6 text-black shadow-depth-lg border-2 border-emerald-400/60 relative overflow-hidden">
            {/* Top gold header */}
            <div className="flex items-center justify-between border-b border-[#064E3B]/60 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#064E3B] text-emerald-200 flex items-center justify-center font-bold border border-emerald-400/40">
                  M
                </div>
                <div>
                  <div className="font-serif font-bold text-sm tracking-wide text-black">MAWADDAH</div>
                  <div className="text-[9px] text-emerald-300">BIRO TA'ARUF ISLAMI</div>
                </div>
              </div>
              <span className="text-xs font-serif italic text-emerald-300">مَوَدَّة</span>
            </div>

            {/* Card Body */}
            <div className="py-6 flex items-center gap-4">
              <div className="w-20 h-24 rounded-2xl bg-[#064E3B] border-2 border-emerald-400/60 flex items-center justify-center overflow-hidden shrink-0 shadow-depth-sm">
                {currentUser.avatarUrl ? (
                  <img src={currentUser.avatarUrl} alt={currentUser.fullName} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-emerald-200" />
                )}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold block">
                  KARTU TANDA ANGGOTA RESMI
                </span>
                <h4 className="font-serif text-lg font-bold text-black line-clamp-1">{currentUser.fullName}</h4>
                <div className="text-xs font-mono text-emerald-200">{currentUser.registrationNumber}</div>
                <div className="text-[11px] text-black font-medium">
                  {currentUser.gender === 'ikhwan' ? 'Ikhwan' : 'Akhwat'} • {currentUser.city}
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="border-t border-[#064E3B]/60 pt-3 flex items-center justify-between text-[10px] text-emerald-300">
              <div>
                <div>Status: <span className="text-emerald-200 font-bold">TERVERIFIKASI SYAR'I</span></div>
                <div>Berlaku Hingga: 2027</div>
              </div>
              <div className="text-right font-mono bg-[#BAE6FD] px-2 py-1 rounded border border-[#064E3B] text-emerald-300">
                VERIFIED ID
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-black font-medium">
            Kartu digital ini merupakan identitas resmi kepesertaan Ta'aruf Syar'i di Biro Mawaddah.
          </div>
        </div>
      )}

      {/* TAB CONTENT: 5. PUSAT NOTIFIKASI */}
      {activeTab === 'notifications' && (
        <div className="bg-white p-8 rounded-3xl border border-[#064E3B]/60 shadow-depth-md space-y-6 text-black">
          <div className="flex items-center justify-between border-b border-[#064E3B]/50 pb-4">
            <div>
              <h3 className="font-serif text-2xl font-bold text-black">Pusat Notifikasi Anggota</h3>
              <p className="text-xs text-black font-medium">Seluruh riwayat perkembangan proses ta'aruf dan status pendaftaran Anda.</p>
            </div>
            <span className="text-xs bg-[#064E3B] text-emerald-200 font-bold px-3 py-1 rounded-full border border-emerald-400/40">
              {userNotifications.length} Pesan
            </span>
          </div>

          <div className="divide-y divide-[#064E3B]/40">
            {userNotifications.length === 0 ? (
              <div className="py-8 text-center text-xs text-black font-medium">
                Belum ada notifikasi yang tersimpan.
              </div>
            ) : (
              userNotifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markNotificationAsRead(notif.id)}
                  className={`py-4 flex items-start justify-between gap-4 cursor-pointer hover:bg-white/5 p-3 rounded-xl transition-colors ${
                    !notif.isRead ? 'bg-[#EBF5FE]' : ''
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-xs sm:text-sm ${!notif.isRead ? 'text-black' : 'text-black font-medium'}`}>
                        {notif.title}
                      </span>
                      {!notif.isRead && (
                        <span className="text-[10px] bg-[#B91C1C] text-black font-bold px-2 py-0.2 rounded-full">
                          BARU
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-black font-medium leading-relaxed">{notif.message}</p>
                    <div className="text-[10px] text-black font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-400" />
                      {new Date(notif.createdAt).toLocaleDateString([], { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: 6. PRIVASI & HAPUS AKUN */}
      {activeTab === 'privacy' && (
        <div className="bg-white p-8 rounded-3xl border border-[#064E3B]/60 shadow-depth-md space-y-6 text-black">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-black">Pengaturan Privasi & Retensi Data</h3>
            <p className="text-xs text-black font-medium">Sesuai UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP).</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-[#EBF5FE] rounded-2xl border border-[#064E3B]/60 flex items-center justify-between gap-4">
              <div>
                <div className="font-bold text-xs sm:text-sm text-black">Privasi Foto Profil</div>
                <p className="text-xs text-black font-medium">Foto diburamkan secara otomatis dan hanya dibuka atas izin resmi Anda.</p>
              </div>
              <button
                onClick={() => updateMemberDetail({ isPhotoBlurred: !currentDetail.isPhotoBlurred })}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  currentDetail.isPhotoBlurred ? 'btn-depth-emerald text-black' : 'bg-white text-black font-medium border border-[#0284C7]'
                }`}
              >
                {currentDetail.isPhotoBlurred ? 'Foto Diburamkan (Aktif)' : 'Foto Terbuka'}
              </button>
            </div>

            <div className="p-4 bg-[#FECDD3]/40 rounded-2xl border border-red-500/60 space-y-3">
              <div className="font-bold text-xs sm:text-sm text-red-300 flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-red-400" />
                <span>Pengajuan Penghapusan Akun & Biodata (Right to be Forgotten)</span>
              </div>
              <p className="text-xs text-black font-medium leading-relaxed">
                Bila Anda telah menikah di luar biro atau memutuskan untuk tidak melanjutkan ikhtiar ta'aruf, Anda berhak mengajukan penghapusan seluruh riwayat biodata Anda dari sistem Mawaddah.
              </p>
              <button
                onClick={() => {
                  if (confirm('Apakah Anda yakin ingin mengajukan penutupan dan penghapusan akun Anda secara permanen?')) {
                    alert('Permohonan penghapusan akun telah dicatat. Data Anda akan dibersihkan dalam 1x24 jam.');
                  }
                }}
                className="btn-depth-red px-4 py-2 text-black rounded-xl text-xs font-bold cursor-pointer"
              >
                Ajukan Penghapusan Akun Saya
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PRINT CV TA'ARUF STANDAR */}
      {showPrintCV && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border-2 border-[#064E3B] rounded-3xl max-w-3xl w-full p-8 shadow-depth-lg space-y-6 my-8 max-h-[90vh] overflow-y-auto text-black">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#064E3B]/60 pb-4">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-emerald-400" />
                <h3 className="font-serif text-xl font-bold text-black">
                  Pratinjau Lembar CV Ta'aruf Standar
                </h3>
              </div>

              {/* Version Toggle */}
              <div className="flex items-center gap-1 bg-[#EBF5FE] p-1 rounded-xl text-xs border border-[#0284C7]">
                <button
                  onClick={() => setCvPrintMode('curated')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    cvPrintMode === 'curated'
                      ? 'bg-[#064E3B] text-black shadow-depth-sm'
                      : 'text-black font-medium hover:text-black'
                  }`}
                >
                  Versi Anonim (Standar Biro)
                </button>
                <button
                  onClick={() => setCvPrintMode('full')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    cvPrintMode === 'full'
                      ? 'bg-[#064E3B] text-black shadow-depth-sm'
                      : 'text-black font-medium hover:text-black'
                  }`}
                >
                  Versi Lengkap (Arsip Pribadi)
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="btn-depth-emerald px-4 py-2 text-black rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak / PDF</span>
                </button>
                <button
                  onClick={() => setShowPrintCV(false)}
                  className="px-3.5 py-2 border border-[#0284C7] bg-[#EBF5FE] rounded-lg text-xs font-semibold text-black font-medium hover:text-black hover:bg-[#BAE6FD] cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>

            {/* Print Sheet Format */}
            <div className="p-8 border border-[#064E3B]/70 rounded-2xl space-y-6 text-xs sm:text-sm bg-[#EBF5FE] relative print-container text-black font-medium">
              {/* Syari Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 rotate-[-30deg]">
                <span className="font-serif text-6xl font-extrabold text-emerald-400">
                  MAWADDAH TA'ARUF SYAR'I
                </span>
              </div>

              {/* Header Biro */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-emerald-400/50 pb-4">
                <div className="space-y-1 text-center sm:text-left flex-1">
                  <h2 className="font-serif text-2xl font-bold text-black">BIRO TA'ARUF ISLAMI MAWADDAH</h2>
                  <p className="text-xs text-black font-medium">"Menjemput Jodoh dengan Ikhtiar, Menjaga Hati dengan Syariat"</p>
                  <div className="text-[11px] font-mono text-emerald-800 font-bold">
                    Nomor Registrasi: {currentUser.registrationNumber} • {cvPrintMode === 'curated' ? 'LEMBAR TERKURASI (KONTAK DITUTUP)' : 'LEMBAR ARSIP LENGKAP'}
                  </div>
                </div>

                {currentUser.avatarUrl && (
                  <div className="w-20 h-24 rounded-xl border-2 border-[#064E3B] bg-white overflow-hidden shadow-xs shrink-0">
                    <img src={currentUser.avatarUrl} alt={currentUser.fullName} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Data Umum */}
              <div className="space-y-2">
                <h4 className="font-bold text-emerald-300 border-b border-[#064E3B]/50 pb-1">I. IDENTITAS ANGGOTA</h4>
                <div className="grid grid-cols-2 gap-2 text-black font-medium">
                  <div>Nama Lengkap: <span className="font-bold text-black">{currentUser.fullName}</span></div>
                  <div>Jenis Kelamin: <span className="text-black">{currentUser.gender === 'ikhwan' ? 'Ikhwan' : 'Akhwat'}</span></div>
                  <div>Tempat, Tgl Lahir: <span className="text-black">{currentDetail.birthPlace}, {currentDetail.birthDate}</span></div>
                  <div>Usia: <span className="text-black">{currentUser.age} Tahun</span></div>
                  <div>Tinggi / Berat: <span className="text-black">{currentDetail.heightCm} cm / {currentDetail.weightKg} kg</span></div>
                  <div>Status Pernikahan: <span className="text-black">{currentDetail.maritalStatus === 'single' ? 'Lajang' : 'Pernah Menikah'}</span></div>
                  <div>Domisili: <span className="text-black">{currentUser.city}</span></div>
                  <div>
                    Nomor WhatsApp: <span className="text-black">{cvPrintMode === 'full' ? currentUser.phoneNumber : '•••••••••••• (Dirahasiakan Biro)'}</span>
                  </div>
                  <div>Wali Nasab: <span className="text-black">{currentDetail.waliName} ({currentDetail.waliRelation})</span></div>
                  <div>
                    Kontak Wali: <span className="text-black">{cvPrintMode === 'full' ? currentDetail.waliPhone : '•••••••••••• (Terverifikasi di Admin)'}</span>
                  </div>
                </div>
              </div>

              {/* Pendidikan & Profesi */}
              <div className="space-y-2">
                <h4 className="font-bold text-emerald-300 border-b border-[#064E3B]/50 pb-1">II. PENDIDIKAN & PROFESI</h4>
                <div className="space-y-1 text-black font-medium">
                  <div>Pendidikan Terakhir: <span className="text-black">{currentDetail.education}</span></div>
                  <div>Pekerjaan Saat Ini: <span className="text-black">{currentDetail.profession}</span></div>
                  <div>Catatan Kemandirian: <span className="text-black">{currentDetail.financialNotes || 'Mandiri secara finansial'}</span></div>
                </div>
              </div>

              {/* Agama & Ibadah */}
              <div className="space-y-2">
                <h4 className="font-bold text-emerald-300 border-b border-[#064E3B]/50 pb-1">III. KEBIASAAN IBADAH & AGAMA</h4>
                <div className="space-y-1 text-black font-medium">
                  <div>Shalat 5 Waktu: <span className="text-black">{currentDetail.prayerHabit}</span></div>
                  <div>Kajian / Manhaj: <span className="text-black">{currentDetail.religiousStudy}</span></div>
                  <div>Hafalan Qur'an: <span className="text-black">{currentDetail.quranMemorization || 'Belum ada'}</span></div>
                  <div>Merokok: <span className="text-black">{currentDetail.isSmoker ? 'Ya' : 'Tidak Merokok'}</span></div>
                </div>
              </div>

              {/* Visi & Kriteria */}
              <div className="space-y-2">
                <h4 className="font-bold text-emerald-300 border-b border-[#064E3B]/50 pb-1">IV. VISI RUMAH TANGGA & KRITERIA</h4>
                <div className="space-y-1 text-black font-medium">
                  <div><strong className="text-black">Visi Pernikahan:</strong> {currentDetail.marriageVision}</div>
                  <div className="pt-1"><strong className="text-black">Kriteria Pasangan:</strong> {currentDetail.partnerCriteria}</div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="text-[10px] text-black font-medium border-t border-[#064E3B]/50 pt-3 italic text-center">
                Lembar CV ini diterbitkan resmi oleh Biro Mawaddah. Kerahasiaan data dilindungi amanah syariat dan hukum UU PDP.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
