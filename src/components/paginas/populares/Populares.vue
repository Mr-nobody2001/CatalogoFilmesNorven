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
    }
  },
  methods: {
    async obterFilmesPopulares() {
      try {
        this.filmes = (await pesquisarFilmesPopulares()).results;
        this.dadosCarregados = true;
      } catch (error) {
        console.error('Erro ao obter filmes populares: ', error.message);
      }
    }
  },
  mounted() {
    this.obterFilmesPopulares();
  }
}
</script>

<template>
  <section class="populares d-flex flex-column justify-center">
    <Carrossel :filmes="filmes" v-if="dadosCarregados"/>
    <IndicadorCarregamento class="align-self-center" v-else/>
  </section>

  <section class="populares">

  </section>
</template>

<style scoped>
.populares {
  min-height: 100vh;
}
</style>