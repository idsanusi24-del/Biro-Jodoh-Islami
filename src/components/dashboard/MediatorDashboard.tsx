import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  ShieldCheck, 
  Users, 
  MessageSquare, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  Clock, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { TaarufProcess, TaarufMessage } from '../../types';

export const MediatorDashboard: React.FC = () => {
  const { 
    currentUser, 
    taarufProcesses, 
    messages, 
    allUsers, 
    allDetails, 
    sendMediatedMessage,
    scheduleNazhar,
    updateTaarufStatus
  } = useAuth();

  const [selectedProcessId, setSelectedProcessId] = useState<string>(taarufProcesses[0]?.id || '');
  const [mediatorMsg, setMediatorMsg] = useState('');
  const [nazharDate, setNazharDate] = useState('2026-03-07');
  const [nazharTime, setNazharTime] = useState('10:00 WIB');
  const [nazharLocation, setNazharLocation] = useState('Kediaman Wali Akhwat (Jakarta Timur)');
  const [showNazharModal, setShowNazharModal] = useState(false);
  const [progressNotes, setProgressNotes] = useState('');

  const activeProcess = taarufProcesses.find(p => p.id === selectedProcessId) || taarufProcesses[0];
  const ikhwan = activeProcess ? allUsers.find(u => u.id === activeProcess.ikhwanId) : null;
  const akhwat = activeProcess ? allUsers.find(u => u.id === activeProcess.akhwatId) : null;
  const ikhwanDetail = activeProcess ? allDetails[activeProcess.ikhwanId] : null;
  const akhwatDetail = activeProcess ? allDetails[activeProcess.akhwatId] : null;

  const currentMessages = activeProcess 
    ? messages.filter(m => m.processId === activeProcess.id) 
    : [];

  const handleSendAdvice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProcess || !mediatorMsg.trim()) return;
    await sendMediatedMessage(activeProcess.id, 'Nasihat & Arahan Mediator', mediatorMsg.trim());
    setMediatorMsg('');
  };

  const handleSaveNazharSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProcess) return;
    await scheduleNazhar(activeProcess.id, nazharDate, nazharTime, nazharLocation);
    setShowNazharModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-black">
      {/* Header with 3D Banner Depth & Specular Reflection */}
      <div className="bg-white text-black rounded-3xl p-6 sm:p-8 shadow-depth-banner border border-[#064E3B]/60 border-t-4 border-t-[#B91C1C] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300 bg-[#EBF5FE] px-3.5 py-1.5 rounded-full border border-emerald-500/40 shadow-depth-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
            <span>Dashboard Konsultan & Mediator Syar'i</span>
          </div>
          <h1 className="font-serif text-3xl font-black mt-2 text-black drop-shadow-sm">
            Ustadz Salman Al-Farisi, S.Sos.I
          </h1>
          <p className="text-xs sm:text-sm text-black font-medium mt-1 max-w-xl font-normal leading-relaxed">
            Mendampingi sesi tanya jawab substantif, menjaga batas kehormatan, dan memfasilitasi nazhar beradab.
          </p>
        </div>

        <div className="bg-[#EBF5FE] border border-emerald-500/40 px-5 py-3 rounded-2xl text-xs text-black shadow-depth-sm relative z-10">
          <div>Kasus Aktif Didampingi: <span className="font-black text-red-400">{taarufProcesses.length} Pasangan</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: List of Managed Cases with Elevated Depth */}
        <div className="bg-white rounded-3xl border border-[#064E3B]/60 p-6 space-y-4 shadow-depth-md text-black">
          <h3 className="font-serif text-lg font-black text-black flex items-center justify-between">
            <span>Daftar Kasus Ta'aruf</span>
            <span className="text-xs bg-[#064E3B] text-emerald-200 px-2.5 py-0.5 rounded-full font-sans font-black border border-emerald-400/40 shadow-depth-sm">
              {taarufProcesses.length}
            </span>
          </h3>

          <div className="space-y-3">
            {taarufProcesses.map((p) => {
              const ikh = allUsers.find(u => u.id === p.ikhwanId);
              const akh = allUsers.find(u => u.id === p.akhwatId);
              const isSelected = p.id === selectedProcessId;

              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProcessId(p.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-[#EBF5FE] border-emerald-400 shadow-depth-sm border-l-4 border-l-emerald-400 text-black'
                      : 'bg-[#EBF5FE]/70 border-[#0284C7]/80 hover:bg-[#EBF5FE] hover:border-emerald-500/50 text-black font-medium'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono font-bold text-blue-300">#{p.id}</span>
                    <span className="capitalize text-black font-medium font-bold">
                      {p.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <div className="text-xs font-black text-black">
                    {ikh?.fullName.split(' ')[0]} & {akh?.fullName.split(' ')[0]}
                  </div>

                  <div className="text-[11px] text-black font-medium font-semibold">
                    Kedua pihak: {p.ikhwanConsent && p.akhwatConsent ? '✓ Saling Ridho' : 'Menunggu respon'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (2 cols): Active Case Details & Supervision Console */}
        <div className="lg:col-span-2 space-y-6">
          {activeProcess && ikhwan && akhwat ? (
            <div className="space-y-6">
              {/* Profile Comparison Card */}
              <div className="bg-white rounded-3xl border border-[#064E3B]/60 p-6 shadow-depth-md space-y-4 text-black">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#064E3B]/50 pb-3">
                  <div>
                    <h3 className="font-serif text-xl font-black text-black">
                      Kasus Ta'aruf #{activeProcess.id}
                    </h3>
                    <p className="text-xs text-black font-medium font-normal">
                      Status Tahapan: <span className="font-black text-emerald-300 capitalize">{activeProcess.status.replace(/_/g, ' ')}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowNazharModal(true)}
                      className="px-4 py-2.5 bg-[#EBF5FE] hover:bg-[#BAE6FD] text-black font-black rounded-xl text-xs flex items-center gap-1.5 border border-blue-400/50 shadow-depth-sm transition-all cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-blue-300" />
                      <span>Tetapkan Jadwal Nazhar</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-[#EBF5FE] rounded-2xl border border-blue-400/50 shadow-depth-sm space-y-1">
                    <span className="text-blue-300 font-black uppercase tracking-wider text-[10px]">Kandidat Ikhwan</span>
                    <div className="font-black text-black text-sm">{ikhwan.fullName}</div>
                    <div className="text-black font-medium font-medium">{ikhwan.city} • {ikhwan.age} th • {ikhwanDetail?.profession}</div>
                    <div className="text-emerald-300 font-black pt-1">
                      Persetujuan: {activeProcess.ikhwanConsent ? '✓ Bismillah Ridho' : 'Belum / Menunggu'}
                    </div>
                  </div>

                  <div className="p-4 bg-[#EBF5FE] rounded-2xl border border-red-400/50 shadow-depth-sm space-y-1">
                    <span className="text-red-400 font-black uppercase tracking-wider text-[10px]">Kandidat Akhwat</span>
                    <div className="font-black text-black text-sm">{akhwat.fullName}</div>
                    <div className="text-black font-medium font-medium">{akhwat.city} • {akhwat.age} th • {akhwatDetail?.profession}</div>
                    <div className="text-emerald-300 font-black pt-1">
                      Persetujuan: {activeProcess.akhwatConsent ? '✓ Bismillah Ridho' : 'Belum / Menunggu'}
                    </div>
                    <div className="text-[11px] text-black font-medium font-medium">Wali: {akhwatDetail?.waliName} ({akhwatDetail?.waliPhone})</div>
                  </div>
                </div>

                {/* Nazhar Info if scheduled */}
                {activeProcess.nazharDate && (
                  <div className="p-4 bg-[#EBF5FE] rounded-2xl border border-[#064E3B] text-xs text-black flex items-center justify-between gap-4 shadow-depth-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                        <strong className="text-black">Jadwal Nazhar Terkonfirmasi:</strong> {activeProcess.nazharDate} pukul {activeProcess.nazharTime || '10:00 WIB'}
                        <div className="text-[11px] text-black font-medium font-medium">{activeProcess.nazharLocation}</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-[#064E3B] text-emerald-200 border border-emerald-400/40 rounded-md font-black text-[10px] shadow-depth-sm">
                      Wali Mendampingi
                    </span>
                  </div>
                )}
              </div>

              {/* Mediation Supervision & Guidance Chat with Layered Depth */}
              <div className="bg-white rounded-3xl border border-[#064E3B]/60 shadow-depth-md overflow-hidden flex flex-col h-[500px]">
                <div className="bg-[#EBF5FE] text-black p-4 flex items-center justify-between text-xs border-b border-[#064E3B]/60 shadow-depth-sm">
                  <div className="font-bold flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span className="font-black">Ruang Tanya Jawab Terarah (Pengawasan Mediator)</span>
                  </div>
                  <span className="text-black font-medium font-bold">{currentMessages.length} Pesan Terekam</span>
                </div>

                <div className="flex-1 p-5 overflow-y-auto space-y-3 bg-[#EBF5FE] text-xs">
                  {currentMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-3.5 rounded-2xl max-w-lg space-y-1 shadow-depth-sm ${
                        msg.senderRole === 'mediator'
                          ? 'bg-white text-amber-200 border border-amber-400/50 mx-auto w-full'
                          : msg.senderRole === 'ikhwan'
                          ? 'bg-white text-blue-200 border border-blue-400/40 mr-auto'
                          : 'bg-white text-red-200 border border-red-400/40 ml-auto'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-black opacity-80">
                        <span>{msg.senderName}</span>
                        <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="text-[10px] uppercase font-bold text-emerald-300">Topik: {msg.topic}</div>
                      <p className="leading-relaxed whitespace-pre-wrap font-medium text-black">{msg.content}</p>
                    </div>
                  ))}
                </div>

                {/* Post Advice Form */}
                <form onSubmit={handleSendAdvice} className="p-4 bg-[#EBF5FE] border-t border-[#064E3B]/60 flex items-center gap-2">
                  <input
                    type="text"
                    required
                    value={mediatorMsg}
                    onChange={(e) => setMediatorMsg(e.target.value)}
                    placeholder="Berikan arahan / nasihat mediator syar'i kepada kedua calon..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-[#0284C7] bg-white text-xs focus:outline-none focus:border-emerald-400 text-black placeholder:text-black font-medium font-medium"
                  />
                  <button
                    type="submit"
                    className="btn-depth-emerald px-5 py-2.5 text-black font-black rounded-xl text-xs flex items-center gap-1.5 shadow-depth-sm transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-emerald-200" />
                    <span>Kirim Arahan</span>
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl border border-[#064E3B]/60 text-center text-black font-medium">
              Pilih salah satu kasus ta'aruf untuk membuka konsol pengawasan.
            </div>
          )}
        </div>
      </div>

      {/* MODAL SCHEDULE NAZHAR */}
      {showNazharModal && activeProcess && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-[#064E3B] rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-depth-lg text-black">
            <div className="flex items-center justify-between border-b border-[#064E3B]/60 pb-3">
              <h3 className="font-serif text-lg font-bold text-black">
                Tetapkan Jadwal Pertemuan Nazhar
              </h3>
              <button
                onClick={() => setShowNazharModal(false)}
                className="text-black font-medium hover:text-black text-xs font-bold cursor-pointer"
              >
                Tutup
              </button>
            </div>

            <form onSubmit={handleSaveNazharSchedule} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="font-bold text-black font-medium">Tanggal Pertemuan *</label>
                <input
                  type="date"
                  required
                  value={nazharDate}
                  onChange={(e) => setNazharDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#0284C7] bg-[#EBF5FE] text-black focus:border-emerald-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-black font-medium">Waktu / Jam Pertemuan *</label>
                <input
                  type="text"
                  required
                  value={nazharTime}
                  onChange={(e) => setNazharTime(e.target.value)}
                  placeholder="Contoh: 10:00 WIB"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#0284C7] bg-[#EBF5FE] text-black focus:border-emerald-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-black font-medium">Lokasi Pertemuan Resmi (Tempat Terjaga) *</label>
                <input
                  type="text"
                  required
                  value={nazharLocation}
                  onChange={(e) => setNazharLocation(e.target.value)}
                  placeholder="Contoh: Kediaman Wali Akhwat di Rawamangun, Jakarta Timur"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#0284C7] bg-[#EBF5FE] text-black focus:border-emerald-400 focus:outline-none"
                />
              </div>

              <div className="p-3 bg-[#EBF5FE] rounded-xl border border-[#064E3B] text-xs text-emerald-300">
                Wali nasab pihak akhwat dan mediator wajib mendampingi pertemuan ini.
              </div>

              <button
                type="submit"
                className="btn-depth-emerald w-full py-3 text-black font-bold rounded-xl text-xs sm:text-sm shadow-depth-sm transition-all cursor-pointer"
              >
                Konfirmasi & Simpan Jadwal Nazhar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
