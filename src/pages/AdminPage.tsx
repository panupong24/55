import React, { useState, useEffect } from 'react';
import {
  Shield,
  Eye,
  EyeOff,
  Trash2,
  Lock,
  MessageSquare,
  FileText,
  Filter,
  LogIn,
  LogOut,
  UserCheck,
  AlertCircle,
  Mail,
  Key,
  ExternalLink,
  AlertTriangle,
  RotateCw,
  Settings,
  HelpCircle,
  ArrowLeft,
  CheckCircle,
} from 'lucide-react';
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { getFirebaseConsoleLinks } from '../services/firebase';
import { auth } from '../services/auth';
import {
  feedbackService,
  OWNER_ADMIN_EMAIL,
  ReportIssue,
  Review,
} from '../services/feedbackService';
import { sound } from '../utils/audio';

interface Props {
  onNavigateHome: () => void;
}

/**
 * Masks email address for privacy and security (e.g. "name@example.com" -> "na***@example.com")
 */
function maskEmail(rawEmail?: string | null): string {
  if (!rawEmail) return 'Admin';
  const parts = rawEmail.split('@');
  if (parts.length !== 2) return rawEmail;
  const [userPart, domainPart] = parts;
  const prefix = userPart.length <= 2 ? userPart : userPart.slice(0, 2);
  return `${prefix}***@${domainPart}`;
}

