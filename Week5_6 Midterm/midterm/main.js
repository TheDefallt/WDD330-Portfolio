import ToDo from './midterm.js'; 

const toDo = new ToDo('toDoList');

//Grab adding form
const addForm = document.forms['addToDo'];

//Grab add form input text field
const addToDoContent = addForm.elements.content;

addForm.addEventListener ('submit', (event) => {
    event.preventDefault();
    toDo.addToDo(addToDoContent.value);
    addItemListeners();
    addForm.reset();
});

function addItemListeners() {
    let itemInputs = document.forms['toDoForm'].elements;

    itemInputs.forEach(itemInput => {
        itemInput.addEventListener ('change', (event) => {
            event.preventDefault();
            toDo.toggleCompleteItem(itemInput.value)
        });
    });

}


//Array for tasks to be stored in + functions to write and read them from file

//Function to Add a task tied to a button to open the form, and a form to gather the needed info of a task

//Radio button to mark a task completed

//Delete button on each task

//Filter buttons