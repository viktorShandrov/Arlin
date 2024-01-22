// src/firebase.js
const  { initializeApp } = require('firebase/app') ;
const { getStorage } = require('firebase/storage') ;

const firebaseConfig = {
    apiKey: "AIzaSyDPQl_SFn_XGjfDZQ3qtS2Hi4OjkZD66i8",
    authDomain: "arlin-learn-through-literature.firebaseapp.com",
    projectId: "arlin-learn-through-literature",
    storageBucket: "arlin-learn-through-literature.appspot.com",
    messagingSenderId: "1066414595672",
    appId: "1:1066414595672:web:d387adefb23ab35de9b42d",
    measurementId: "G-3WJ0H62SC6"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports =  { storage, app  };
