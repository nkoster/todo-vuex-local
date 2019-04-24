<template>
    <div>
        Filter todos
        <select @change="filterTodos($event)">
            <option value="200">200</option>
            <option value="100">100</option>
            <option value="50">50</option>
            <option value="20">20</option>
            <option value="10">10</option>
            <option value="1">1</option>
        </select>
    </div>
</template>

<script>
/* eslint-disable */
import { mapActions } from 'vuex'

export default {
    name: 'FilterTodos',
    methods: mapActions(['filterTodos'])
}
</script>

<style scoped>
select {
    margin-top: 20px;
    padding: 6px;
    border: 1px solid #41b883;
}
</style>