export const AdminPage: React.FC<Props> = ({ onNavigateHome }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

  // Provider status: only set from a real sign-in error (no sign-up probing)
  const [isEmailPasswordEnabled, setIsEmailPasswordEnabled] = useState<boolean | null>(null);
  const [showSetupGuide, setShowSetupGuide] = useState<boolean>(false);

  // Auth Form State (sign-in only: admin accounts are never self-registered here)
  const [email, setEmail] = useState('');
  const [authNotice, setAuthNotice] = useState('');
  const [verifyNotice, setVerifyNotice] = useState('');
  const [isSendingVerify, setIsSendingVerify] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authErrorCode, setAuthErrorCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Moderation state
  const [activeTab, setActiveTab] = useState<'reports' | 'reviews'>('reports');
  const [reports, setReports] = useState<ReportIssue[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'investigating' | 'resolved'>('all');
  const [reviewPendingDelete, setReviewPendingDelete] = useState<string | null>(null);
  const [isDeletingReview, setIsDeletingReview] = useState(false);
  const [deleteReviewError, setDeleteReviewError] = useState('');

  const consoleLinks = getFirebaseConsoleLinks();

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        setIsCheckingAuth(true);
        const adminStatus = await feedbackService.checkIsAdmin(user);
        setIsAdmin(adminStatus);
        setIsCheckingAuth(false);
      } else {
        setIsAdmin(false);
        setIsCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin]);

  const loadData = async () => {
    const repList = await feedbackService.getReports();
    const revList = await feedbackService.getReviews(true);
    setReports(repList);
    setReviews(revList);
  };

  /**
   * Safe and precise Firebase Auth error code translation
   */
  const mapFirebaseError = (err: any): { message: string; code: string } => {
    const code = err.code || '';
    setAuthErrorCode(code);

    switch (code) {
      case 'auth/operation-not-allowed':
        setIsEmailPasswordEnabled(false);
        setShowSetupGuide(true);
        return {
          code,
          message:
            'Email/Password ยังไม่ได้เปิดใช้งานใน Firebase Console กรุณาเปิดใช้งานตามขั้นตอนด้านล่างก่อนเข้าสู่ระบบ',
        };
      case 'auth/invalid-credential':
        return {
          code,
          message:
            'อีเมลหรือรหัสผ่านไม่ถูกต้อง (หากยังไม่มีบัญชีผู้ดูแล ให้สร้างผู้ใช้ใน Firebase Console → Authentication → Users)',
        };
      case 'auth/user-not-found':
        return {
          code,
          message:
            'ไม่พบบัญชีนี้ในระบบ Firebase กรุณาสร้างผู้ใช้ใน Firebase Console → Authentication → Users ก่อน',
        };
      case 'auth/wrong-password':
        return {
          code,
          message: 'รหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง',
        };
      case 'auth/email-already-in-use':
        return {
          code,
          message:
            'อีเมลนี้มีอยู่ในระบบแล้ว กรุณาสลับไปที่หน้า "เข้าสู่ระบบ (Sign In)" เพื่อล็อกอิน',
        };
      case 'auth/weak-password':
        return {
          code,
          message: 'รหัสผ่านสั้นเกินไป ต้องมีความยาวอย่างน้อย 6 ตัวอักษร',
        };
      case 'auth/invalid-email':
        return {
          code,
          message: 'รูปแบบอีเมลไม่ถูกต้อง กรุณาตรวจสอบความถูกต้องของอีเมล',
        };
      case 'auth/network-request-failed':
        return {
          code,
          message:
            'การเชื่อมต่อไปยัง Firebase Authentication ล้มเหลว กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต',
        };
      case 'auth/too-many-requests':
        return {
          code,
          message:
            'มีการพยายามเข้าสู่ระบบผิดพลาดบ่อยเกินไป ระบบระงับชั่วคราวเพื่อความปลอดภัย กรุณารอสักครู่แล้วลองใหม่',
        };
      default:
        return {
          code,
          message: err.message || 'เกิดข้อผิดพลาดในการยืนยันตัวตนกับ Firebase',
        };
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSelect();
    setAuthError('');
    setAuthErrorCode('');
    setIsSubmitting(true);

    setAuthNotice('');
    try {
      const cred = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );
      const adminCheck = await feedbackService.checkIsAdmin(cred.user);
      setIsAdmin(adminCheck);
      sound.playVictory();
    } catch (err: any) {
      console.warn('Firebase Auth error details:', err.code, err.message);
      const mapped = mapFirebaseError(err);
      setAuthError(mapped.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordReset = async () => {
    setAuthError('');
    setAuthErrorCode('');
    setAuthNotice('');
    if (!email.trim()) {
      setAuthError('กรอกอีเมลก่อน แล้วกด "ลืมรหัสผ่าน" อีกครั้ง');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setAuthNotice('ถ้าอีเมลนี้มีบัญชีอยู่ ระบบได้ส่งลิงก์ตั้งรหัสผ่านใหม่ไปแล้ว กรุณาเช็กกล่องอีเมล');
    } catch (err: any) {
      const mapped = mapFirebaseError(err);
      setAuthError(mapped.message);
    }
  };

  const isUnverifiedOwner =
    !!currentUser &&
    !currentUser.emailVerified &&
    currentUser.email?.toLowerCase() === OWNER_ADMIN_EMAIL.toLowerCase();

  const handleSendVerification = async () => {
    if (!currentUser) return;
    setIsSendingVerify(true);
    setVerifyNotice('');
    try {
      await sendEmailVerification(currentUser);
      setVerifyNotice('ส่งอีเมลยืนยันแล้ว กดลิงก์ในอีเมล จากนั้นกลับมากด "ฉันยืนยันแล้ว"');
    } catch (err: any) {
      setVerifyNotice(mapFirebaseError(err).message);
    } finally {
      setIsSendingVerify(false);
    }
  };

  const handleRecheckVerification = async () => {
    if (!auth.currentUser) return;
    await auth.currentUser.reload();
    // Refresh the ID token so Firestore rules see email_verified = true
    await auth.currentUser.getIdToken(true);
    const refreshed = auth.currentUser;
    setCurrentUser(refreshed);
    if (!refreshed.emailVerified) {
      setVerifyNotice('ยังไม่พบการยืนยันอีเมล กรุณากดลิงก์ในอีเมลก่อน');
      return;
    }
    setIsAdmin(await feedbackService.checkIsAdmin(refreshed));
  };

  const handleSignOut = async () => {
    sound.playSelect();
    await signOut(auth);
    setCurrentUser(null);
    setIsAdmin(false);
    setEmail('');
    setPassword('');
    setAuthError('');
    setAuthErrorCode('');
  };

  const handleUpdateStatus = async (
    reportId: string,
    newStatus: ReportIssue['status'],
  ) => {
    sound.playSelect();
    await feedbackService.updateReportStatus(reportId, newStatus);
    loadData();
  };

  const handleToggleHideReview = async (
    reviewId: string,
    currentHidden: boolean,
  ) => {
    sound.playSelect();
    const result = await feedbackService.toggleHideReview(reviewId, !currentHidden);
    if (!result.success) {
      window.alert(result.error || 'ไม่สามารถเปลี่ยนสถานะคอมเมนต์ได้');
      return;
    }
    await loadData();
  };

  const handleDeleteReview = (reviewId: string) => {
    setDeleteReviewError('');
    setReviewPendingDelete(reviewId);
  };

  const confirmDeleteReview = async () => {
    if (!reviewPendingDelete || isDeletingReview) return;
    setIsDeletingReview(true);
    sound.playSelect();
    const result = await feedbackService.deleteReview(reviewPendingDelete);
    setIsDeletingReview(false);

    if (!result.success) {
      setDeleteReviewError(result.error || 'ไม่สามารถลบคอมเมนต์ได้');
      return;
    }

    setReviewPendingDelete(null);
    await loadData();
  };

  const cancelDeleteReview = () => {
    if (isDeletingReview) return;
    setDeleteReviewError('');
    setReviewPendingDelete(null);
  };

  const handleDeleteReport = async (reportId: string) => {
    if (confirm('Delete this report?')) {
      sound.playSelect();
      await feedbackService.deleteReport(reportId);
      loadData();
    }
  };

  const filteredReports = reports.filter((r) => {
    if (statusFilter === 'all') return true;
    return r.status === statusFilter;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white relative">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[140px]" />
      </div>

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-purple-500/20 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับสู่หน้าควิซ</span>
          </button>

          <div className="h-4 w-px bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-xl bg-purple-500/20 border border-purple-400/40 text-purple-300">
              <Shield className="w-4 h-4" />
            </div>
            <h1 className="text-sm sm:text-base font-bold text-white tracking-wide flex items-center gap-2">
              <span>Admin Management</span>
              <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold border border-purple-400/30">
                /admin
              </span>
            </h1>
          </div>
        </div>

        {currentUser && isAdmin && (
          <div className="flex items-center gap-3 text-xs">
            <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>ผู้ดูแล: <strong className="text-white font-mono">{maskEmail(currentUser.email)}</strong></span>
            </div>

            <button
              onClick={handleSignOut}
              className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>ออกจากระบบ</span>
            </button>
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 relative z-10 flex flex-col">
        {/* 1. Loading State */}
        {isCheckingAuth ? (
          <div className="my-auto py-24 flex flex-col items-center justify-center space-y-3">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-purple-300 font-semibold">
              กำลังตรวจสอบสิทธิ์ผ่าน Firebase Authentication...
            </p>
          </div>
        ) : !currentUser ? (
          /* 2. Unauthenticated: Full Page Login/Register Card */
          <div className="my-auto max-w-md w-full mx-auto py-8">
            <div className="rounded-3xl bg-slate-900 border border-purple-500/30 p-6 sm:p-8 shadow-2xl shadow-purple-950/50 space-y-6">
              {/* Card Header */}
              <div className="text-center space-y-2">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-500/15 border border-purple-400/30 flex items-center justify-center text-purple-300 mb-1">
                  <Lock className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-black text-white">
                  เข้าสู่ระบบผู้ดูแลระบบ
                </h2>
                <p className="text-xs text-slate-400">
                  ยืนยันตัวตนด้วย Firebase Authentication (Email/Password) เพื่อเข้าสู่แผงควบคุม
                </p>
              </div>

              {/* Provider Status Check & Warning */}
              {isEmailPasswordEnabled === false && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/40 text-xs space-y-2.5 text-left">
                  <div className="flex items-start gap-2 text-amber-300 font-bold">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>จำเป็นต้องเปิดใช้งาน Email/Password ใน Firebase Console</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    โปรเจกต์ยังไม่ได้เปิดใช้งาน Sign-in method แบบ Email/Password ส่งผลให้การเข้าสู่ระบบแจ้งเตือน <span className="font-mono text-amber-300">auth/operation-not-allowed</span>
                  </p>
                  <div className="pt-1 flex flex-wrap gap-2">
                    <a
                      href={consoleLinks.providersUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition shadow"
                    >
                      <span>เปิด Firebase Console</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => setShowSetupGuide(!showSetupGuide)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold transition cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-pink-300" />
                      <span>{showSetupGuide ? 'ซ่อนคู่มือ' : 'ดูขั้นตอน'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Setup Guide */}
              {showSetupGuide && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30 text-xs text-left space-y-2.5">
                  <h4 className="font-bold text-white flex items-center gap-1.5">
                    <Settings className="w-3.5 h-3.5 text-purple-400" />
                    <span>ขั้นตอนการเปิดใช้งานใน Firebase Console:</span>
                  </h4>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-300 pl-1">
                    <li>
                      เปิดหน้า:{' '}
                      <a
                        href={consoleLinks.providersUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-300 underline font-semibold inline-flex items-center gap-1"
                      >
                        <span>Sign-in method</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                    <li>คลิกเลือก <strong>"Email/Password"</strong></li>
                    <li>กดสวิตช์ <strong>"Enable"</strong> แล้วกด <strong>"Save"</strong></li>
                    <li>กลับมาหน้านี้เพื่อเริ่มเข้าสู่ระบบ</li>
                  </ol>
                </div>
              )}

              {/* Email & Password Form */}
              <form onSubmit={handleEmailAuth} className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-purple-400" />
                    <span>อีเมลผู้ดูแลระบบ (Email):</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="กรอกอีเมลผู้ดูแลระบบ (เช่น name@example.com)"
                    required
                    autoComplete="email"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-sm text-white focus:border-purple-500 outline-none transition placeholder:text-slate-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-purple-400" />
                    <span>รหัสผ่าน (Password):</span>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="ความยาวอย่างน้อย 6 ตัวอักษร"
                    required
                    minLength={6}
                    autoComplete="current-password"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-sm text-white focus:border-purple-500 outline-none transition placeholder:text-slate-500"
                  />
                </div>

                {authNotice && (
                  <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 text-xs flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{authNotice}</span>
                  </div>
                )}

                {authError && (
                  <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-200 text-xs space-y-1">
                    <div className="flex items-start gap-2 font-semibold">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{authError}</span>
                    </div>
                    {authErrorCode && (
                      <p className="text-[10px] text-slate-400 font-mono pl-6">
                        Firebase Code: {authErrorCode}
                      </p>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition cursor-pointer active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>
                    {isSubmitting ? 'กำลังตรวจสอบข้อมูล...' : 'เข้าสู่ระบบ (Sign In)'}
                  </span>
                </button>
              </form>

              {/* Mode switch */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={handlePasswordReset}
                  className="text-xs text-purple-300 hover:text-purple-200 underline cursor-pointer py-2"
                >
                  ลืมรหัสผ่าน? ส่งลิงก์ตั้งรหัสผ่านใหม่ทางอีเมล
                </button>
              </div>

              {/* Security policy */}
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/10 text-[11px] text-slate-400 space-y-1 text-left">
                <p className="font-semibold text-slate-300">นโยบายความปลอดภัย:</p>
                <p>
                  • ยืนยันตัวตนด้วย Firebase Authentication (Email/Password)
                  <br />
                  • การเข้าถึงแผงควบคุมจำกัดเฉพาะบัญชีที่ได้รับสิทธิ์ Role: Admin
                  <br />
                  • ไม่มีการบันทึกรหัสผ่านหรือ PIN ไว้ในโค้ดฝั่ง Client
                </p>
              </div>
            </div>
          </div>
        ) : !isAdmin ? (
          /* 3. Logged in with Firebase Auth, but NOT an authorized Admin */
          <div className="my-auto max-w-md w-full mx-auto py-12 text-center space-y-5">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-rose-500/15 border-2 border-rose-500/40 flex items-center justify-center text-rose-400">
              <AlertCircle className="w-9 h-9" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-black text-white">ไม่มีสิทธิ์ผู้ดูแลระบบ (Access Denied)</h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                คุณเข้าสู่ระบบสำเร็จในชื่อ <span className="font-bold text-yellow-300">{maskEmail(currentUser.email)}</span>
                <br />
                แต่บัญชีนี้ยังไม่ได้รับสิทธิ์ Role: Admin ในระบบ Firestore
              </p>
            </div>

            {isUnverifiedOwner ? (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/40 text-xs text-slate-200 text-center space-y-3">
                <p>
                  บัญชีเจ้าของระบบต้อง <strong className="text-amber-300">ยืนยันอีเมล</strong> ก่อนจึงจะได้สิทธิ์ผู้ดูแล
                  (ป้องกันไม่ให้คนอื่นสมัครด้วยอีเมลนี้แล้วเข้าแผงควบคุมได้)
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={handleSendVerification}
                    disabled={isSendingVerify}
                    className="py-2 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition cursor-pointer disabled:opacity-50"
                  >
                    {isSendingVerify ? 'กำลังส่ง...' : 'ส่งอีเมลยืนยัน'}
                  </button>
                  <button
                    onClick={handleRecheckVerification}
                    className="py-2 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 font-bold text-xs transition cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    ฉันยืนยันแล้ว
                  </button>
                </div>
                {verifyNotice && <p className="text-amber-200">{verifyNotice}</p>}
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 text-xs text-slate-400 text-center">
                กรุณาติดต่อผู้ดูแลระบบหลักเพื่อขอรับสิทธิ์ Role: Admin ในระบบ Firestore
              </div>
            )}

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleSignOut}
                className="py-2.5 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 font-bold text-xs transition cursor-pointer"
              >
                ออกจากระบบเพื่อเปลี่ยนบัญชี
              </button>
              <button
                onClick={onNavigateHome}
                className="py-2.5 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition cursor-pointer"
              >
                กลับสู่หน้าควิซ
              </button>
            </div>
          </div>
        ) : (
          /* 4. Authenticated & Authorized Admin Dashboard */
          <div className="space-y-6 flex-1 flex flex-col">
            {/* Dashboard Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-purple-500/30 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Admin Control Center</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold">
                      Verified Admin
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    จัดการรายงานปัญหาและคัดกรองคอมเมนต์จากผู้ใช้งาน
                  </p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex bg-slate-950 p-1 rounded-xl border border-white/10 gap-1">
                <button
                  onClick={() => {
                    sound.playSelect();
                    setActiveTab('reports');
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                    activeTab === 'reports'
                      ? 'bg-purple-600 text-white shadow'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>รายงานปัญหา ({reports.length})</span>
                </button>

                <button
                  onClick={() => {
                    sound.playSelect();
                    setActiveTab('reviews');
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                    activeTab === 'reviews'
                      ? 'bg-purple-600 text-white shadow'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>จัดการรีวิว ({reviews.length})</span>
                </button>
              </div>
            </div>

            {/* TAB 1: REPORTS */}
            {activeTab === 'reports' && (
              <div className="space-y-4 flex-1">
                {/* Status Filter */}
                <div className="flex items-center justify-between gap-2 text-xs p-3 rounded-xl bg-slate-900/60 border border-white/10">
                  <span className="font-bold text-slate-300 flex items-center gap-1.5">
                    <Filter className="w-3.5 h-3.5 text-purple-400" />
                    <span>กรองตามสถานะ:</span>
                  </span>
                  <div className="flex items-center gap-1">
                    {(['all', 'new', 'investigating', 'resolved'] as const).map(
                      (st) => (
                        <button
                          key={st}
                          onClick={() => setStatusFilter(st)}
                          className={`px-3 py-1 rounded-lg font-bold text-xs transition cursor-pointer ${
                            statusFilter === st
                              ? 'bg-purple-600 text-white'
                              : 'bg-white/5 text-slate-400 hover:bg-white/10'
                          }`}
                        >
                          {st === 'all'
                            ? 'ทั้งหมด'
                            : st === 'new'
                            ? 'ใหม่'
                            : st === 'investigating'
                            ? 'กำลังตรวจสอบ'
                            : 'แก้ไขแล้ว'}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                {filteredReports.length === 0 ? (
                  <div className="text-center py-16 rounded-2xl bg-slate-900/40 border border-white/5 text-slate-400 text-sm">
                    ไม่มีรายการรายงานปัญหาในขณะนี้
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredReports.map((rep) => {
                      const isResolved = rep.status === 'resolved';
                      const isInvestigating = rep.status === 'investigating';
                      return (
                        <div
                          key={rep.id}
                          className="p-5 rounded-2xl bg-slate-900 border border-white/10 space-y-3 text-left shadow-sm"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/40 text-[11px] font-bold text-purple-300 uppercase">
                              หมวดหมู่: {rep.category}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              {new Date(rep.createdAt).toLocaleString()}
                            </span>
                          </div>

                          {rep.targetCommentSnippet && (
                            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/30 text-xs text-amber-200">
                              <strong>คอมเมนต์ที่ถูกรายงาน:</strong> “{rep.targetCommentSnippet}”
                            </div>
                          )}

                          <p className="text-sm text-slate-100 whitespace-pre-wrap leading-relaxed">
                            {rep.details}
                          </p>

                          {/* Status Actions */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400">สถานะปัจจุบัน:</span>
                              <span
                                className={`px-2.5 py-0.5 rounded-md font-bold text-xs ${
                                  isResolved
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                    : isInvestigating
                                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                }`}
                              >
                                {rep.status === 'new'
                                  ? 'ใหม่'
                                  : rep.status === 'investigating'
                                  ? 'กำลังตรวจสอบ'
                                  : 'แก้ไขแล้ว'}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  handleUpdateStatus(rep.id, 'investigating')
                                }
                                className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold cursor-pointer transition"
                              >
                                ตั้งเป็นกำลังตรวจสอบ
                              </button>
                              <button
                                onClick={() =>
                                  handleUpdateStatus(rep.id, 'resolved')
                                }
                                className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold cursor-pointer transition flex items-center gap-1"
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                                <span>ตั้งเป็นแก้ไขแล้ว</span>
                              </button>
                              <button
                                onClick={() => handleDeleteReport(rep.id)}
                                className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-white/5 cursor-pointer transition"
                                title="Delete report"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="space-y-4 flex-1">
                {reviews.length === 0 ? (
                  <div className="text-center py-16 rounded-2xl bg-slate-900/40 border border-white/5 text-slate-400 text-sm">
                    ไม่มีรายการรีวิวในระบบ
                  </div>
                ) : (
                  <div className="space-y-3">
                    {reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className={`p-5 rounded-2xl border text-left space-y-3 transition shadow-sm ${
                          rev.hidden
                            ? 'bg-slate-950/60 border-rose-500/30 opacity-60'
                            : 'bg-slate-900 border-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="font-bold text-white text-sm">
                              {rev.userName}
                            </span>
                            <span className="text-yellow-400 text-xs">
                              {'★'.repeat(rev.rating)}
                            </span>
                            {rev.reported && (
                              <span className="px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-400/40 text-[10px] font-bold text-rose-300">
                                ถูกรายงาน (Reported)
                              </span>
                            )}
                            {rev.hidden && (
                              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] font-bold text-slate-400">
                                ซ่อนอยู่ (Hidden)
                              </span>
                            )}
                          </div>

                          <span className="text-[11px] text-slate-500">
                            {new Date(rev.createdAt).toLocaleString()}
                          </span>
                        </div>

                        <p className="text-sm text-slate-200 leading-relaxed">
                          {rev.comment}
                        </p>

                        <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                          <button
                            onClick={() =>
                              handleToggleHideReview(rev.id, rev.hidden)
                            }
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                              rev.hidden
                                ? 'bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30'
                                : 'bg-rose-600/20 text-rose-300 hover:bg-rose-600/30'
                            }`}
                          >
                            {rev.hidden ? (
                              <>
                                <Eye className="w-3.5 h-3.5" />
                                <span>ยกเลิกการซ่อน (Show)</span>
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3.5 h-3.5" />
                                <span>ซ่อนคอมเมนต์นี้ (Hide)</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => handleDeleteReview(rev.id)}
                            className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-white/5 transition cursor-pointer"
                            title="Delete review"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
      {reviewPendingDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="delete-review-title">
          <div className="w-full max-w-md rounded-2xl border border-rose-400/30 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-rose-500/15 p-2.5 text-rose-300"><Trash2 className="h-5 w-5" /></div>
              <div>
                <h2 id="delete-review-title" className="text-lg font-bold text-white">ลบคอมเมนต์นี้ถาวร?</h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">การลบจะไม่สามารถกู้คืนได้ และคอมเมนต์จะหายจากหน้าเว็บทันที</p>
              </div>
            </div>
            {deleteReviewError && (<p role="alert" className="mt-4 rounded-xl border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">{deleteReviewError}</p>)}
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={cancelDeleteReview} disabled={isDeletingReview} className="rounded-xl border border-white/15 px-4 py-2 text-sm font-bold text-slate-200 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-60">ยกเลิก</button>
              <button type="button" onClick={confirmDeleteReview} disabled={isDeletingReview} className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-60">{isDeletingReview ? 'กำลังลบ…' : 'ลบถาวร'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
