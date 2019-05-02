import uuidv1 from 'uuid/v1'

const API = 'http://localhost:5000/api/v1/db'

/* eslint-disable */

// todo: create encrypted blob with id on remote

const stateId = 'apekop'

const state = {
    todos: [],
    limit: 200,
    storeTodos: () => {
        localStorage.setItem('myStorage', JSON.stringify({
            stateId,
            todos: state.todos
        }))
        fetch(API, {
            method: 'POST',
            body: JSON.stringify({
                stateId: stateId,
                todos: state.todos
            }),
            headers: {
              'Content-Type': 'application/json'
            }
        })
            .then(() => console.log('Success!'))
            .catch(err => console.error('Error:', err));
        if (state.todos) state.todos = state.todos.slice(0, state.limit)
    },
    loadTodos: () => {
        if (localStorage.getItem('myStorage') === null) {
            console.log('Trying to fetch from remote...')
            fetch(API, { method: 'GET' })
                .then(response => response.json().then(data => {
                    console.log(data)
                    if (data.todos) {
                        state.todos = data.todos
                    } else {
                        state.todos = []
                    }
                    localStorage.setItem('myStorage', JSON.stringify({
                        stateId: stateId,
                        todos: state.todos
                    }))
                }))
                .catch(err => console.error(err))
        } else {
            state.todos = JSON.parse(localStorage.getItem('myStorage')).todos
            state.stateId = JSON.parse(localStorage.getItem('myStorage')).stateId
            console.log(state.stateId)
        }
        if (state.todos) state.todos = state.todos.slice(0, state.limit)
    }
}

const getters = {
    allTodos: state => state.todos
}

const actions = {
    async fetchTodos({ commit }) {
        commit('setTodos')
    },
    async addTodo({ commit }, title) {
        commit('newTodo', {
            id: uuidv1(),
            title,
            completed: false
        })
    },
    async deleteTodo({ commit }, id) {
        commit('removeTodo', id)
    },
    async filterTodos({ commit }, e) {
        state.todos = JSON.parse(localStorage.getItem('myStorage').todos)
        state.limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText)
        commit('setTodos', state.todos.slice(0, state.limit))
    },
    async updateTodos({ commit }, updatedTodo) {
        commit('updateTodo', updatedTodo)
    },
}

const mutations = {
    setTodos: state => state.loadTodos(),
    newTodo: (state, todo) => {
        state.todos = JSON.parse(localStorage.getItem('myStorage')).todos
        state.todos = state.todos ? state.todos : []
        state.todos.unshift(todo)
        state.storeTodos()
    },
    removeTodo: (state, id) => {
        state.todos = JSON.parse(localStorage.getItem('myStorage')).todos
        state.todos = state.todos.filter(todo => todo.id !== id)
        state.storeTodos()
    },
    updateTodo: (state, updatedTodo) => {
        const index = state.todos.findIndex(todo => todo.id === updatedTodo.id)
        if (index != -1) {
            state.todos = JSON.parse(localStorage.getItem('myStorage')).todos
            state.todos.splice(index, 1, updatedTodo)
            state.storeTodos()
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
