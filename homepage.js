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

      
function convertTimestamp(timestamp) {
    let date = timestamp.toDate();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let yyyy = date.getFullYear();
  
    date = mm + '/' + dd + '/' + yyyy;
    return date;
  }

async function LoadData(){
var list = document.getElementById('MainSection');
const querySnapshot = await getDocs(collection(db, "Questions"));
list.innerHTML = '';
const Boxid= [];
var i=0;
querySnapshot.forEach((doc) => {
      const data = doc.data();
      const fsdsa = doc.get("Date")
      const Date = convertTimestamp(fsdsa)
      Boxid[i]=(doc.id).split("+").pop();
      list.innerHTML += `
                    <div class="Box" id="Box${i}">
                    <div id="profile">
                        <p class="Documentid">${doc.id}</p>
                        <p class="profileemail">${(doc.id).split("+").pop()}</p>
                    </div>
                    <div id="QuestionBox">
                        <p class="QuestionTitle">${doc.get("Topic")}</p>
                        <p class="QuestionDescription" >${doc.get("Description")}</p>
                    </div>
                    <div id="BoxBottom">
                        <div id="Counter"> <p class="Counter">${doc.get("Counter")}</p> </div>
                        <img class="vote1" src="upvote.png">
                        <img class="vote2" src="downvote.png">
                        <img class="vote" src="comment.png">
                        <input type="text" class="AnswerText" id="AnswerBox" placeholder="Type your Answer Here..................................................">
                        <button class="AnswerButton">Add Answer</button>
                        <p class="Date">${Date}</p>
                    </div>
                </div>
                `
              i=i+1;
              });
              return i;
}

const CountRenders = await LoadData();

document.getElementById("Search").addEventListener('change', async function() {
  var listsearch = document.getElementById('MainSection');
  var Find =  document.getElementById("Search").value;
  if(Find == 0){
    LoadData();
  }
  else{
  const scandocument = query(collection(db, "Questions"), where("Topic", ">=", Find));
  const SearchSnapshot = await getDocs(scandocument);
  const Boxid= [];
  listsearch.innerHTML = '';
  var i=0;
  SearchSnapshot.forEach((doc) => {
    const data = doc.data();
    const fsdsa = doc.get("Date")
    const Date = convertTimestamp(fsdsa)
    Boxid[i]=(doc.id).split("+").pop();
    listsearch.innerHTML += `
                  <div class="Box">
                  <div id="profile">
                      <p class="profileemail">${(doc.id).split("+").pop()}</p>
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
                      <button class="AnswerButton" class="AnswerText" >Add Answer</button>
                      <p class="Date">${Date}</p>
                  </div>
              </div>
              `
            });
}
})


async function DocIDUniversal(CountRenders){
  for(let i=0; i<CountRenders ; i++) {
    const BoxId = "#Box" + i;
    document.querySelector(BoxId).querySelector(".vote").addEventListener("click", async function(){
    const CollectionDocument = document.querySelector(BoxId).querySelector(".Documentid").textContent;
    const docRef = doc(db, "Questions", CollectionDocument);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("OK")
      localStorage.setItem('GlobalDocId', CollectionDocument);
      window.location.href = "answerpage.html"
    }
    else{
      console.log("Error")
    }
  });
}}

async function AnswerAdd(CountRenders){
  for(let i=0; i<CountRenders ; i++) {
    const BoxId = "#Box" + i;
    document.querySelector(BoxId).querySelector(".AnswerButton").addEventListener("click", async function(){
      const CollectionDocumentID = document.querySelector(BoxId).querySelector(".Documentid").textContent;
      const AnswerDocument = document.querySelector(BoxId).querySelector(".AnswerText").value;
      console.log(AnswerDocument)
      const EmailData = document.getElementById("useremail").textContent;
      const CollectionDocument1 = "Answers" + "/" + CollectionDocumentID + "/" + CollectionDocumentID
      await setDoc(doc(db, CollectionDocument1, EmailData), {
        Answer: AnswerDocument
      });
      alert("Answer Added");
      document.querySelector(BoxId).querySelector(".AnswerText").value = '';
    })
  }}    



