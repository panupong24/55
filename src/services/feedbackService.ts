import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  getDoc,
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db, auth } from './firebase';

export interface Review {
  id: string;
  rating: number; // 1 to 5
  comment: string; // Max 280 characters
  userName: string; // Defaults to "Rainbow Friend"
  percentage?: number; // Score achieved by the player
  tierBadge?: string;
  createdAt: number;
  reported?: boolean;
  hidden?: boolean;
}

export interface ReportIssue {
  id: string;
  category: 'bug' | 'translation' | 'inappropriate_comment' | 'suggestion';
  details: string; // Max 500 characters
  targetCommentId?: string;
  targetCommentSnippet?: string;
  status: 'new' | 'investigating' | 'resolved';
  createdAt: number;
  lang?: string;
}

const STORAGE_REVIEWS_KEY = 'rainbow_quiz_reviews_v1';
const STORAGE_REPORTS_KEY = 'rainbow_quiz_reports_v1';
const LAST_SUBMIT_KEY = 'rainbow_quiz_last_review_ts';

// Designated default owner email from project environment
export const OWNER_ADMIN_EMAIL = '684234020@parichat.skru.ac.th';

class FeedbackService {
  private reviewsCache: Review[] | null = null;
  private reportsCache: ReportIssue[] | null = null;
  private reviewListeners: Set<(reviews: Review[]) => void> = new Set();
  private reportListeners: Set<(reports: ReportIssue[]) => void> = new Set();
  private firestoreUnsubscribeReviews: (() => void) | null = null;
  private firestoreUnsubscribeReports: (() => void) | null = null;

  constructor() {
    this.initFirestoreSync();
  }

  private initFirestoreSync(): void {
    if (typeof window === 'undefined') return;

    try {
      // Real-time synchronization for reviews
      const reviewsCol = collection(db, 'reviews');
      const qReviews = query(reviewsCol, orderBy('createdAt', 'desc'));

      this.firestoreUnsubscribeReviews = onSnapshot(
        qReviews,
        (snapshot) => {
          const list: Review[] = [];
          snapshot.forEach((d) => {
            const data = d.data();
            list.push({
              id: d.id,
              rating: data.rating || 5,
              comment: data.comment || '',
              userName: data.userName || 'Rainbow Friend',
              percentage: data.percentage,
              tierBadge: data.tierBadge,
              createdAt: data.createdAt || Date.now(),
              reported: !!data.reported,
              hidden: !!data.hidden,
            });
          });

          this.reviewsCache = list;
          this.saveReviewsToLocalStorage(list);
          this.notifyReviewListeners();
        },
        (err) => {
          console.warn('Firestore reviews subscription fallback to local cache:', err);
        },
      );
    } catch (err) {
      console.warn('Could not initialize Firestore sync for reviews:', err);
    }
  }

  public initReportsFirestoreSync(): void {
    if (this.firestoreUnsubscribeReports) return;

    try {
      const reportsCol = collection(db, 'reports');
      const qReports = query(reportsCol, orderBy('createdAt', 'desc'));

      this.firestoreUnsubscribeReports = onSnapshot(
        qReports,
        (snapshot) => {
          const list: ReportIssue[] = [];
          snapshot.forEach((d) => {
            const data = d.data();
            list.push({
              id: d.id,
              category: data.category || 'bug',
              details: data.details || '',
              targetCommentId: data.targetCommentId,
              targetCommentSnippet: data.targetCommentSnippet,
              status: data.status || 'new',
              createdAt: data.createdAt || Date.now(),
              lang: data.lang,
            });
          });

          this.reportsCache = list;
          this.saveReportsToLocalStorage(list);
          this.notifyReportListeners();
        },
        (err) => {
          console.warn('Firestore reports subscription notice:', err);
        },
      );
    } catch (err) {
      console.warn('Could not initialize reports sync:', err);
    }
  }

