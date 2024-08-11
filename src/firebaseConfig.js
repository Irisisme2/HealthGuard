import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/analytics'; // Jeśli używasz Google Analytics

const firebaseConfig = {
  apiKey: "AIzaSyD-1wDbcQ4IB0yY_LXoeOmIDU8GC6MV7Po",
  authDomain: "healthguard-f9492.firebaseapp.com",
  projectId: "healthguard-f9492",
  storageBucket: "healthguard-f9492.appspot.com",
  messagingSenderId: "222184138516",
  appId: "1:222184138516:web:a101b8ec1331213f25c401",
  measurementId: "G-WWYWV88LQQ"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize services
const auth = firebase.auth();
const analytics = firebase.analytics(); // Jeśli używasz Google Analytics

// Export services
export { auth, analytics };
