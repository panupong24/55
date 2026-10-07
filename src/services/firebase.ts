import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
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

// Initialize Firestore with the provisioned database ID
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

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
