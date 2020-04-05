// Todo Class
class Todo {
    constructor(todo) {
        this.todo = todo
    }
}

// UI Class
class UI {
    static displayTodos() {
        const todos = Store.getTodos()
        const deletedTodos = Store.getDeletedTodos()
        todos.forEach((todo) => UI.addTodoToList(todo));
        deletedTodos.forEach((todo) => UI.addDeleted(todo));
    }

    static addTodoToList(todo) {
        const list = document.querySelector('.itemsList');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${todo.todo}</td>
            <td><a href='#' class='delete'>X</a></td>
        `;
        list.appendChild(row)
    }

    static addDeleted(todo) {
        const list = document.querySelector('.itemsArchive');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class='striketrough'>${todo}</td>
        `;
        list.appendChild(row)
    }

    static deleteTodo(el) {
        if(el.classList.contains('delete')) {
            const deleting = el.parentNode.parentNode.firstElementChild.innerText
            el.parentNode.parentNode.remove()
        }
    }

    static clearFields() {
        document.querySelector('.newTodoValue').value = ''
    }
}

// Store Class
class Store {
    static getTodos() {
        let todos;
        if(localStorage.getItem('todos') === null || localStorage.getItem('todos') === '') {
            todos = []
        } else {
            todos = JSON.parse(localStorage.getItem('todos'))
        }
        return todos
    }

    static getDeletedTodos() {
        let deletedTodos;
        if(localStorage.getItem('deletedTodos') === null || localStorage.getItem('deletedTodos') === '') {
            deletedTodos = []
        } else {
            deletedTodos = JSON.parse(localStorage.getItem('deletedTodos'))
        }
        return deletedTodos
    }

    static addTodo(todo) {
        const todos = Store.getTodos()
        todos.push(todo)
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    static removeTodo(todo) {
        const todos = Store.getTodos()
        todos.forEach((todo, index) => {
            if(todo === todo) {
                todos.splice(index, 1)
            }
        })
        localStorage.setItem('todos', JSON.stringify(todos))
    }
}

// Event: Display Todos
document.addEventListener('DOMContentLoaded', UI.displayTodos())


// Event : Add Todo
document.querySelector('.btn--entry').addEventListener('click', (e) => {
    const todoName = document.querySelector('.newTodoValue').value
    const todo = new Todo(todoName)
    UI.addTodoToList(todo)
    Store.addTodo(todo)
    UI.clearFields()
})


// Event : Remove Todo
document.querySelector('.itemsList') .addEventListener('click', (e) => {
    let deleted = Store.getDeletedTodos()
    deleted.push(e.target.parentNode.parentNode.firstElementChild.innerText)
    localStorage.setItem('deletedTodos',JSON.stringify(deleted))
    Store.removeTodo(e.target.parentNode.parentNode.firstElementChild.innerText)
    UI.deleteTodo(e.target)
    document.querySelector('.itemsArchive').innerText = '';
})






// Reset
document.querySelector('.reset').addEventListener('click', () => {
    localStorage.setItem('deletedTodos','')
    localStorage.setItem('todos','')
    document.querySelector('.itemsList').innerText = ''
    document.querySelector('.itemsArchive').innerText = ''

})

document.querySelector('.resetArchive').addEventListener('click', () => {
    localStorage.setItem('deletedTodos','')
document.querySelector('.itemsArchive').innerText = ''
})