  private loadReviewsFromLocalStorage(): Review[] {
    if (typeof window === 'undefined' || !window.localStorage) return [];
    try {
      const raw = localStorage.getItem(STORAGE_REVIEWS_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [];
    } catch {
      return [];
    }
  }

  private saveReviewsToLocalStorage(reviews: Review[]): void {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      localStorage.setItem(STORAGE_REVIEWS_KEY, JSON.stringify(reviews));
    } catch (err) {
      console.warn('Failed to save reviews to localStorage:', err);
    }
  }

  private loadReportsFromLocalStorage(): ReportIssue[] {
    if (typeof window === 'undefined' || !window.localStorage) return [];
    try {
      const raw = localStorage.getItem(STORAGE_REPORTS_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [];
    } catch {
      return [];
    }
  }

  private saveReportsToLocalStorage(reports: ReportIssue[]): void {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      localStorage.setItem(STORAGE_REPORTS_KEY, JSON.stringify(reports));
    } catch (err) {
      console.warn('Failed to save reports to localStorage:', err);
    }
  }

  private notifyReviewListeners(): void {
    const list = this.getReviewsSync(false);
    this.reviewListeners.forEach((listener) => listener(list));
  }

  private notifyReportListeners(): void {
    const list = this.getReportsSync();
    this.reportListeners.forEach((listener) => listener(list));
  }

  public subscribeReviews(listener: (reviews: Review[]) => void): () => void {
    this.reviewListeners.add(listener);
    listener(this.getReviewsSync(false));
    return () => {
      this.reviewListeners.delete(listener);
    };
  }

  public subscribeReports(listener: (reports: ReportIssue[]) => void): () => void {
    this.reportListeners.add(listener);
    this.initReportsFirestoreSync();
    listener(this.getReportsSync());
    return () => {
      this.reportListeners.delete(listener);
    };
  }

  public getReviewsSync(includeHidden = false): Review[] {
    if (this.reviewsCache === null) {
      this.reviewsCache = this.loadReviewsFromLocalStorage();
    }
    const filtered = includeHidden
      ? this.reviewsCache
      : this.reviewsCache.filter((r) => !r.hidden);
    return [...filtered].sort((a, b) => b.createdAt - a.createdAt);
  }

  public async getReviews(includeHidden = false): Promise<Review[]> {
    return this.getReviewsSync(includeHidden);
  }

  public async submitReview(input: {
    rating: number;
    comment: string;
    userName?: string;
    percentage?: number;
    tierBadge?: string;
  }): Promise<{ success: boolean; error?: string; review?: Review }> {
    const trimmedComment = input.comment?.trim() || '';
    if (!trimmedComment) {
      return { success: false, error: 'Review comment cannot be empty' };
    }
    if (trimmedComment.length > 280) {
      return { success: false, error: 'Comment exceeds 280 characters limit' };
    }
    const rating = Math.min(5, Math.max(1, Math.round(input.rating || 5)));

    // Throttle / duplicate prevention
    if (typeof window !== 'undefined' && window.localStorage) {
      const lastTs = parseInt(localStorage.getItem(LAST_SUBMIT_KEY) || '0', 10);
      if (Date.now() - lastTs < 5000) {
        return {
          success: false,
          error: 'Please wait a few seconds before submitting again',
        };
      }
    }

    const reviews = this.reviewsCache || this.loadReviewsFromLocalStorage();

    // Prevent identical duplicate spam
    const isDuplicate = reviews.some(
      (r) =>
        r.comment.toLowerCase() === trimmedComment.toLowerCase() &&
        Date.now() - r.createdAt < 60000,
    );
    if (isDuplicate) {
      return { success: false, error: 'Duplicate review detected' };
    }

    const trimmedName = input.userName?.trim();
    const finalUserName =
      trimmedName && trimmedName.length > 0 ? trimmedName : 'Rainbow Friend';

    const reviewId =
      'rev_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);

    const newReview: Review = {
      id: reviewId,
      rating,
      comment: trimmedComment,
      userName: finalUserName,
      percentage: input.percentage,
      tierBadge: input.tierBadge,
      createdAt: Date.now(),
      reported: false,
      hidden: false,
    };

    // Save to Firebase Firestore
    try {
      const docRef = doc(db, 'reviews', reviewId);
      await setDoc(docRef, {
        rating: newReview.rating,
        comment: newReview.comment,
        userName: newReview.userName,
        percentage: newReview.percentage ?? null,
        tierBadge: newReview.tierBadge ?? null,
        createdAt: newReview.createdAt,
        reported: false,
        hidden: false,
      });
    } catch (err) {
      console.warn('Failed to save review to Firestore, saving to local cache:', err);
    }

    // Update local cache
    const updated = [newReview, ...reviews];
    this.reviewsCache = updated;
    this.saveReviewsToLocalStorage(updated);
    this.notifyReviewListeners();

    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(LAST_SUBMIT_KEY, Date.now().toString());
    }

