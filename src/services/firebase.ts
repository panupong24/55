import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfigJson from '../../firebase-applet-config.json';

export const firebaseConfig = {
  apiKey: firebaseConfigJson.apiKey,
  authDomain: firebaseConfigJson.authDomain,
  projectId: firebaseConfigJson.projectId,
  storageBucket: firebaseConfigJson.storageBucket,
  messagingSenderId: firebaseConfigJson.messagingSenderId,
  appId: firebaseConfigJson.appId,
  firestoreDatabaseId: firebaseConfigJson.firestoreDatabaseId,
};

export const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Firestore with the provisioned database ID
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Test Firestore connection as recommended in Firebase Skill
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes('the client is offline')
    ) {
      console.warn('Firebase Firestore is offline or checking configuration.');
    }
  }
}

testConnection();

/**
 * Checks whether Firebase Email/Password provider is active in the project.
 * Uses a non-destructive identitytoolkit REST probe to check for OPERATION_NOT_ALLOWED.
 */
export async function checkEmailPasswordStatus(): Promise<{
  isEnabled: boolean;
  code?: string;
  message?: string;
}> {
  try {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'firebase_probe_test_check@example.com',
          password: 'ProbePassword123!',
          returnSecureToken: false,
        }),
      },
    );
    const data = await res.json();
    if (data.error) {
      if (
        data.error.message === 'OPERATION_NOT_ALLOWED' ||
        data.error.message === 'PASSWORD_LOGIN_DISABLED'
      ) {
        return {
          isEnabled: false,
          code: 'OPERATION_NOT_ALLOWED',
          message: 'Email/Password sign-in is disabled in Firebase Console',
        };
      }
      // If error is EMAIL_EXISTS or other validation errors, it means the provider is active!
      return { isEnabled: true };
    }
    // If somehow created, it's enabled
    return { isEnabled: true };
  } catch (err: any) {
    return { isEnabled: true }; // Network fallback, allow user attempt
  }
}

/**
 * Checks if current hostname is default authorized by Firebase or needs to be added.
 */
export function checkDomainAuthorization(): {
  hostname: string;
  isDefaultAuthorized: boolean;
  isCustomDomain: boolean;
} {
  if (typeof window === 'undefined') {
    return {
      hostname: 'localhost',
      isDefaultAuthorized: true,
      isCustomDomain: false,
    };
  }

  const hostname = window.location.hostname;
  const isDefault =
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === `${firebaseConfig.projectId}.firebaseapp.com` ||
    hostname === `${firebaseConfig.projectId}.web.app`;

  return {
    hostname,
    isDefaultAuthorized: isDefault,
    isCustomDomain: !isDefault,
  };
}

/**
 * Direct links to Firebase Console for project configuration
 */
export function getFirebaseConsoleLinks() {
  const pId = firebaseConfig.projectId;
  return {
    projectId: pId,
    providersUrl: `https://console.firebase.google.com/project/${pId}/authentication/providers`,
    settingsUrl: `https://console.firebase.google.com/project/${pId}/authentication/settings`,
    usersUrl: `https://console.firebase.google.com/project/${pId}/authentication/users`,
    firestoreUrl: `https://console.firebase.google.com/project/${pId}/firestore`,
  };
}
