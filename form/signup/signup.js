
const namefield = document.getElementById('nameField');
const nameError = document.getElementById('name-error');

const email = document.getElementById('emailField');
const emailError = document.getElementById('email-error');

const password = document.getElementById('passwordField');
const passwordError = document.getElementById('password-error');

const confirmPassword = document.getElementById('confirmPasswordField');
const confirmError = document.getElementById('confirm-error');

function validate() {

    if(namefield.value === '' || namefield.value.length<3){

        nameError.innerText = "Please Enter a valid name";
        return false;

    }
    nameError.innerText = "";

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

    if(password.value !== confirmPassword.value) {

        confirmError.innerText = "Password Don't match";
        return false;

    }
    confirmError.innerText = "";

    return true;

}

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";


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
const auth = getAuth();

window.signupFun = function(e) {

    e.preventDefault();

    const emailValue = document.getElementById('emailField').value;
    const passwordValue = document.getElementById('passwordField').value;
    const validateVar = validate();

    if(validate) {
        createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
        
            const user = userCredential.user;

            location.replace('https://shuaib777.github.io/ListifyNow/todoList/to-do-list.html');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }
}
