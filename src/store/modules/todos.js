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
            // body: state,
            headers: {
              'Content-Type': 'application/json'
            }
        })
            .then( () => console.log('Success!'))
            .catch(error => console.error('Error:', error));
        fetch(API, {
            method: 'GET',
            // headers: {
            //   'Content-Type': 'application/json'
            // }
        })
            .then(response => response.json().then(data => {
                // const {} = data
                for (let o in data) {
                    console.log(JSON.parse(o))
                }
                // console.log(Object.keys(data)[0])
            }))

        // fetch('http://localhost:5000/api/v1/db', {
        //     method: 'POST',
        //     mode: "cors", // no-cors, cors, *same-origin
        //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        //     credentials: "same-origin", // include, *same-origin, omit
        //     headers: {
        //         "Content-Type": "application/json",
        //         // "Content-Type": "application/x-www-form-urlencoded",
        //     },
        //     redirect: "follow", // manual, *follow, error
        //     referrer: "no-referrer", // no-referrer, *client
        //     body: JSON.stringify( state )
        // })
        // .then(response => {
        //     return response.todos
        //     // show stuff
        // })
        // .catch()
        state.todos = state.todos.slice(0, state.limit)
    }
}

const getters = {
    allTodos: state => state.todos
}

const actions = {
    async fetchTodos({ commit }) {
        commit('setTodos', JSON.parse(localStorage.getItem('mystore')))
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
    setTodos: (state, todos) => (state.todos = todos),
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
