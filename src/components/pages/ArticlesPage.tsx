import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Article } from '../../types';
import { 
  BookOpen, 
  Search, 
  Clock, 
  User, 
  ChevronRight, 
  ArrowLeft, 
  Share2, 
  Bookmark,
  Sparkles 
} from 'lucide-react';

interface ArticlesPageProps {
  setCurrentTab: (tab: string) => void;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({ setCurrentTab }) => {
  const { articles } = useAuth();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', 'Konsep & Syariat', 'Edukasi Pernikahan', 'Panduan Praktis', 'Kesiapan Hidup', 'Fikih Munakahat', 'Adab & Akhlak'];

  const filteredArticles = articles.filter(art => {
    const matchesCat = selectedCategory === 'Semua' || art.category === selectedCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-black">
        <button
          onClick={() => setSelectedArticle(null)}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-black bg-white hover:bg-sky-50 px-4 py-2.5 rounded-xl border-2 border-[#0284C7] shadow-depth-sm transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-black" />
          <span>Kembali ke Daftar Artikel</span>
        </button>

        <article className="bg-white p-6 sm:p-12 rounded-3xl border-2 border-[#0284C7] shadow-depth-lg space-y-8 text-black">
          <div className="space-y-4 border-b-2 border-sky-100 pb-6">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="bg-[#BAE6FD] text-black font-black px-3 py-1 rounded-full border border-[#0284C7]">
                {selectedArticle.category}
              </span>
              <span className="text-black font-bold">•</span>
              <span className="text-black font-bold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-black" />
                {selectedArticle.readTime}
              </span>
              <span className="text-black font-bold">•</span>
              <span className="text-black font-bold">Dipublikasikan {selectedArticle.publishedAt}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-black text-black leading-tight drop-shadow-xs">
              {selectedArticle.title}
            </h1>

            <div className="flex items-center gap-3 pt-2">
              <div className="w-9 h-9 rounded-full bg-[#6EE7B7] text-black border-2 border-[#064E3B] flex items-center justify-center font-black text-xs shadow-depth-sm">
                {selectedArticle.author.charAt(0)}
              </div>
              <div className="text-xs">
                <div className="font-black text-black">{selectedArticle.author}</div>
                <div className="text-black font-bold">Konsultan & Pembina Syariah Mawaddah</div>
              </div>
            </div>
          </div>

          {/* Quranic Verse Highlight if present */}
          {selectedArticle.quranVerse && (
            <div className="bg-[#EBF5FE] border-2 border-[#0284C7] p-6 sm:p-8 rounded-3xl space-y-4 shadow-depth-md">
              <div className="text-black text-xs font-black uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-black" />
                <span>Dalil Al-Qur'an / Hadits Terkait</span>
              </div>
              <p className="font-serif text-xl sm:text-2xl text-black text-right leading-loose font-black">
                {selectedArticle.quranVerse.arabic}
              </p>
              <p className="text-xs sm:text-sm text-black italic leading-relaxed font-bold">
                "{selectedArticle.quranVerse.translation}"
              </p>
              <div className="text-xs font-black text-[#B91C1C]">
                {selectedArticle.quranVerse.surah}
              </div>
            </div>
          )}

          {/* Article Body */}
          <div className="space-y-4 text-black leading-relaxed text-sm sm:text-base font-bold">
            {selectedArticle.content.map((paragraph, idx) => (
              <p key={idx} className="text-justify sm:text-left">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Footer of Article */}
          <div className="border-t-2 border-sky-100 pt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-black">
            <div className="text-black">
              Artikel ini ditinjau oleh Dewan Syariah Mawaddah
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert('Tautan artikel berhasil disalin!');
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border-2 border-[#0284C7] bg-[#BAE6FD] hover:bg-sky-200 text-black font-black transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-black" />
                <span>Bagikan Kebaikan</span>
              </button>
            </div>
          </div>
        </article>

        {/* Call to action */}
        <div className="bg-white text-black p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-depth-lg border-2 border-[#0284C7]">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-black text-black">Siap Mengamalkan Ilmu Pranikah?</h3>
            <p className="text-xs sm:text-sm text-black mt-1 font-bold">Daftarkan diri Anda untuk proses ta'aruf yang amanah, terarah, dan syar'i.</p>
          </div>
          <button
            onClick={() => setCurrentTab('register')}
            className="btn-depth-red text-black font-black px-6 py-3.5 rounded-2xl text-xs sm:text-sm shadow-depth-md transition-all shrink-0 cursor-pointer"
          >
            Daftar Ta'aruf Sekarang
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-black">
      {/* Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-black border-2 border-[#0284C7] shadow-depth-sm">
          <BookOpen className="w-3.5 h-3.5 text-black" />
          <span>Khazanah Fikih Munakahat & Rumah Tangga</span>
        </div>
        <h1 className="font-serif text-4xl font-black text-black tracking-tight drop-shadow-xs">
          Artikel & Edukasi Pernikahan Islami
        </h1>
        <p className="text-xs sm:text-sm text-black font-bold">
          Membekali ikhwan dan akhwat dengan ilmu syar'i sebelum melangkah ke gerbang rumah tangga sakinah, mawaddah, wa rahmah.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#6EE7B7] text-black shadow-depth-sm border-2 border-[#064E3B]'
                  : 'bg-white text-black hover:bg-sky-50 border-2 border-[#0284C7]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-black absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari topik artikel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border-2 border-[#0284C7] text-xs text-black placeholder:text-stone-600 focus:outline-none focus:border-sky-600 bg-white shadow-depth-sm font-bold"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            onClick={() => setSelectedArticle(art)}
            className="bg-white p-6 rounded-3xl border-2 border-[#0284C7] shadow-depth-md hover:shadow-depth-lg transition-all cursor-pointer flex flex-col justify-between group text-black"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-black font-bold">
                <span className="bg-[#BAE6FD] text-black font-black px-2.5 py-0.5 rounded-md border border-[#0284C7]">
                  {art.category}
                </span>
                <span className="flex items-center gap-1 text-black font-bold">
                  <Clock className="w-3.5 h-3.5 text-black" />
                  {art.readTime}
                </span>
              </div>

              <h3 className="font-serif text-lg font-black text-black group-hover:underline transition-colors line-clamp-2">
                {art.title}
              </h3>

              <p className="text-xs text-black line-clamp-3 leading-relaxed font-bold">
                {art.summary}
              </p>
            </div>

            <div className="pt-4 border-t-2 border-sky-100 flex items-center justify-between text-[11px] text-black mt-4 font-black">
              <span>{art.author}</span>
              <span className="text-black font-black flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Baca Lengkap <ChevronRight className="w-3.5 h-3.5 text-black" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
