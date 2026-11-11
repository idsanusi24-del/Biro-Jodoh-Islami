import { UserProfile, MemberDetail, TaarufProcess, TaarufMessage, Article, AuditLog, NotificationItem, WaliVerificationRecord } from '../types';

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user-admin-1',
    uid: 'user-admin-1',
    email: 'idsanusi24@gmail.com',
    fullName: 'Ust. H. Abdullah Mansur, Lc., M.A.',
    gender: 'ikhwan',
    role: 'admin',
    registrationNumber: 'MWD-ADM-001',
    verificationStatus: 'verified',
    phoneNumber: '+62 811-2233-4401',
    city: 'Jakarta Selatan',
    age: 42,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-01-10T08:00:00Z',
  },
  {
    id: 'user-mediator-1',
    uid: 'user-mediator-1',
    email: 'salman.mediator@mawaddah.id',
    fullName: 'Ust. Salman Al-Farisi, S.Sos.I',
    gender: 'ikhwan',
    role: 'mediator',
    registrationNumber: 'MWD-MED-002',
    verificationStatus: 'verified',
    phoneNumber: '+62 812-9988-7702',
    city: 'Depok',
    age: 38,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-01-15T09:30:00Z',
  },
  {
    id: 'user-ikhwan-1',
    uid: 'user-ikhwan-1',
    email: 'rizky.fauzan@gmail.com',
    fullName: 'Rizky Fauzan Pratama, S.T.',
    gender: 'ikhwan',
    role: 'ikhwan',
    registrationNumber: 'MWD-2026-IKH-0042',
    verificationStatus: 'verified',
    phoneNumber: '+62 813-1122-3344',
    city: 'Jakarta Selatan',
    age: 28,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-02-01T10:00:00Z',
  },
  {
    id: 'user-akhwat-1',
    uid: 'user-akhwat-1',
    email: 'fatimah.azzahra@gmail.com',
    fullName: 'Fatimah Az-Zahra, S.Farm., Apt.',
    gender: 'akhwat',
    role: 'akhwat',
    registrationNumber: 'MWD-2026-AKH-0089',
    verificationStatus: 'verified',
    phoneNumber: '+62 812-3344-5566',
    city: 'Jakarta Timur',
    age: 26,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-02-05T14:20:00Z',
  },
  {
    id: 'user-ikhwan-2',
    uid: 'user-ikhwan-2',
    email: 'ahmad.zaki@gmail.com',
    fullName: 'Ahmad Zaki Mubarak, M.Sc.',
    gender: 'ikhwan',
    role: 'ikhwan',
    registrationNumber: 'MWD-2026-IKH-0045',
    verificationStatus: 'verified',
    phoneNumber: '+62 815-6677-8899',
    city: 'Bandung',
    age: 30,
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-02-10T11:00:00Z',
  },
  {
    id: 'user-akhwat-2',
    uid: 'user-akhwat-2',
    email: 'nisa.khairunnisa@gmail.com',
    fullName: 'Khairunnisa Humaira, S.Pd.',
    gender: 'akhwat',
    role: 'akhwat',
    registrationNumber: 'MWD-2026-AKH-0094',
    verificationStatus: 'pending',
    phoneNumber: '+62 817-4455-6677',
    city: 'Bogor',
    age: 25,
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-02-18T16:45:00Z',
  }
];