    return { success: true, review: newReview };
  }

  public async reportComment(
    commentId: string,
    reason?: string,
  ): Promise<{ success: boolean; error?: string }> {
    const reviews = this.reviewsCache || this.loadReviewsFromLocalStorage();
    const target = reviews.find((r) => r.id === commentId);
    if (!target) {
      return { success: false, error: 'Comment not found' };
    }

    target.reported = true;

    // Update in Firestore
    try {
      const docRef = doc(db, 'reviews', commentId);
      await updateDoc(docRef, { reported: true });
    } catch (err) {
      console.warn('Failed to update review report in Firestore:', err);
    }

    this.saveReviewsToLocalStorage(reviews);
    this.notifyReviewListeners();

    // Automatically create a linked report entry
    await this.submitReport({
      category: 'inappropriate_comment',
      details: reason || 'Reported comment via review interface',
      targetCommentId: commentId,
      targetCommentSnippet: target.comment.substring(0, 100),
    });

    return { success: true };
  }

  public getReportsSync(): ReportIssue[] {
    if (this.reportsCache === null) {
      this.reportsCache = this.loadReportsFromLocalStorage();
    }
    return [...this.reportsCache].sort((a, b) => b.createdAt - a.createdAt);
  }

  public async getReports(): Promise<ReportIssue[]> {
    try {
      const snapshot = await getDocs(
        query(collection(db, 'reports'), orderBy('createdAt', 'desc')),
      );
      const list: ReportIssue[] = [];
      snapshot.forEach((d) => {
        const data = d.data();
        list.push({
          id: d.id,
          category: data.category || 'bug',
          details: data.details || '',
          targetCommentId: data.targetCommentId,
          targetCommentSnippet: data.targetCommentSnippet,
          status: data.status || 'new',
          createdAt: data.createdAt || Date.now(),
          lang: data.lang,
        });
      });
      this.reportsCache = list;
      return list;
    } catch {
      return this.getReportsSync();
    }
  }

  public async submitReport(input: {
    category: ReportIssue['category'];
    details: string;
    targetCommentId?: string;
    targetCommentSnippet?: string;
    lang?: string;
  }): Promise<{ success: boolean; error?: string; report?: ReportIssue }> {
    const details = input.details?.trim() || '';
    if (!details) {
      return { success: false, error: 'Please provide details for the report' };
    }
    if (details.length > 500) {
      return { success: false, error: 'Report details exceed 500 characters limit' };
    }

    const reportId =
      'rep_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);

    const newReport: ReportIssue = {
      id: reportId,
      category: input.category,
      details,
      targetCommentId: input.targetCommentId,
      targetCommentSnippet: input.targetCommentSnippet,
      status: 'new',
      createdAt: Date.now(),
      lang: input.lang,
    };

    // Save to Firestore
    try {
      const docRef = doc(db, 'reports', reportId);
      await setDoc(docRef, {
        category: newReport.category,
        details: newReport.details,
        targetCommentId: newReport.targetCommentId ?? null,
        targetCommentSnippet: newReport.targetCommentSnippet ?? null,
        status: newReport.status,
        createdAt: newReport.createdAt,
        lang: newReport.lang ?? null,
      });
    } catch (err) {
      console.warn('Failed to save report to Firestore, saving to local cache:', err);
    }

    const reports = this.reportsCache || this.loadReportsFromLocalStorage();
    reports.unshift(newReport);
    this.reportsCache = reports;
    this.saveReportsToLocalStorage(reports);
    this.notifyReportListeners();

    return { success: true, report: newReport };
  }

  public async updateReportStatus(
    reportId: string,
    status: ReportIssue['status'],
  ): Promise<boolean> {
    try {
      const docRef = doc(db, 'reports', reportId);
      await updateDoc(docRef, { status });
    } catch (err) {
      console.warn('Firestore updateReportStatus failed:', err);
    }

    const reports = this.reportsCache || this.loadReportsFromLocalStorage();
    const target = reports.find((r) => r.id === reportId);
    if (target) {
      target.status = status;
      this.saveReportsToLocalStorage(reports);
      this.notifyReportListeners();
    }
    return true;
  }

  public async toggleHideReview(
    reviewId: string,
    hidden: boolean,
  ): Promise<boolean> {
    try {
      const docRef = doc(db, 'reviews', reviewId);
      await updateDoc(docRef, { hidden });
    } catch (err) {
      console.warn('Firestore toggleHideReview failed:', err);
    }

    const reviews = this.reviewsCache || this.loadReviewsFromLocalStorage();
    const target = reviews.find((r) => r.id === reviewId);
    if (target) {
      target.hidden = hidden;
      this.saveReviewsToLocalStorage(reviews);
      this.notifyReviewListeners();
    }
    return true;
  }

  public async deleteReview(reviewId: string): Promise<boolean> {
    try {
      const docRef = doc(db, 'reviews', reviewId);
      await deleteDoc(docRef);
    } catch (err) {
      console.warn('Firestore deleteReview failed:', err);
    }

    const reviews = this.reviewsCache || this.loadReviewsFromLocalStorage();
    const filtered = reviews.filter((r) => r.id !== reviewId);
    this.reviewsCache = filtered;
    this.saveReviewsToLocalStorage(filtered);
    this.notifyReviewListeners();
    return true;
  }

  public async deleteReport(reportId: string): Promise<boolean> {
    try {
      const docRef = doc(db, 'reports', reportId);
      await deleteDoc(docRef);
    } catch (err) {
      console.warn('Firestore deleteReport failed:', err);
    }

    const reports = this.reportsCache || this.loadReportsFromLocalStorage();
    const filtered = reports.filter((r) => r.id !== reportId);
    this.reportsCache = filtered;
    this.saveReportsToLocalStorage(filtered);
    this.notifyReportListeners();
    return true;
  }

  /**
   * Verify if a Firebase authenticated user possesses authorized administrator privileges.
   * Checks Firestore /admins/{uid} doc or authorized owner email.
   * Strictly enforces real Firebase Authentication!
   */
  public async checkIsAdmin(user: User | null): Promise<boolean> {
    if (!user) return false;

    // Check primary project owner email
    if (
      user.email &&
      user.email.toLowerCase() === OWNER_ADMIN_EMAIL.toLowerCase()
    ) {
      // Ensure the admin doc exists in Firestore for RBAC consistency
      try {
        const adminDocRef = doc(db, 'admins', user.uid);
        const adminDoc = await getDoc(adminDocRef);
        if (!adminDoc.exists()) {
          await setDoc(adminDocRef, {
            email: user.email,
            role: 'admin',
            createdAt: Date.now(),
          });
        }
      } catch {
        // Continue
      }
      return true;
    }

    // Check Firestore /admins/{uid} collection
    try {
      const adminDocRef = doc(db, 'admins', user.uid);
      const adminDoc = await getDoc(adminDocRef);
      if (adminDoc.exists() && adminDoc.data()?.role === 'admin') {
        return true;
      }
    } catch (err) {
      console.warn('Failed to verify admin status from Firestore:', err);
    }

    return false;
  }
}

export const feedbackService = new FeedbackService();
