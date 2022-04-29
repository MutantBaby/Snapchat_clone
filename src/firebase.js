import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBOrfPLyM3Ym_SUEINJ4o1xGm1MHhwC68I",
  authDomain: "snapchat-clone-fe712.firebaseapp.com",
  projectId: "snapchat-clone-fe712",
  storageBucket: "snapchat-clone-fe712.appspot.com",
  messagingSenderId: "921182291406",
  appId: "1:921182291406:web:205f1957aa6f17dcc6179f",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
