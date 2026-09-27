import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';

// Default Supabase config from environment
const defaultUrl = import.meta.env.VITE_SUPABASE_URL || '';
const defaultKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const authorizedEmails = (
  import.meta.env.VITE_ADMIN_EMAILS ||
  '684234020@parichat.skru.ac.th,admin@gaykub.online'
)
  .split(',')
  .map((e: string) => e.trim().toLowerCase())
  .filter(Boolean);

class AdminAuthService {
  private client: SupabaseClient | null = null;
  private currentSession: Session | null = null;
  private currentUser: User | null = null;
  private listeners: Set<(user: User | null, isAdmin: boolean) => void> = new Set();

  constructor() {
    this.initClient(defaultUrl, defaultKey);
  }

  public initClient(url: string, key: string): boolean {
    if (!url || !key) {
      this.client = null;
      return false;
    }
    try {
      this.client = createClient(url, key, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      });

      this.client.auth.getSession().then(({ data }) => {
        this.currentSession = data.session;
        this.currentUser = data.session?.user || null;
        this.notifyListeners();
      });

      this.client.auth.onAuthStateChange((_event, session) => {
        this.currentSession = session;
        this.currentUser = session?.user || null;
        this.notifyListeners();
      });

      return true;
    } catch (err) {
      console.error('Failed to initialize Supabase client:', err);
      this.client = null;
      return false;
    }
  }

  public isConfigured(): boolean {
    return this.client !== null;
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  public isAuthorizedAdmin(user?: User | null): boolean {
    const target = user || this.currentUser;
    if (!target) return false;

    // 1. Check custom claim / app_metadata role
    if (target.app_metadata?.role === 'admin' || target.user_metadata?.role === 'admin') {
      return true;
    }

    // 2. Check verified admin email
    if (target.email) {
      const emailLower = target.email.toLowerCase();
      if (authorizedEmails.includes(emailLower)) {
        return true;
      }
    }

    return false;
  }

  public subscribe(
    callback: (user: User | null, isAdmin: boolean) => void,
  ): () => void {
    this.listeners.add(callback);
    callback(this.currentUser, this.isAuthorizedAdmin(this.currentUser));
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notifyListeners() {
    const isAdmin = this.isAuthorizedAdmin(this.currentUser);
    this.listeners.forEach((fn) => fn(this.currentUser, isAdmin));
  }

  /**
   * Secure Sign-in with Email & Password via Supabase Auth
   */
  public async signInWithPassword(
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string; isAdmin?: boolean }> {
    if (!this.client) {
      return {
        success: false,
        error:
          'Supabase credentials not configured. Please provide Supabase Project URL and Anon Key.',
      };
    }

    const { data, error } = await this.client.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    this.currentSession = data.session;
    this.currentUser = data.user;
    const isAdmin = this.isAuthorizedAdmin(data.user);

    if (!isAdmin) {
      // User is authenticated but NOT an authorized admin
      await this.client.auth.signOut();
      this.currentUser = null;
      this.currentSession = null;
      this.notifyListeners();
      return {
        success: false,
        error: 'Access Denied: This account does not possess administrator privileges.',
      };
    }

    this.notifyListeners();
    return { success: true, isAdmin: true };
  }

  /**
   * Passwordless Magic Link Sign-in via Supabase Auth
   */
  public async signInWithOtp(
    email: string,
  ): Promise<{ success: boolean; error?: string }> {
    if (!this.client) {
      return {
        success: false,
        error: 'Supabase credentials not configured.',
      };
    }

    const cleanEmail = email.trim().toLowerCase();
    if (!authorizedEmails.includes(cleanEmail)) {
      return {
        success: false,
        error: 'Access Denied: Email address is not in the authorized administrator registry.',
      };
    }

    const { error } = await this.client.auth.signInWithOtp({
      email: cleanEmail,
      options: {
        emailRedirectTo: typeof window !== 'undefined' ? window.location.href : undefined,
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  }

  /**
   * Sign out
   */
  public async signOut(): Promise<void> {
    if (this.client) {
      await this.client.auth.signOut();
    }
    this.currentUser = null;
    this.currentSession = null;
    this.notifyListeners();
  }

  public getClient(): SupabaseClient | null {
    return this.client;
  }
}

export const adminAuthService = new AdminAuthService();
