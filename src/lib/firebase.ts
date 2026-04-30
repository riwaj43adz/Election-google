import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAIIOThKmobDrUS6-XhSkM-5_ZldtOEzYY",
  authDomain: "gen-lang-client-0507584762.firebaseapp.com",
  projectId: "gen-lang-client-0507584762",
  storageBucket: "gen-lang-client-0507584762.firebasestorage.app",
  messagingSenderId: "788092144883",
  appId: "1:788092144883:web:7570498b53df28d612496a",
  measurementId: "G-G6J0XFDP93"
};

// Initialize Firebase only if API key is present
const hasConfig = !!import.meta.env.VITE_FIREBASE_API_KEY;

let app: any;
let auth: any;
let db: any;
let analytics: any = null;
const googleProvider = new GoogleAuthProvider();

if (hasConfig) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
      analytics = getAnalytics(app);
    }
  } catch (error) {
    console.error("Firebase initialization failed:", error);
  }
}

export { app, auth, db, googleProvider, analytics };
export default app;