export const INITIAL_MEMBER_DETAILS: Record<string, MemberDetail> = {
  'user-ikhwan-1': {
    userId: 'user-ikhwan-1',
    birthPlace: 'Yogyakarta',
    birthDate: '1998-05-14',
    heightCm: 174,
    weightKg: 68,
    maritalStatus: 'single',
    childrenCount: 0,
    education: 'S1 Teknik Informatika (Universitas Gadjah Mada)',
    profession: 'Senior Software Engineer di BUMN Finansial',
    financialNotes: 'Alhamdulillah mandiri secara finansial, memiliki tabungan persiapan mahar dan tempat tinggal sewa/mandiri.',
    waliName: 'Drs. H. Bambang Pratama (Ayah Kandung)',
    waliRelation: 'Ayah Kandung',
    waliPhone: '+62 811-7788-9900',
    isWaliReady: true,
    religiousStudy: 'Kajian rutin Fikih Munakahat Masjid Al-Azhar, manhaj ahlussunnah wal jamaah, menjaga ibadah wajib.',
    prayerHabit: 'Selalu shalat 5 waktu berjamaah di masjid, rutin shalat dhuha dan tahajjud semampu ikhtiar.',
    quranMemorization: '3 Juz (Juz 28, 29, 30)',
    isSmoker: false,
    marriageVision: 'Membangun baiti jannati, keluarga sakinah mawaddah wa rahmah yang saling mendukung dalam menuntut ilmu syar\'i dan mendidik anak-anak menjadi generasi shalih hafidz Qur\'an.',
    partnerCriteria: 'Muslimah yang menjaga aurat secara syar\'i, berakhlak mulia, patuh pada syariat, mencintai majelis ilmu, usia 23-27 tahun, siap berdiskusi dengan lapang dada.',
    readinessTimeline: '3_to_6_months',
    isPhotoBlurred: true,
    termsAgreed: true,
  },
  'user-akhwat-1': {
    userId: 'user-akhwat-1',
    birthPlace: 'Surabaya',
    birthDate: '2000-09-20',
    heightCm: 162,
    weightKg: 52,
    maritalStatus: 'single',
    childrenCount: 0,
    education: 'Profesi Apoteker (Universitas Indonesia)',
    profession: 'Apoteker Penanggung Jawab di RS Islam Jakarta',
    financialNotes: 'Bekerja secara profesional, siap memprioritaskan keluarga dan ridho suami setelah menikah.',
    waliName: 'H. Ahmad Syarifuddin (Ayah Kandung)',
    waliRelation: 'Ayah Kandung',
    waliPhone: '+62 812-4455-6688',
    isWaliReady: true,
    religiousStudy: 'Aktif di majelis tafsir akhwat, belajar tajwid bersanad, mengamalkan adab islami dalam keseharian.',
    prayerHabit: 'Shalat awal waktu di rumah/musholla, istiqomah tilawah minimal 1 juz per hari, puasa sunnah senin kamis.',
    quranMemorization: '5 Juz (Juz 1, 2, 28, 29, 30)',
    isSmoker: false,
    marriageVision: 'Menjadikan pernikahan sebagai sarana mendekatkan diri kepada Allah Ta\'ala, berkhidmat kepada suami dengan keikhlasan, dan mewujudkan rumah tangga yang tentram.',
    partnerCriteria: 'Ikhwan shalih yang menjaga shalat 5 waktu di masjid, tidak merokok sama sekali, bertanggung jawab sebagai qawwam, berakhlak lembut dan sabar, usia 26-32 tahun.',
    readinessTimeline: '3_to_6_months',
    isPhotoBlurred: true,
    termsAgreed: true,
  },
  'user-ikhwan-2': {
    userId: 'user-ikhwan-2',
    birthPlace: 'Bandung',
    birthDate: '1996-03-12',
    heightCm: 178,
    weightKg: 72,
    maritalStatus: 'single',
    childrenCount: 0,
    education: 'S2 Data Science (ITB)',
    profession: 'Lead Data Analyst',
    financialNotes: 'Mandiri finansial, memiliki rumah cicilan syariah.',
    waliName: 'Drs. H. Mulyadi',
    waliRelation: 'Ayah Kandung',
    waliPhone: '+62 813-8899-0011',
    isWaliReady: true,
    religiousStudy: 'Kajian sirah nabawiyah rutin akhir pekan.',
    prayerHabit: 'Berjamaah 5 waktu di masjid dekat kantor dan rumah.',
    quranMemorization: '2 Juz',
    isSmoker: false,
    marriageVision: 'Membangun peradaban mulia dimulai dari rumah tangga yang harmonis.',
    partnerCriteria: 'Muslimah santun, berhijab syar\'i, penyayang anak.',
    readinessTimeline: 'under_3_months',
    isPhotoBlurred: true,
    termsAgreed: true,
  },
  'user-akhwat-2': {
    userId: 'user-akhwat-2',
    birthPlace: 'Bogor',
    birthDate: '2001-11-04',
    heightCm: 158,
    weightKg: 50,
    maritalStatus: 'single',
    childrenCount: 0,
    education: 'S1 Pendidikan Bahasa Arab',
    profession: 'Pengajar di Islamic Boarding School',
    financialNotes: 'Mandiri dan bersahaja.',
    waliName: 'Ustadz Mansur Hidayat',
    waliRelation: 'Ayah Kandung',
    waliPhone: '+62 816-1122-3344',
    isWaliReady: true,
    religiousStudy: 'Tahsin dan bahasa Arab dasar.',
    prayerHabit: 'Shalat tepat waktu, zikir pagi petang rutin.',
    quranMemorization: '4 Juz',
    isSmoker: false,
    marriageVision: 'Mencetak anak-anak yang mencintai Al-Qur\'an dan beradab luhur.',
    partnerCriteria: 'Ikhwan pekerja keras, jujur, berilmu dan siap membimbing.',
    readinessTimeline: '3_to_6_months',
    isPhotoBlurred: true,
    termsAgreed: true,
  }
};

