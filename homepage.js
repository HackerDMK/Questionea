import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js"
import { collection, addDoc, getDocs, getDoc, doc, setDoc, query, where, limit, orderBy, updateDoc, startAt} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"; 

// Firebase config Files
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
    var viewport = document.querySelector("meta[name=viewport]");

//Fix viewport on mobile screens
viewport.setAttribute("content", viewport.content + ", height=" + window.innerHeight);


// Check if user is signed in
onAuthStateChanged(auth, (user) => {
    if(!user) {
      window.location = 'index.html'; //If User is not logged in, redirect to index page
    }
    else{
        console.log("Logged in Already")
        var email = user.email;
        document.getElementById("useremail").innerHTML = email;
    }
});


// Signout Button
document.getElementById("SignOut").addEventListener("click", function() {
    signOut(auth).then(() => {
        alert("Sign-out successful");
        window.location.href = "index.html" //Return to Index page
    })
    .catch((error) => {
    });
});


//Convert Timestamp to noraml time
function convertTimestamp(timestamp) {
    let date = timestamp.toDate();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let yyyy = date.getFullYear();
    date = dd + '/' + mm + '/' + yyyy;
    return date; //Get Time in DD/MM/YYYY format
}


//Function to fetch Questions from database
async function LoadData(){
    var list = document.getElementById('MainSection');
    const scandocument = query(collection(db, "Questions"), orderBy("Counter", "desc"), limit(50));
    const querySnapshot = await getDocs(scandocument);
    list.innerHTML = '';
    var i=0; //set intial fetch count to zero
    querySnapshot.forEach((doc) => {
        const getdate = doc.get("Date")
        const Date = convertTimestamp(getdate)
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
                              <img class="vote1" src="Assets/upvote.png">
                              <img class="vote2" src="Assets/downvote.png">
                              <img class="vote" src="Assets/comment.png">
                              <input type="text" class="AnswerText" id="AnswerBox" placeholder="Type your Answer Here..................................................">
                              <button class="AnswerButton">Add Answer</button>
                              <p class="Date">${Date}</p>
                          </div>
                      </div>
                          `
        i=i+1;
    });
return i; //return the number of questions
}

var CountRenders = await LoadData(); // Load the questions using LoadData function and set the number to CountRenders


// Function to get Documentid for each rendered question to get its answer page
async function DocIDUniversal(CountRenders){
    for(let i=0; i<CountRenders ; i++) {
      const BoxId = "#Box" + i;
      document.querySelector(BoxId).querySelector(".vote").addEventListener("click", async function(){
        const CollectionDocument = document.querySelector(BoxId).querySelector(".Documentid").textContent;
        const docRef = doc(db, "Questions", CollectionDocument);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            localStorage.setItem('GlobalDocId', CollectionDocument);
            window.location.href = "answerpage.html"
        }
        else{
            console.log("Error")
        }
      });
    }
}


//Function to add answer to Indivisual Questions using Add Answer Button
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
    }
}    


//Call Functions
DocIDUniversal(CountRenders); 
AnswerAdd(CountRenders);


//Function to Upvote the selected Question
async function Upvote(CountRenders){
    for(let i=0; i<CountRenders ; i++) {
      const BoxId = "#Box" + i;
      document.querySelector(BoxId).querySelector(".vote1").addEventListener("click", async function(){
        const CollectionDocument = document.querySelector(BoxId).querySelector(".Documentid").textContent;
        const docRef = doc(db, "Questions", CollectionDocument);
        const docSnap = await getDoc(docRef);
        const NewCounter = docSnap.get("Counter") + 1;
        const CounterUpdate = doc(db, "Questions", CollectionDocument);
        await updateDoc(CounterUpdate, {
            Counter: NewCounter //Save vote to database
        });
        const docRef2 = doc(db, "Questions", CollectionDocument);
        const docSnap2 = await getDoc(docRef2);
        const UpdatedCounter = document.querySelector(BoxId).querySelector(".Counter");
        UpdatedCounter.innerHTML = ``
        UpdatedCounter.innerHTML = `${docSnap2.get("Counter")}` //Get new count from database
      });
}
}


//Function to Downvote the selected Question
async function Downvote(CountRenders){
    for(let i=0; i<CountRenders ; i++) {
      const BoxId = "#Box" + i;
      document.querySelector(BoxId).querySelector(".vote2").addEventListener("click", async function(){
        const CollectionDocument = document.querySelector(BoxId).querySelector(".Documentid").textContent;
        const docRef = doc(db, "Questions", CollectionDocument);
        const docSnap = await getDoc(docRef);
        const NewCounter = docSnap.get("Counter") - 1;
        const CounterUpdate = doc(db, "Questions", CollectionDocument);
        await updateDoc(CounterUpdate, {
            Counter: NewCounter //Save vote to database
        });
        const docRef2 = doc(db, "Questions", CollectionDocument);
        const docSnap2 = await getDoc(docRef2);
        const UpdatedCounter = document.querySelector(BoxId).querySelector(".Counter");
        UpdatedCounter.innerHTML = ``
        UpdatedCounter.innerHTML = `${docSnap2.get("Counter")}` //Get new count from database
      });
    }
}

//Call Functions
Upvote(CountRenders);
Downvote(CountRenders);


//Search the database for questions
document.getElementById("Search").addEventListener('change', async function() { 
    var listsearch = document.getElementById('MainSection');
    var Find =  document.getElementById("Search").value;
    if(Find == 0){
      LoadData(); //If searchbox is empty then load all the questions
    }
    else{ 
      async function SearchData(){
        const scandocument = query(collection(db, "Questions"), where("Topic", ">=", Find));
        const SearchSnapshot = await getDocs(scandocument);
        listsearch.innerHTML = ``;
        var i=0;
        SearchSnapshot.forEach((doc) => {
          const getdate = doc.get("Date")
          const Date = convertTimestamp(getdate)
          listsearch.innerHTML += `
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
                        <img class="vote1" src="Assets/upvote.png">
                        <img class="vote2" src="Assets/downvote.png">
                        <img class="vote" src="Assets/comment.png">
                        <input type="text" class="AnswerText" id="AnswerBox" placeholder="Type your Answer Here..................................................">
                        <button class="AnswerButton">Add Answer</button>
                        <p class="Date">${Date}</p>
                    </div>
                </div>
                `
          i=i+1;
        });
      return i; //return the number of questions
      }
      CountRenders = await SearchData(); //Update CountRenders to number of results found

      //Call all the functions again to use the features for the found results
      await Upvote(CountRenders);
      await Downvote(CountRenders);
      await DocIDUniversal(CountRenders);
      await AnswerAdd(CountRenders);
    }
})


//Add Question Button
document.getElementById("QuestionButton").addEventListener("click", function() {
    window.location.href = "addquestion.html"
})


//Refresh
document.getElementById("Refresh").addEventListener('click', async function() {
    window.location.href = "homepage.html"
});



//Feedback Submit
document.getElementById("EmailSubmitFeed").addEventListener('click', function() {
    var FeedbackEmail =  document.getElementById("EmailFeed").value;
    var FeedbackDescription =  document.getElementById("DescriptionFeed").value;
    fetch("https://api.apispreadsheets.com/data/P6LeqX8CjS9eAZew/", {
	    method: "POST",
      //Save the feedback to a Google Sheet
	    body: JSON.stringify({"data": {"Email":FeedbackEmail,"Description":FeedbackDescription}}),
    })
    .then(res =>{
	    if (res.status === 201){
		    alert("Thanks for your Feedback");
        window.location.href = "homepage.html"
	    }
	    else{
		  // ERROR
      }
    })
});


//Email Subscription
document.getElementById("SubscribeEmailSubmit").addEventListener('click', function() {
    var SubsEmail =  document.getElementById("SubscribeEmail").value;
    fetch("https://api.apispreadsheets.com/data/AJ9yfGhvrDGUMQc0/", {
	    method: "POST",
      //Save the emails to a Google Sheet
	    body: JSON.stringify({"data": {"Email":SubsEmail}}),
    })
    .then(res =>{
	    if (res.status === 201){
		    alert("Thanks for Subscribing to our Notifications");
        window.location.href = "homepage.html"
	    }
	    else{
		    // ERROR
      }
    })
});

