import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  ShieldCheck, 
  Crown, 
  X, 
  KeyRound, 
  Mail, 
  ArrowRight, 
  AlertCircle,
  Eye,
  EyeOff,
  Lock
} from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  setCurrentTab: (tab: string) => void;
  openMemberModal?: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ 
  isOpen, 
  onClose, 
  setCurrentTab,
  openMemberModal 
}) => {
  const { signInAdmin, signInWithGoogle, isLoading } = useAuth();
  const [adminEmail, setAdminEmail] = useState<string>('');
  const [passkey, setPasskey] = useState<string>('');
  const [showPasskey, setShowPasskey] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleAdminEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkey.trim()) {
      setError('Masukkan Kode Keamanan / Passkey Pengurus.');
      return;
    }

    // If email is left empty, default to owner email secretly
    const targetEmail = adminEmail.trim() || 'idsanusi24@gmail.com';

    try {
      setIsSubmitting(true);
      setError(null);
      await signInAdmin(targetEmail, passkey.trim());
      onClose();
      setCurrentTab('dashboard');
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : 'Gagal memverifikasi kredensial pengelola.';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleAdminSignIn = async () => {
    try {
      setError(null);
      await signInWithGoogle();
      onClose();
      setCurrentTab('dashboard');
    } catch (err: unknown) {
      console.error(err);
      setError('Koneksi Google terhalang atau domain belum terverifikasi. Masukkan kode keamanan di bawah.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border-3 border-amber-600 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-depth-lg relative space-y-5 text-black max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-black hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 text-black" />
        </button>

        {/* Header Khusus Pengurus */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 border-2 border-amber-600 text-black flex items-center justify-center mx-auto shadow-depth-md">
            <Crown className="w-7 h-7 text-amber-700" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-black text-[11px] font-black border border-amber-500">
            <Lock className="w-3 h-3 text-amber-700" />
            <span>Portal Tertutup Khusus Pengurus</span>
          </div>
          <h3 className="font-serif text-2xl font-black text-black tracking-tight">
            Gerbang Masuk Super Admin
          </h3>
          <p className="text-xs text-black font-bold max-w-sm mx-auto leading-relaxed">
            Akses khusus pemilik dan dewan pengurus untuk mengelola data anggota, memverifikasi wali, dan memandu mediasi ta'aruf.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-[#FECDD3] border-2 border-[#B91C1C] text-black text-xs font-bold rounded-xl flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-[#B91C1C] shrink-0 mt-0.5" />
            <div className="leading-snug">{error}</div>
          </div>
        )}

        {/* Form Otentikasi Admin Mandiri */}
        <form onSubmit={handleAdminEmailSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-black text-black mb-1">
              Email Pengurus (Opsional jika memasukkan Passkey):
            </label>
            <div className="relative">
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="email-pengurus@domain.com"
                className="w-full px-3.5 py-2.5 pl-10 border-2 border-amber-500 rounded-xl text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/40"
              />
              <Mail className="w-4 h-4 text-black absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-black text-black">
                Kode Keamanan / Passkey Pengurus:
              </label>
            </div>
            <div className="relative">
              <input
                type={showPasskey ? 'text' : 'password'}
                required
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="Masukkan kode rahasia pengurus"
                className="w-full px-3.5 py-2.5 pl-10 pr-10 border-2 border-amber-500 rounded-xl text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/40"
              />
              <KeyRound className="w-4 h-4 text-black absolute left-3.5 top-3" />
              <button
                type="button"
                onClick={() => setShowPasskey(!showPasskey)}
                className="absolute right-3.5 top-2.5 text-black hover:text-stone-700 cursor-pointer"
              >
                {showPasskey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 border-2 border-amber-700 text-black font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-depth-sm transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isSubmitting ? 'Memverifikasi...' : 'Verifikasi & Buka Panel Admin'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Atau Masuk Lewat Google Pemilik */}
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t-2 border-stone-200"></div>
          <span className="flex-shrink mx-3 text-[10px] font-black text-stone-600 uppercase tracking-wider">
            atau masuk via Google Pemilik
          </span>
          <div className="flex-grow border-t-2 border-stone-200"></div>
        </div>

        <button
          onClick={handleGoogleAdminSignIn}
          disabled={isLoading || isSubmitting}
          className="w-full py-2.5 px-4 bg-white hover:bg-amber-50 border-2 border-stone-300 text-black font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-depth-sm transition-all cursor-pointer"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Masuk dengan Akun Google Pemilik Lembaga</span>
        </button>

        {/* Footer switch to Member Login */}
        <div className="text-center pt-2 border-t-2 border-stone-100">
          <p className="text-xs text-black font-bold">
            Bukan Pengurus Lembaga?{' '}
            <button
              onClick={() => {
                onClose();
                if (openMemberModal) openMemberModal();
              }}
              className="font-black text-black underline cursor-pointer hover:text-emerald-800"
            >
              Masuk sebagai Peserta Ta'aruf
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
