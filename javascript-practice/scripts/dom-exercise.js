const todoList = []; 

function renderTodoList() {
    let todoListHTML = '';
    
    for (let i = 0; i < todoList.length; i++) {
        const todoObject = todoList[i];

        const {name, dueDate} = todoObject;

        todoListHTML += `
        <div>${name}</div>
        <div>${dueDate}</div>
        <button onclick="
            todoList.splice(${i}, 1);
            renderTodoList();
            " class="delete-todo-button">
            Delete</button>
        `
    }
    document.querySelector(".js-todo-list").innerHTML = todoListHTML;
}





function addTodo() {
    const inputElement = document.querySelector(".js-todo-input");
    const name = inputElement.value;

    const dateInputElement = document.querySelector(".js-due-date-input");
    const dueDate = dateInputElement.value;

    if (!name || !dueDate) {
        return;
    }

    todoList.push({
        name,
        dueDate
    });

    inputElement.value = "";

    renderTodoList();
}

