import ToDo from './midterm.js'; 

const toDo = new ToDo('toDoList');

//Grab adding form
const addForm = document.forms['addToDo'];

//Grab add form input text field
const addToDoContent = addForm.elements.content;

addForm.addEventListener ('submit', (event) => {
    event.preventDefault();
    toDo.addToDo(addToDoContent.value);
    addForm.reset();
});

document.getElementById('allBtn').addEventListener('click', (event) => {
    event.preventDefault();
    toDo.renderToDoList('all')
});
document.getElementById('activeBtn').addEventListener('click', (event) => {
    event.preventDefault(); 
    toDo.renderToDoList('active')
});
document.getElementById('completedBtn').addEventListener('click', (event) => {
    event.preventDefault(); 
    toDo.renderToDoList('completed')
});

//Add the eventlisteners for filtering and totaling here.

//Array for tasks to be stored in + functions to write and read them from file

//Function to Add a task tied to a button to open the form, and a form to gather the needed info of a task

//Radio button to mark a task completed

//Delete button on each task

//Filter buttons