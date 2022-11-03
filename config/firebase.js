// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdyINZ19pva9qfH8FEuIZCxonGioi7JHc",
  authDomain: "rickmortyapi-56f6c.firebaseapp.com",
  databaseURL: "https://rickmortyapi-56f6c-default-rtdb.firebaseio.com",
  projectId: "rickmortyapi-56f6c",
  storageBucket: "rickmortyapi-56f6c.appspot.com",
  messagingSenderId: "753885932680",
  appId: "1:753885932680:web:c910cf1ecbb9276e19833d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth();

export {db, auth}