DocIDUniversal(CountRenders);
AnswerAdd(CountRenders);


async function Upvote(CountRenders){
  for(let i=0; i<CountRenders ; i++) {
      const BoxId = "#Box" + i;
      document.querySelector(BoxId).querySelector(".vote1").addEventListener("click", async function(){
      const CollectionDocument = document.querySelector(BoxId).querySelector(".Documentid").textContent;
      const docRef = doc(db, "Questions", CollectionDocument);
      const docSnap = await getDoc(docRef);
      console.log("OK")
      const NewCounter = docSnap.get("Counter") + 1;
      const CounterUpdate = doc(db, "Questions", CollectionDocument);
      await updateDoc(CounterUpdate, {
        Counter: NewCounter
      });
      console.log("vote registered");
      const docRef2 = doc(db, "Questions", CollectionDocument);
      const docSnap2 = await getDoc(docRef2);
      const UpdatedCounter = document.querySelector(BoxId).querySelector(".Counter");
      UpdatedCounter.innerHTML = ``
      UpdatedCounter.innerHTML = `${docSnap2.get("Counter")}`
      
    });
}
}
  
  function Downvote(CountRenders){
    for(let i=0; i<CountRenders ; i++) {
      const BoxId = "#Box" + i;
      document.querySelector(BoxId).querySelector(".vote2").addEventListener("click", async function(){
      const CollectionDocument = document.querySelector(BoxId).querySelector(".Documentid").textContent;
      const docRef = doc(db, "Questions", CollectionDocument);
      const docSnap = await getDoc(docRef);
      console.log("OK")
      const NewCounter = docSnap.get("Counter") - 1;
      console.log(NewCounter)
      console.log(CollectionDocument)
      const CounterUpdate = doc(db, "Questions", CollectionDocument);
      await updateDoc(CounterUpdate, {
        Counter: NewCounter
      });
      console.log("vote registered");
      const docRef2 = doc(db, "Questions", CollectionDocument);
      const docSnap2 = await getDoc(docRef2);
      const UpdatedCounter = document.querySelector(BoxId).querySelector(".Counter");
      UpdatedCounter.innerHTML = ``
      UpdatedCounter.innerHTML = `${docSnap2.get("Counter")}`
      });
}
}
  
console.log(CountRenders);
Upvote(CountRenders);
Downvote(CountRenders);



document.getElementById("QuestionButton").addEventListener("click", function() {
  window.location.href = "addquestion.html"
})

document.getElementById("Refresh").addEventListener('click', async function() {
  window.location.href = "homepage.html"
});


document.getElementById("EmailSubmitFeed").addEventListener('click', function() {
  var FeedbackEmail =  document.getElementById("EmailFeed").value;
  var FeedbackDescription =  document.getElementById("DescriptionFeed").value;
fetch("https://api.apispreadsheets.com/data/P6LeqX8CjS9eAZew/", {
	method: "POST",
	body: JSON.stringify({"data": {"Email":FeedbackEmail,"Description":FeedbackDescription}}),
}).then(res =>{
	if (res.status === 201){
		alert("Thanks for your Feedback");
    window.location.href = "homepage.html"
	}
	else{
		// ERROR
  }
})
});

document.getElementById("SubscribeEmailSubmit").addEventListener('click', function() {
  var SubsEmail =  document.getElementById("SubscribeEmail").value;
fetch("https://api.apispreadsheets.com/data/AJ9yfGhvrDGUMQc0/", {
	method: "POST",
	body: JSON.stringify({"data": {"Email":SubsEmail}}),
}).then(res =>{
	if (res.status === 201){
		alert("Thanks for Subscribing to our Notifications");
    window.location.href = "homepage.html"
	}
	else{
		// ERROR
  }
})
});

