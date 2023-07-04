
const email = document.getElementById('emailField');
const emailError = document.getElementById('email-error');

const password = document.getElementById('passwordField');
const passwordError = document.getElementById('password-error');

const loginButton = document.getElementById('login-btn');


function validate() {

    if(email.value === '') {

        emailError.innerText = "Please enter a valid email";
        return false;
        
    }
    emailError.innerText = "";

    if(password.value === '') {

        passwordError.innerText = "Please Enter a Password";
        return false;

    }
    passwordError.innerText = "";

    return true;

}

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyBlbb02P8nCYB83ScRtsEGuRar3E-WRfNc",
  authDomain: "front-end-project-62b58.firebaseapp.com",
  projectId: "front-end-project-62b58",
  storageBucket: "front-end-project-62b58.appspot.com",
  messagingSenderId: "988745008693",
  appId: "1:988745008693:web:a2789d6b7552ae0f33137c",
  measurementId: "G-YHWY5ENBWG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();


window.loginFun = function(e) {

    e.preventDefault();

    const emailValue = email.value;
    const passwordValue = password.value;
    const validateVar = validate();

    if(validateVar) {
        signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        location.replace('http://127.0.0.1:5500/todoList/to-do-list.html');
        
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if(errorMessage === "Firebase: Error (auth/user-not-found).") {
            document.querySelector('.check-user').innerHTML = "User not found";
        }
        
        });
    }
}
