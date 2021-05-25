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

        this.renderToDoList();
    }

    toggleCompleteItem(id) {
        console.log("Toggled");

        toDoItems.find(item => {
            if (item.id === id){
                console.log(todo.content);
            }
        });
    }

    renderToDoList(){
        //Add strikethrough to completed items.

        //Clear HTML then re-render
        this.parentElement.innerHTML = '';

        toDoItems.forEach(toDo => {
            let item = this.renderToDoItem(toDo);
            this.parentElement.appendChild(item);
        });
    }

    renderToDoItem(todo) {
        const item = document.createElement('li');
        item.setAttribute('class', 'toDoItem');
        item.setAttribute('name', 'toDoItem');

        item.innerHTML = `
            <input type="submit" value="${todo.id}" name="checkComplete"/>
            <p>${todo.content}</p>
            <button type="submit" value="${todo.id}">X</button>
        `;
        return item;
    }
 
    //Add delete logic, eventListeners need to be added to Delete Buttons
    //Add completed logic, eventListenser need to be added to checkboxes

}