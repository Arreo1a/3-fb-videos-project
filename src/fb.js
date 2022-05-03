import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { initializeApp } from "firebase/app";

export const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBD9wLIhyhtPgTi20pqtm7WchkTd7PsGQA",
  authDomain: "fb-videos-project.firebaseapp.com",
  projectId: "fb-videos-project",
  storageBucket: "fb-videos-project.appspot.com",
  messagingSenderId: "816412712008",
  appId: "1:816412712008:web:ecaa01052a305d6cef0c7d",
});

// // Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);

// export default firebaseApp;
