
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
