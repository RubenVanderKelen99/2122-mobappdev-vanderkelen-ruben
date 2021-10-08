import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAPCybVHg4Q8p_mZNzBEjX9S_RmhhnnkdU",
    authDomain: "mobappdev-vanderkelen.firebaseapp.com",
    projectId: "mobappdev-vanderkelen",
    storageBucket: "mobappdev-vanderkelen.appspot.com",
    messagingSenderId: "313222397290",
    appId: "1:313222397290:web:5ae5c0604d89cd4eceb913",
    measurementId: "G-23LJCBZWFS"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };