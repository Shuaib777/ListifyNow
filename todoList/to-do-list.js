//firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

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
const auth = getAuth();

let userID; 

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    userID = user.uid;
    
    document.querySelector('.add-button').addEventListener('click', () => addTodo());

    let todoDate=[];
    let todoList=[];

    // for an existing user
    onValue(ref(database, 'users/'+userID), (snapshot) => {
        todoDate = snapshot.val()['todoDate'];
        todoList = snapshot.val()['todoList'];

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
                        <button class="delete-button">
                            Delete
                        </button>
                    </div>
                </div>`
            todoHtml+= html;        
        }

        document.querySelector('.js-todo-div').innerHTML = todoHtml;

        document.querySelectorAll('.delete-button')
        .forEach((deleteButton, index) => {
            deleteButton.addEventListener('click', () => {
                deleteTodo(index);
            });
        });

    });

    function addTodo() {

        let element = document.querySelector('.js-search').value;
        let date = document.querySelector('.js-todo-date').value;

        if(element != "" && date != "") {

            todoList.push(element);
            todoDate.push(date);

            displayTodo();

            document.querySelector('.js-search').value="";
            document.querySelector('.js-todo-date').value="";

            update(ref(database, 'users/'+userID), {
                'todoList': todoList,
                'todoDate': todoDate
            })

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

    function displayTodo() {

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
                        <button class="delete-button">
                            Delete
                        </button>
                    </div>
                </div>`
            todoHtml+= html;        
        }

        document.querySelector('.js-todo-div').innerHTML = todoHtml;

        document.querySelectorAll('.delete-button')
            .forEach((deleteButton, index) => {
                deleteButton.addEventListener('click', () => {
                    deleteTodo(index);
                });
            });
    }

    function deleteTodo(i) {

        todoList.splice(i,1);
        todoDate.splice(i,1);

        update(ref(database, 'users/'+userID), {
            'todoList': todoList,
            'todoDate': todoDate
        })

        displayTodo(); 

    }
    
  } else {
    console.log("user is not signed in");
  }
});



