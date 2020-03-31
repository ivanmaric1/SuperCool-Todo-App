//Učitavanje todoa iz local storagea
window.addEventListener('load', function(e) {
    if(localStorage.getItem('todos') !== null) {
        let container = localStorage.getItem('todos')
        let convert = JSON.parse(container)
        for(let item of convert) {
            let newEl = document.createElement('p')
            newEl.textContent = item
            document.querySelector('.itemi').appendChild(newEl)
        }
    }   
})

//Spremanje nove stavke
document.querySelector('.spremi').addEventListener('click', () => {
    let newValue = document.querySelector('.newTodo').value
    if(localStorage.getItem('todos') !== null) {
        document.querySelector('.itemi').textContent = ''
        let container = localStorage.getItem('todos')
        let convert = JSON.parse(container)
        convert.push(newValue)
        for(let item of convert) {
            let newEl = document.createElement('p')
            newEl.textContent = item
            document.querySelector('.itemi').appendChild(newEl)
        }
        let refresh = JSON.stringify(convert)
        localStorage.setItem('todos', refresh)
    } else {
        let newArr = []
        newArr.push(newValue)
        for(let item of newArr) {
            let newEl = document.createElement('p')
            newEl.textContent = item
            document.querySelector('.itemi').appendChild(newEl)
        }
        let convert = JSON.stringify(newArr)
        localStorage.setItem('todos', convert)
    }
})

//Restart
document.querySelector('.reset').addEventListener('click', function(e) {
    document.querySelector('.itemi').textContent = ''
    localStorage.removeItem('todos')
})

