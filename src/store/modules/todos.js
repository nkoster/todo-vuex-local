import uuidv1 from 'uuid/v1'

const API = 'http://localhost:5000/api/v1/db'

/* eslint-disable */

const state = {
    todos: [],
    limit: 200,
    storeTodos: () => {
        localStorage.setItem('mystore', JSON.stringify(state.todos))
        fetch(API, {
            method: 'POST',
            body: JSON.stringify(state),
            headers: {
              'Content-Type': 'application/json'
            }
        })
            .then( () => console.log('Success!'))
            .catch(error => console.error('Error:', error));
        state.todos = state.todos.slice(0, state.limit)
    },
    loadTodos: () => {
        if (localStorage.getItem('mystore') === null) {
        fetch(API, { method: 'GET' })
            .then(response => response.json().then(data => {
                for (let o in data) {
                    let oo = JSON.parse(o)
                    if (typeof oo.todos !== 'undefined') {
                        state.todos = oo.todos
                    }
                    if (typeof oo.limit !== 'undefined') {
                        state.limit = oo.limit
                    }
                }
                localStorage.setItem('mystore', JSON.stringify(state.todos))
            }))
        } else {
            state.todos = JSON.parse(localStorage.getItem('mystore'))
        }
        state.todos = state.todos.slice(0, state.limit)
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
        state.todos = JSON.parse(localStorage.getItem('mystore'))
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
        state.todos = JSON.parse(localStorage.getItem('mystore'))
        state.todos = state.todos ? state.todos : []
        state.todos.unshift(todo)
        state.storeTodos()
    },
    removeTodo: (state, id) => {
        state.todos = JSON.parse(localStorage.getItem('mystore'))
        state.todos = state.todos.filter(todo => todo.id !== id)
        state.storeTodos()
    },
    updateTodo: (state, updatedTodo) => {
        const index = state.todos.findIndex(todo => todo.id === updatedTodo.id)
        if (index != -1) {
            state.todos = JSON.parse(localStorage.getItem('mystore'))
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
