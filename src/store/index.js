// store.js

import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state: {
    pesquisa: null,
    tipoConteudo: "filmes",
    tipoConteudoDetalhamento: null,
    listaFilmesFavoritos: [],
    listaTvFavoritos: [],
  },
  mutations: {
    atualizarPesquisa(state, pesquisa) {
      state.pesquisa = pesquisa;
    },
    atualizaTipoConteudo(state, tipoConteudo) {
      state.tipoConteudo = tipoConteudo;
    },
    atualizaTipoConteudoDetalhamento(state, tipoConteudo) {
      state.tipoConteudoDetalhamento = tipoConteudo;
    },
    insereFilmeFavorito(state, filme) {
      const index = state.listaFilmesFavoritos.findIndex(
        (filmeFavorito) => filmeFavorito.id === filme.id
      );

      if (index < 0) {
        state.listaFilmesFavoritos.push(filme);
      }
    },
    insereTvFavorito(state, tv) {
      const index = state.listaTvFavoritos.findIndex(
        (tvFavorito) => tvFavorito.id === tv.id
      );

      if (index < 0) {
        state.listaTvFavoritos.push(tv);
      }
    },
    removeFilmeFavorito(state, filme) {
      const index = state.listaFilmesFavoritos.findIndex(
        (filmeFavorito) => filmeFavorito.id === filme.id
      );

      if (index > -1) {
        state.listaFilmesFavoritos.splice(index, 1);
      }
    },
    removeTvFavorito(state, tv) {
      const index = state.listaTvFavoritos.findIndex(
        (tvFavorito) => tvFavorito.id === tv.id
      );

      if (index > -1) {
        state.listaTvFavoritos.splice(index, 1);
      }
    },
  },
  actions: {
    atualizarPesquisa(context, pesquisa) {
      context.commit("atualizarPesquisa", pesquisa);
    },
    atualizarTipoConteudo(context, tipoConteudo) {
      context.commit("atualizaTipoConteudo", tipoConteudo);
    },
    atualizarTipoConteudoDetalhamento(context, tipoConteudo) {
      context.commit("atualizaTipoConteudoDetalhamento", tipoConteudo);
    },
    inserirFilmeFavorito(context, filme) {
      context.commit("insereFilmeFavorito", filme);
    },
    inserirTvFavorito(context, tv) {
      context.commit("insereTvFavorito", tv);
    },
    removerFilmeFavorito(context, id) {
      context.commit("removeFilmeFavorito", id);
    },
    removerTvFavorito(context, tv) {
      context.commit("removeTvFavorito", tv);
    },
  },
  getters: {
    pesquisa(state) {
      return state.pesquisa;
    },
    tipoConteudo(state) {
      return state.tipoConteudo;
    },
    tipoConteudoDetalhamento(state) {
      return state.tipoConteudoDetalhamento;
    },
    listaFilmesFavoritos(state) {
      return state.listaFilmesFavoritos;
    },
    listaTvFavoritos(state) {
      return state.listaTvFavoritos;
    },
  },
  plugins: [
    createPersistedState({
      paths: ["tipoConteudoDetalhamento", "listaFilmesFavoritos", "listaTvFavoritos"],
    }),
  ],
});

export default store;
