const toDoItems = [];

export default class ToDo {

    constructor(elementId){
        this.parentElement = document.getElementById(elementId);
    }

    addToDo(content){
        toDoItems.push(
            {
                id: Date.now(),
                content: content,
                completed: false
            }
        );

        this.renderToDoList('all');
    }

    toggleCompleteItem(id){
        toDoItems.find(item => {
            if (item.id === id){
                item.completed = !item.completed;
            }
        });
        console.log(toDoItems);
        this.renderToDoList('all');
    }

    deleteItem(id) {
        let index = 0;
        
        toDoItems.find(item => {
            if (item.id === id){
                index = toDoItems.indexOf(item);
            }
        });

        toDoItems.splice(index, 1);

        this.renderToDoList('all');
    }

    renderToDoList(criteria){
        //Clear HTML then re-render
        this.parentElement.innerHTML = '';

        //Switch case that triggers different page renders based on while filter button is clicked
        switch (criteria){
            case 'all':
                toDoItems.forEach(toDo => {
                    let item = this.renderToDoItem(toDo);
                    this.parentElement.appendChild(item);
                });
                break;
            case 'active':
                toDoItems.filter(toDo => 
                    toDo.completed === false
                ).forEach(element => {
                    let item = this.renderToDoItem(element);
                    this.parentElement.appendChild(item);
                });
                break;
            case 'completed':
                toDoItems.filter(toDo => 
                    toDo.completed === true
                ).forEach(element => {
                    let item = this.renderToDoItem(element);
                    this.parentElement.appendChild(item);
                });
                break;
        }

        let remainingAmount = toDoItems.filter(toDo => toDo.completed === false).length;
        let totalLabel = document.getElementById('total');

        if (remainingAmount === 1) {
            totalLabel.textContent = remainingAmount + ' task left';
        } else if (remainingAmount > 1) {
            totalLabel.textContent = remainingAmount + ' tasks left';
        } else {
            totalLabel.textContent = 'All tasks completed!';
        }

    }

    renderToDoItem(todo) {
        //Create the list item to be rendered
        const item = document.createElement('li');
        item.setAttribute('class', 'toDoItem');
        item.setAttribute('name', 'toDoItem');

        //Create the checkbox to toggle completion
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.addEventListener('change', () => {
            this.toggleCompleteItem(todo.id);
        });

        //Create the paragraph to display the content
        const content = document.createElement('p');
        content.textContent = todo.content;

        //Make styling changed if the todo item is completed
        if (todo.completed === true){
            checkbox.checked = true;
            content.setAttribute('class', 'completed');
        }

        //Create the button to delete the todo item
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.setAttribute('name', 'submit');

        // Create a delete for to handle the deletion and append the submit button into it
        const deleteForm = document.createElement('form');
        deleteForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.deleteItem(todo.id);
        });
        deleteForm.appendChild(deleteBtn);

        //Append all children
        item.appendChild(checkbox);
        item.appendChild(content);
        item.appendChild(deleteForm);
       
        return item;
    }
 
    //Add filtering logic either flags or different rendering functions?

}