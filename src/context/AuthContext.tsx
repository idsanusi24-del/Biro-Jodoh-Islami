import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  MemberDetail, 
  UserRole, 
  TaarufProcess, 
  TaarufMessage, 
  Article, 
  Complaint, 
  AuditLog,
  NotificationItem,
  WaliVerificationRecord,
  OrganizationSettings
} from '../types';
import { 
  INITIAL_USERS, 
  INITIAL_MEMBER_DETAILS, 
  INITIAL_TAARUF_PROCESSES, 
  INITIAL_MESSAGES, 
  INITIAL_ARTICLES, 
  INITIAL_AUDIT_LOGS,
  INITIAL_NOTIFICATIONS,
  INITIAL_WALI_LOGS
} from '../data/initialData';
import { auth, googleProvider, db, testFirestoreConnection } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc, getDocs, collection } from 'firebase/firestore';

interface AuthContextType {
  currentUser: UserProfile | null;
  currentDetail: MemberDetail | null;
  allUsers: UserProfile[];
  allDetails: Record<string, MemberDetail>;
  taarufProcesses: TaarufProcess[];
  messages: TaarufMessage[];
  articles: Article[];
  complaints: Complaint[];
  auditLogs: AuditLog[];
  notifications: NotificationItem[];
  userNotifications: NotificationItem[];
  unreadNotificationsCount: number;
  waliVerificationRecords: WaliVerificationRecord[];
  isLoading: boolean;
  isFirebaseConnected: boolean;
  orgSettings: OrganizationSettings;
  updateOrgSettings: (settings: Partial<OrganizationSettings>) => Promise<void>;
  
  // Actions
  switchDemoRole: (role: UserRole) => void;
  signInWithGoogle: () => Promise<void>;
  signInWithEmailDirect: (email: string) => Promise<UserProfile>;
  signInMember: (email: string) => Promise<UserProfile>;
  signInAdmin: (email: string, passkey: string) => Promise<UserProfile>;
  logout: () => Promise<void>;
  registerNewMember: (basic: Partial<UserProfile>, detail: Partial<MemberDetail>) => Promise<UserProfile>;
  updateUserProfile: (profile: Partial<UserProfile>) => Promise<void>;
  updateMemberDetail: (detail: Partial<MemberDetail>) => Promise<void>;
  
  // Taaruf Actions
  respondToMatch: (processId: string, consent: boolean) => Promise<void>;
  createTaarufRecommendation: (ikhwanId: string, akhwatId: string, matchScore: number, matchReasons: string[]) => Promise<TaarufProcess>;
  updateTaarufStatus: (processId: string, newStatus: TaarufProcess['status'], notes?: string) => Promise<void>;
  scheduleNazhar: (processId: string, date: string, time: string, location: string) => Promise<void>;
  submitNazharDecision: (processId: string, decision: 'lanjut_khitbah' | 'mundur_santun', reasonNotes?: string) => Promise<void>;
  sendMediatedMessage: (processId: string, topic: string, content: string) => Promise<void>;
  
  // Admin & Verification Actions
  verifyMember: (userId: string, status: 'verified' | 'rejected' | 'revising', waliNotes?: string) => Promise<void>;
  addWaliVerificationRecord: (record: Omit<WaliVerificationRecord, 'id' | 'timestamp'>) => Promise<void>;
  addArticle: (article: Omit<Article, 'id' | 'publishedAt'>) => Promise<void>;
  fileComplaint: (subject: string, category: Complaint['category'], description: string) => Promise<void>;
  addAuditLog: (action: string, details: string, targetId?: string) => void;
  
  // Notifications
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  sendNotification: (notif: Omit<NotificationItem, 'id' | 'createdAt'>) => void;
  
  // Export Data
  exportMembersToCSV: () => string;
  exportProcessesToCSV: () => string;
}

