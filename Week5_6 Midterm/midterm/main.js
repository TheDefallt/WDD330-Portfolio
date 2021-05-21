//Array for storing ToDo items
//const toDoListData = [];
import ToDo from './midterm.js'; 

const toDo = new ToDo('toDoList');

//Grab adding form
const addForm = document.forms['addToDo']
const addToDoContent = addForm.elements.content;

addForm.addEventListener ('submit', (event) => {
    event.preventDefault();
    toDo.addToDo(addToDoContent.value);
    addForm.reset();
});




//Object with constructor for ToDo items
// const ToDo = function(content){
//     this.id = Date.now(),
//     this.content = content,
//     this.completed = false
// }

// function addToDo(event){
//     const todoItem = new ToDo(
//         addForm.elements.content.value
//         );
//         toDoListData.push(todoItem);

//         renderNewListItem(todoItem);
    
//     addForm.reset();
//     event.preventDefault();
// }

// function renderNewListItem(toDoItemData){
//     let toDoItem = document.createElement('li');

//     let toDoCheck = document.createElement('input');
//     toDoCheck.setAttribute('type', 'checkbox');

//     let toDoContent = document.createElement('p');
//     toDoContent.append(toDoItemData.content);

//     let deleteForm = document.createElement('form');
//     let deleteButton = document.createElement('button');
//     deleteButton.setAttribute('type', 'submit');
//     deleteForm.appendChild(deleteButton);

//     toDoItem.appendChild(toDoCheck);
//     toDoItem.appendChild(toDoContent);
//     toDoItem.appendChild(deleteForm);

//     console.log(toDoItem);

//     toDoList.appendChild(toDoItem);
// }

//Array for tasks to be stored in + functions to write and read them from file

//Function to Add a task tied to a button to open the form, and a form to gather the needed info of a task

//Radio button to mark a task completed

//Delete button on each task

//Filter buttons