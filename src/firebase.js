import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCOinrA6Z3-BjEcsQ--uCdxK1I6oSykBoc",
  authDomain: "chat-application-b3014.firebaseapp.com",
  projectId: "chat-application-b3014",
  storageBucket: "chat-application-b3014.appspot.com",
  messagingSenderId: "218958937668",
  appId: "1:218958937668:web:af6b93e401613317604611",
  measurementId: "G-7LJWPXHXWK"
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const provider = new GoogleAuthProvider();


