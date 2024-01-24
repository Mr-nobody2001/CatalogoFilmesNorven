<script>
import Carrossel from "@/components/carrossel/Carrossel.vue";
import {pesquisarTitulosPopulares} from "@/service/TmdbService.js";
import IndicadorCarregamento from "@/components/indicadores/carregamento/IndicadorCarregamento.vue";
import IndicadorNota from "@/components/indicadores/nota/IndicadorNota.vue";

export default {
  name: "Populares",
  components: {IndicadorNota, IndicadorCarregamento, Carrossel},
  data() {
    return {
      titulos: null,
      sliding: false,
      dadosCarregados: false,
      tituloSelecionado: null,
    }
  },
  methods: {
    async obterTitulosPopulares(tipoConteudo) {
      this.titulos = (await pesquisarTitulosPopulares(tipoConteudo)).results;
    },
    async inserirPrimeiroTitulo(tipoConteudo) {
      await this.obterTitulosPopulares(tipoConteudo);
      this.tituloSelecionado = this.titulos[0];
      this.dadosCarregados = true;
    },
    trocarInformacoesTitulo(currentSlideIndex) {
      this.tituloSelecionado = this.titulos[currentSlideIndex];
      this.sliding = false;
    },
    startSlideHandle() {
      this.sliding = true;
    },
    acessarDetalhamento() {
      this.$router.push({name: 'detalhamento', params: {id: this.tituloSelecionado.id}});
    }
  },
  computed: {
    formatarOverview() {
      const overview = this.tituloSelecionado.overview;

      if (!overview) {
        return 'Indisponível';
      }

      if (overview.length > 200) {
        return overview.slice(0, 200) + "...";
      }

      return overview;
    },
    formatarAnoLancamento() {

      if (this.tituloSelecionado.release_date) {
        const anoLancamento = new Date(this.tituloSelecionado.release_date).getFullYear();
        return `(${anoLancamento})`;
      }

      return "";
    },
    prepararUrlBackground() {
      return `http://image.tmdb.org/t/p/original/${this.tituloSelecionado.backdrop_path}`;
    },
    prepararUrlLogo() {
      return `http://image.tmdb.org/t/p/original/${this.tituloSelecionado.poster_path}`;
    },
    tipoConteudo() {
      return this.$store.getters.tipoConteudo;
    },
  },
  watch: {
    tipoConteudo: {
      async handler() {
        await this.inserirPrimeiroTitulo(this.tipoConteudo);
      }
    }
  },
  async mounted() {
    await this.inserirPrimeiroTitulo(this.tipoConteudo);
  }
}
</script>

<template>
  <section id="populares" class="d-flex flex-column justify-center mt-5 h-auto">
    <div class="d-flex flex-column justify-space-between" v-if="dadosCarregados">
      <div id="container-informacoes-titulo" class="ajustar-background animate__animated"
           :class="{ 'animate__fadeOut': sliding, 'animate__fadeInRight': !sliding }"
           :style="{ backgroundImage: `url(${prepararUrlBackground})` }">

        <div id="informacoes-titulo">
          <div id="logo-titulo">
            <img class="rounded-lg" :src="prepararUrlLogo" :alt="tituloSelecionado.title">
          </div>

          <div class="w-100">
            <div>
              <h1>{{ tituloSelecionado.title || tituloSelecionado.original_name }} {{ formatarAnoLancamento }}</h1>
            </div>

            <div class="d-flex flex-row align-center gap">
              <IndicadorNota :nota="tituloSelecionado.vote_average"/>
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
                     rounded="xl"
                     @click="acessarDetalhamento">Detalhes
              </v-btn>
            </div>
          </div>
        </div>
      </div>

      <div class="h-100">
        <Carrossel @alertar-inicio-troca="startSlideHandle"
                   @alertar-fim-troca="trocarInformacoesTitulo"
                   :titulos="titulos"
        />
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
  color: var(--branco);
}

#container-informacoes-titulo {
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px var(--preto);
}

#informacoes-titulo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  width: 100%;
  height: 100%;
  padding: 0 40px;
  backdrop-filter: blur(5px) grayscale(1) brightness(0.3);
  background: linear-gradient(to right, var(--preto), transparent, transparent, var(--preto)),
  linear-gradient(to bottom, var(--preto), transparent, transparent, var(--preto));
}

#logo-titulo {
  max-width: 300px;
  max-height: 450px;
}

#logo-titulo > img {
  width: 100%;
  height: 100%;
}

@media (min-width: 768px) {
  #informacoes-titulo {
    flex-direction: row;
  }
}

#informacoes-titulo div:nth-child(2) {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
}

@media (min-width: 768px) {
  #informacoes-titulo div:nth-child(2) {
    align-items: start;
  }
}

#container-informacoes-titulo p {
  width: 100%;
  font-size: 1.05rem;
}

@media (min-width: 1200px) {
  #container-informacoes-titulo p {
    width: 50%;
  }
}

#indicador-carregamento {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.ajustar-background {
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