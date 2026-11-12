import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  HeartHandshake, 
  ShieldCheck, 
  X, 
  Mail,
  ArrowRight,
  AlertCircle,
  Lock
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  setCurrentTab: (tab: string) => void;
  openAdminModal?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  setCurrentTab,
  openAdminModal 
}) => {
  const { signInWithGoogle, signInMember, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState<string>('');
  const [isEmailSubmitting, setIsEmailSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      await signInWithGoogle();
      onClose();
      setCurrentTab('dashboard');
    } catch (err: unknown) {
      console.error(err);
      const errObj = err as { code?: string; message?: string };
      const code = errObj?.code || '';
      const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'domain ini';

      if (code === 'auth/unauthorized-domain') {
        setError(
          `Domain "${currentHost}" belum didaftarkan di Firebase Authentication. Silakan gunakan opsi "Masuk dengan Email Peserta" di bawah untuk akses langsung tanpa hambatan.`
        );
      } else if (code === 'auth/popup-blocked') {
        setError(
          'Jendela popup login diblokir oleh peramban Anda. Silakan izinkan popup untuk situs ini, atau gunakan opsi "Masuk dengan Email Peserta" di bawah.'
        );
      } else if (code === 'auth/popup-closed-by-user') {
        setError(
          'Jendela login ditutup sebelum proses selesai. Anda juga dapat masuk langsung menggunakan alamat email peserta di bawah.'
        );
      } else {
        setError(
          'Gagal menghubungkan Google Auth. Anda dapat masuk langsung menggunakan alamat email peserta di bawah ini.'
        );
      }
    }
  };

  const handleMemberEmailSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!emailInput.trim()) {
      setError('Silakan masukkan alamat email yang valid.');
      return;
    }
    try {
      setIsEmailSubmitting(true);
      setError(null);
      await signInMember(emailInput.trim());
      onClose();
      setCurrentTab('dashboard');
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : 'Terjadi kendala saat masuk akun.';
      setError(msg);
    } finally {
      setIsEmailSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border-2 border-[#0284C7] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-depth-lg relative space-y-5 text-black max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-black hover:bg-sky-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 text-black" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-1.5">
          <div className="w-12 h-12 rounded-2xl bg-[#BAE6FD] border-2 border-[#0284C7] text-black flex items-center justify-center mx-auto shadow-depth-md">
            <HeartHandshake className="w-6 h-6 text-black" />
          </div>
          <h3 className="font-serif text-2xl font-black text-black tracking-tight">
            Masuk Akun Peserta Ta'aruf
          </h3>
          <p className="text-xs text-black font-bold max-w-sm mx-auto leading-relaxed">
            Khusus calon anggota ikhwan & akhwat untuk mengakses biodata syar'i, tawaran jodoh, dan mediasi resmi.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-[#FECDD3] border-2 border-[#B91C1C] text-black text-xs font-bold rounded-xl space-y-1 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-[#B91C1C] shrink-0 mt-0.5" />
            <div className="leading-snug">{error}</div>
          </div>
        )}

        {/* Primary Google Login Button */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading || isEmailSubmitting}
            className="w-full py-3 px-4 bg-white hover:bg-sky-50 border-2 border-[#0284C7] text-black font-black rounded-xl text-sm flex items-center justify-center gap-3 shadow-depth-sm transition-all cursor-pointer"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
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
            <span>{isLoading ? 'Menghubungkan...' : 'Masuk Akun Peserta via Google'}</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t-2 border-sky-200"></div>
          <span className="flex-shrink mx-3 text-xs font-black text-black uppercase tracking-wider">
            atau masuk via email peserta
          </span>
          <div className="flex-grow border-t-2 border-sky-200"></div>
        </div>

        {/* Member Email Login Form */}
        <form onSubmit={handleMemberEmailSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-black text-black mb-1">
              Alamat Email Peserta Terdaftar:
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="email.peserta@example.com"
                className="w-full px-3.5 py-2.5 pl-10 border-2 border-[#0284C7] rounded-xl text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#0284C7]"
              />
              <Mail className="w-4 h-4 text-black absolute left-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isEmailSubmitting}
            className="w-full py-2.5 px-4 bg-[#0284C7] hover:bg-[#0369A1] text-white font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-depth-sm transition-all cursor-pointer"
          >
            <span>{isEmailSubmitting ? 'Memproses...' : 'Masuk Akun Peserta'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Info Privasi & Keamanan Masuk */}
        <div className="bg-[#EBF5FE] p-3 rounded-2xl border-2 border-[#0284C7] space-y-1 text-xs text-black">
          <div className="flex items-center gap-2 font-black">
            <ShieldCheck className="w-4 h-4 text-black shrink-0" />
            <span>Kerahasiaan & Kepatuhan Syar'i Terjamin</span>
          </div>
          <p className="font-bold text-[11px] leading-relaxed">
            Data pribadi Anda terenkripsi dan terlindungi. Sistem kami menjaga privasi seluruh data anggota dan hanya digunakan dalam ranah mediasi resmi.
          </p>
        </div>

        {/* Registration Callout */}
        <div className="text-center pt-2 border-t-2 border-sky-100 space-y-2">
          <p className="text-xs text-black font-bold">
            Belum mendaftar sebagai peserta ta'aruf?{' '}
            <button
              onClick={() => {
                onClose();
                setCurrentTab('register');
              }}
              className="font-black text-black underline cursor-pointer hover:text-sky-700"
            >
              Daftar Anggota Baru
            </button>
          </p>

          {/* Discreet Owner/Admin portal link */}
          {openAdminModal && (
            <div className="pt-1">
              <button
                onClick={() => {
                  onClose();
                  openAdminModal();
                }}
                className="text-[11px] text-stone-600 hover:text-black font-bold inline-flex items-center gap-1 cursor-pointer"
              >
                <Lock className="w-3 h-3 text-stone-500" />
                <span>Khusus Pengurus Lembaga? Buka Portal Admin</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