const DEFAULT_ORG_SETTINGS: OrganizationSettings = {
  officeAddress: 'Gedung Dakwah Mawaddah, Jl. Warung Buncit Raya No. 42, Jakarta Selatan',
  whatsappNumber: '+62 811-2233-4401',
  whatsappClean: '6281122334401',
  csEmail: 'amanah@mawaddah.id'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orgSettings, setOrgSettings] = useState<OrganizationSettings>(() => {
    try {
      const saved = localStorage.getItem('mawaddah_org_settings');
      return saved ? JSON.parse(saved) : DEFAULT_ORG_SETTINGS;
    } catch {
      return DEFAULT_ORG_SETTINGS;
    }
  });
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('mawaddah_active_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [currentDetail, setCurrentDetail] = useState<MemberDetail | null>(() => {
    try {
      const saved = localStorage.getItem('mawaddah_active_detail');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [allUsers, setAllUsers] = useState<UserProfile[]>(() => {
    try {
      const saved = localStorage.getItem('mawaddah_custom_users');
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });
  const [allDetails, setAllDetails] = useState<Record<string, MemberDetail>>(() => {
    try {
      const saved = localStorage.getItem('mawaddah_custom_details');
      return saved ? JSON.parse(saved) : INITIAL_MEMBER_DETAILS;
    } catch {
      return INITIAL_MEMBER_DETAILS;
    }
  });
  const [taarufProcesses, setTaarufProcesses] = useState<TaarufProcess[]>(() => {
    try {
      const saved = localStorage.getItem('mawaddah_custom_processes');
      return saved ? JSON.parse(saved) : INITIAL_TAARUF_PROCESSES;
    } catch {
      return INITIAL_TAARUF_PROCESSES;
    }
  });
  const [messages, setMessages] = useState<TaarufMessage[]>(INITIAL_MESSAGES);
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [waliVerificationRecords, setWaliVerificationRecords] = useState<WaliVerificationRecord[]>(INITIAL_WALI_LOGS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState<boolean>(false);

  // Persistence effects
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('mawaddah_active_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('mawaddah_active_user');
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentDetail) {
      localStorage.setItem('mawaddah_active_detail', JSON.stringify(currentDetail));
    } else {
      localStorage.removeItem('mawaddah_active_detail');
    }
  }, [currentDetail]);

  useEffect(() => {
    localStorage.setItem('mawaddah_custom_users', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem('mawaddah_custom_details', JSON.stringify(allDetails));
  }, [allDetails]);

  useEffect(() => {
    localStorage.setItem('mawaddah_custom_processes', JSON.stringify(taarufProcesses));
  }, [taarufProcesses]);

  // Notifications filtered for current user
  const userNotifications = notifications.filter(n => 
    currentUser ? (n.userId === currentUser.id || (currentUser.role === 'admin' && n.userId === 'user-admin-1')) : false
  );
  const unreadNotificationsCount = userNotifications.filter(n => !n.isRead).length;

  // Initialize and check Firestore connection
  useEffect(() => {
    let isMounted = true;
    const initFirebase = async () => {
      try {
        const connected = await testFirestoreConnection();
        if (isMounted) setIsFirebaseConnected(connected);
      } catch (err) {
        console.warn('Firebase connection check:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    initFirebase();

    // Listen to Firebase Auth state
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const isAdmin = fbUser.email === 'idsanusi24@gmail.com';
        
        // Try fetching user's latest cloud document from Firestore
        let cloudUser: UserProfile | null = null;
        let cloudDetail: MemberDetail | null = null;

        try {
          const userDocSnap = await getDoc(doc(db, 'users', fbUser.uid));
          if (userDocSnap.exists()) {
            cloudUser = userDocSnap.data() as UserProfile;
          }
          const detailDocSnap = await getDoc(doc(db, 'memberDetails', fbUser.uid));
          if (detailDocSnap.exists()) {
            cloudDetail = detailDocSnap.data() as MemberDetail;
          }
        } catch (e) {
          console.warn('Firestore fetch user note:', e);
        }

        const existing = cloudUser || allUsers.find(u => u.email === fbUser.email);
        if (existing) {
          const userWithCorrectRole: UserProfile = {
            ...existing,
            role: isAdmin ? ('admin' as UserRole) : existing.role,
            verificationStatus: isAdmin ? ('verified' as const) : existing.verificationStatus
          };
          setCurrentUser(userWithCorrectRole);
          const activeDetail = cloudDetail || allDetails[existing.id] || null;
          setCurrentDetail(activeDetail);
        } else {
          const newUser: UserProfile = {
            id: fbUser.uid,
            uid: fbUser.uid,
            email: fbUser.email || 'user@mawaddah.id',
            fullName: fbUser.displayName || 'Calon Anggota Mawaddah',
            gender: 'ikhwan',
            role: isAdmin ? 'admin' : 'ikhwan',
            registrationNumber: `MWD-2026-REG-${Math.floor(1000 + Math.random() * 9000)}`,
            verificationStatus: isAdmin ? 'verified' : 'pending',
            city: 'Jakarta',
            age: 26,
            avatarUrl: fbUser.photoURL || undefined,
            createdAt: new Date().toISOString()
          };
          setAllUsers(prev => [newUser, ...prev]);
          setCurrentUser(newUser);

          // Save new user profile to Firestore
          try {
            await setDoc(doc(db, 'users', fbUser.uid), newUser, { merge: true });
          } catch (e) {
            console.warn('Firestore initial user write note:', e);
          }
        }

        // If admin, sync the entire users directory from Firestore
        if (isAdmin) {
          try {
            const querySnapshot = await getDocs(collection(db, 'users'));
            if (!querySnapshot.empty) {
              const remoteUsers: UserProfile[] = [];
              querySnapshot.forEach(docSnap => {
                remoteUsers.push(docSnap.data() as UserProfile);
              });
              setAllUsers(prev => {
                const combined = [...remoteUsers];
                // Keep local items that are not in remote
                prev.forEach(p => {
                  if (!combined.some(c => c.id === p.id || c.email === p.email)) {
                    combined.push(p);
                  }
                });
                return combined;
              });
            }
          } catch (e) {
            console.warn('Admin Firestore collection sync note:', e);
          }
        }
      } else {
        const saved = localStorage.getItem('mawaddah_active_user');
        if (!saved) {
          setCurrentUser(null);
          setCurrentDetail(null);
        }
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const addAuditLog = (action: string, details: string, targetId?: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      actorId: currentUser ? currentUser.id : 'system',
      actorName: currentUser ? currentUser.fullName : 'Sistem Mawaddah',
      action,
      details,
      targetId,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const sendNotification = (notif: Omit<NotificationItem, 'id' | 'createdAt'>) => {
    const newNotif: NotificationItem = {
      ...notif,
      id: `notif-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    if (!currentUser) return;
    setNotifications(prev => prev.map(n => 
      n.userId === currentUser.id ? { ...n, isRead: true } : n
    ));
  };

  const switchDemoRole = (role: UserRole) => {
    let target = allUsers.find(u => u.role === role);
    if (!target) {
      if (role === 'admin') target = INITIAL_USERS[0];
      else if (role === 'mediator') target = INITIAL_USERS[1];
      else if (role === 'ikhwan') target = INITIAL_USERS[2];
      else target = INITIAL_USERS[3];
    }
    if (target) {
      setCurrentUser(target);
      setCurrentDetail(allDetails[target.id] || null);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const isAdmin = user.email === 'idsanusi24@gmail.com';
      
      const existingUser = allUsers.find(u => u.email === user.email);
      if (existingUser) {
        const userWithRole: UserProfile = {
          ...existingUser,
          role: isAdmin ? 'admin' : existingUser.role,
          verificationStatus: isAdmin ? 'verified' : existingUser.verificationStatus
        };
        setCurrentUser(userWithRole);
        setCurrentDetail(allDetails[existingUser.id] || null);
      } else {
        const newUser: UserProfile = {
          id: user.uid,
          uid: user.uid,
          email: user.email || 'user@mawaddah.id',
          fullName: user.displayName || 'Calon Anggota Mawaddah',
          gender: 'ikhwan',
          role: isAdmin ? 'admin' : 'ikhwan',
          registrationNumber: `MWD-2026-IKH-${Math.floor(1000 + Math.random() * 9000)}`,
          verificationStatus: isAdmin ? 'verified' : 'pending',
          city: 'Jakarta',
          age: 26,
          avatarUrl: user.photoURL || undefined,
          createdAt: new Date().toISOString()
        };
        setAllUsers(prev => [newUser, ...prev]);
        setCurrentUser(newUser);
      }
      addAuditLog('Login Berhasil', `Login menggunakan Google Auth: ${user.email}`);
    } catch (error) {
      console.error('Google Sign In error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithEmailDirect = async (emailInput: string): Promise<UserProfile> => {
    setIsLoading(true);
    try {
      const cleanEmail = emailInput.trim().toLowerCase();
      const isAdmin = cleanEmail === 'idsanusi24@gmail.com';

      // Check existing local users
      let user = allUsers.find(u => u.email.toLowerCase() === cleanEmail);

      // If not found in local state, try fetching from Firestore if connected
      if (!user) {
        try {
          const querySnapshot = await getDocs(collection(db, 'users'));
          querySnapshot.forEach(docSnap => {
            const data = docSnap.data() as UserProfile;
            if (data.email && data.email.toLowerCase() === cleanEmail) {
              user = data;
            }
          });
        } catch (e) {
          console.warn('Direct login Firestore lookup note:', e);
        }
      }

      if (!user) {
        // Create user profile for this valid email
        const newId = isAdmin ? 'user-admin-1' : `user-ikhwan-${Date.now()}`;
        user = {
          id: newId,
          uid: newId,
          email: cleanEmail,
          fullName: isAdmin ? 'Sanusi (Super Admin)' : (cleanEmail.split('@')[0] || 'Anggota Mawaddah'),
          gender: 'ikhwan',
          role: isAdmin ? 'admin' : 'ikhwan',
          registrationNumber: `MWD-2026-${isAdmin ? 'ADM' : 'IKH'}-${Math.floor(1000 + Math.random() * 9000)}`,
          verificationStatus: isAdmin ? 'verified' : 'pending',
          city: 'Jakarta',
          age: 26,
          createdAt: new Date().toISOString()
        };
        setAllUsers(prev => [user!, ...prev]);
      } else if (isAdmin && (user.role !== 'admin' || user.verificationStatus !== 'verified')) {
        user = {
          ...user,
          role: 'admin',
          verificationStatus: 'verified'
        };
        setAllUsers(prev => prev.map(u => u.email.toLowerCase() === cleanEmail ? user! : u));
      }

      setCurrentUser(user);
      setCurrentDetail(allDetails[user.id] || null);
      localStorage.setItem('mawaddah_active_user', JSON.stringify(user));
      addAuditLog('Login Email Berhasil', `Pengguna masuk via email: ${cleanEmail}`);
      return user;
    } finally {
      setIsLoading(false);
    }
  };

  const signInMember = async (emailInput: string): Promise<UserProfile> => {
    setIsLoading(true);
    try {
      const cleanEmail = emailInput.trim().toLowerCase();
      // Block admin email from participant login
      if (cleanEmail === 'idsanusi24@gmail.com') {
        throw new Error('Alamat email ini adalah Akun Khusus Pengelola Lembaga. Silakan gunakan Portal Resmi Pengurus Lembaga untuk masuk.');
      }

      // Check existing local users
      let user = allUsers.find(u => u.email.toLowerCase() === cleanEmail);

      // If not found in local state, try fetching from Firestore if connected
      if (!user) {
        try {
          const querySnapshot = await getDocs(collection(db, 'users'));
          querySnapshot.forEach(docSnap => {
            const data = docSnap.data() as UserProfile;
            if (data.email && data.email.toLowerCase() === cleanEmail) {
              user = data;
            }
          });
        } catch (e) {
          console.warn('Member login Firestore lookup note:', e);
        }
      }

      if (!user) {
        // Create participant profile
        const newId = `user-ikhwan-${Date.now()}`;
        user = {
          id: newId,
          uid: newId,
          email: cleanEmail,
          fullName: cleanEmail.split('@')[0] || 'Calon Anggota Mawaddah',
          gender: 'ikhwan',
          role: 'ikhwan',
          registrationNumber: `MWD-2026-IKH-${Math.floor(1000 + Math.random() * 9000)}`,
          verificationStatus: 'pending',
          city: 'Jakarta',
          age: 26,
          createdAt: new Date().toISOString()
        };
        setAllUsers(prev => [user!, ...prev]);
      } else if (user.role === 'admin') {
        throw new Error('Akun ini memiliki hak akses administrator. Silakan masuk melalui Portal Pengurus Lembaga.');
      }

      setCurrentUser(user);
      setCurrentDetail(allDetails[user.id] || null);
      localStorage.setItem('mawaddah_active_user', JSON.stringify(user));
      addAuditLog('Login Peserta Berhasil', `Peserta ta'aruf masuk: ${cleanEmail}`);
      return user;
    } finally {
      setIsLoading(false);
    }
  };

  const signInAdmin = async (emailInput: string, passkey: string): Promise<UserProfile> => {
    setIsLoading(true);
    try {
      const cleanEmail = emailInput.trim().toLowerCase();
      if (cleanEmail !== 'idsanusi24@gmail.com') {
        throw new Error('Akses Ditolak: Alamat email tidak memiliki otorisasi sebagai Pengelola Lembaga Mawaddah.');
      }

      const validPasskeys = ['mawaddah2026', '123456', 'admin2026', 'sanusi2026'];
      if (!validPasskeys.includes(passkey.trim())) {
        throw new Error('Kode Keamanan / Passkey Pengurus tidak sesuai. Mohon periksa kembali.');
      }

      let user = allUsers.find(u => u.email.toLowerCase() === cleanEmail);
      if (!user) {
        user = {
          id: 'user-admin-1',
          uid: 'user-admin-1',
          email: cleanEmail,
          fullName: 'Sanusi (Super Admin)',
          gender: 'ikhwan',
          role: 'admin',
          registrationNumber: 'MWD-2026-ADM-0001',
          verificationStatus: 'verified',
          city: 'Jakarta',
          age: 30,
          createdAt: new Date().toISOString()
        };
        setAllUsers(prev => [user!, ...prev]);
      } else {
        user = {
          ...user,
          role: 'admin',
          verificationStatus: 'verified'
        };
        setAllUsers(prev => prev.map(u => u.email.toLowerCase() === cleanEmail ? user! : u));
      }

      setCurrentUser(user);
      setCurrentDetail(allDetails[user.id] || null);
      localStorage.setItem('mawaddah_active_user', JSON.stringify(user));
      addAuditLog('Login Super Admin Berhasil', `Pengelola masuk ke panel administrasi: ${cleanEmail}`);
      return user;
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrgSettings = async (newSettings: Partial<OrganizationSettings>) => {
    const updated: OrganizationSettings = {
      ...orgSettings,
      ...newSettings
    };
    if (newSettings.whatsappNumber) {
      updated.whatsappClean = newSettings.whatsappNumber.replace(/[^0-9]/g, '');
    }
    setOrgSettings(updated);
    localStorage.setItem('mawaddah_org_settings', JSON.stringify(updated));
    addAuditLog('Pembaruan Pengaturan Lembaga', `Alamat/WhatsApp lembaga diperbarui oleh admin.`);

    try {
      await setDoc(doc(db, 'settings', 'organization'), updated, { merge: true });
    } catch (e) {
      console.warn('Firestore settings update note:', e);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.log('Firebase signOut handled:', e);
    }
    setCurrentUser(null);
    setCurrentDetail(null);
    localStorage.removeItem('mawaddah_active_user');
    localStorage.removeItem('mawaddah_active_detail');
    addAuditLog('Logout Akun', 'Pengguna keluar dari sistem');
  };

  const registerNewMember = async (
    basic: Partial<UserProfile>, 
    detail: Partial<MemberDetail>
  ): Promise<UserProfile> => {
    const authUid = auth.currentUser?.uid;
    const newId = authUid || `user-${basic.gender || 'ikhwan'}-${Date.now()}`;
    const regNum = `MWD-2026-${basic.gender === 'akhwat' ? 'AKH' : 'IKH'}-${Math.floor(100 + Math.random() * 900)}`;
    const cleanEmail = basic.email 
      ? basic.email.trim().toLowerCase() 
      : (auth.currentUser?.email || `member${Math.floor(Math.random() * 1000)}@mawaddah.id`);
    
    const chosenAvatar = basic.avatarUrl || (basic.gender === 'akhwat' 
      ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' 
      : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80');

    const newUser: UserProfile = {
      id: newId,
      uid: newId,
      email: cleanEmail,
      fullName: basic.fullName || 'Hamba Allah',
      gender: basic.gender || 'ikhwan',
      role: basic.gender === 'akhwat' ? 'akhwat' : 'ikhwan',
      registrationNumber: regNum,
      verificationStatus: 'pending',
      phoneNumber: basic.phoneNumber || '',
      city: basic.city || 'Jakarta',
      age: basic.age || 25,
      avatarUrl: chosenAvatar,
      createdAt: new Date().toISOString()
    };

    const newDetail: MemberDetail = {
      userId: newId,
      birthPlace: detail.birthPlace || 'Indonesia',
      birthDate: detail.birthDate || '1999-01-01',
      heightCm: detail.heightCm || 165,
      weightKg: detail.weightKg || 60,
      maritalStatus: detail.maritalStatus || 'single',
      childrenCount: detail.childrenCount || 0,
      education: detail.education || 'S1',
      profession: detail.profession || 'Profesional',
      financialNotes: detail.financialNotes || '',
      waliName: detail.waliName || 'Wali Nasab',
      waliRelation: detail.waliRelation || 'Ayah Kandung',
      waliPhone: detail.waliPhone || '',
      isWaliReady: detail.isWaliReady ?? true,
      religiousStudy: detail.religiousStudy || 'Kajian sunnah rutin',
      prayerHabit: detail.prayerHabit || 'Menjaga shalat 5 waktu di awal waktu',
      quranMemorization: detail.quranMemorization || '1 Juz',
      isSmoker: detail.isSmoker || false,
      marriageVision: detail.marriageVision || 'Mewujudkan keluarga sakinah mawaddah wa rahmah berlandaskan syariat.',
      partnerCriteria: detail.partnerCriteria || 'Shalih/shalihah, taat beragama, berakhlak mulia, siap saling membimbing.',
      readinessTimeline: detail.readinessTimeline || '3_to_6_months',
      isPhotoBlurred: detail.isPhotoBlurred ?? true,
      avatarUrl: chosenAvatar,
      termsAgreed: true,
      updatedAt: new Date().toISOString()
    };

    setAllUsers(prev => [newUser, ...prev]);
    setAllDetails(prev => ({ ...prev, [newId]: newDetail }));
    setCurrentUser(newUser);
    setCurrentDetail(newDetail);
    localStorage.setItem('mawaddah_active_user', JSON.stringify(newUser));
    localStorage.setItem('mawaddah_active_detail', JSON.stringify(newDetail));

    addAuditLog('Pendaftaran Anggota Baru', `Anggota baru terdaftar: ${newUser.fullName} (${newUser.registrationNumber})`, newId);

    // Notify user
    sendNotification({
      userId: newId,
      title: 'Pendaftaran Berhasil Diterima',
      message: `Bismillah! Formulir Anda telah tercatat dengan No. Registrasi ${newUser.registrationNumber}. Mohon menunggu proses verifikasi berkas dan kontak wali oleh Admin.`,
      type: 'verification',
      isRead: false,
      linkTab: 'profile'
    });

    // Notify Admin
    sendNotification({
      userId: 'user-admin-1',
      title: 'Pendaftaran Anggota Baru Masuk',
      message: `${newUser.fullName} (${newUser.gender.toUpperCase()}) baru saja mendaftar. Silakan verifikasi data wali nasab.`,
      type: 'system',
      isRead: false,
      linkTab: 'overview'
    });

    // Attempt Firestore sync
    try {
      await setDoc(doc(db, 'users', newId), newUser);
      await setDoc(doc(db, 'memberDetails', newId), newDetail);
    } catch (e) {
      console.warn('Firestore sync note:', e);
    }

    return newUser;
  };

  const updateUserProfile = async (profile: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...profile, updatedAt: new Date().toISOString() };
    setCurrentUser(updated);
    setAllUsers(prev => prev.map(u => u.id === currentUser.id ? updated : u));
    addAuditLog('Pembaruan Profil', `Pengguna memperbarui data dasar profil: ${updated.fullName}`, currentUser.id);

    try {
      await setDoc(doc(db, 'users', currentUser.id), updated, { merge: true });
    } catch (e) {
      console.warn('Firestore update note:', e);
    }
  };

  const updateMemberDetail = async (detail: Partial<MemberDetail>) => {
    if (!currentUser) return;
    const updated = { ...(currentDetail || {}), ...detail, userId: currentUser.id, updatedAt: new Date().toISOString() } as MemberDetail;
    setCurrentDetail(updated);
    setAllDetails(prev => ({ ...prev, [currentUser.id]: updated }));
    addAuditLog('Pembaruan Biodata Taaruf', `Biodata syar'i diperbarui oleh ${currentUser.fullName}`, currentUser.id);

    try {
      await setDoc(doc(db, 'memberDetails', currentUser.id), updated, { merge: true });
    } catch (e) {
      console.warn('Firestore detail update note:', e);
    }
  };

  const respondToMatch = async (processId: string, consent: boolean) => {
    if (!currentUser) return;
    const isIkhwan = currentUser.gender === 'ikhwan';

    let processUpdated: TaarufProcess | null = null;

    setTaarufProcesses(prev => prev.map(p => {
      if (p.id !== processId) return p;
      const updated = { ...p };
      if (isIkhwan) {
        updated.ikhwanConsent = consent;
        updated.ikhwanConsentDate = new Date().toISOString();
      } else {
        updated.akhwatConsent = consent;
        updated.akhwatConsentDate = new Date().toISOString();
      }

      if (!consent) {
        updated.status = 'stopped_respectfully';
        updated.stoppedReason = `Dihentikan secara santun oleh pihak ${isIkhwan ? 'Ikhwan' : 'Akhwat'}.`;
      } else if (
        (isIkhwan && updated.akhwatConsent === true) ||
        (!isIkhwan && updated.ikhwanConsent === true)
      ) {
        updated.status = 'approved_by_both';
      }
      updated.updatedAt = new Date().toISOString();
      processUpdated = updated;
      return updated;
    }));

    addAuditLog(
      'Respon Ajuan Taaruf',
      `${currentUser.fullName} (${isIkhwan ? 'Ikhwan' : 'Akhwat'}) menyatakan ${consent ? 'BERKENAN / BISMILLAH SETUJU' : 'MENOLAK DENGAN ADAB SANTUN'} pada berkas ta'aruf.`,
      processId
    );

    // Notify partner and mediator
    if (processUpdated) {
      const p = processUpdated as TaarufProcess;
      const partnerId = isIkhwan ? p.akhwatId : p.ikhwanId;

      if (consent) {
        if (p.status === 'approved_by_both') {
          sendNotification({
            userId: partnerId,
            title: 'Kandidat Telah Menyetujui Bismillah!',
            message: 'Alhamdulillah! Kedua pihak telah menyetujui penawaran ta\'aruf. Ruang mediasi kini telah dibuka oleh Mediator.',
            type: 'mediation_msg',
            isRead: false,
            linkTab: 'mediation'
          });
          sendNotification({
            userId: currentUser.id,
            title: 'Ruang Mediasi Syar\'i Telah Terbuka',
            message: 'Alhamdulillah, kedua pihak saling ridho. Silakan masuk ke Ruang Mediasi untuk memulai tanya-jawab terarah.',
            type: 'mediation_msg',
            isRead: false,
            linkTab: 'mediation'
          });
        } else {
          sendNotification({
            userId: partnerId,
            title: 'Respon Kandidat: Bismillah Berkenan',
            message: `Pihak ${isIkhwan ? 'Ikhwan' : 'Akhwat'} telah menyatakan persetujuan. Menunggu respon dari Anda untuk membuka ruang mediasi.`,
            type: 'taaruf_offer',
            isRead: false,
            linkTab: 'taaruf'
          });
        }
      } else {
        sendNotification({
          userId: partnerId,
          title: 'Pemberitahuan Kasus Ta\'aruf Dihentikan',
          message: 'Pihak kandidat belum memiliki kemantapan hati dan memohon maaf secara santun. Semoga Allah mudahkan ikhtiar berikutnya.',
          type: 'system',
          isRead: false,
          linkTab: 'taaruf'
        });
      }
    }
  };

  const createTaarufRecommendation = async (
    ikhwanId: string, 
    akhwatId: string, 
    matchScore: number, 
    matchReasons: string[]
  ): Promise<TaarufProcess> => {
    const newProcess: TaarufProcess = {
      id: `process-mw-${Date.now().toString().slice(-4)}`,
      ikhwanId,
      akhwatId,
      mediatorId: 'user-mediator-1',
      status: 'proposed_by_admin',
      ikhwanConsent: null,
      akhwatConsent: null,
      matchScore,
      matchReasons,
      mediatorNotes: 'Admin telah memeriksa keselarasan visi hidup, kriteria wali, dan komitmen ibadah kedua pihak.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setTaarufProcesses(prev => [newProcess, ...prev]);
    addAuditLog('Rekomendasi Taaruf Dibuat', `Admin mengajukan rekomendasi pasangan antara ${ikhwanId} dan ${akhwatId}`, newProcess.id);

    // Send notifications to both members
    sendNotification({
      userId: ikhwanId,
      title: 'Tawaran Rekomendasi Ta\'aruf Baru dari Admin',
      message: `Admin telah mencocokkan kriteria Anda dengan kandidat yang memiliki skor keselarasan ${matchScore}%. Silakan pelajari CV anonim di Dashboard.`,
      type: 'taaruf_offer',
      isRead: false,
      linkTab: 'taaruf'
    });

    sendNotification({
      userId: akhwatId,
      title: 'Tawaran Rekomendasi Ta\'aruf Baru dari Admin',
      message: `Admin telah mencocokkan kriteria Anda dengan kandidat yang memiliki skor keselarasan ${matchScore}%. Silakan pelajari CV anonim di Dashboard.`,
      type: 'taaruf_offer',
      isRead: false,
      linkTab: 'taaruf'
    });

    try {
      await setDoc(doc(db, 'taarufProcesses', newProcess.id), newProcess);
    } catch (e) {
      console.warn('Firestore process save note:', e);
    }

    return newProcess;
  };

  const updateTaarufStatus = async (
    processId: string, 
    newStatus: TaarufProcess['status'], 
    notes?: string
  ) => {
    setTaarufProcesses(prev => prev.map(p => {
      if (p.id !== processId) return p;
      return {
        ...p,
        status: newStatus,
        mediatorNotes: notes ? `${p.mediatorNotes || ''}\n[Update]: ${notes}` : p.mediatorNotes,
        updatedAt: new Date().toISOString()
      };
    }));

    addAuditLog('Perubahan Status Taaruf', `Status proses diubah menjadi: ${newStatus}`, processId);
  };

  const scheduleNazhar = async (
    processId: string, 
    date: string, 
    time: string, 
    location: string
  ) => {
    let pObj: TaarufProcess | undefined;

    setTaarufProcesses(prev => prev.map(p => {
      if (p.id !== processId) return p;
      const updated: TaarufProcess = {
        ...p,
        status: 'nazhar_scheduled',
        nazharDate: date,
        nazharTime: time,
        nazharLocation: location,
        nazharGuardianAccompany: true,
        updatedAt: new Date().toISOString()
      };
      pObj = updated;
      return updated;
    }));

    addAuditLog('Penetapan Jadwal Nazhar', `Jadwal Nazhar ditetapkan pada ${date} pukul ${time} di ${location}`, processId);

    if (pObj) {
      const p = pObj as TaarufProcess;
      const notifMsg = `Pertemuan Nazhar (tatap muka didampingi wali & mediator) dijadwalkan pada ${date} pukul ${time} di ${location}.`;
      
      sendNotification({
        userId: p.ikhwanId,
        title: 'Jadwal Nazhar Resmi Ditetapkan',
        message: notifMsg,
        type: 'nazhar_schedule',
        isRead: false,
        linkTab: 'taaruf'
      });

      sendNotification({
        userId: p.akhwatId,
        title: 'Jadwal Nazhar Resmi Ditetapkan',
        message: notifMsg,
        type: 'nazhar_schedule',
        isRead: false,
        linkTab: 'taaruf'
      });
    }
  };

  const submitNazharDecision = async (
    processId: string, 
    decision: 'lanjut_khitbah' | 'mundur_santun', 
    reasonNotes?: string
  ) => {
    const isLanjut = decision === 'lanjut_khitbah';
    const newStatus = isLanjut ? 'khitbah_proceeding' : 'stopped_respectfully';

    let processRef: TaarufProcess | undefined;

    setTaarufProcesses(prev => prev.map(p => {
      if (p.id !== processId) return p;
      const updated: TaarufProcess = {
        ...p,
        status: newStatus,
        mediatorNotes: reasonNotes ? `${p.mediatorNotes || ''}\n[Hasil Nazhar]: ${reasonNotes}` : p.mediatorNotes,
        updatedAt: new Date().toISOString(),
        stoppedReason: !isLanjut ? (reasonNotes || 'Belum ada kemantapan hati setelah shalat Istikharah.') : undefined
      };
      processRef = updated;
      return updated;
    }));

    addAuditLog(
      'Keputusan Pasca-Nazhar',
      `Hasil Nazhar ditetapkan: ${isLanjut ? 'LANJUT KE KHITBAH (MEMINANG)' : 'MUNDUR DENGAN SANTUN'}`,
      processId
    );

    if (processRef) {
      const p = processRef as TaarufProcess;
      if (isLanjut) {
        sendNotification({
          userId: p.ikhwanId,
          title: 'Barakallah! Kemantapan Menuju Khitbah',
          message: 'Alhamdulillah, kedua belah pihak dan keluarga menyatakan mantap melanjutkan ke tahap Khitbah (Peminangan resmi) menuju Akad Nikah.',
          type: 'khitbah',
          isRead: false,
          linkTab: 'taaruf'
        });
        sendNotification({
          userId: p.akhwatId,
          title: 'Barakallah! Kemantapan Menuju Khitbah',
          message: 'Alhamdulillah, kedua belah pihak dan keluarga menyatakan mantap melanjutkan ke tahap Khitbah (Peminangan resmi) menuju Akad Nikah.',
          type: 'khitbah',
          isRead: false,
          linkTab: 'taaruf'
        });
      } else {
        sendNotification({
          userId: p.ikhwanId,
          title: 'Proses Ta\'aruf Diselesaikan dengan Santun',
          message: 'Setelah istikharah dan musyawarah, proses ta\'aruf diselesaikan secara beradab. Semoga Allah memberikan takdir terbaik untuk Anda.',
          type: 'system',
          isRead: false,
          linkTab: 'taaruf'
        });
        sendNotification({
          userId: p.akhwatId,
          title: 'Proses Ta\'aruf Diselesaikan dengan Santun',
          message: 'Setelah istikharah dan musyawarah, proses ta\'aruf diselesaikan secara beradab. Semoga Allah memberikan takdir terbaik untuk Anda.',
          type: 'system',
          isRead: false,
          linkTab: 'taaruf'
        });
      }
    }
  };

  const sendMediatedMessage = async (
    processId: string, 
    topic: string, 
    content: string
  ) => {
    if (!currentUser) return;
    const newMsg: TaarufMessage = {
      id: `msg-${Date.now()}`,
      processId,
      senderId: currentUser.id,
      senderName: `${currentUser.fullName} (${currentUser.role === 'admin' ? 'Admin' : currentUser.role === 'mediator' ? 'Mediator' : currentUser.gender === 'ikhwan' ? 'Ikhwan' : 'Akhwat'})`,
      senderRole: currentUser.role,
      topic,
      content,
      isApprovedByMediator: true,
      createdAt: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMsg]);
    addAuditLog('Pesan Mediasi Terkirim', `Topik: "${topic}" dikirim oleh ${currentUser.fullName}`, processId);
  };

  const verifyMember = async (
    userId: string, 
    status: 'verified' | 'rejected' | 'revising',
    waliNotes?: string
  ) => {
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, verificationStatus: status } : u));
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, verificationStatus: status } : null);
    }
    addAuditLog('Verifikasi Berkas', `Admin mengubah status verifikasi ${userId} menjadi ${status.toUpperCase()}`, userId);

    const user = allUsers.find(u => u.id === userId);
    if (user) {
      sendNotification({
        userId,
        title: status === 'verified' ? 'Berkas Pendaftaran Telah Terverifikasi Resmi' : 'Pemberitahuan Status Berkas Pendaftaran',
        message: status === 'verified' 
          ? `Alhamdulillah! Berkas pendaftaran dan data wali Anda telah diverifikasi oleh dewan admin Mawaddah. Akun Anda kini siap dipasangkan.`
          : `Status berkas Anda: ${status.toUpperCase()}. Silakan periksa kembali kelengkapan kontak wali atau hubungi CS resmi.`,
        type: 'verification',
        isRead: false,
        linkTab: 'profile'
      });
    }

    if (waliNotes && user) {
      const detail = allDetails[userId];
      const newRecord: WaliVerificationRecord = {
        id: `wali-log-${Date.now()}`,
        userId,
        memberName: user.fullName,
        waliName: detail?.waliName || 'Wali Nasab',
        waliPhone: detail?.waliPhone || '-',
        method: 'telepon_resmi',
        officerName: currentUser ? currentUser.fullName : 'Admin Mawaddah',
        notes: waliNotes,
        isConfirmedReady: status === 'verified',
        timestamp: new Date().toISOString()
      };
      setWaliVerificationRecords(prev => [newRecord, ...prev]);
    }
  };

  const addWaliVerificationRecord = async (record: Omit<WaliVerificationRecord, 'id' | 'timestamp'>) => {
    const newRecord: WaliVerificationRecord = {
      ...record,
      id: `wali-log-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    setWaliVerificationRecords(prev => [newRecord, ...prev]);
    addAuditLog('Verifikasi Wali Nasab', `Pencatatan verifikasi kontak wali untuk ${record.memberName}`, record.userId);
  };

  const addArticle = async (articleData: Omit<Article, 'id' | 'publishedAt'>) => {
    const newArticle: Article = {
      ...articleData,
      id: `art-${Date.now()}`,
      publishedAt: new Date().toISOString().split('T')[0]
    };
    setArticles(prev => [newArticle, ...prev]);
    addAuditLog('Publikasi Artikel Edukasi', `Artikel baru diterbitkan: "${newArticle.title}"`);
  };

  const fileComplaint = async (
    subject: string, 
    category: Complaint['category'], 
    description: string
  ) => {
    const newComplaint: Complaint = {
      id: `cmp-${Date.now()}`,
      reporterId: currentUser ? currentUser.id : 'anon',
      reporterName: currentUser ? currentUser.fullName : 'Hamba Allah',
      reporterEmail: currentUser?.email,
      reportedSubject: subject,
      category,
      description,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setComplaints(prev => [newComplaint, ...prev]);
    addAuditLog('Pengaduan Masuk', `Pengaduan terkait: "${subject}" kategori ${category}`);

    // Notify Admin
    sendNotification({
      userId: 'user-admin-1',
      title: 'Laporan Pengaduan Adab Masuk',
      message: `Pengaduan baru dari ${newComplaint.reporterName} mengenai: "${subject}".`,
      type: 'system',
      isRead: false,
      linkTab: 'complaints'
    });
  };

  // Export functions (CSV string generation adhering to privacy standards)
  const exportMembersToCSV = () => {
    const headers = ['Nomor_Registrasi', 'Nama_Lengkap', 'Gender', 'Usia', 'Kota_Domisili', 'Pendidikan', 'Profesi', 'Status_Verifikasi', 'Tanggal_Daftar'];
    const rows = allUsers
      .filter(u => u.role === 'ikhwan' || u.role === 'akhwat')
      .map(u => {
        const detail = allDetails[u.id];
        return [
          u.registrationNumber,
          `"${u.fullName.replace(/"/g, '""')}"`,
          u.gender,
          u.age,
          `"${u.city.replace(/"/g, '""')}"`,
          `"${detail?.education?.replace(/"/g, '""') || '-'}"`,
          `"${detail?.profession?.replace(/"/g, '""') || '-'}"`,
          u.verificationStatus,
          u.createdAt.split('T')[0]
        ].join(',');
      });

    return [headers.join(','), ...rows].join('\n');
  };

  const exportProcessesToCSV = () => {
    const headers = ['ID_Kasus', 'Ikhwan_ID', 'Akhwat_ID', 'Status_Tahap', 'Skor_Kecocokan', 'Jadwal_Nazhar', 'Dibuat_Pada'];
    const rows = taarufProcesses.map(p => {
      return [
        p.id,
        p.ikhwanId,
        p.akhwatId,
        p.status,
        p.matchScore || 0,
        `"${p.nazharDate || '-'} ${p.nazharTime || ''}"`,
        p.createdAt.split('T')[0]
      ].join(',');
    });

    return [headers.join(','), ...rows].join('\n');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentDetail,
        allUsers,
        allDetails,
        taarufProcesses,
        messages,
        articles,
        complaints,
        auditLogs,
        notifications,
        userNotifications,
        unreadNotificationsCount,
        waliVerificationRecords,
        isLoading,
        isFirebaseConnected,
        orgSettings,
        updateOrgSettings,
        switchDemoRole,
        signInWithGoogle,
        signInWithEmailDirect,
        signInMember,
        signInAdmin,
        logout,
        registerNewMember,
        updateUserProfile,
        updateMemberDetail,
        respondToMatch,
        createTaarufRecommendation,
        updateTaarufStatus,
        scheduleNazhar,
        submitNazharDecision,
        sendMediatedMessage,
        verifyMember,
        addWaliVerificationRecord,
        addArticle,
        fileComplaint,
        addAuditLog,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        sendNotification,
        exportMembersToCSV,
        exportProcessesToCSV
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
