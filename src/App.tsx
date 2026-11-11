import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { GuidePage } from './components/pages/GuidePage';
import { ArticlesPage } from './components/pages/ArticlesPage';
import { FAQPage } from './components/pages/FAQPage';
import { RegisterPage } from './components/pages/RegisterPage';
import { PrivacyPolicyPage } from './components/pages/PrivacyPolicyPage';
import { TermsPage } from './components/pages/TermsPage';
import { MemberDashboard } from './components/dashboard/MemberDashboard';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { MediatorDashboard } from './components/dashboard/MediatorDashboard';
import { AuthModal } from './components/modals/AuthModal';
import { ComplaintModal } from './components/modals/ComplaintModal';
import { UserRole } from './types';
import { Lock } from 'lucide-react';

function MainApp() {
  const { currentUser, articles } = useAuth();
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [complaintModalOpen, setComplaintModalOpen] = useState<boolean>(false);

  // Render Dashboard based on current user role
  const renderDashboard = () => {
    if (!currentUser) {
      return (
        <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-white border-2 border-[#0284C7] flex items-center justify-center mx-auto shadow-depth-md">
            <Lock className="w-8 h-8 text-black" />
          </div>
          <h2 className="font-serif text-3xl font-black text-black">Akses Dashboard Anggota</h2>
          <p className="text-sm text-black font-bold max-w-sm mx-auto leading-relaxed">
            Halaman ini khusus untuk anggota terdaftar. Silakan masuk dengan Akun Google Anda atau daftar ta'aruf baru untuk mengakses dashboard.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setAuthModalOpen(true)}
              className="btn-depth-emerald px-6 py-2.5 text-black font-black rounded-xl text-sm cursor-pointer"
            >
              Masuk Akun
            </button>
            <button
              onClick={() => setCurrentTab('register')}
              className="bg-white hover:bg-sky-50 border-2 border-[#0284C7] px-6 py-2.5 text-black font-black rounded-xl text-sm shadow-depth-sm cursor-pointer"
            >
              Daftar Ta'aruf Baru
            </button>
          </div>
        </div>
      );
    }

    if (currentUser.role === 'admin') {
      return <AdminDashboard />;
    }
    if (currentUser.role === 'mediator') {
      return <MediatorDashboard />;
    }
    return <MemberDashboard />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#BEE3FB] text-black font-sans selection:bg-[#0284C7] selection:text-white">
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        openAuthModal={() => setAuthModalOpen(true)}
        openComplaintModal={() => setComplaintModalOpen(true)}
      />

      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            setCurrentTab={setCurrentTab}
            articles={articles}
            openAuthModal={() => setAuthModalOpen(true)}
          />
        )}
        {currentTab === 'about' && <AboutPage setCurrentTab={setCurrentTab} />}
        {currentTab === 'guide' && <GuidePage setCurrentTab={setCurrentTab} />}
        {currentTab === 'articles' && <ArticlesPage setCurrentTab={setCurrentTab} />}
        {currentTab === 'faq' && (
          <FAQPage
            setCurrentTab={setCurrentTab}
            openComplaintModal={() => setComplaintModalOpen(true)}
          />
        )}
        {currentTab === 'register' && <RegisterPage setCurrentTab={setCurrentTab} />}
        {currentTab === 'dashboard' && renderDashboard()}
        {currentTab === 'privacy' && <PrivacyPolicyPage setCurrentTab={setCurrentTab} />}
        {currentTab === 'terms' && <TermsPage setCurrentTab={setCurrentTab} />}
      </main>

      <Footer
        setCurrentTab={setCurrentTab}
        openComplaintModal={() => setComplaintModalOpen(true)}
      />

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        setCurrentTab={setCurrentTab}
      />

      <ComplaintModal
        isOpen={complaintModalOpen}
        onClose={() => setComplaintModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
