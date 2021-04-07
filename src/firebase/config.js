import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAZsVxsJN8jLWVLmLNk48R9ck4iY01bP1w",
    authDomain: "muso-ninjas-33f6c.firebaseapp.com",
    projectId: "muso-ninjas-33f6c",
    storageBucket: "muso-ninjas-33f6c.appspot.com",
    messagingSenderId: "739617388594",
    appId: "1:739617388594:web:c80822afc631acce52642b"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, timestamp }