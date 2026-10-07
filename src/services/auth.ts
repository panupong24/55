import { getAuth } from 'firebase/auth';
import { app } from './firebase';

// Kept in its own module so Firebase Auth is only bundled with the admin page.
export const auth = getAuth(app);