export const INITIAL_TAARUF_PROCESSES: TaarufProcess[] = [
  {
    id: 'process-mw-101',
    ikhwanId: 'user-ikhwan-1',
    akhwatId: 'user-akhwat-1',
    mediatorId: 'user-mediator-1',
    status: 'active_mediation',
    ikhwanConsent: true,
    akhwatConsent: true,
    ikhwanConsentDate: '2026-02-12T10:15:00Z',
    akhwatConsentDate: '2026-02-13T14:30:00Z',
    nazharDate: '2026-02-28',
    nazharTime: '10:00 WIB',
    nazharLocation: 'Kediaman Wali Akhwat (dengan pendampingan Ayah & Mediator)',
    nazharGuardianAccompany: true,
    mediatorNotes: 'Kedua pihak telah mempelajari biodata masing-masing dan menyatakan ridho untuk melanjutkan ke sesi tanya-jawab terarah. Adab dan kerahasiaan dijaga dengan baik.',
    matchScore: 94,
    matchReasons: [
      'Kriteria usia dan domisili Jakarta sangat cocok',
      'Target waktu menikah sama-sama 3-6 bulan',
      'Komitmen ibadah, shalat awal waktu & hafalan Al-Qur\'an selaras',
      'Wali kedua pihak telah terverifikasi dan siap mendampingi'
    ],
    createdAt: '2026-02-10T08:00:00Z',
    updatedAt: '2026-02-14T11:00:00Z'
  }
];

