<script>
import Carrossel from "@/components/carrossel/Carrossel.vue";
import {pesquisarFilmesPopulares} from "@/components/service/TmdbService.js";
import IndicadorCarregamento from "@/components/indicadores/carregamento/IndicadorCarregamento.vue";
import IndicadorNota from "@/components/indicadores/nota/IndicadorNota.vue";

export default {
  name: "Populares",
  components: {IndicadorNota, IndicadorCarregamento, Carrossel},
  data() {
    return {
      filmes: null,
      filmeSelecionado: null,
      dadosCarregados: false,
      sliding: false,
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
    async inserirPrimeiroFilme() {
      await this.obterFilmesPopulares();
      this.filmeSelecionado = this.filmes[0];
      this.dadosCarregados = true;
    },
    trocarInformacoesFilme(currentSlideIndex) {
      this.filmeSelecionado = this.filmes[currentSlideIndex];
      this.sliding = false;
    },
    startSlideHandle() {
      this.sliding = true;
    }
  },
  computed: {
    formatarOverview() {
      const overview = this.filmeSelecionado.overview;

      if (overview.length > 200) {
        return overview.slice(0, 200) + "...";
      }

      if (!overview) {
        return 'Indisponível'
      }

      return overview;
    },
    formatarDataLancamento() {
      return new Date(this.filmeSelecionado.release_date).getFullYear();
    },
    prepararUrlBackground() {
      return `http://image.tmdb.org/t/p/original/${this.filmeSelecionado.backdrop_path}`;
    },
    prepararUrlLogo() {
      return `http://image.tmdb.org/t/p/w300/${this.filmeSelecionado.poster_path}`;
    },
  },
  async mounted() {
    await this.inserirPrimeiroFilme();
  }
}
</script>

<template>
  <section id="populares" class="d-flex flex-column justify-center">
    <div class="d-flex flex-column" v-if="dadosCarregados">
      <div id="informacoes" class="ajustar-background animate__animated"
           :class="{ 'animate__fadeOutLeft': sliding, 'animate__fadeInRight': !sliding }"
           :style="{ backgroundImage: `url(${prepararUrlBackground})` }">

        <div id="informacoes-imagem-texto">
          <div class="rounded-sm">
            <img class="rounded-sm" :src="prepararUrlLogo" :alt="filmeSelecionado.title">
          </div>

          <div class="d-flex flex-column justify-space-between gap" style="width: 100%">
            <div>
              <h1>{{ filmeSelecionado.title }} ({{ formatarDataLancamento }})</h1>
            </div>

            <div class="d-flex flex-row align-center gap">
              <IndicadorNota :nota="filmeSelecionado.vote_average"/>
              <p>Avaliação <br> dos <br> usuários</p>
            </div>

            <div class="d-flex flex-column gap">
              <h2>Sinopse</h2>
              <p>{{ formatarOverview }}</p>
            </div>

            <div class="d-flex gap">
              <v-btn class="texto-branco"
                     size="large"
                     color="amber"
                     density="default"
                     rounded="xl">Detalhes
              </v-btn>
              <v-btn class="texto-branco"
                     size="x-large"
                     color="amber"
                     density="compact"
                     icon="mdi-plus">
              </v-btn>
            </div>
          </div>
        </div>
      </div>

      <div id="carrossel">
        <Carrossel @alertar-inicio-troca="startSlideHandle"
                   @alertar-fim-troca="trocarInformacoesFilme"
                   :filmes="filmes"/>
      </div>
    </div>

    <div id="indicador-carregamento" v-else>
      <IndicadorCarregamento/>
    </div>
  </section>
</template>

<style>
body::-webkit-scrollbar {
  width: 0;
}
</style>

<style scoped>
#populares {
  min-height: 100vh;
  height: auto;
}

#populares > div:last-child {
  height: 100%;
  color: var(--branco);
}

#informacoes {
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px var(--preto);
}

#informacoes > div {
  width: 100%;
  height: 100%;
  padding: 0 25px;
  backdrop-filter: blur(5px) grayscale(1) brightness(0.3);
  background: linear-gradient(to right, var(--preto), transparent, transparent, var(--preto)),
  linear-gradient(to bottom, var(--preto), transparent, transparent, var(--preto));
}

#informacoes-imagem-texto {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

@media (min-width: 768px) {
  #informacoes-imagem-texto {
    flex-direction: row;
  }
}

#informacoes h1 {
  font-size: 1.5rem;
  font-weight: bolder;
}

#informacoes p {
  width: 100%;
  font-size: 1.05rem;
}

@media (min-width: 1200px) {
  #informacoes p {
    width: 50%;
  }
}

#carrossel {
  height: 100%;
}

#indicador-carregamento {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: auto !important;
}

.ajustar-background {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.gap {
  gap: 20px;
}

.texto-branco {
  color: var(--branco) !important;
}
</style>