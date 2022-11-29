import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";


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
	  console.log(app);
    const provider = new GoogleAuthProvider();

    var viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute("content", viewport.content + ", height=" + window.innerHeight);

    
      document.getElementById("SignupButton").addEventListener("click", function() {
        var email =  document.getElementById("registeremail").value;
        var password = document.getElementById("registerpassword").value;
        //For new registration
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          alert("Registration successfully!!");
          window.location.href = "loginpage.html"
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          console.log(errorMessage);
          alert(error);
        });		  		  
    });

    document.getElementById("Google_Login").addEventListener("click", function() {
  
      signInWithPopup(auth, provider)
     .then((result) => {
       const credential = GoogleAuthProvider.credentialFromResult(result);
       const token = credential.accessToken;
       const user = result.user;
       console.log(user);
       window.location.href = "homepage.html"
     }).catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
       const email = error.customData.email;
       const credential = GoogleAuthProvider.credentialFromError(error);
     });
     });