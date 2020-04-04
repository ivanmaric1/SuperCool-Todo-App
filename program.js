//Item Class: Represents a Item
class Item {
    constructor(todo) {
        this.todo = todo
    }
}

//UI Class: Handle UI Tasks
class UI {
    static displayItems() {
        const items = Store.getItems();
        items.forEach((todo) => UI.addItemToList(todo));
    }
    
    static addItemToList(todo) {
        const list = document.querySelector('.itemsList');
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${todo.todo}<td>
            <td><a href='#' class='delete'>X</a><td>
        `;
        list.appendChild(row);
    }

    static deleteItem(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove()
        }
    }

    static showAlert() {
        document.querySelector('.newTodoValue').placeholder = 'Unesite Todo';
        document.querySelector('.newTodoValue').style.backgroundColor = 'red';
        document.querySelector('.newTodoValue').style.color = '#fff';
    }

    static clearField() {
        document.querySelector('.newTodoValue').value = ''
    }
}

//Store Class: Handles Storage
class Store {
    static getItems() {
        let todos;
        if(localStorage.getItem('todos') === null)  {
            todos = []
        } else {
            todos = JSON.parse(localStorage.getItem('todos'))
        }
        return todos
    }

    static addItem(item) {
        const todos = Store.getItems()
        todos.push(item)
        localStorage.setItem('todos',JSON.stringify(todos))
    }

    static removeItem(todo) {
        const todos = Store.getItems()
        todos.forEach((todo,index) => {
            if(todo === todo) {
                todos.splice(index, 1)
            }
          })
        localStorage.setItem('todos',JSON.stringify(todos))
    }
}

//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayItems);

//Event: Add a Book
document.querySelector('.btn--entry').addEventListener('click', (e) => {
    let input = document.querySelector('.newTodoValue').value
    if(input === '') {
        UI.showAlert()
    } else {
        document.querySelector('.newTodoValue').style.backgroundColor = 'white';
        document.querySelector('.newTodoValue').style.color = '#596669';
        const item = new Item(input)
        UI.addItemToList(item);
        Store.addItem(item)
        UI.clearField()
    }
})

//Event: Remove a Book
document.querySelector('.itemsList').addEventListener('click' , (e) => {
    UI.deleteItem(e.target);
    Store.removeItem(e.target.parentElement.parentElement.firstElementChild.innerText)
})