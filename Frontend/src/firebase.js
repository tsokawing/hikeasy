import firebase from 'firebase';
import * as firebaseui from 'firebaseui';

const firebaseConfig = {
    apiKey: "AIzaSyD4AEit3eiJRA1eaI9liIsyZGRW0IvHB2g",
    authDomain: "hikeasy-7d6e1.firebaseapp.com",
    projectId: "hikeasy-7d6e1",
    storageBucket: "hikeasy-7d6e1.appspot.com",
    messagingSenderId: "216736255415",
    appId: "1:216736255415:web:a4a7f0992f95e337c36c32",
    measurementId: "G-9XQRJFFZQM"
   
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const authUI = new firebaseui.auth.AuthUI(auth);