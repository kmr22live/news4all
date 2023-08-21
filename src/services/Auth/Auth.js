// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// const firebaseConfig = {
//   apiKey: "AIzaSyBNaCqO50fQICJGHf4bV6QaqNNOboT1fjo",
//   authDomain: "ecommerse-medicine.firebaseapp.com",
//   projectId: "ecommerse-medicine",
//   storageBucket: "ecommerse-medicine.appspot.com",
//   messagingSenderId: "390711638329",
//   appId: "1:390711638329:web:b375ceb3b09e101e5e50e8",
//   measurementId: "G-VS6KCCR31J",
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWp_VerxRwKDN7GTx8tGwS07d434thJmY",
  authDomain: "news4all-news.firebaseapp.com",
  projectId: "news4all-news",
  storageBucket: "news4all-news.appspot.com",
  messagingSenderId: "492995841424",
  appId: "1:492995841424:web:f3b6f7f4237a95d9f83715",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore();
