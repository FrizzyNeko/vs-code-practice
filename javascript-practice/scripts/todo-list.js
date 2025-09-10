const todoList = []; // todoList'i oluştur

renderTodoList();

function renderTodoList() {
    let todoListHTML = ''; // HTML'de görüntülenecek todoList'i oluştur
    
    todoList.forEach((todoObject, index) => {
         const { name, dueDate } = todoObject; // todoObject'in name ve dueDate özelliklerini al ve değişkenlere at

        // todoListHTML'e div'leri ekle ve içeriğini todoObject ile doldur 
        todoListHTML += ` 
        <div>${name}</div>
        <div>${dueDate}</div>
        <button class="delete-todo-button
            js-delete-todo-button">
            Delete</button>
        `;
    });


    document.querySelector('.js-todo-list').innerHTML = todoListHTML;

    document.querySelectorAll('.js-delete-todo-button').forEach((button, index) => {
        button.addEventListener('click', () => {
            todoList.splice(index, 1);
            renderTodoList();
        });
    });
}

document.querySelector('.js-add-todo-button').addEventListener('click', addTodo);

function addTodo() {
    // todoList'e name değerini ekle
    const inputElement = document.querySelector('.js-name-input')
    const name = inputElement.value;


    // todoList'e dueDate değerlerini ekle
    const dateInputElement = document.querySelector('.js-due-date-input');
    const dueDate = dateInputElement.value;

    // eğer name veya dueDate boş ise todoList'e ekleme yapma
    if (!name || !dueDate) {
        return;
    }

    // todoList'e name ve dueDate değerlerini ekle
    todoList.push({ 
        name, 
        dueDate 
    });

    // inputları temizle
    inputElement.value = '';

    // todoList'i güncelle
    renderTodoList();

}