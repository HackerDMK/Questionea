import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"
import { collection, addDoc, getDocs, getDoc, doc, setDoc, query, where, limit, orderBy} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"; 


const firebaseConfig = {
    apiKey: "AIzaSyCsfmkK-YCitFYG6RNGuCUCcUGwbebhWio",
    authDomain: "questioneawebsite.firebaseapp.com",
    projectId: "questioneawebsite",
    storageBucket: "questioneawebsite.appspot.com",
    messagingSenderId: "243569904275",
    appId: "1:243569904275:web:89efc7d71b7e2845599b66",
    measurementId: "G-PTVYQ922VK"
  };


    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth();
    const db = getFirestore(app);
    console.log(app);
    var global = "test@gmail.com";


  onAuthStateChanged(auth, (user) => {
    if(!user) {
      window.location = 'index.html'; //If User is not logged in, redirect to login page
    }
    else{
        console.log("Logged in Already")
        var email = user.email;
        console.log(email)
        document.getElementById("AddQuestion").addEventListener("click", async function() {
            var Topic =  document.getElementById("topic").value;
            var Description = document.getElementById("description").value;
            const date = new Date();
            await setDoc(doc(db, "Questions", email), {
                Topic: Topic,
                Description: Description,
                Date: date,
                Counter: 0,
              });
              window.location = 'homepage.html';
        
        });
        
    }
  });

