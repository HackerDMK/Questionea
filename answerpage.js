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
    var anslist = document.getElementById('MainSection');
    var Qslist = document.getElementById('QuestionSection');
    const LocalDocId = localStorage.getItem('GlobalDocId');
    const querySnapshot2 = await getDocs(collection(db, "Questions"));
    Qslist.innerHTML = '';
    querySnapshot2.forEach((doc) => {
    if(doc.id == LocalDocId){
    Qslist.innerHTML += `
                        <p id=QsTopic>${doc.get("Topic")}</p>
                        <p id=QsDescription>${doc.get("Description")}</p>
                        `
    }
    })
    const NewId = '/Answers' + '/' + LocalDocId + '/' + LocalDocId + '/'
    const querySnapshot = await getDocs(collection(db, NewId));
    anslist.innerHTML = '';
    const Boxid= [];
    var i=0;
    await querySnapshot.forEach((doc) => {
          const data = doc.data();
          anslist.innerHTML += `
                        <div class="Box">
                        <div id="profile">
                            <p class="Documentid">${doc.id}</p>
                            <p class="profileemail">${doc.id}</p>
                        </div>
                        <div id="AnswerBox">
                            <p class="AnswerDescription" >${doc.get("Answer")}</p>
                        </div>
                    </div>
                    `
                  i=i+1;
                  });
}
LoadData();

document.getElementById("TitleBox").addEventListener('click', async function() {
    window.location.href = "homepage.html"
  });