export type UserRole = 'admin' | 'mediator' | 'ikhwan' | 'akhwat';

export type VerificationStatus = 'pending' | 'verified' | 'rejected' | 'revising';

export type MaritalStatus = 'single' | 'widowed' | 'divorced';

export type ReadinessTimeline = 'under_3_months' | '3_to_6_months' | '6_to_12_months';

export type TaarufStatus = 
  | 'proposed_by_admin'          // Admin menemukan kecocokan & menawarkan CV anonim
  | 'waiting_candidate_response'  // Menunggu respon kedua pihak
  | 'approved_by_both'           // Kedua pihak bersedia lanjut
  | 'active_mediation'           // Sesi tanya-jawab terarah dipandu mediator
  | 'nazhar_scheduled'           // Pertemuan tatap muka didampingi wali/mahram
  | 'khitbah_proceeding'         // Saling cocok, berlanjut ke peminangan resmi
  | 'completed_nikah'            // Barakallah, telah melangsungkan akad nikah
  | 'stopped_respectfully';       // Dihentikan dengan adab dan doa kebaikan

export interface UserProfile {
  id: string;
  uid: string;
  email: string;
  fullName: string;
  gender: 'ikhwan' | 'akhwat';
  role: UserRole;
  registrationNumber: string;
  verificationStatus: VerificationStatus;
  phoneNumber?: string;
  city: string;
  age: number;
  avatarUrl?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface MemberDetail {
  userId: string;
  birthPlace: string;
  birthDate: string;
  heightCm: number;
  weightKg: number;
  maritalStatus: MaritalStatus;
  childrenCount: number;
  education: string;
  profession: string;
  financialNotes?: string;
  waliName: string;
  waliRelation: string;
  waliPhone: string;
  isWaliReady: boolean;
  religiousStudy: string;
  prayerHabit: string;
  quranMemorization?: string;
  isSmoker: boolean;
  marriageVision: string;
  partnerCriteria: string;
  readinessTimeline: ReadinessTimeline;
  isPhotoBlurred: boolean;
  termsAgreed: boolean;
  updatedAt?: string;
}

export interface TaarufProcess {
  id: string;
  ikhwanId: string;
  akhwatId: string;
  mediatorId: string;
  status: TaarufStatus;
  ikhwanConsent: boolean | null; // null = pending
  akhwatConsent: boolean | null;
  ikhwanConsentDate?: string;
  akhwatConsentDate?: string;
  nazharDate?: string;
  nazharTime?: string;
  nazharLocation?: string;
  nazharGuardianAccompany?: boolean;
  mediatorNotes?: string;
  matchScore?: number;
  matchReasons?: string[];
  createdAt: string;
  updatedAt: string;
  stoppedReason?: string;
}

export interface TaarufMessage {
  id: string;
  processId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  topic: string;
  content: string;
  isApprovedByMediator: boolean;
  createdAt: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  content: string[];
  quranVerse?: {
    arabic: string;
    surah: string;
    translation: string;
  };
  author: string;
  readTime: string;
  publishedAt: string;
  featured?: boolean;
}

export interface Complaint {
  id: string;
  reporterId: string;
  reporterName: string;
  reporterEmail?: string;
  reportedSubject: string;
  category: 'adab_violation' | 'privacy_concern' | 'unresponsive' | 'other';
  description: string;
  status: 'pending' | 'investigating' | 'resolved';
  createdAt: string;
  adminResponse?: string;
}

export interface AuditLog {
  id: string;
  actorId: string;
  actorName: string;
  action: string;
  details: string;
  targetId?: string;
  timestamp: string;
}

export interface MatchRecommendation {
  ikhwan: UserProfile & { detail?: MemberDetail };
  akhwat: UserProfile & { detail?: MemberDetail };
  score: number;
  matchingCriteria: {
    ageDifference: string;
    locationMatch: boolean;
    educationCompat: boolean;
    readinessMatch: boolean;
    religiousAlignment: string;
  };
  status: 'candidate' | 'recommended' | 'in_process';
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'verification' | 'taaruf_offer' | 'mediation_msg' | 'nazhar_schedule' | 'khitbah' | 'system';
  isRead: boolean;
  linkTab?: string;
  createdAt: string;
}

export interface WaliVerificationRecord {
  id: string;
  userId: string;
  memberName: string;
  waliName: string;
  waliPhone: string;
  method: 'telepon_resmi' | 'tatap_muka_kantor' | 'video_call';
  officerName: string;
  notes: string;
  isConfirmedReady: boolean;
  timestamp: string;
}

export interface OrganizationSettings {
  officeAddress: string;
  whatsappNumber: string;
  whatsappClean: string;
  csEmail: string;
}


