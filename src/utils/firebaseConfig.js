import firebase from "firebase/app";
import 'firebase/database';

var config = {
    apiKey: "AIzaSyDDRmhKcGal-1wH6Idsd5QQrBVBNGU8HMk",
    authDomain: "bingo-f671a.firebaseapp.com",
    databaseURL: "https://bingo-f671a.firebaseio.com",
    projectId: "bingo-f671a",
    storageBucket: "bingo-f671a.appspot.com",
    messagingSenderId: "122655200780"
  };
export const firebaseConfig = firebase.initializeApp(config);