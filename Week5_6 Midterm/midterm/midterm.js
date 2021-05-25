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

        item.innerHTML = `
            <input type="checkbox"/>
            <p>${todo.content}</p>
            <form>
                <input type="hidden" value="${todo.id}">
                <button type="submit">X</button>
            </form>
        `;
        return item;
    }

    toggleCompleteItem(id) {
        completedForm = document.

        toDoItems.find(item => {
            if (item.id === id){
                console.log(todo.content);
            }
        });
    }

    //Add delete logic, eventListeners need to be added to Delete Buttons
    //Add completed logic, eventListenser need to be added to checkboxes

}