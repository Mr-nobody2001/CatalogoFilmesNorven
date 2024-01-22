<script>
import Miniatura from "@/components/cards/Miniatura.vue";
import Paginacao from "@/components/paginacao/Paginacao.vue";
import {pesquisarFilmesPorTitulo} from "@/components/service/TmdbService.js";
import IndicadorCarregamento from "@/components/indicadores/carregamento/IndicadorCarregamento.vue";
import BarraPesquisa from "@/components/input/BarraPesquisa.vue";

export default {
  name: "Pesquisa",
  components: {IndicadorCarregamento, Paginacao, Miniatura, BarraPesquisa},
  data() {
    return {
      filmes: null,
      pagina: 1,
      pesquisa: null,
      gridCarregada: false,
      quantidadePaginas: 0,
      paginaCarregada: false,
    }
  },
  methods: {
    async obterFilmesPorTitulo(titulo, pagina) {
      try {
        this.gridCarregada = false;

        const resposta = await pesquisarFilmesPorTitulo(titulo, pagina);

        this.filmes = resposta.results;
        this.quantidadePaginas = resposta.total_pages;
        this.pagina = pagina;
        this.gridCarregada = true;
      } catch (error) {
        console.error('Erro ao obter filmes populares: ', error.message);
      }
    },
    trocarPagina(pagina) {
      this.obterFilmesPorTitulo(this.pesquisa, pagina)
    },
    realizarPesquisaPorNome(pesquisa) {
      this.pesquisa = pesquisa;

      if (pesquisa.length > 0) {
        this.obterFilmesPorTitulo(pesquisa, 1);
      }
    }
  },
  mounted() {
    this.obterFilmesPorTitulo();
    this.paginaCarregada = true;
  }
}
</script>

<template>
  <section id="pesquisa" :class="{ centralizar: !gridCarregada}">
    <div v-show="paginaCarregada" class="d-flex flex-column">
      <div v-show="gridCarregada" id="grid-pesquisa">
        <Miniatura v-for="filme in filmes"
                   :key="filme.id"
                   :url="filme.poster_path"
                   :titulo="filme.title"/>
      </div>

      <div v-show="!gridCarregada" id="indicador-carregamento" class="align-self-center">
        <IndicadorCarregamento/>
      </div>

      <div v-show="gridCarregada">
        <Paginacao @trocar-pagina="trocarPagina" :pageProp="pagina" :length="quantidadePaginas"/>
      </div>
    </div>

    <div v-if="!paginaCarregada" id="indicador-carregamento">
      <IndicadorCarregamento/>
    </div>
  </section>
</template>

<style scoped>
#pesquisa {
  min-height: 100vh;
  height: auto;
}

#pesquisa > div {
  height: 100%;
}

#grid-pesquisa {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  justify-content: start;
  justify-items: start;
  gap: 5px;
}

#indicador-carregamento {
  height: 100%;
}

.centralizar {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>