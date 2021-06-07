class Todo {
    constructor(state) {
        this.state = state
        this._init_()
    }

    _init_() {
        if (localStorage.getItem('todolist')) {
            this.state.todolists = JSON.parse(localStorage.getItem('todolist'))
        } else {
            return
        }
    }

    // 添加待做事件
    async addTodo(todotext) {
        let todolist = await localStorage.getItem('todolist')
        if (todolist) {
            this.state.todolists.push({
                checked: false,
                text: todotext
            })
            localStorage.setItem('todolist', JSON.stringify(this.state.todolists))
            this.state.todotext = ''
        } else {
            let val = [{
                checked: false,
                text: todotext
            }]
            this.state.todolists = val
            localStorage.setItem('todolist', JSON.stringify(val))
            this.state.todotext = ''
        }
    }
    // 删除已经做过的事件
    delTodo(i) {
        console.log(i)
        this.state.todolists.splice(i, 1)
        localStorage.setItem('todolist', JSON.stringify(this.state.todolists))
    }
    // checked
    doOver(i) {
        this.state.todolists[i].checked = !this.state.todolists[i].checked
        localStorage.setItem('todolist', JSON.stringify(this.state.todolists))
    }

}

export default Todo;