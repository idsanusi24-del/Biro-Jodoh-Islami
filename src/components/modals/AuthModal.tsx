import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  HeartHandshake, 
  ShieldCheck, 
  LogIn, 
  X, 
  Sparkles, 
  User, 
  Lock,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  setCurrentTab: (tab: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, setCurrentTab }) => {
  const { signInWithGoogle, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      await signInWithGoogle();
      onClose();
      setCurrentTab('dashboard');
    } catch (err) {
      console.error(err);
      setError('Kendala autentikasi Google. Pastikan koneksi internet stabil atau izinkan jendela popup pada peramban Anda.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border-2 border-[#0284C7] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-depth-lg relative space-y-6 text-black">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-black hover:bg-sky-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 text-black" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#BAE6FD] border-2 border-[#0284C7] text-black flex items-center justify-center mx-auto shadow-depth-md">
            <HeartHandshake className="w-6 h-6 text-black" />
          </div>
          <h3 className="font-serif text-2xl font-black text-black tracking-tight">
            Masuk ke Akun Mawaddah
          </h3>
          <p className="text-xs text-black font-bold max-w-sm mx-auto leading-relaxed">
            Masuk secara aman menggunakan Akun Google untuk mengakses biodata, status verifikasi, rekomendasi ta'aruf, dan ruang mediasi.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-[#FECDD3] border-2 border-[#B91C1C] text-black text-xs font-black rounded-xl">
            {error}
          </div>
        )}

        {/* Primary Google Login Button */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-white hover:bg-sky-50 border-2 border-[#0284C7] text-black font-black rounded-xl text-sm flex items-center justify-center gap-3 shadow-depth-sm transition-all cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
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
            <span>{isLoading ? 'Menghubungkan...' : 'Masuk dengan Akun Google'}</span>
          </button>
        </div>

        {/* Info Privasi & Keamanan Masuk */}
        <div className="bg-[#EBF5FE] p-4 rounded-2xl border-2 border-[#0284C7] space-y-2 text-xs text-black">
          <div className="flex items-center gap-2 font-black">
            <ShieldCheck className="w-4 h-4 text-black" />
            <span>Kerahasiaan & Kepatuhan Syar'i Terjamin</span>
          </div>
          <p className="font-bold leading-relaxed">
            Data pribadi Anda terenkripsi dan terlindungi. Sistem kami tidak pernah membagikan kontak atau data sensitif tanpa persetujuan resmi dan pendampingan mediator.
          </p>
        </div>

        {/* New Member Registration Callout */}
        <div className="text-center pt-2 border-t-2 border-sky-100">
          <p className="text-xs text-black font-bold">
            Belum mendaftar sebagai anggota ta'aruf?{' '}
            <button
              onClick={() => {
                onClose();
                setCurrentTab('register');
              }}
              className="font-black text-black underline cursor-pointer"
            >
              Isi Formulir Pendaftaran Baru
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
