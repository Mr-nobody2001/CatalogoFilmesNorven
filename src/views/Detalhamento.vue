<script>
import IndicadorCarregamento from "@/components/indicadores/carregamento/IndicadorCarregamento.vue";
import IndicadorNota from "@/components/indicadores/nota/IndicadorNota.vue";
import {pesquisarFilmePorId} from "@/components/service/TmdbService.js";

export default {
  name: "Detalhamento",
  components: {IndicadorNota, IndicadorCarregamento},
  data() {
    return {
      filme: null,
      dadosCarregados: false,
    }
  },
  methods: {
    async obterFilmePorId(id) {
      try {
        this.filme = await pesquisarFilmePorId(id);
      } catch (error) {
        console.error('Erro ao obter filmes populares: ', error.message);
      }
    },
    async inserirFilme(id) {
      await this.obterFilmePorId(id);
      this.dadosCarregados = true;
      console.log(this.filme)
    },
  },
  computed: {
    formatarDataLancamento() {
      const formatoData = new Intl.DateTimeFormat('pt-BR',
          {day: '2-digit', month: '2-digit', year: 'numeric'});

      return formatoData.format(new Date(this.filme.release_date));
    },
    formatarListaGeneros() {
      let listaGenero = "";

      console.log(this.filme.genres)

      if (this.filme.genres) {
        let i = 0;

        for (; i > this.filme.genres.length - 1; i++) {
          listaGenero += this.filme.genres[i].name + ", ";
        }

        listaGenero += this.filme.genres[++i].name;
      }

      return listaGenero;
    },
    formatarAnoLancamento() {
      return new Date(this.filme.release_date).getFullYear();
    },
    prepararUrlBackground() {
      return `http://image.tmdb.org/t/p/original/${this.filme.backdrop_path}`;
    },
    prepararUrlLogo() {
      return `http://image.tmdb.org/t/p/w300/${this.filme.poster_path}`;
    },
    formatarDuracao() {
      return `${Math.floor(this.filme.runtime / 60)}h ${this.filme.runtime % 60}m`;
    },
    formatarOverview() {
      const overview = this.filme.overview;

      if (!overview) {
        return 'Indisponível'
      }

      return overview;
    },
  },
  async mounted() {
    await this.inserirFilme(this.$route.params.id);
  }
}
</script>

<template>
  <section id="detalhamento">
    <section id="populares" class="d-flex flex-column justify-center">
      <div class="d-flex flex-column" v-if="dadosCarregados">
        <div id="informacoes" class="ajustar-background"
             :style="{ backgroundImage: `url(${prepararUrlBackground})` }">

          <div id="informacoes-imagem-texto" class="d-flex justify-space-between">
            <div class="rounded-sm">
              <img class="rounded-sm" :src="prepararUrlLogo" :alt="filme.title">
            </div>

            <div class="d-flex justify-space-between gap w-100">
              <div class="d-flex flex-column justify-space-between gap">
                <div>
                  <h1>{{ filme.title }} ({{ formatarAnoLancamento }})</h1>
                </div>

                <div class="d-flex justify-start">
                  <p>{{ formatarDataLancamento }}</p>
                  <i class="bi bi-dot"></i>
                  <p>{{ formatarListaGeneros }}</p>
                  <i class="bi bi-dot"></i>
                  <p>{{ formatarDuracao }}</p>
                </div>

                <div class="d-flex flex-row align-center gap">
                  <IndicadorNota :nota="filme.vote_average"/>
                  <p>Avaliação <br> dos <br> usuários</p>
                </div>

                <div class="d-flex flex-column gap">
                  <p>{{ filme.tagline }}</p>

                  <h2>Sinopse</h2>
                  <p>{{ formatarOverview }}</p>
                </div>
              </div>

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

      <div id="indicador-carregamento" v-else>
        <IndicadorCarregamento/>
      </div>
    </section>
  </section>
</template>

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
  backdrop-filter: blur(5px) brightness(0.3);
  background: linear-gradient(to right, var(--preto), transparent, transparent, var(--preto)),
  linear-gradient(to bottom, var(--preto), transparent, transparent, var(--preto));
}

#informacoes-imagem-texto {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  min-width: 100%;
  width: 100% !important;
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
  font-size: 1.05rem;
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