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
        //Clear HTML then re-render
        this.parentElement.innerHTML = '';

        toDoItems.forEach(toDo => {
            console.log(toDo.content);
            let item = this.renderToDoItem(toDo);
            this.parentElement.appendChild(item);
        });
        console.log("Render");
    }

    renderToDoItem(todo){
        const item = document.createElement('li');
        item.innerHTML = `
            <input type="checkbox">
            <p>${todo.content}</p>
            <form>
                <input type="hidden" value="${todo.id}">
                <button type="submit"></button>
            </form>
        `;
        console.log(item);
        return item;
    }

}