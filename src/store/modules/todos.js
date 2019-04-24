import uuidv1 from 'uuid/v1';

const state = {
    todos: []
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
        state.todos = JSON.parse(localStorage.getItem('mystore'));
        const
            limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText)
        commit('setTodos', state.todos.slice(0, limit))
    },
    async updateTodos({ commit }, updatedTodo) {
        commit('updateTodo', updatedTodo)
    }
}

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => {
        state.todos.unshift(todo);
        localStorage.setItem('mystore', JSON.stringify(state.todos))
    },
    removeTodo: (state, id) => {
            state.todos = state.todos.filter(todo => todo.id !== id);
            localStorage.setItem('mystore', JSON.stringify(state.todos))
    },
    updateTodo: (state, updatedTodo) => {
        const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
        if (index != -1) {
            state.todos.splice(index, 1, updatedTodo)
            localStorage.setItem('mystore', JSON.stringify(state.todos))
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
