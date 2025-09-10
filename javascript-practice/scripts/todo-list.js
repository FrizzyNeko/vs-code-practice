const todoList = []; // todoList'i oluştur

renderTodoList();

function renderTodoList() {
    let todoListHTML = ''; // HTML'de görüntülenecek todoList'i oluştur

    for (let i = 0; i < todoList.length; i++) { // todoList'in uzunluğu kadar dön
        const todoObject = todoList[i]; // todoList'in i. elemanını al

        const { name, dueDate } = todoObject; // todoObject'in name ve dueDate özelliklerini al ve değişkenlere at

        // todoListHTML'e div'leri ekle ve içeriğini todoObject ile doldur 
        todoListHTML += ` 
        <div>${name}</div>
        <div>${dueDate}</div>
        <button onclick="
            todoList.splice(${i}, 1);
            renderTodoList();
            " class="delete-todo-button">
            Delete</button>
        `;
    }

    document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}


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