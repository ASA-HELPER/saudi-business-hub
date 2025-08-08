import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCc202UmHo3-IMieBjKPyjvlQyV-IIL7p8",
  authDomain: "eservices-be3a6.firebaseapp.com",
  projectId: "eservices-be3a6",
  storageBucket: "eservices-be3a6.appspot.com",
  messagingSenderId: "765103705760",
  appId: "1:765103705760:web:d38a3777fbbe80290343c5",
  measurementId: "G-Q7PFNB7GQ2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