export const INITIAL_MESSAGES: TaarufMessage[] = [
  {
    id: 'msg-01',
    processId: 'process-mw-101',
    senderId: 'user-mediator-1',
    senderName: 'Ust. Salman Al-Farisi (Mediator)',
    senderRole: 'mediator',
    topic: 'Pembukaan Sesi Tanya-Jawab Terarah',
    content: 'Bismillahir Rahmanir Rahim. Assalamu\'alaikum warahmatullah. Ahlan wa sahlan kepada Akhi Rizky dan Ukhti Fatimah beserta wali. Forum ini adalah wasilah resmi untuk saling mengajukan pertanyaan prinsipil seputar visi rumah tangga, kesiapan nafkah, peran suami-istri, dan komitmen ibadah. Dilarang menggunakan panggilan mesra, bergurau berlebihan, atau mengirim pesan pribadi di luar forum ini.',
    isApprovedByMediator: true,
    createdAt: '2026-02-13T15:00:00Z'
  },
  {
    id: 'msg-02',
    processId: 'process-mw-101',
    senderId: 'user-ikhwan-1',
    senderName: 'Akhi Rizky Fauzan (Ikhwan)',
    senderRole: 'ikhwan',
    topic: 'Visi Rumah Tangga & Domisili Pasca Menikah',
    content: 'Assalamu\'alaikum wa rahmatullah. Terima kasih Ustadz Salman. Izin bertanya kepada Ukhti Fatimah dan bapak wali: Bagaimana pandangan Ukhti terkait domisili pasca menikah? Karena kantor ana berada di Jakarta Selatan, ana berencana mengontrak rumah mandiri di area Pancoran/Tebet yang dekat masjid dan akses kerja. Apakah pihak keluarga berkenan?',
    isApprovedByMediator: true,
    createdAt: '2026-02-13T16:20:00Z'
  },
  {
    id: 'msg-03',
    processId: 'process-mw-101',
    senderId: 'user-akhwat-1',
    senderName: 'Ukhti Fatimah Az-Zahra (Akhwat)',
    senderRole: 'akhwat',
    topic: 'Respon Domisili & Aktivitas Profesional',
    content: 'Wa\'alaikumussalam wa rahmatullah. Alhamdulillah setelah berdiskusi dengan Ayahanda, pihak keluarga menyetujui rencana tinggal mandiri di area tersebut karena dekat dengan masjid. Izin bertanya balik mengenai kelanjutan profesi kefarmasian ana: Apakah Akhi mengizinkan ana tetap berkontribusi di RS dengan jadwal yang disesuaikan agar kewajiban utama di rumah tetap terlaksana?',
    isApprovedByMediator: true,
    createdAt: '2026-02-14T09:15:00Z'
  },
  {
    id: 'msg-04',
    processId: 'process-mw-101',
    senderId: 'user-mediator-1',
    senderName: 'Ust. Salman Al-Farisi (Mediator)',
    senderRole: 'mediator',
    topic: 'Nasihat Mediator',
    content: 'Masya Allah, diskusi yang sangat substantif dan santun. Pembahasan mengenai domisili mandiri dan pembagian waktu kerja sangat penting sebelum melangkah ke tahap Nazhar. Silakan Akhi Rizky menanggapi dengan lugas dan jujur.',
    isApprovedByMediator: true,
    createdAt: '2026-02-14T10:00:00Z'
  }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-01',
    slug: 'hakikat-taaruf-vs-pacaran-dalam-islam',
    title: 'Hakikat Ta\'aruf vs Pacaran: Memahami Garis Batas Syariat',
    category: 'Konsep & Syariat',
    summary: 'Mengapa Islam mengharamkan pacaran dan mensyariatkan ta\'aruf? Menelaah perbedaan esensial dari niat, adab, keterlibatan wali, hingga perlindungan izzah.',
    content: [
      'Islam adalah agama yang menjunjung tinggi kehormatan manusia. Hubungan antara laki-laki dan perempuan bukan muhrim diatur secara tegas bukan untuk mengekang fitrah, melainkan untuk menjaga kesucian hati, nasab, dan kehormatan keluarga.',
      'Pacaran berlandaskan hawa nafsu, seringkali dipenuhi janji manis tanpa kepastian hukum, penuh dengan kemaksiatan khalwat (berdua-duaan) dan ikhtilath (berbaur tanpa batas). Sementara ta\'aruf adalah ikhtiar legal yang memiliki tujuan jelas: menjemput pernikahan yang berkah.',
      'Dalam ta\'aruf syar\'i, tidak ada istilah "jalan bareng berdua", panggilan mesra, atau chatting non-urgensi larut malam. Segala proses dilakukan secara transparan, melibatkan wali nasab, dan didampingi mediator terpercaya agar tidak ada pihak yang terluka atau terfitnah.'
    ],
    quranVerse: {
      arabic: 'وَلَا تَقْرَبُوا الزِّنَىٰ ۖ إِنَّهُ كَانَ فَاحِشَةً وَسَاءَ سَبِيلًا',
      surah: 'QS. Al-Isra\': 32',
      translation: 'Dan janganlah kamu mendekati zina; (zina) itu sungguh suatu perbuatan keji, dan suatu jalan yang buruk.'
    },
    author: 'Dewan Syariah Mawaddah',
    readTime: '5 menit',
    publishedAt: '2026-01-20',
    featured: true
  },
  {
    id: 'art-02',
    slug: 'kriteria-memilih-pasangan-menurut-rasulullah',
    title: '4 Kriteria Memilih Pasangan Menurut Rasulullah ﷺ: Mengapa Agama Menjadi Kunci',
    category: 'Edukasi Pernikahan',
    summary: 'Bedah hadits shahih tentang harta, nasab, rupa, dan agama. Mengapa memilih karena agama menjamin keselamatan dunia dan akhirat.',
    content: [
      'Dari Abu Hurairah radhiyallahu \'anhu, dari Nabi shallallahu \'alaihi wa sallam, beliau bersabda: "Wanita dinikahi karena empat perkara: karena hartanya, karena keturunannya, karena kecantikannya, dan karena agamanya. Maka pilihlah wanita yang memiliki agama, niscaya engkau akan beruntung." (HR. Bukhari dan Muslim).',
      'Harta bisa habis dalam sekejap, kecantikan fisik memudar seiring usia, dan status nasab tidak menjamin akhlak yang luhur. Namun pemahaman dan ketaatan kepada agama adalah modal abadi yang menjaga keutuhan rumah tangga saat badai ujian datang.',
      'Pasangan yang takut kepada Allah tidak akan menzalimi pasangannya saat marah, dan akan memperlakukannya dengan penuh kasih sayang saat ridho.'
    ],
    quranVerse: {
      arabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
      surah: 'QS. Ar-Rum: 21',
      translation: 'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang.'
    },
    author: 'Ust. H. Abdullah Mansur, Lc., M.A.',
    readTime: '6 menit',
    publishedAt: '2026-01-28',
    featured: true
  },
  {
    id: 'art-03',
    slug: 'adab-dan-panduan-nazhar-yang-syari',
    title: 'Adab Nazhar yang Benar: Melihat Calon Pasangan Tanpa Melanggar Syariat',
    category: 'Panduan Praktis',
    summary: 'Nazhar adalah anjuran sunnah sebelum melangkah ke khitbah. Ketahui batas yang boleh dilihat, busana, tempat, dan adab menjaga pandangan.',
    content: [
      'Ketika seorang sahabat bernama Mughirah bin Syu\'bah hendak melamar seorang wanita, Rasulullah ﷺ bersabda kepadanya: "Lihatlah wanita itu, karena yang demikian itu lebih pantas untuk melanggengkan kasih sayang di antara kalian berdua." (HR. Tirmidzi).',
      'Para ulama ahlussunnah sepakat bahwa nazhar dianjurkan ketika sudah ada keseriusan dan saling cocok pada data biodata. Namun nazhar bukanlah kencan bebas.',
      'Syarat wajib nazhar: Harus didampingi oleh mahram (seperti ayah, paman, atau saudara laki-laki), dilakukan di tempat yang terhormat (misalnya kediaman pihak wanita), dan bagian tubuh yang boleh dilihat sebatas wajah dan kedua telapak tangan menurut jumhur ulama.'
    ],
    author: 'Tim Konsultan Fikih Mawaddah',
    readTime: '4 menit',
    publishedAt: '2026-02-02'
  },
  {
    id: 'art-04',
    slug: 'persiapan-finansial-dan-mental-menikah',
    title: 'Menata Finansial & Mental: Bukan Soal Mewah, Tapi Kesiapan Qawwam & Amanah',
    category: 'Kesiapan Hidup',
    summary: 'Berapa tabungan yang ideal untuk menikah? Bagaimana merencanakan nafkah lahir batin secara realistis dan berlandaskan tawakkal.',
    content: [
      'Menikah bukan sekadar pesta satu malam, melainkan perjalanan ibadah terpanjang seumur hidup. Kesiapan finansial bagi seorang ikhwan tidak berarti harus sudah menjadi miliarder atau memiliki rumah megah.',
      'Yang diwajibkan oleh syariat adalah kemauan bekerja keras mencari nafkah halal, tidak berpangku tangan, dan memiliki perhitungan realistis untuk kebutuhan primer: sandang, pangan, dan tempat tinggal yang layak.',
      'Bagi calon istri, kesiapan mental meliputi kesiapan untuk qana\'ah (merasa cukup dengan rizki yang halal), saling menguatkan, dan menjadi madrasah pertama bagi putra-putri tercinta.'
    ],
    author: 'Konselor Keluarga Sakinah',
    readTime: '7 menit',
    publishedAt: '2026-02-06'
  },
  {
    id: 'art-05',
    slug: 'peran-vital-wali-nikah-dalam-islam',
    title: 'Peran Vital Wali Nikah: Mengapa Tanpa Ridho Wali Pernikahan Tidak Sah',
    category: 'Fikih Munakahat',
    summary: 'Mengenal urutan wali nikah yang sah, peran perlindungan ayah bagi putrinya, dan mengapa Mawaddah melibatkan wali sejak awal.',
    content: [
      'Rasulullah ﷺ menegaskan dalam hadits shahih: "Tidak sah pernikahan tanpa adanya wali dan dua orang saksi yang adil." (HR. Ahmad dan Abu Dawud).',
      'Wali bukan sekadar formalitas ijab qabul di hari H. Wali adalah benteng perlindungan pertama seorang muslimah dari calon pasangan yang tidak amanah. Inilah mengapa dalam sistem Mawaddah, nomor dan kesiapan wali diverifikasi sejak proses awal ta\'aruf.'
    ],
    author: 'Ust. Salman Al-Farisi, S.Sos.I',
    readTime: '5 menit',
    publishedAt: '2026-02-10'
  },
  {
    id: 'art-06',
    slug: 'adab-saat-tidak-cocok-dalam-taaruf',
    title: 'Adab Menghentikan Ta\'aruf: Menolak dengan Santun Tanpa Menyakiti Hati',
    category: 'Adab & Akhlak',
    summary: 'Jodoh adalah ketetapan takdir. Jika di tengah proses merasa belum ada kemantapan hati, begini cara syar\'i menyampaikannya melalui mediator.',
    content: [
      'Bila setelah membaca biodata, menjalani mediasi, atau bahkan pasca-nazhar seorang anggota merasa belum ada kemantapan hati, tidak ada paksaan dalam syariat Islam untuk melanjutkan.',
      'Namun adab seorang muslim adalah menyampaikannya secara santun melalui mediator resmi, mendoakan kebaikan bagi kandidat tersebut, dan menjaga kerahasiaan aib atau kekurangan yang mungkin terlihat selama proses.',
      'Jangan pernah "ghosting", menghilang tiba-tiba, atau menyebarkan informasi calon kepada orang lain karena hal tersebut melanggar amanah dan hukum syariat.'
    ],
    author: 'Dewan Etik Mawaddah',
    readTime: '4 menit',
    publishedAt: '2026-02-12'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    actorId: 'user-admin-1',
    actorName: 'Ust. H. Abdullah Mansur (Admin)',
    action: 'Verifikasi Berkas Anggota',
    details: 'Memverifikasi data KTP dan kontak wali untuk anggota MWD-2026-IKH-0042 (Rizky Fauzan)',
    targetId: 'user-ikhwan-1',
    timestamp: '2026-02-02T11:00:00Z'
  },
  {
    id: 'log-2',
    actorId: 'user-admin-1',
    actorName: 'Ust. H. Abdullah Mansur (Admin)',
    action: 'Pencocokan & Pengajuan Taaruf',
    details: 'Admin mencocokkan kriteria MWD-2026-IKH-0042 dengan MWD-2026-AKH-0089 dan membuat kasus process-mw-101',
    targetId: 'process-mw-101',
    timestamp: '2026-02-10T08:00:00Z'
  },
  {
    id: 'log-3',
    actorId: 'user-mediator-1',
    actorName: 'Ust. Salman Al-Farisi (Mediator)',
    action: 'Membuka Ruang Mediasi',
    details: 'Membuka sesi tanya-jawab resmi setelah kedua pihak menyetujui lembar CV anonim',
    targetId: 'process-mw-101',
    timestamp: '2026-02-13T15:00:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'user-ikhwan-1',
    title: 'Berkas Pendaftaran Terverifikasi Resmi',
    message: 'Alhamdulillah, berkas pendaftaran dan data wali nasab Anda telah diverifikasi resmi oleh Admin.',
    type: 'verification',
    isRead: true,
    linkTab: 'profile',
    createdAt: '2026-02-02T11:00:00Z'
  },
  {
    id: 'notif-2',
    userId: 'user-ikhwan-1',
    title: 'Tawaran Kandidat Ta\'aruf Baru (#process-mw-101)',
    message: 'Admin telah mengajukan rekomendasi pasangan dengan tingkat kecocokan kriteria 94%. Silakan tinjau lembar CV anonim.',
    type: 'taaruf_offer',
    isRead: false,
    linkTab: 'taaruf',
    createdAt: '2026-02-10T08:05:00Z'
  },
  {
    id: 'notif-3',
    userId: 'user-ikhwan-1',
    title: 'Ruang Mediasi Resmi Dibuka',
    message: 'Kedua pihak telah menyatakan ridho. Forum tanya jawab terarah telah dibuka di bawah bimbingan Ust. Salman Al-Farisi.',
    type: 'mediation_msg',
    isRead: false,
    linkTab: 'mediation',
    createdAt: '2026-02-13T15:05:00Z'
  },
  {
    id: 'notif-4',
    userId: 'user-ikhwan-1',
    title: 'Jadwal Nazhar Tatap Muka Telah Ditetapkan',
    message: 'Pertemuan Nazhar bersama wali nasab telah dijadwalkan pada 28 Februari 2026 pukul 10:00 WIB.',
    type: 'nazhar_schedule',
    isRead: false,
    linkTab: 'taaruf',
    createdAt: '2026-02-14T11:15:00Z'
  },
  {
    id: 'notif-5',
    userId: 'user-akhwat-1',
    title: 'Tawaran Kandidat Ta\'aruf Baru (#process-mw-101)',
    message: 'Admin telah mencocokkan kriteria Anda dengan Ikhwan S1 Teknik Informatika (28 th). Silakan pelajari biodata anonim.',
    type: 'taaruf_offer',
    isRead: false,
    linkTab: 'taaruf',
    createdAt: '2026-02-10T08:05:00Z'
  },
  {
    id: 'notif-6',
    userId: 'user-admin-1',
    title: 'Pendaftaran Baru Menunggu Verifikasi',
    message: 'Anggota baru Khairunnisa Humaira, S.Pd. (MWD-2026-AKH-0094) menunggu verifikasi kontak wali.',
    type: 'system',
    isRead: false,
    linkTab: 'overview',
    createdAt: '2026-02-18T16:50:00Z'
  }
];

