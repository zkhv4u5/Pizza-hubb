import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/functions'

const firebaseConfig = {
  apiKey: "AIzaSyAf2STglD7O3g9P0Bl_J4RFF93yaVcs_Cc",
  authDomain: "pizza-hub-49504.firebaseapp.com",
  projectId: "pizza-hub-49504",
  storageBucket: "pizza-hub-49504.appspot.com",
  messagingSenderId: "837478452752",
  appId: "1:837478452752:web:e7ec6b335e36e65e6a4495"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const functions = firebase.functions();

export { auth, db, functions };