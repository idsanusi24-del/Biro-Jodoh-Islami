import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle, X, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Complaint } from '../../types';

interface ComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComplaintModal: React.FC<ComplaintModalProps> = ({ isOpen, onClose }) => {
  const { fileComplaint } = useAuth();

  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<Complaint['category']>('adab_violation');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !description) return;

    try {
      setIsSubmitting(true);
      await fileComplaint(subject, category, description);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSubject('');
        setDescription('');
        onClose();
      }, 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border-2 border-[#B91C1C] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-depth-lg relative space-y-6 text-black">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-black hover:bg-red-50 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 text-black" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#FECDD3] text-black flex items-center justify-center mx-auto shadow-depth-md border-2 border-[#B91C1C]">
            <ShieldAlert className="w-6 h-6 text-black" />
          </div>
          <h3 className="font-serif text-2xl font-black text-black tracking-tight">
            Form Pengaduan & Laporan Adab
          </h3>
          <p className="text-xs text-black font-bold max-w-sm mx-auto leading-relaxed">
            Kerahasiaan identitas Anda sebagai pelapor dijamin secara mutlak oleh Dewan Etik Mawaddah.
          </p>
        </div>

        {success ? (
          <div className="p-6 bg-[#A7F3D0] rounded-2xl border-2 border-[#064E3B] text-black text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-black mx-auto" />
            <div className="font-serif text-lg font-black text-black">Laporan Berhasil Diterima</div>
            <p className="text-xs text-black font-bold">
              Tim penegak adab Mawaddah akan menindaklanjuti laporan Anda dalam 1x24 jam kerja.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm text-black">
            <div className="space-y-1">
              <label className="font-black text-black">Kategori Pelanggaran *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#B91C1C] bg-white text-black font-bold focus:outline-none"
              >
                <option value="adab_violation">Pelanggaran Adab (Pesan tidak sopan / Mengajak pacaran)</option>
                <option value="privacy_concern">Kekhawatiran Privasi (Data disebarkan pihak lain)</option>
                <option value="unresponsive">Ketidakjujuran Data Biodata / Pemalsuan KTP</option>
                <option value="other">Kendala Teknis atau Administrasi Lain</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-black text-black">Subjek / Perihal Laporan *</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Contoh: Indikasi pengabaian pesan resmi / nomor tidak aktif"
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#B91C1C] bg-white text-black font-bold placeholder:text-stone-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-black text-black">Uraian Kronologis & Bukti Singkat *</label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Jelaskan secara ringkas dan objektif peristiwa yang terjadi..."
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#B91C1C] bg-white text-black font-bold placeholder:text-stone-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-depth-red w-full py-3 text-black font-black rounded-xl text-xs sm:text-sm shadow-depth-sm transition-all cursor-pointer"
            >
              {isSubmitting ? 'Mengirimkan Laporan...' : 'Kirim Laporan Resmi ke Admin'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