export const INITIAL_WALI_LOGS: WaliVerificationRecord[] = [
  {
    id: 'wali-log-1',
    userId: 'user-ikhwan-1',
    memberName: 'Rizky Fauzan Pratama',
    waliName: 'Drs. H. Bambang Pratama',
    waliPhone: '+62 811-7788-9900',
    method: 'telepon_resmi',
    officerName: 'Ust. H. Abdullah Mansur',
    notes: 'Telah berkomunikasi via telepon. Ayah kandung mengonfirmasi merestui ikhtiar ananda dan siap hadir mendampingi.',
    isConfirmedReady: true,
    timestamp: '2026-02-02T10:30:00Z'
  },
  {
    id: 'wali-log-2',
    userId: 'user-akhwat-1',
    memberName: 'Fatimah Az-Zahra',
    waliName: 'H. Ahmad Syarifuddin',
    waliPhone: '+62 812-4455-6688',
    method: 'telepon_resmi',
    officerName: 'Ust. H. Abdullah Mansur',
    notes: 'Ayahanda bersedia menerima kunjungan nazhar di rumah dengan pendampingan keluarga dan mediator.',
    isConfirmedReady: true,
    timestamp: '2026-02-06T13:45:00Z'
  }
];

export const FAQ_LIST = [
  {
    q: 'Apakah Mawaddah adalah aplikasi kencan atau dating app?',
    a: 'Sama sekali BUKAN. Mawaddah adalah platform biro ta\'aruf syar\'i berlandaskan Al-Qur\'an dan As-Sunnah. Tidak ada fitur swiping, tidak ada chatting bebas antar anggota tanpa perantara, dan tidak memfasilitasi pacaran. Seluruh interaksi dikurasi admin dan dipandu oleh mediator yang amanah.'
  },
  {
    q: 'Bagaimana Mawaddah menjaga kerahasiaan data dan foto pribadi saya?',
    a: 'Data kontak pribadi (Nomor WhatsApp, alamat rumah lengkap, identitas sensitif) disembunyikan secara ketat dan hanya diketahui oleh Admin serta Mediator terpercaya. Foto profil buram secara default dan hanya dibuka saat tahap pertukaran biodata resmi dengan izin kedua belah pihak.'
  },
  {
    q: 'Kapan keluarga atau wali nasab mulai dilibatkan?',
    a: 'Wali dilibatkan sejak awal pendaftaran dengan pengisian data kontak wali dan konfirmasi kesiapan wali. Saat proses tanya-jawab terarah dan pertemuan Nazhar langsung, kehadiran mahram/wali merupakan kewajiban syar\'i.'
  },
  {
    q: 'Berapa biaya pendaftaran di Biro Ta\'aruf Mawaddah?',
    a: 'Pendaftaran dasar dan edukasi bersifat gratis sebagai khidmat dakwah kemudahan menikah. Untuk proses mediasi intensif dan pendampingan nazhar, biro menerapkan infaq operasional sukarela yang transparan guna menjaga kualitas verifikasi berkas.'
  },
  {
    q: 'Bagaimana jika saya tidak merasa cocok dengan kandidat yang ditawarkan?',
    a: 'Anda memiliki hak penuh untuk menolak secara santun melalui mediator. Penolakan disampaikan dengan adab islami, saling mendoakan kebaikan, dan tidak ada paksaan sama sekali.'
  }
];
