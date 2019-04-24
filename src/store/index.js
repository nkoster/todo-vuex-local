import Vuex from 'vuex';
import Vue from 'vue';
import todos from './modules/todos';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        todos
    }
});
