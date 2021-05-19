//Array for storing ToDo items
const toDoList = [];

//Grab the ul that stores the todo list
const toDoForm = document.forms['toDoList'];

//Grab adding form
const addForm = document.forms['addToDo'];
addForm.addEventListener ('submit', addToDo, false);

//Object with constructor for ToDo items
const ToDo = function(content){
    this.id = Date.now(),
    this.content = content,
    this.completed = false
}

function addToDo(event){
    const todoItem = new ToDo(
        addForm.elements.content.value
        );
    toDoList.push(todoItem);

    buildToDoList();
    
    addForm.reset();
    event.preventDefault();
}

function buildToDoList(){
    for(const todo of toDoList){
        let toDoItem = document.createElement('li');

        let toDoCheck = document.createElement('input');
        toDoCheck.setAttribute('type', 'checkbox');

        let toDoContent = document.createElement('p');
        toDoContent.append(todo.content);

        todoItem.appendChild(toDoCheck, toDoContent);

        toDoForm.appendChild(todoItem);
    }
}

//Array for tasks to be stored in + functions to write and read them from file

//Function to Add a task tied to a button to open the form, and a form to gather the needed info of a task

//Radio button to mark a task completed

//Delete button on each task

//Filter buttons