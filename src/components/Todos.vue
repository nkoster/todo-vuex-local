<template>
    <div>
        <h3>Todos</h3>
        <div class="legend">
            <span>Double click when complete</span>
            <span>
                <span class="incomplete-box"></span> = Incomplete
            </span>
            <span>
                <span class="complete-box"></span> = Complete
            </span>
        </div>
        <div class="todos">
            <div @dblclick.prevent="onDblClick(todo)" v-for="todo in allTodos"
                 :key="todo.id" v-bind:class="{'is-complete':todo.completed}"
                 class="todo">
                {{todo.title}}
                <i @click="deleteTodo(todo.id)" class="fas fa-trash-alt"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: "Todos",
    methods: {
        ...mapActions(['fetchTodos', 'deleteTodo', 'updateTodos']),
        onDblClick(todo) {
            const updateObj = {
                id: todo.id,
                title: todo.title,
                completed: !todo.completed
            }
            this.updateTodos(updateObj)
        }
    },
    computed: mapGetters(['allTodos']),
    created() {
        try {
            this.todos = JSON.parse(localStorage.getItem('mystore'));
        } catch(e) {
            localStorage.removeItem('mystore');
        }
        this.fetchTodos()
    }
}
</script>

<style scoped>
.todos {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
}
.todo {
    border: 1px solid #ccc;
    background: #35495e;
    color: #fff;
    padding: 1rem;
    border-radius: 15px 15px 3px;
    text-align: center;
    user-select: none;
    position: relative;
    cursor: pointer;
}
i {
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: #fff;
    cursor: pointer;
}
.legend {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
}
.complete-box {
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #41b883;
}
.incomplete-box {
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #35495e;
}
.is-complete {
    background: #41b883;
}
@media (max-width: 500px) {
    .todos {
        grid-template-columns: 1fr;
    }
}
</style>
