let auth = firebase.auth()
let login = () => {
  let email = document.querySelector("#emailentry")
  let password = document.querySelector("#passwordentry")
  auth.signInWithEmailandPassword(eemail.value, password.value).catch((error) => {console.error})
  auth.signInWithEmailandPassword(email.value, password.value)
}

auth.OnAuthStateChanged((user) => {
  if (user) {
      window.location.href = "homepage.html"
  }
})