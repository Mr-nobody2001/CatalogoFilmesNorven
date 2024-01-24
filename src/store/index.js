// store.js

import {createStore} from 'vuex';

const store = createStore({
    state: {
        pesquisa: null,
        tipoConteudo: "filmes",
    },
    mutations: {
        atualizarPesquisa(state, pesquisa) {
            state.pesquisa = pesquisa;
        },
        atualizaTipoConteudo(state, tipoConteudo) {
            state.tipoConteudo = tipoConteudo;
        },
    },
    actions: {
        atualizaPesquisa(context, pesquisa) {
            context.commit('atualizarPesquisa', pesquisa);
        },
        atualizarTipoConteudo(context, tipoConteudo) {
            context.commit('atualizaTipoConteudo', tipoConteudo)
        },
    },
    getters: {
        pesquisa(state) {
            return state.pesquisa;
        },
        tipoConteudo(state) {
            return state.tipoConteudo;
        },
    },
});

export default store;
