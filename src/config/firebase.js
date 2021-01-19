import firebase from 'firebase'
import 'firebase/firestore'
// firebase init
const firebaseConfig = {
    apiKey: "AIzaSyDYD_9pWfu-oc5rydzdeVFK3vKTDCVBOXA",
    authDomain: "smartforce-technical-test.firebaseapp.com",
    databaseURL: "https://smartforce-technical-test-default-rtdb.firebaseio.com",
    projectId: "smartforce-technical-test",
    storageBucket: "smartforce-technical-test.appspot.com",
    messagingSenderId: "822373119178",
    appId: "1:822373119178:web:1f13cbfbf064174cdff033",
    measurementId: "G-YFK2WGJ6KT"
};
firebase.initializeApp(firebaseConfig)
    // utils
const db = firebase.firestore();
//collection references
const panels = db.collection('panels');
// export utils/refs

export {
    db,
    panels
}