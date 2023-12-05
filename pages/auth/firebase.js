import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyByzWr4QMJ8VCq2GyutIxAP6W3l9hv7HnI",
  authDomain: "dream-planner-e849e.firebaseapp.com",
  projectId: "dream-planner-e849e",
  storageBucket: "dream-planner-e849e.appspot.com",
  messagingSenderId: "756731840388",
  appId: "1:756731840388:web:641a89fc7f5bb83bc1bfd1",
  measurementId: "G-0D657FY07F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
