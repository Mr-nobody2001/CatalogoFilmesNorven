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
      filmes: [],
      pagina: 1,
      gridCarregada: false,
      quantidadePaginas: 0,
      paginaCarregada: false,
    }
  },
  computed: {
    pesquisa() {
      return this.$store.getters.pesquisa;
    },
    numeroFilmesPositivo() {
      return this.filmes.length > 0;
    }
  },
  watch: {
    pesquisa: {
      handler() {
        this.realizarPesquisaPorNome(this.pesquisa, 1);
      },
    },
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
      this.obterFilmesPorTitulo(pesquisa, 1);
    }
  },
  mounted() {
    this.realizarPesquisaPorNome(this.pesquisa);
    this.paginaCarregada = true;
  }
}
</script>

<template>
  <section id="pesquisa">
    <div v-show="paginaCarregada" class="d-flex flex-column mt-10">
      <div v-show="gridCarregada" id="grid-pesquisa">
        <Miniatura v-for="filme in filmes"
                   :key="filme.id"
                   :url="filme.poster_path"
                   :titulo="filme.title"/>
      </div>

      <div v-if="!numeroFilmesPositivo" id="mensagem" class="d-flex flex-column align-center centralizar">
        <i class="bi bi-database-slash"></i>
        <p>Nenhum filme encontrado.</p>
      </div>

      <div v-show="gridCarregada && numeroFilmesPositivo">
        <Paginacao @trocar-pagina="trocarPagina" :pageProp="pagina" :length="quantidadePaginas"/>
      </div>

      <div v-if="!gridCarregada && numeroFilmesPositivo" class="centralizar">
        <IndicadorCarregamento/>
      </div>
    </div>

    <div v-if="!paginaCarregada" class="centralizar">
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
  justify-content: center;
  justify-items: center;
  gap: 5px;
  width: auto !important;
}

#mensagem > p,
#mensagem > i {
  color: var(--branco);
}

#mensagem > i {
  font-size: 4rem;
}

#mensagem > p {
  font-size: 1.4rem;
}

.centralizar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>