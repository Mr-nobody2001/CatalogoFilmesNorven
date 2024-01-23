// store.js

import {createStore} from 'vuex';

const store = createStore({
    state: {
        pesquisa: null,
    },
    mutations: {
        atualizarPesquisa(state, pesquisa) {
            state.pesquisa = pesquisa;
        },
    },
    actions: {
        atualizaPesquisa(context, pesquisa) {
            context.commit('atualizarPesquisa', pesquisa);
        },
    },
    getters: {
        pesquisa(state) {
            return state.pesquisa;
        }
    },
});

export default store;
