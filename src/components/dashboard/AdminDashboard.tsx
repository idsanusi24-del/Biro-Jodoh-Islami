import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, 
  UserCheck, 
  HeartHandshake, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  AlertCircle, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  Printer, 
  PlusCircle, 
  Clock, 
  Eye, 
  Award,
  ChevronRight,
  Download,
  PhoneCall,
  Check,
  MapPin,
  Building2,
  Mail,
  Save,
  Phone
} from 'lucide-react';
import { UserProfile, MemberDetail, TaarufProcess } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { 
    allUsers, 
    allDetails, 
    taarufProcesses, 
    complaints, 
    auditLogs, 
    waliVerificationRecords,
    verifyMember, 
    createTaarufRecommendation, 
    updateTaarufStatus,
    addArticle,
    exportMembersToCSV,
    exportProcessesToCSV,
    orgSettings,
    updateOrgSettings
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'wali' | 'matchmaker' | 'processes' | 'articles' | 'complaints' | 'audit' | 'settings'>('overview');
  
  // Organization settings state
  const [inputAddress, setInputAddress] = useState(orgSettings.officeAddress);
  const [inputWhatsapp, setInputWhatsapp] = useState(orgSettings.whatsappNumber);
  const [inputEmail, setInputEmail] = useState(orgSettings.csEmail);
  const [settingsSuccess, setSettingsSuccess] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  useEffect(() => {
    setInputAddress(orgSettings.officeAddress);
    setInputWhatsapp(orgSettings.whatsappNumber);
    setInputEmail(orgSettings.csEmail);
  }, [orgSettings]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    await updateOrgSettings({
      officeAddress: inputAddress,
      whatsappNumber: inputWhatsapp,
      csEmail: inputEmail
    });
    setIsSavingSettings(false);
    setSettingsSuccess(true);
    setTimeout(() => setSettingsSuccess(false), 4000);
  };

  // Member list filtering
  const [memberFilterGender, setMemberFilterGender] = useState<'all' | 'ikhwan' | 'akhwat'>('all');
  const [memberSearchQuery, setMemberSearchQuery] = useState('');
  const [selectedUserForDetail, setSelectedUserForDetail] = useState<UserProfile | null>(null);

  // Wali Verification modal state
  const [verifyingUser, setVerifyingUser] = useState<UserProfile | null>(null);
  const [waliVerificationNotes, setWaliVerificationNotes] = useState('Telah dikonfirmasi melalui sambungan telepon resmi. Wali nasab menyatakan merestui.');

  // Matchmaker state
  const [selectedIkhwanId, setSelectedIkhwanId] = useState<string>('user-ikhwan-1');
  const [selectedAkhwatId, setSelectedAkhwatId] = useState<string>('user-akhwat-1');
  const [matchNotification, setMatchNotification] = useState<string | null>(null);

  // Article creation form
  const [articleTitle, setArticleTitle] = useState('');
  const [articleCategory, setArticleCategory] = useState('Konsep & Syariat');
  const [articleSummary, setArticleSummary] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [articleAuthor, setArticleAuthor] = useState('Dewan Syariah Mawaddah');
  const [articleSuccess, setArticleSuccess] = useState(false);

  // Statistics
  const ikhwanList = allUsers.filter(u => u.gender === 'ikhwan' && u.role === 'ikhwan');
  const akhwatList = allUsers.filter(u => u.gender === 'akhwat' && u.role === 'akhwat');
  const pendingMembers = allUsers.filter(u => u.verificationStatus === 'pending');
  const activeCases = taarufProcesses.filter(p => p.status !== 'stopped_respectfully' && p.status !== 'completed_nikah');
  const successNikahCases = taarufProcesses.filter(p => p.status === 'completed_nikah' || p.status === 'khitbah_proceeding');

  // Filtered members
  const filteredUsers = allUsers.filter(u => {
    if (u.role === 'admin' || u.role === 'mediator') return false;
    const matchGender = memberFilterGender === 'all' || u.gender === memberFilterGender;
    const matchSearch = u.fullName.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
                        u.registrationNumber.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
                        u.city.toLowerCase().includes(memberSearchQuery.toLowerCase());
    return matchGender && matchSearch;
  });

  // Calculate Match Score between two members
  const calculateCompatibility = (ikhwanId: string, akhwatId: string) => {
    const ikhwan = allUsers.find(u => u.id === ikhwanId);
    const akhwat = allUsers.find(u => u.id === akhwatId);
    const ikhwanD = allDetails[ikhwanId];
    const akhwatD = allDetails[akhwatId];

    if (!ikhwan || !akhwat || !ikhwanD || !akhwatD) return { score: 70, reasons: ['Data dasar sesuai syariat'] };

    let score = 50;
    const reasons: string[] = [];

    // Age calculation
    const ageDiff = ikhwan.age - akhwat.age;
    if (ageDiff >= 1 && ageDiff <= 6) {
      score += 15;
      reasons.push(`Rentang usia ideal (Selisih ${ageDiff} tahun)`);
    } else if (ageDiff >= -1 && ageDiff <= 10) {
      score += 10;
      reasons.push(`Usia masuk dalam kriteria toleransi (Selisih ${ageDiff} tahun)`);
    }

    // Location
    if (ikhwan.city.toLowerCase().includes('jakarta') && akhwat.city.toLowerCase().includes('jakarta')) {
      score += 15;
      reasons.push('Sama-sama berdomisili di area Jabodetabek');
    } else if (ikhwan.city.toLowerCase() === akhwat.city.toLowerCase()) {
      score += 15;
      reasons.push(`Domisili satu kota (${ikhwan.city})`);
    } else {
      score += 5;
      reasons.push(`Domisili berbeda (${ikhwan.city} & ${akhwat.city}), membutuhkan kesiapan domisili`);
    }

    // Readiness timeline
    if (ikhwanD.readinessTimeline === akhwatD.readinessTimeline) {
      score += 10;
      reasons.push(`Target kesiapan menikah sama (${ikhwanD.readinessTimeline.replace(/_/g, ' ')})`);
    }

    // Smoking habit
    if (!ikhwanD.isSmoker) {
      score += 10;
      reasons.push('Ikhwan tidak merokok, sesuai kriteria utama');
    }

    return { score: Math.min(score, 98), reasons };
  };

  const handleAutoMatch = () => {
    let bestScore = -1;
    let bestIkhwan = ikhwanList[0]?.id;
    let bestAkhwat = akhwatList[0]?.id;

    ikhwanList.forEach(i => {
      akhwatList.forEach(a => {
        const { score } = calculateCompatibility(i.id, a.id);
        if (score > bestScore) {
          bestScore = score;
          bestIkhwan = i.id;
          bestAkhwat = a.id;
        }
      });
    });

    if (bestIkhwan && bestAkhwat) {
      setSelectedIkhwanId(bestIkhwan);
      setSelectedAkhwatId(bestAkhwat);
      setMatchNotification(`Sistem telah memilih pasangan dengan skor keselarasan tertinggi: ${bestScore}%!`);
      setTimeout(() => setMatchNotification(null), 3000);
    }
  };

  const handleCreateRecommendation = async () => {
    const { score, reasons } = calculateCompatibility(selectedIkhwanId, selectedAkhwatId);
    const process = await createTaarufRecommendation(selectedIkhwanId, selectedAkhwatId, score, reasons);
    setMatchNotification(`Berhasil mengajukan rekomendasi pasangan! Kasus #${process.id} telah dibuat dan dikirim ke kedua kandidat.`);
    setTimeout(() => setMatchNotification(null), 4000);
  };

  const handleConfirmVerification = async () => {
    if (!verifyingUser) return;
    await verifyMember(verifyingUser.id, 'verified', waliVerificationNotes);
    setVerifyingUser(null);
  };

  const handleDownloadCSV = (type: 'members' | 'processes') => {
    const content = type === 'members' ? exportMembersToCSV() : exportProcessesToCSV();
    const filename = `Mawaddah_${type === 'members' ? 'Data_Anggota' : 'Rekap_Taaruf'}_${new Date().toISOString().split('T')[0]}.csv`;
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePublishArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleTitle || !articleContent) return;

    await addArticle({
      slug: articleTitle.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-'),
      title: articleTitle,
      category: articleCategory,
      summary: articleSummary || articleContent.slice(0, 150),
      content: articleContent.split('\n\n').filter(p => p.trim().length > 0),
      author: articleAuthor,
      readTime: '5 menit'
    });

    setArticleSuccess(true);
    setArticleTitle('');
    setArticleSummary('');
    setArticleContent('');
    setTimeout(() => setArticleSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Header with 3D Banner Depth & Specular Reflection */}
      <div className="bg-gradient-to-r from-[#0B2545] via-[#0A3043] to-[#064E3B] text-black rounded-3xl p-6 sm:p-8 shadow-depth-banner border-t-4 border-[#B91C1C] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-200 bg-[#EBF5FE] px-3.5 py-1 rounded-full border border-emerald-500/40 shadow-inner">
            <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
            <span>Panel Pengelola Resmi (Super Administrator)</span>
          </div>
          <h1 className="font-serif text-3xl font-black mt-2 text-black drop-shadow-xs">Dashboard Pengurus Mawaddah</h1>
          <p className="text-xs sm:text-sm text-black font-medium mt-1 max-w-2xl font-normal">
            Menjaga amanah data, memverifikasi kesiapan wali nasab, dan mengawasi jalannya proses ta'aruf agar murni sesuai syariat.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 relative z-10">
          <button
            onClick={() => handleDownloadCSV('members')}
            className="px-3.5 py-2 bg-white hover:bg-[#EBF5FE] text-black rounded-xl text-xs font-black flex items-center gap-1.5 border border-stone-500 btn-depth-blue transition-all"
            title="Ekspor CSV Data Anggota sesuai UU PDP"
          >
            <Download className="w-3.5 h-3.5 text-blue-200" />
            Ekspor Anggota
          </button>
          <button
            onClick={() => handleDownloadCSV('processes')}
            className="px-3.5 py-2 bg-[#064E3B] hover:bg-[#043729] text-black rounded-xl text-xs font-black flex items-center gap-1.5 border border-emerald-500 btn-depth-emerald transition-all"
            title="Ekspor CSV Rekap Kasus Ta'aruf"
          >
            <Download className="w-3.5 h-3.5 text-emerald-200" />
            Ekspor Ta'aruf
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-[#B91C1C] hover:bg-[#991B1B] text-black rounded-xl text-xs font-black flex items-center gap-1.5 btn-depth-red transition-all"
          >
            <Printer className="w-4 h-4 text-black" />
            Cetak Rekap
          </button>
        </div>
      </div>

      {/* Navigation Tabs with Black Font and Biru/Hijau/Merah States */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-3">
        {[
          { id: 'overview', label: 'Ringkasan & Antrean', icon: Users, count: pendingMembers.length },
          { id: 'members', label: 'Seluruh Anggota', icon: UserCheck },
          { id: 'wali', label: 'Verifikasi Kontak Wali', icon: PhoneCall, count: waliVerificationRecords.length },
          { id: 'matchmaker', label: 'Smart Matchmaker', icon: Sparkles },
          { id: 'processes', label: 'Kelola Proses Ta\'aruf', icon: HeartHandshake, count: activeCases.length },
          { id: 'articles', label: 'Manajemen Artikel', icon: FileText },
          { id: 'complaints', label: 'Laporan & Pengaduan', icon: AlertCircle, count: complaints.length },
          { id: 'audit', label: 'Audit Log (UU PDP)', icon: Clock },
          { id: 'settings', label: 'Pengaturan Kontak & WA', icon: Building2 },
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

      {/* TAB 1: OVERVIEW & ANTREAN VERIFIKASI */}
      {activeTab === 'overview' && (
        <div className="space-y-8 text-black">
          {/* Stats Cards with Multi-tier Depth & Bevel Accents */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border-t-4 border-t-blue-400 border-x border-b border-[#064E3B]/60 shadow-depth-md hover:shadow-depth-lg hover:-translate-y-1 transition-all duration-300 space-y-2 text-black">
              <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">Total Anggota</span>
              <div className="font-serif text-3xl font-black text-black">{allUsers.length - 2}</div>
              <div className="text-[11px] text-black font-medium font-semibold flex items-center justify-between">
                <span>{ikhwanList.length} Ikhwan</span>
                <span>•</span>
                <span>{akhwatList.length} Akhwat</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border-t-4 border-t-[#B91C1C] border-x border-b border-[#064E3B]/60 shadow-depth-md hover:shadow-depth-lg hover:-translate-y-1 transition-all duration-300 space-y-2 text-black">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Pending Verifikasi</span>
              <div className="font-serif text-3xl font-black text-red-400">{pendingMembers.length}</div>
              <div className="text-[11px] text-black font-medium font-semibold">Menunggu cek KTP & kontak wali</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border-t-4 border-t-[#10B981] border-x border-b border-[#064E3B]/60 shadow-depth-md hover:shadow-depth-lg hover:-translate-y-1 transition-all duration-300 space-y-2 text-black">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Ta'aruf Berjalan</span>
              <div className="font-serif text-3xl font-black text-emerald-400">{activeCases.length}</div>
              <div className="text-[11px] text-black font-medium font-semibold">Dalam mediasi terarah</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border-t-4 border-t-blue-400 border-x border-b border-[#064E3B]/60 shadow-depth-md hover:shadow-depth-lg hover:-translate-y-1 transition-all duration-300 space-y-2 text-black">
              <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">Khitbah & Akad</span>
              <div className="font-serif text-3xl font-black text-blue-300">{successNikahCases.length}</div>
              <div className="text-[11px] text-emerald-400 font-black">Barakallah</div>
            </div>
          </div>

          {/* Pending Verifications Queue with Layered Dimension */}
          <div className="bg-white rounded-3xl border border-[#064E3B]/60 p-6 sm:p-8 space-y-6 shadow-depth-md text-black">
            <div className="flex items-center justify-between border-b border-[#064E3B]/50 pb-4">
              <div>
                <h3 className="font-serif text-xl font-black text-black">
                  Antrean Pendaftaran Baru (Verifikasi Berkas & Wali)
                </h3>
                <p className="text-xs text-black font-medium font-normal">Pastikan nomor wali terkonfirmasi sebelum meloloskan verifikasi.</p>
              </div>
              <span className="text-xs bg-[#B91C1C] text-black font-bold px-3 py-1 rounded-full shadow-depth-sm">
                {pendingMembers.length} Perlu Tindakan
              </span>
            </div>

            {pendingMembers.length === 0 ? (
              <div className="text-center py-8 text-xs text-black font-medium">
                Alhamdulillah, tidak ada antrean verifikasi berkas yang tertunda.
              </div>
            ) : (
              <div className="divide-y divide-[#064E3B]/40">
                {pendingMembers.map((member) => {
                  const detail = allDetails[member.id];
                  return (
                    <div key={member.id} className="py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-black">{member.fullName}</span>
                          <span className="text-xs font-mono text-emerald-300">({member.registrationNumber})</span>
                          <span className={`text-[10px] px-2 py-0.2 rounded font-bold ${
                            member.gender === 'ikhwan' ? 'bg-[#064E3B] text-emerald-200' : 'bg-[#B91C1C] text-black'
                          }`}>
                            {member.gender.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-black font-medium">
                          {member.city} • {member.age} Tahun • Profesi: {detail?.profession || '-'}
                        </p>
                        <p className="text-xs text-amber-300">
                          Wali: {detail?.waliName || 'Belum diisi'} (No WA: {detail?.waliPhone || '-'})
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedUserForDetail(member)}
                          className="px-3 py-1.5 border border-[#0284C7] bg-[#EBF5FE] hover:bg-[#BAE6FD] text-black font-medium hover:text-black rounded-lg text-xs font-medium cursor-pointer"
                        >
                          Lihat Biodata
                        </button>
                        <button
                          onClick={() => setVerifyingUser(member)}
                          className="btn-depth-emerald px-4 py-1.5 text-black rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Verifikasi Wali</span>
                        </button>
                        <button
                          onClick={() => verifyMember(member.id, 'rejected')}
                          className="px-3 py-1.5 border border-red-500/60 bg-[#EBF5FE] text-red-300 hover:text-black hover:bg-red-950 rounded-lg text-xs font-medium cursor-pointer"
                        >
                          Tolak
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: DATA ANGGOTA */}
      {activeTab === 'members' && (
        <div className="bg-white rounded-3xl border border-[#064E3B]/60 p-6 sm:p-8 space-y-6 shadow-depth-md text-black">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-black">Data Seluruh Anggota Terdaftar</h3>
              <p className="text-xs text-black font-medium">Akses terbatas hanya untuk pengurus resmi Biro Mawaddah.</p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={memberFilterGender}
                onChange={(e) => setMemberFilterGender(e.target.value as any)}
                className="px-3 py-2 rounded-xl border border-[#0284C7] text-xs bg-[#EBF5FE] text-black font-medium focus:border-emerald-400 focus:outline-none"
              >
                <option value="all" className="bg-[#EBF5FE] text-black">Semua Gender</option>
                <option value="ikhwan" className="bg-[#EBF5FE] text-black">Hanya Ikhwan</option>
                <option value="akhwat" className="bg-[#EBF5FE] text-black">Hanya Akhwat</option>
              </select>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari nama, kota, id..."
                  value={memberSearchQuery}
                  onChange={(e) => setMemberSearchQuery(e.target.value)}
                  className="pl-8 pr-4 py-2 rounded-xl border border-[#0284C7] bg-[#EBF5FE] text-black placeholder:text-black font-medium text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#064E3B]/60 text-black font-medium font-semibold bg-[#EBF5FE]">
                  <th className="py-3 px-4">No. Registrasi</th>
                  <th className="py-3 px-4">Nama Anggota</th>
                  <th className="py-3 px-4">Gender / Usia</th>
                  <th className="py-3 px-4">Kota Domisili</th>
                  <th className="py-3 px-4">Status Verifikasi</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#064E3B]/40">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-white/5">
                    <td className="py-3 px-4 font-mono font-bold text-emerald-300">{u.registrationNumber}</td>
                    <td className="py-3 px-4 font-semibold text-black">{u.fullName}</td>
                    <td className="py-3 px-4 capitalize text-black font-medium">{u.gender} • {u.age} th</td>
                    <td className="py-3 px-4 text-black font-medium">{u.city}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        u.verificationStatus === 'verified'
                          ? 'bg-[#064E3B] text-emerald-200 border border-emerald-400/40'
                          : u.verificationStatus === 'pending'
                          ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                          : 'bg-red-950 text-red-300 border border-red-500/40'
                      }`}>
                        {u.verificationStatus.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedUserForDetail(u)}
                        className="px-3 py-1 bg-[#EBF5FE] hover:bg-[#BAE6FD] border border-[#0284C7] text-black font-medium hover:text-black rounded-lg font-semibold text-[11px] cursor-pointer"
                      >
                        Detail Biodata
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: VERIFIKASI KONTAK WALI */}
      {activeTab === 'wali' && (
        <div className="bg-white rounded-3xl border border-[#064E3B]/60 p-6 sm:p-8 space-y-6 shadow-depth-md text-black">
          <div className="flex items-center justify-between border-b border-[#064E3B]/50 pb-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-black">
                Log Catatan Verifikasi Kontak Wali Nasab
              </h3>
              <p className="text-xs text-black font-medium">
                Bukti kepatuhan rukun nikah: Memastikan pihak keluarga/wali telah mengonfirmasi ikhtiar calon.
              </p>
            </div>
            <span className="text-xs bg-[#064E3B] text-emerald-200 font-bold px-3 py-1 rounded-full border border-emerald-400/40">
              {waliVerificationRecords.length} Wali Terkonfirmasi
            </span>
          </div>

          <div className="space-y-3">
            {waliVerificationRecords.map((record) => (
              <div key={record.id} className="p-4 rounded-2xl border border-[#064E3B]/60 bg-[#EBF5FE] space-y-2 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#064E3B]/40 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-black">{record.memberName}</span>
                    <span className="text-[11px] text-black font-medium">• Wali: <strong className="text-black">{record.waliName}</strong> ({record.waliPhone})</span>
                  </div>
                  <span className="text-[10px] text-emerald-300 bg-[#064E3B] px-2.5 py-0.5 rounded-full font-bold border border-emerald-400/30">
                    Terkonfirmasi Siap Merestui
                  </span>
                </div>
                <p className="text-black font-medium leading-relaxed italic">"{record.notes}"</p>
                <div className="flex items-center justify-between text-[10px] text-black font-medium pt-1">
                  <span>Petugas Verifikator: {record.officerName} ({record.method.replace(/_/g, ' ')})</span>
                  <span>{new Date(record.timestamp).toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SMART MATCHMAKER */}
      {activeTab === 'matchmaker' && (
        <div className="bg-white rounded-3xl border border-[#064E3B]/60 p-6 sm:p-8 space-y-8 shadow-depth-md text-black">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 bg-[#EBF5FE] px-3 py-1 rounded-full mb-2 border border-amber-500/40">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Algoritma Kompatibilitas Syar'i</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-black">
                Sistem Kurasi & Rekomendasi Pasangan
              </h3>
              <p className="text-xs text-black font-medium leading-relaxed">
                Pilih satu kandidat Ikhwan dan satu kandidat Akhwat. Sistem akan menghitung kompatibilitas kriteria dan admin dapat mengajukan lembar CV anonim kepada keduanya.
              </p>
            </div>

            <button
              onClick={handleAutoMatch}
              className="btn-depth-emerald px-4 py-2.5 text-black font-bold rounded-xl text-xs flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Pencocokan Otomatis (Top 1)</span>
            </button>
          </div>

          {matchNotification && (
            <div className="p-4 bg-[#EBF5FE] border-2 border-emerald-400 text-black rounded-2xl flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">{matchNotification}</span>
            </div>
          )}

          {/* Candidate Pickers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pick Ikhwan */}
            <div className="p-6 bg-[#EBF5FE] rounded-2xl border border-blue-400/50 space-y-4">
              <h4 className="font-bold text-blue-300 text-sm flex items-center justify-between">
                <span>1. Pilih Calon Suami (Ikhwan):</span>
                <span className="text-xs text-blue-400 font-semibold">{ikhwanList.length} Kandidat Siap</span>
              </h4>
              <select
                value={selectedIkhwanId}
                onChange={(e) => setSelectedIkhwanId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#0284C7] bg-white text-black text-xs sm:text-sm font-semibold focus:outline-none focus:border-blue-400"
              >
                {ikhwanList.map((ikhwan) => (
                  <option key={ikhwan.id} value={ikhwan.id} className="bg-white text-black">
                    {ikhwan.fullName} ({ikhwan.age} th, {ikhwan.city}) - {ikhwan.registrationNumber}
                  </option>
                ))}
              </select>

              {/* Ikhwan Snippet */}
              {allDetails[selectedIkhwanId] && (
                <div className="text-xs text-black font-medium space-y-1.5 pt-2 border-t border-[#064E3B]/50">
                  <div><strong className="text-black">Pendidikan:</strong> {allDetails[selectedIkhwanId].education}</div>
                  <div><strong className="text-black">Pekerjaan:</strong> {allDetails[selectedIkhwanId].profession}</div>
                  <div><strong className="text-black">Kesiapan Waktu:</strong> {allDetails[selectedIkhwanId].readinessTimeline.replace(/_/g, ' ')}</div>
                  <div><strong className="text-black">Merokok:</strong> {allDetails[selectedIkhwanId].isSmoker ? 'Ya' : 'Tidak Merokok'}</div>
                </div>
              )}
            </div>

            {/* Pick Akhwat */}
            <div className="p-6 bg-[#EBF5FE] rounded-2xl border border-red-400/50 space-y-4">
              <h4 className="font-bold text-red-300 text-sm flex items-center justify-between">
                <span>2. Pilih Calon Istri (Akhwat):</span>
                <span className="text-xs text-red-400 font-semibold">{akhwatList.length} Kandidat Siap</span>
              </h4>
              <select
                value={selectedAkhwatId}
                onChange={(e) => setSelectedAkhwatId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#0284C7] bg-white text-black text-xs sm:text-sm font-semibold focus:outline-none focus:border-red-400"
              >
                {akhwatList.map((akhwat) => (
                  <option key={akhwat.id} value={akhwat.id} className="bg-white text-black">
                    {akhwat.fullName} ({akhwat.age} th, {akhwat.city}) - {akhwat.registrationNumber}
                  </option>
                ))}
              </select>

              {/* Akhwat Snippet */}
              {allDetails[selectedAkhwatId] && (
                <div className="text-xs text-black font-medium space-y-1.5 pt-2 border-t border-[#064E3B]/50">
                  <div><strong className="text-black">Pendidikan:</strong> {allDetails[selectedAkhwatId].education}</div>
                  <div><strong className="text-black">Pekerjaan:</strong> {allDetails[selectedAkhwatId].profession}</div>
                  <div><strong className="text-black">Kesiapan Waktu:</strong> {allDetails[selectedAkhwatId].readinessTimeline.replace(/_/g, ' ')}</div>
                  <div><strong className="text-black">Hafalan Qur'an:</strong> {allDetails[selectedAkhwatId].quranMemorization || '-'}</div>
                </div>
              )}
            </div>
          </div>

          {/* Compatibility Analysis Card */}
          {selectedIkhwanId && selectedAkhwatId && (
            <div className="p-6 bg-[#EBF5FE] rounded-2xl border-2 border-[#064E3B] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-lg font-bold text-black">
                    Hasil Analisis Kecocokan Kriteria
                  </h4>
                  <p className="text-xs text-black font-medium">
                    Berdasarkan selisih usia, domisili, kesiapan menikah, dan komitmen ibadah.
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-serif text-3xl font-extrabold text-emerald-400">
                    {calculateCompatibility(selectedIkhwanId, selectedAkhwatId).score}%
                  </span>
                  <div className="text-[11px] font-bold text-emerald-300">Skor Kompatibilitas</div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#064E3B]/50">
                <span className="text-xs font-bold text-emerald-300 block">Poin Pertimbangan Sistem:</span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-black font-medium">
                  {calculateCompatibility(selectedIkhwanId, selectedAkhwatId).reasons.map((r, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleCreateRecommendation}
                  className="btn-depth-emerald px-6 py-3 text-black font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-depth-sm cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                  <span>Buat Rekomendasi Resmi & Ajukan ke Kedua Pihak</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: KELOLA PROSES TA'ARUF */}
      {activeTab === 'processes' && (
        <div className="bg-white rounded-3xl border border-[#064E3B]/60 p-6 sm:p-8 space-y-6 shadow-depth-md text-black">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-black">
                Daftar Seluruh Kasus Ta'aruf Berjalan
              </h3>
              <p className="text-xs text-black font-medium">Pantau persetujuan, sesi mediasi, dan jadwal nazhar.</p>
            </div>
          </div>

          <div className="space-y-4">
            {taarufProcesses.map((p) => {
              const ikhwan = allUsers.find(u => u.id === p.ikhwanId);
              const akhwat = allUsers.find(u => u.id === p.akhwatId);

              return (
                <div key={p.id} className="p-5 rounded-2xl border border-[#064E3B]/60 bg-[#EBF5FE] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs uppercase tracking-wider text-emerald-300 bg-[#064E3B]/60 border border-[#064E3B] px-2.5 py-0.5 rounded-full">
                        Kasus #{p.id}
                      </span>
                      <span className="text-xs text-black font-medium">Dibuat: {new Date(p.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-black font-medium">Status:</span>
                      <select
                        value={p.status}
                        onChange={(e) => updateTaarufStatus(p.id, e.target.value as any)}
                        className="px-3 py-1.5 rounded-lg border border-[#0284C7] text-xs font-bold bg-white text-black focus:border-emerald-400"
                      >
                        <option value="proposed_by_admin">Tawaran Baru Admin</option>
                        <option value="approved_by_both">Saling Setuju</option>
                        <option value="active_mediation">Mediasi Tanya-Jawab</option>
                        <option value="nazhar_scheduled">Jadwal Nazhar</option>
                        <option value="khitbah_proceeding">Menuju Khitbah</option>
                        <option value="completed_nikah">Selesai / Menikah</option>
                        <option value="stopped_respectfully">Dihentikan</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-[#064E3B]/50">
                      <span className="text-black font-medium block">Pihak Ikhwan:</span>
                      <span className="font-bold text-black">{ikhwan?.fullName}</span> <span className="text-black font-medium">({ikhwan?.registrationNumber})</span>
                      <div className="text-[11px] text-emerald-400 mt-1">
                        Respon: {p.ikhwanConsent === true ? '✓ Setuju Bismillah' : p.ikhwanConsent === false ? '✗ Belum Berkenan' : 'Menunggu Jawaban'}
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-[#064E3B]/50">
                      <span className="text-black font-medium block">Pihak Akhwat:</span>
                      <span className="font-bold text-black">{akhwat?.fullName}</span> <span className="text-black font-medium">({akhwat?.registrationNumber})</span>
                      <div className="text-[11px] text-emerald-400 mt-1">
                        Respon: {p.akhwatConsent === true ? '✓ Setuju Bismillah' : p.akhwatConsent === false ? '✗ Belum Berkenan' : 'Menunggu Jawaban'}
                      </div>
                    </div>
                  </div>

                  {p.mediatorNotes && (
                    <div className="text-xs text-amber-200 italic bg-[#FEF3C7] p-3 rounded-xl border border-amber-500/50">
                      Catatan Mediator: {p.mediatorNotes}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 6: MANAJEMEN ARTIKEL */}
      {activeTab === 'articles' && (
        <div className="bg-white rounded-3xl border border-[#064E3B]/60 p-6 sm:p-8 space-y-6 shadow-depth-md text-black">
          <div>
            <h3 className="font-serif text-xl font-bold text-black">Terbitkan Artikel Edukasi Baru</h3>
            <p className="text-xs text-black font-medium">Artikel akan langsung tampil pada halaman edukasi pernikahan.</p>
          </div>

          {articleSuccess && (
            <div className="p-4 bg-[#064E3B]/40 border border-[#064E3B] text-emerald-300 rounded-xl text-xs font-semibold">
              Alhamdulillah, artikel baru berhasil diterbitkan!
            </div>
          )}

          <form onSubmit={handlePublishArticle} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-black font-medium">Judul Artikel *</label>
                <input
                  type="text"
                  required
                  value={articleTitle}
                  onChange={(e) => setArticleTitle(e.target.value)}
                  placeholder="Contoh: Menjaga Komunikasi Suami Istri dalam Bingkai Sunnah"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#0284C7] bg-[#EBF5FE] text-black placeholder:text-black font-medium focus:border-emerald-400"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-black font-medium">Kategori Artikel *</label>
                <select
                  value={articleCategory}
                  onChange={(e) => setArticleCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#0284C7] bg-[#EBF5FE] text-black focus:border-emerald-400"
                >
                  <option value="Konsep & Syariat">Konsep & Syariat</option>
                  <option value="Edukasi Pernikahan">Edukasi Pernikahan</option>
                  <option value="Panduan Praktis">Panduan Praktis</option>
                  <option value="Kesiapan Hidup">Kesiapan Hidup</option>
                  <option value="Fikih Munakahat">Fikih Munakahat</option>
                  <option value="Adab & Akhlak">Adab & Akhlak</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-black font-medium">Ringkasan Singkat (Summary)</label>
              <input
                type="text"
                value={articleSummary}
                onChange={(e) => setArticleSummary(e.target.value)}
                placeholder="Deskripsi singkat yang tampil di daftar artikel"
                className="w-full px-4 py-2.5 rounded-xl border border-[#0284C7] bg-[#EBF5FE] text-black placeholder:text-black font-medium focus:border-emerald-400"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-black font-medium">Isi Artikel Lengkap * (Gunakan spasi baris untuk paragraf baru)</label>
              <textarea
                rows={6}
                required
                value={articleContent}
                onChange={(e) => setArticleContent(e.target.value)}
                placeholder="Tuliskan naskah edukasi islami di sini..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#0284C7] bg-[#EBF5FE] text-black placeholder:text-black font-medium focus:border-emerald-400"
              />
            </div>

            <button
              type="submit"
              className="btn-depth-emerald px-6 py-2.5 text-black font-bold rounded-xl text-xs sm:text-sm shadow-depth-sm"
            >
              Publikasikan Artikel
            </button>
          </form>
        </div>
      )}

      {/* TAB 7: PENGADUAN & LAPORAN ADAB */}
      {activeTab === 'complaints' && (
        <div className="bg-white rounded-3xl border border-[#064E3B]/60 p-6 sm:p-8 space-y-6 shadow-depth-md text-black">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-black">
                Laporan & Pengaduan Pelanggaran Adab Syar'i
              </h3>
              <p className="text-xs text-black font-medium">Laporan dari anggota terkait dugaan pelanggaran privasi atau adab.</p>
            </div>
            <span className="text-xs bg-[#B91C1C]/30 text-red-300 border border-[#B91C1C]/60 font-bold px-3 py-1 rounded-full">
              {complaints.length} Laporan Masuk
            </span>
          </div>

          {complaints.length === 0 ? (
            <div className="text-center py-8 text-xs text-black font-medium">
              Alhamdulillah, belum ada laporan adab yang masuk.
            </div>
          ) : (
            <div className="space-y-3">
              {complaints.map((c) => (
                <div key={c.id} className="p-4 rounded-xl border border-[#B91C1C]/60 bg-[#EBF5FE] space-y-2 text-black">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-red-300">{c.reportedSubject}</span>
                    <span className="text-black font-medium">{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-black font-medium">{c.description}</p>
                  <div className="text-[11px] text-black font-medium">Pelapor: {c.reporterName}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 8: AUDIT LOG (UU PDP) */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-3xl border border-[#064E3B]/60 p-6 sm:p-8 space-y-6 shadow-depth-md text-black">
          <div className="border-b border-stone-800 pb-4">
            <h3 className="font-serif text-xl font-bold text-black">
              Audit Log Aktivitas Sistem
            </h3>
            <p className="text-xs text-black font-medium">Pencatatan jejak transaksi data untuk akuntabilitas dan kepatuhan UU PDP.</p>
          </div>

          <div className="divide-y divide-stone-800 text-xs">
            {auditLogs.map((log) => (
              <div key={log.id} className="py-3 flex items-start justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="font-bold text-emerald-400">{log.action}</span>
                  <p className="text-black font-medium">{log.details}</p>
                  <span className="text-[10px] text-black font-medium">Oleh: {log.actorName}</span>
                </div>
                <div className="text-[10px] text-emerald-300 font-mono shrink-0">
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 9: PENGATURAN KONTAK & WHATSAPP LEMBAGA */}
      {activeTab === 'settings' && (
        <div className="space-y-6 text-black">
          <div className="bg-white border-2 border-[#0284C7] rounded-3xl p-6 sm:p-8 shadow-depth-lg space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-sky-100 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#BAE6FD] text-black text-xs font-black border border-[#0284C7]">
                  <Building2 className="w-3.5 h-3.5 text-black" />
                  <span>Profil & Kontak Layanan</span>
                </div>
                <h2 className="font-serif text-2xl font-black text-black mt-2">
                  Ubah Alamat Layanan & Nomor WhatsApp
                </h2>
                <p className="text-xs text-black font-bold mt-1 max-w-xl leading-relaxed">
                  Perubahan data di sini akan otomatis langsung mengubah alamat dan nomor WhatsApp yang tampil di seluruh bilah atas (Navbar), tautan bantuan WhatsApp, dan bagian Footer website.
                </p>
              </div>
            </div>

            {settingsSuccess && (
              <div className="p-4 bg-[#A7F3D0] border-2 border-[#064E3B] rounded-2xl flex items-center gap-3 text-black text-xs font-black shadow-depth-sm">
                <Check className="w-5 h-5 text-[#064E3B] shrink-0" />
                <span>Alhamdulillah! Alamat kantor dan nomor WhatsApp berhasil diperbarui dan langsung aktif di seluruh website.</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Nomor WhatsApp */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-black text-black">
                    Nomor WhatsApp Resmi Layanan:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={inputWhatsapp}
                      onChange={(e) => setInputWhatsapp(e.target.value)}
                      placeholder="+62 811-2233-4401 atau 081234567890"
                      className="w-full px-4 py-2.5 pl-10 border-2 border-[#0284C7] rounded-xl text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#0284C7] bg-white"
                    />
                    <Phone className="w-4 h-4 text-black absolute left-3.5 top-3" />
                  </div>
                  <p className="text-[11px] text-black font-bold">
                    Format nomor dapat ditulis lengkap (misal: <code className="font-mono bg-sky-100 px-1 rounded">+62 811-2233-4401</code> atau <code className="font-mono bg-sky-100 px-1 rounded">0812-3456-7890</code>).
                  </p>
                </div>

                {/* Email Layanan */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-black text-black">
                    Alamat Email Resmi Layanan:
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={inputEmail}
                      onChange={(e) => setInputEmail(e.target.value)}
                      placeholder="amanah@mawaddah.id"
                      className="w-full px-4 py-2.5 pl-10 border-2 border-[#0284C7] rounded-xl text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#0284C7] bg-white"
                    />
                    <Mail className="w-4 h-4 text-black absolute left-3.5 top-3" />
                  </div>
                  <p className="text-[11px] text-black font-bold">
                    Email rujukan pertanyaan dan pengaduan adab syar'i.
                  </p>
                </div>
              </div>

              {/* Alamat Kantor Lengkap */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-black">
                  Alamat Kantor & Layanan Ta'aruf:
                </label>
                <div className="relative">
                  <textarea
                    rows={3}
                    required
                    value={inputAddress}
                    onChange={(e) => setInputAddress(e.target.value)}
                    placeholder="Contoh: Gedung Dakwah Mawaddah, Jl. Warung Buncit Raya No. 42, Jakarta Selatan"
                    className="w-full px-4 py-2.5 pl-10 border-2 border-[#0284C7] rounded-xl text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#0284C7] bg-white"
                  />
                  <MapPin className="w-4 h-4 text-black absolute left-3.5 top-3" />
                </div>
                <p className="text-[11px] text-black font-bold">
                  Cantumkan alamat kantor fisik untuk keperluan pertemuan nazhar resmi dan verifikasi wali tatap muka.
                </p>
              </div>

              {/* Live Preview Box */}
              <div className="p-4 bg-[#EBF5FE] border-2 border-[#0284C7] rounded-2xl space-y-3">
                <span className="text-xs font-black text-black uppercase tracking-wider block border-b border-sky-300 pb-1">
                  Pratinjau Tampilan di Navigasi & Footer:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-sky-300 space-y-1">
                    <span className="text-[11px] font-black text-black block">Bilah Atas (Navbar):</span>
                    <p className="font-bold text-black">Layanan Informasi: <u>WA {inputWhatsapp}</u></p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-sky-300 space-y-1">
                    <span className="text-[11px] font-black text-black block">Bagian Bawah (Footer):</span>
                    <p className="font-bold text-black">Alamat: {inputAddress}</p>
                    <p className="font-bold text-black">WhatsApp: {inputWhatsapp}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isSavingSettings}
                  className="px-6 py-3 bg-[#064E3B] hover:bg-[#043729] text-white font-black rounded-xl text-xs flex items-center gap-2 shadow-depth-sm btn-depth-emerald transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSavingSettings ? 'Menyimpan...' : 'Simpan Perubahan Kontak Lembaga'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* WALI VERIFICATION MODAL */}
      {verifyingUser && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-depth-lg border-2 border-[#064E3B] text-black">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-emerald-400" />
                <h3 className="font-serif text-lg font-bold text-black">
                  Konfirmasi Kontak Wali Nasab
                </h3>
              </div>
              <button
                onClick={() => setVerifyingUser(null)}
                className="text-black font-medium hover:text-black text-xs font-bold"
              >
                Tutup
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#EBF5FE] rounded-xl space-y-1 border border-[#064E3B]/40 text-black font-medium">
                <div>Anggota: <strong className="text-black">{verifyingUser.fullName}</strong></div>
                <div>Wali: <strong className="text-black">{allDetails[verifyingUser.id]?.waliName}</strong> ({allDetails[verifyingUser.id]?.waliRelation})</div>
                <div>Nomor WA Wali: <strong className="text-emerald-300">{allDetails[verifyingUser.id]?.waliPhone}</strong></div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-black font-medium">Catatan Hasil Komunikasi dengan Wali:</label>
                <textarea
                  rows={3}
                  value={waliVerificationNotes}
                  onChange={(e) => setWaliVerificationNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#0284C7] bg-[#EBF5FE] text-black focus:border-emerald-400 placeholder:text-black font-medium"
                />
              </div>

              <button
                onClick={handleConfirmVerification}
                className="btn-depth-emerald w-full py-3 text-black font-bold rounded-xl flex items-center justify-center gap-2 shadow-depth-sm"
              >
                <Check className="w-4 h-4" />
                <span>Simpan Catatan & Verifikasi Anggota Resmi</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MEMBER DETAIL MODAL */}
      {selectedUserForDetail && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-depth-lg border-2 border-[#064E3B] text-black max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-black">{selectedUserForDetail.fullName}</h3>
                <span className="text-xs text-black font-medium font-mono">{selectedUserForDetail.registrationNumber}</span>
              </div>
              <button
                onClick={() => setSelectedUserForDetail(null)}
                className="px-3 py-1 bg-[#EBF5FE] hover:bg-stone-800 rounded-lg text-xs font-semibold text-black font-medium border border-[#0284C7]"
              >
                Tutup
              </button>
            </div>

            {allDetails[selectedUserForDetail.id] && (
              <div className="space-y-4 text-xs sm:text-sm text-black font-medium">
                <div className="grid grid-cols-2 gap-2 bg-[#EBF5FE] p-4 rounded-xl border border-[#064E3B]/40">
                  <div>Usia: {selectedUserForDetail.age} Tahun</div>
                  <div>Domisili: {selectedUserForDetail.city}</div>
                  <div>Status: {allDetails[selectedUserForDetail.id].maritalStatus}</div>
                  <div>Pendidikan: {allDetails[selectedUserForDetail.id].education}</div>
                  <div className="col-span-2">Pekerjaan: {allDetails[selectedUserForDetail.id].profession}</div>
                </div>

                <div className="p-4 bg-[#EBF5FE] rounded-xl space-y-1 border border-[#064E3B]/60">
                  <div className="font-bold text-emerald-400">Data Wali Nasab:</div>
                  <div>Nama: {allDetails[selectedUserForDetail.id].waliName} ({allDetails[selectedUserForDetail.id].waliRelation})</div>
                  <div>No Telepon/WA: {allDetails[selectedUserForDetail.id].waliPhone}</div>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-black">Visi Pernikahan:</div>
                  <p className="italic text-black font-medium">{allDetails[selectedUserForDetail.id].marriageVision}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
