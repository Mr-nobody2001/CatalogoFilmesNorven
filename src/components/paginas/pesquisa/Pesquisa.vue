<script>
import Miniatura from "@/components/cards/Miniatura.vue";
import Paginacao from "@/components/paginacao/Paginacao.vue";
import {pesquisarFilmesPorNome} from "@/components/service/TmdbService.js";
import IndicadorCarregamento from "@/components/indicadores/carregamento/IndicadorCarregamento.vue";

export default {
  name: "Pesquisa",
  components: {IndicadorCarregamento, Paginacao, Miniatura},
  data() {
    return {
      filmes: null,
      dadosCarregados: false,
      quantidadePaginas: 0,
    }
  },
  methods: {
    async obterFilmesPorNome(pagina = 1) {
      console.log('ok')
      try {
        const resposta = await pesquisarFilmesPorNome('minios', pagina);

        this.quantidadePaginas = resposta.total_pages;

        this.filmes = resposta.results;
        this.dadosCarregados = true;
      } catch (error) {
        console.error('Erro ao obter filmes populares: ', error.message);
      }
    }
  },
  mounted() {
    this.obterFilmesPorNome();
  }
}
</script>

<template>
  <section id="pesquisa" :class="{ 'centralizar': !dadosCarregados }">
    <div v-if="dadosCarregados">
      <div id="grid-pesquisa">
        <Miniatura v-for="filme in filmes"
                   :key="filme.id"
                   :url="filme.poster_path"
                   :titulo="filme.title"/>
      </div>

      <div>
        <Paginacao @trocar-pagina="obterFilmesPorNome" :length="quantidadePaginas"/>
      </div>
    </div>

    <IndicadorCarregamento v-else/>
  </section>
</template>

<style scoped>
#pesquisa {
  min-height: 100vh;
}

#grid-pesquisa {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(185px, 1fr));
  padding: 10px 80px;
  gap: 20px;
}

.centralizar {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>