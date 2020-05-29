const API_URL = 'http://localhost:8080/todo';

let todoList;
let todoSubmit;
let todoInput;
let todoDateFromInput;
let todoDateToInput;

let todos = [];

let todoError;
let dateFromError;
let dateToError;

document.addEventListener('DOMContentLoaded', () => {
    todoList = document.getElementById("todo-list");
    todoSubmit = document.getElementById('todo-submit');
    todoInput = document.getElementById('todo-input');
    todoDateFromInput = document.getElementById('todo-date-from-input');
    todoDateToInput = document.getElementById('todo-date-to-input');
    todoError = document.getElementById('todo-error');
    dateFromError = document.getElementById('date-from-error');
    dateToError = document.getElementById('date-to-error');
    getToDos();
    todoSubmit.addEventListener('submit', (event) => {
        event.preventDefault();
        let todo = {
            toDo: event.target.elements[0].value,
            dateFrom: event.target.elements[1].value,
            dateTo: event.target.elements[2].value
        }
        if (validateToDosForm(todo)) {
            sendToDo(todo);
        }
    })
})

function sendToDo(todo = {toDo: '', dateFrom: '', dateTo: ''}) {
    fetch(API_URL + '/add-todo',
        {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            todo
        }).catch(e => console.log(e))
        .then(response => {
            if (response.ok) {
                alert("Added todo.");
                window.location.reload();
            } else {
                alert("Unable to connect with service.");
            }
        })
}

function validateToDosForm(todo = {toDo: '', dateFrom: '', dateTo: ''}) {
    todoError.innerText = '';
    dateFromError.innerText = '';
    dateToError.innerText = '';
    if (todo.toDo && !todo.toDo.startsWith(' ') && todo.dateFrom && todo.dateTo) {
        return true;
    } else {
        if (!todo.toDo || todo.toDo.startsWith(' ')) {
            todoError.innerText = 'Field cannot be empty.';
        }
        if (!todo.dateFrom) {
            dateFromError.innerText = 'Field cannot be empty.';
        }
        if (!todo.dateTo) {
            dateToError.innerText = 'Field cannot be empty.';
        }
        return false;
    }
}

function getToDos() {
    fetch(API_URL + '/get-all', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    )
        .then(response => response.json())
        .then(todoList => {
            todos = todoList;
            renderTodos();
        })
}

const renderTodos = () => {
    todoList.innerHTML = '';
    todos.forEach((elem, index) => {
        let removeBtn = document.createElement("button");
        removeBtn.classList.add("btn", "btn-outline-danger", "btn-sm");
        removeBtn.innerText = "remove";
        removeBtn.addEventListener('click', (event) => {
            event.preventDefault();
            deleteElem(index).catch(error => {
                console.log(error)
            })
                .then(response => {
                    if (response.ok) {
                        getToDos();
                    }
                })
        })
        let editBtn = document.createElement("button");
        editBtn.classList.add("btn", "btn-outline-primary", "btn-sm");
        editBtn.innerText = "edit";
        editBtn.addEventListener('click', (event) => {
            event.preventDefault();
            editBtn.classList.remove("btn-outline-primary");
            editBtn.classList.add('btn-outline-success');
        })
        let li = document.createElement("li");
        li.classList.add("list-group-item");
        let p = document.createElement("label");
        p.innerText = elem.toDo + " " + elem.dateFrom + " " + elem.dateTo;
        li.appendChild(p);
        li.appendChild(editBtn);
        li.appendChild(removeBtn);
        todoList.appendChild(li);
    })
}

function deleteElem(index) {
    return fetch(API_URL + `/delete-todo/${index}`,
        {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
}

