import firebase from 'firebase';
import * as firebaseui from 'firebaseui';

const firebaseConfig = {
    apiKey: "AIzaSyAoXEIkPzrDE3oOyyKqnN6r1WU2bIpqm2U",
    authDomain: "hikeasy-4b1dd.firebaseapp.com",
    projectId: "hikeasy-4b1dd",
    storageBucket: "hikeasy-4b1dd.appspot.com",
    messagingSenderId: "197760013635",
    appId: "1:197760013635:web:c964c7b34728f1598d0bf6",
    measurementId: "G-71JM5L06RQ"

   
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const authUI = new firebaseui.auth.AuthUI(auth);