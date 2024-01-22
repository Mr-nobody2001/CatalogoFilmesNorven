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
      pagina: 1,
      paginaCarregada: false,
      gridCarregada: false,
      quantidadePaginas: 0,
    }
  },
  methods: {
    async obterFilmesPorNome(pagina = 1) {
      this.gridCarregada = false;

      console.log(pagina)
      try {
        const resposta = await pesquisarFilmesPorNome('batman', pagina);

        this.quantidadePaginas = resposta.total_pages;

        this.filmes = resposta.results;
        this.pagina = pagina;
        this.gridCarregada = true;
      } catch (error) {
        console.error('Erro ao obter filmes populares: ', error.message);
      }
    }
  },
  mounted() {
    this.obterFilmesPorNome();
    this.paginaCarregada = true;
  }
}
</script>

<template>
  <section id="pesquisa" :class="{ centralizar: !gridCarregada}">
    <div v-if="paginaCarregada" class="d-flex flex-column">
      <div v-if="gridCarregada" id="grid-pesquisa">
        <Miniatura v-for="filme in filmes"
                   :key="filme.id"
                   :url="filme.poster_path"
                   :titulo="filme.title"/>
      </div>

      <div v-else id="indicador-carregamento" class="align-self-center">
        <IndicadorCarregamento/>
      </div>

      <div :class="{ invisivel: !gridCarregada}">
        <Paginacao @trocar-pagina="obterFilmesPorNome" :page="pagina" :length="quantidadePaginas"/>
      </div>
    </div>

    <div v-else id="indicador-carregamento">
      <IndicadorCarregamento/>
    </div>
  </section>
</template>

<style scoped>
#pesquisa {
  min-height: 100vh;
  height: auto;
  background-color: var(--preto);
  padding: 70px 60px 0 60px;
}

#pesquisa > div {
  height: 100%;
}

#grid-pesquisa {
  display: grid;
  grid-template-columns: repeat(auto-fill, 185px);
  justify-content: center;
  gap: 15px;
}

#indicador-carregamento {
  height: 100%;
}

.centralizar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.invisivel {
  display: none;
}
</style>