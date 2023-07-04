
//firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBlbb02P8nCYB83ScRtsEGuRar3E-WRfNc",
  authDomain: "front-end-project-62b58.firebaseapp.com",
  databaseURL: "https://front-end-project-62b58-default-rtdb.firebaseio.com",
  projectId: "front-end-project-62b58",
  storageBucket: "front-end-project-62b58.appspot.com",
  messagingSenderId: "988745008693",
  appId: "1:988745008693:web:a2789d6b7552ae0f33137c",
  measurementId: "G-YHWY5ENBWG"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


const todoList = [];
const todoDate = [];

function addTodo() {

    let element = document.querySelector('.js-search').value;

    let date = document.querySelector('.js-todo-date').value;

    todoList.push(element);
    todoDate.push(date);

    displayTodo(element, date);

    document.querySelector('.js-search').value="";
    document.querySelector('.js-todo-date').value="";
    
}

function displayTodo(element, date) {

    let todoHtml = ''; 

    for(let i=0; i<todoList.length; i++) {
        const html = `
            <div class="css-todo-list">
                <div class="todo-list-div">
                    ${todoList[i]}
                </div>
                <div class="todo-date-div">
                    ${todoDate[i]}
                </div>
                <div class="delete-button-div">
                    <button class="delete-button" onclick="deleteTodo(${i});">
                        Delete
                    </button>
                </div>
            </div>`
        todoHtml+= html;

    }

    
    if(element != "" && date != "")
    {

        document.querySelector('.js-todo-div').innerHTML = todoHtml;

    } else {

        if(element == "" && date == "") {
            alert('NO ENTRIES FILLED');
        }
        else if(element == "") {
            alert('PLEASE FILL TODO NAME!');
        }
        else {
            alert('PLEASE FILL TODO DATE!');
        }

    }

}

function deleteTodo(i) {

    todoList.splice(i,1);
    todoDate.splice(i,1);
    displayTodo(); 

}


