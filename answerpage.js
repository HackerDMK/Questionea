import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js"
import { collection, addDoc, getDocs, getDoc, doc, setDoc, query, where, limit, orderBy, updateDoc} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"; 


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


async function LoadData(){
    var list = document.getElementById('MainSection');
    const LocalDocId = localStorage.getItem('GlobalDocId');
    console.log(LocalDocId)
    const querySnapshot = await getDocs(collection(db, LocalDocId));
    console.log(querySnapshot);
    list.innerHTML = '';
    const Boxid= [];
    var i=0;
    const QuestionId = await querySnapshot.forEach((doc) => {
          const data = doc.data();
          list.innerHTML += `
                        <div class="Box">
                        <div id="profile">
                            <p class="Documentid">${doc.id}</p>
                            <p class="profileemail">${doc.get("Answer")}</p>
                        </div>
                        <div id="AnswerBox">
                            <p class="AnswerDescription" >${doc.get("Answer")}</p>
                        </div>
                    </div>
                    `
                  i=i+1;
                  });
                  return doc.id
    }

LoadData();