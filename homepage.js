import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js"
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
    var global = "test@gmail.com";
    
onAuthStateChanged(auth, (user) => {
    if(!user) {
      window.location = 'index.html'; //If User is not logged in, redirect to login page
    }
    else{
        console.log("Logged in Already")
        var email = user.email;
        document.getElementById("useremail").innerHTML = email;
        console.log(email)
    }
  });

onAuthStateChanged(auth, async (user) => {
    if (user) {
      var displayName = user.displayName;
      var email = user.email;
      const docRef = doc(db, "Questions", email);
    } else {
    }
  });


document.getElementById("SignOut").addEventListener("click", function() {
    signOut(auth).then(() => {
            alert("Sign-out successful");
            window.location.href = "index.html"
        }).catch((error) => {
  });
});


async function LoadData(){
var list = document.getElementById('MainSection');
const querySnapshot = await getDocs(collection(db, "Questions"));
  list.innerHTML = '';
  querySnapshot.forEach((doc) => {
      const data = doc.data();
      list.innerHTML += `
                    <div class="Box">
                    <div id="profile">
                        <p class="profileemail">${doc.id}</p>
                    </div>
                    <div id="QuestionBox">
                        <p class="QuestionTitle">${doc.get("Topic")}</p>
                        <p class="QuestionDescription" >${doc.get("Description")}</p>
                    </div>
                    <div id="BoxBottom">
                        <div id="Counter"> <p class="Counter">${doc.get("Counter")}</p> </div>
                        <img class="vote" src="upvote.png">
                        <img class="vote" src="downvote.png">
                        <img class="vote" src="comment.png">
                        <input type="text" id="AnswerBox" placeholder="Type your Answer Here..................................................">
                        <button class="AnswerButton">Add Answer</button>
                        <p class="Date">${doc.get("Date")}</p>
                    </div>
                </div>
                `
              });
}
LoadData();

document.getElementById("QuestionButton").addEventListener("click", function() {
  window.location.href = "addquestion.html"
})


document.getElementById("Search").addEventListener('change', async function() {
  var listsearch = document.getElementById('MainSection');
  var Find =  document.getElementById("Search").value;
  if(Find == 0){
    LoadData();
  }
  else{
  const scandocument = query(collection(db, "Questions"), where("Topic", ">=", Find));
  const SearchSnapshot = await getDocs(scandocument);
  listsearch.innerHTML = '';
  SearchSnapshot.forEach((doc) => {
    listsearch.innerHTML += `
                  <div class="Box">
                  <div id="profile">
                      <p class="profileemail">${doc.id}</p>
                  </div>
                  <div id="QuestionBox">
                      <p class="QuestionTitle">${doc.get("Topic")}</p>
                      <p class="QuestionDescription" >${doc.get("Description")}</p>
                  </div>
                  <div id="BoxBottom">
                      <div id="Counter"> <p class="Counter">${doc.get("Counter")}</p> </div>
                      <img class="vote" src="upvote.png">
                      <img class="vote" src="downvote.png">
                      <img class="vote" src="comment.png">
                      <input type="text" id="AnswerBox" placeholder="Type your Answer Here..................................................">
                      <button class="AnswerButton">Add Answer</button>
                      <p class="Date">${doc.get("Date")}</p>
                  </div>
              </div>
              `
            });
}
})

document.getElementById("Refresh").addEventListener('click', async function() {
  window.location.href = "homepage.html"
});