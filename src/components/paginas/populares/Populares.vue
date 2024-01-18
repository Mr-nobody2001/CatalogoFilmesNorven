<script>
import Carrossel from "@/components/carrossel/Carrossel.vue";
import {pesquisarFilmesPopulares} from "@/components/service/TmdbService.js";
import IndicadorCarregamento from "@/components/indicadores/carregamento/IndicadorCarregamento.vue";

export default {
  name: "Populares",
  components: {IndicadorCarregamento, Carrossel},
  data() {
    return {
      filmes: null,
      dadosCarregados: false,
      filmeSelecionado: null,
    }
  },
  methods: {
    async obterFilmesPopulares() {
      try {
        this.filmes = (await pesquisarFilmesPopulares()).results;
      } catch (error) {
        console.error('Erro ao obter filmes populares: ', error.message);
      }
    },
    trocarInformacoesFilme(currentSlideIndex) {
      this.filmeSelecionado = this.filmes[currentSlideIndex];
    },
    montarUrlImagemLogo() {
      return `http://image.tmdb.org/t/p/w45/${this.filmeSelecionado.poster_path}`
    }
  },
  async mounted() {
    await this.obterFilmesPopulares();
    this.filmeSelecionado = this.filmes[0];
    this.dadosCarregados = true;
  }
}
</script>

<template>
  <section id="populares" class="ajustar-background"
           style="background-image: url('https://image.tmdb.org/t/p/w1280/jXJxMcVoEuXzym3vFnjqDW4ifo6.jpg')">
    <div class="d-flex flex-column justify-space-between " v-if="dadosCarregados">
      <div id="informacoes">
        <img src="https://image.tmdb.org/t/p/w148/fJY706h5IgKTl24rQeL3w5sq8Ec.png" alt="">
        {{ filmeSelecionado.overview }}
      </div>

      <div>
        <Carrossel @alertar-troca="trocarInformacoesFilme"
                   :filmes="filmes"/>
      </div>
    </div>

    <IndicadorCarregamento class="align-self-center" v-else/>
  </section>
</template>

<style scoped>
#populares {
  height: 100vh;
  padding: 20px 0;
}

#populares > div {
  height: 100%;
  color: var(--branco);
}

#informacoes {
  width: 50%;
  padding: 0 0 0 50px;
}

.ajustar-background {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: grayscale(30%);
}
</style>