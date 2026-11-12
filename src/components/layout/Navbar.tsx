import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  HeartHandshake, 
  Menu, 
  X, 
  User, 
  LogOut, 
  LogIn, 
  Bell, 
  ShieldCheck, 
  Sparkles,
  Users,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { UserRole } from '../../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openAuthModal: () => void;
  openAdminAuthModal?: () => void;
  openComplaintModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  openAuthModal,
  openAdminAuthModal,
  openComplaintModal,
}) => {
  const { 
    currentUser, 
    logout, 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead,
    orgSettings
  } = useAuth();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const userNotifications = notifications.filter(
    (n) => n.userId === currentUser?.id || n.userId === 'ALL'
  );
  const unreadNotificationsCount = userNotifications.filter((n) => !n.isRead).length;

  const navLinks = [
    { id: 'home', label: 'Beranda' },
    { id: 'about', label: 'Tentang Kami' },
    { id: 'guide', label: 'Panduan Ta\'aruf' },
    { id: 'articles', label: 'Artikel Edukasi' },
    { id: 'faq', label: 'FAQ' },
  ];

  const getRoleBadge = (role: UserRole) => {
    switch(role) {
      case 'admin':
        return <span className="bg-[#BAE6FD] text-black text-xs px-2.5 py-0.5 rounded-full font-bold border border-[#0284C7]">Admin Utama</span>;
      case 'mediator':
        return <span className="bg-[#A7F3D0] text-black text-xs px-2.5 py-0.5 rounded-full font-bold border border-[#064E3B]">Mediator Syar'i</span>;
      case 'ikhwan':
        return <span className="bg-[#BAE6FD] text-black text-xs px-2.5 py-0.5 rounded-full font-bold border border-[#0284C7]">Ikhwan</span>;
      case 'akhwat':
        return <span className="bg-[#FECDD3] text-black text-xs px-2.5 py-0.5 rounded-full font-bold border border-[#B91C1C]">Akhwat</span>;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#BAE6FD]/95 backdrop-blur-md border-b-2 border-[#0284C7] shadow-depth-md">
      {/* Top Banner Ribbon in Biru Laut */}
      <div className="bg-[#7DD3FC] text-black px-4 py-1.5 text-xs border-b border-[#0284C7] shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-serif italic font-bold text-black drop-shadow-xs">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
            <span className="hidden sm:inline text-black/60 font-bold">|</span>
            <span className="hidden sm:inline text-black font-bold">"Menjemput Jodoh dengan Ikhtiar, Menjaga Hati dengan Syariat"</span>
          </div>

          {/* Official Contact Info */}
          <div className="flex items-center gap-4 ml-auto text-[11px] font-black">
            <a 
              href={`https://wa.me/${orgSettings.whatsappClean}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-black hover:underline"
            >
              <span className="hidden md:inline">Layanan Informasi:</span>
              <span>WA {orgSettings.whatsappNumber}</span>
            </a>
            <button
              onClick={openComplaintModal}
              className="text-[#B91C1C] hover:underline font-black cursor-pointer"
            >
              Pengaduan Adab
            </button>
            {openAdminAuthModal && (
              <button
                onClick={openAdminAuthModal}
                className="hidden sm:inline-flex items-center gap-1 text-[10px] text-black/70 hover:text-black font-black hover:underline cursor-pointer border-l border-black/20 pl-3"
                title="Gerbang Khusus Pengurus & Pemilik Lembaga"
              >
                <span>Portal Admin</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setCurrentTab('home')}
          >
            <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#064E3B] flex items-center justify-center text-black shadow-depth-md group-hover:scale-105 transition-all relative overflow-hidden">
              <HeartHandshake className="w-7 h-7 text-black relative z-10" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl font-black tracking-tight text-black drop-shadow-xs">
                  MAWADDAH
                </span>
                <span className="text-xs bg-[#FECDD3] text-black border-2 border-[#B91C1C] px-2 py-0.5 rounded-md font-serif font-black shadow-2xs">
                  مَوَدَّة
                </span>
              </div>
              <p className="text-xs font-black text-black tracking-wider">
                BIRO TA'ARUF ISLAMI
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setCurrentTab(link.id)}
                className={`px-4 py-2 rounded-xl text-sm font-black transition-all ${
                  currentTab === link.id
                    ? 'text-black bg-[#6EE7B7] border-2 border-[#064E3B] shadow-sm'
                    : 'text-black hover:bg-white/70'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons & Profile */}
          <div className="hidden sm:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                {/* Notification Bell Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                    className="p-2.5 rounded-xl text-black hover:bg-white/80 transition-colors relative border-2 border-[#0284C7] bg-white shadow-sm"
                    title="Notifikasi Proses Ta'aruf"
                  >
                    <Bell className="w-5 h-5 text-black" />
                    {unreadNotificationsCount > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-[#FECDD3] text-black border border-[#B91C1C] rounded-full text-[10px] font-black flex items-center justify-center shadow-xs">
                        {unreadNotificationsCount}
                      </span>
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {notifDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-depth-lg border-2 border-[#0284C7] z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                      <div className="p-4 bg-[#BAE6FD] text-black flex items-center justify-between border-b-2 border-[#0284C7]">
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4 text-black" />
                          <span className="font-serif font-black text-sm text-black">Pemberitahuan Resmi</span>
                        </div>
                        {unreadNotificationsCount > 0 && (
                          <button
                            onClick={markAllNotificationsAsRead}
                            className="text-[11px] text-black hover:underline font-black"
                          >
                            Tandai semua dibaca
                          </button>
                        )}
                      </div>

                      <div className="max-h-80 overflow-y-auto divide-y divide-sky-100 text-xs">
                        {userNotifications.length === 0 ? (
                          <div className="p-6 text-center text-black font-semibold">
                            Belum ada notifikasi baru.
                          </div>
                        ) : (
                          userNotifications.map((notif) => (
                            <div
                              key={notif.id}
                              onClick={() => {
                                markNotificationAsRead(notif.id);
                                setCurrentTab('dashboard');
                                setNotifDropdownOpen(false);
                              }}
                              className={`p-3.5 hover:bg-sky-50 cursor-pointer transition-colors space-y-1 ${
                                !notif.isRead ? 'bg-[#E0F2FE] border-l-4 border-[#0284C7]' : ''
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-black text-black">
                                  {notif.title}
                                </span>
                                {!notif.isRead && (
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#B91C1C]"></span>
                                )}
                              </div>
                              <p className="text-black text-[11px] line-clamp-2 leading-relaxed">
                                {notif.message}
                              </p>
                              <div className="text-[10px] text-black font-bold flex items-center gap-1">
                                <Clock className="w-3 h-3 text-black" />
                                {new Date(notif.createdAt).toLocaleDateString([], { day: 'numeric', month: 'short' })}
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      <div className="p-2.5 bg-[#BAE6FD] border-t border-[#0284C7] text-center text-[11px]">
                        <button
                          onClick={() => {
                            setCurrentTab('dashboard');
                            setNotifDropdownOpen(false);
                          }}
                          className="text-black font-black hover:underline"
                        >
                          Buka Dashboard Lengkap
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Dashboard Button */}
                <button
                  onClick={() => setCurrentTab('dashboard')}
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-xl border-2 text-sm font-black transition-all shadow-depth-sm active:translate-y-0.5 ${
                    currentTab === 'dashboard'
                      ? 'bg-[#6EE7B7] text-black border-[#064E3B]'
                      : 'bg-white text-black border-[#064E3B] hover:bg-sky-50'
                  }`}
                >
                  <div className="w-7 h-7 rounded-full bg-[#6EE7B7] text-black flex items-center justify-center text-xs overflow-hidden shadow-inner border border-[#064E3B]">
                    {currentUser.avatarUrl ? (
                      <img src={currentUser.avatarUrl} alt={currentUser.fullName} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-4 h-4 text-black" />
                    )}
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-black leading-tight line-clamp-1 text-black">{currentUser.fullName}</div>
                    <div className="text-[10px] text-black font-black">Dashboard {currentUser.role.toUpperCase()}</div>
                  </div>
                </button>

                <button
                  onClick={logout}
                  title="Keluar"
                  className="p-2.5 text-black hover:bg-red-100 rounded-xl border border-red-300 transition-colors"
                >
                  <LogOut className="w-5 h-5 text-black" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={openAuthModal}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-black text-black bg-white hover:bg-sky-50 border-2 border-[#0284C7] shadow-sm transition-colors cursor-pointer"
                >
                  <LogIn className="w-4 h-4 text-black" />
                  Masuk Peserta
                </button>
                <button
                  onClick={() => setCurrentTab('register')}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-black text-black bg-[#6EE7B7] hover:bg-[#34D399] border-2 border-[#064E3B] btn-depth-emerald transition-all"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  Daftar Ta'aruf
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {currentUser && unreadNotificationsCount > 0 && (
              <button 
                onClick={() => setCurrentTab('dashboard')}
                className="p-2 text-black relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#B91C1C] rounded-full"></span>
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-black hover:bg-sky-200 border border-sky-400"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#BAE6FD] border-b-2 border-[#0284C7] px-4 pt-2 pb-6 space-y-3 text-black">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-md text-base font-bold ${
                  currentTab === link.id
                    ? 'bg-[#6EE7B7] text-black font-black border border-[#064E3B]'
                    : 'text-black hover:bg-white/60'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#0284C7]">
            {currentUser ? (
              <div className="space-y-2">
                <div className="p-3 bg-white rounded-lg flex items-center justify-between border-2 border-[#064E3B]">
                  <div>
                    <div className="font-black text-sm text-black">{currentUser.fullName}</div>
                    <div className="text-xs text-black font-semibold">{currentUser.email}</div>
                  </div>
                  {getRoleBadge(currentUser.role)}
                </div>
                <button
                  onClick={() => {
                    setCurrentTab('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-4 bg-[#6EE7B7] text-black border-2 border-[#064E3B] rounded-xl text-sm font-black flex items-center justify-center gap-2"
                >
                  Buka Dashboard
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 px-4 border-2 border-[#B91C1C] bg-[#FECDD3] text-black rounded-xl text-sm font-black flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4 text-black" />
                  Keluar
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    openAuthModal();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-4 bg-white border-2 border-[#0284C7] text-black rounded-xl text-sm font-black flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4 text-black" />
                  Masuk Akun
                </button>
                <button
                  onClick={() => {
                    setCurrentTab('register');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-4 bg-[#6EE7B7] border-2 border-[#064E3B] text-black rounded-xl text-sm font-black flex items-center justify-center gap-2 shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  Daftar Ta'aruf Baru
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
