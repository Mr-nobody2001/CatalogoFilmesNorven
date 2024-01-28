<script>
import IndicadorCarregamento from "@/components/indicadores/carregamento/IndicadorCarregamento.vue";
import IndicadorNota from "@/components/indicadores/nota/IndicadorNota.vue";
import { pesquisarTituloPorId } from "@/service/TmdbService.js";
import MiniaturaElenco from "@/components/cards/MiniaturaElenco.vue";

export default {
  name: "Detalhamento",
  components: { MiniaturaElenco, IndicadorNota, IndicadorCarregamento },
  data() {
    return {
      titulo: null,
      dadosCarregados: false,
      possuiLogo: false,
      possuiBackground: false,
    }
  },
  methods: {
    async obterTituloPorId(id, tipoConteudo) {
      try {
        this.titulo = await pesquisarTituloPorId(id, tipoConteudo);
      } catch (error) {
        console.error('Erro ao obter título: ', error.message);
      }
    },
    async inserirTitulo(id, tipoConteudo) {
      await this.obterTituloPorId(id, tipoConteudo);
      this.dadosCarregados = true;
    },
  },
  computed: {
    formatarDataLancamento() {
      if (!this.titulo.release_date) {
        return "Data de lançamento não informada";
      }

      const formatoData = new Intl.DateTimeFormat('pt-BR',
        { day: '2-digit', month: '2-digit', year: 'numeric' });

      return ` ${formatoData.format(new Date(this.titulo.release_date))} `;
    },
    formatarListaGeneros() {
      if (this.titulo.genres.length > 0) {
        if (this.titulo.genres.length === 1) {

          return this.titulo.genres[0].name;
        }

        let listaGenero = "";
        let i = 0;

        for (; i < this.titulo.genres.length - 1; i++) {
          listaGenero += this.titulo.genres[i].name + ", ";
        }

        return listaGenero += this.titulo.genres[i].name + " ";
      }

      return "Gênero não informado";
    },
    formatarAnoLancamento() {
      if (!this.titulo.release_date) {
        return "";
      }

      return `(${new Date(this.titulo.release_date).getFullYear()})`;
    },
    prepararUrlBackground() {
      if (!this.titulo.backdrop_path) {
        return "";
      }

      this.possuiBackground = true;
      return `http://image.tmdb.org/t/p/original/${this.titulo.backdrop_path}`;
    },
    prepararUrlLogo() {
      if (!this.titulo.poster_path) {
        return "https://placehold.co/300x450?text=Logo+do+Título&font=roboto";
      }

      this.possuiLogo = true;
      return `http://image.tmdb.org/t/p/original/${this.titulo.poster_path}`;
    },
    formatarDuracao() {
      if (!this.titulo.runtime) {
        return "Duração Indeterminada";
      }

      return `${Math.floor(this.titulo.runtime / 60)}h ${this.titulo.runtime % 60}m`
    },
    formatarOverview() {
      const overview = this.titulo.overview;

      if (!overview) {
        return 'Indisponível'
      }

      return overview;
    },
    filtrarElenco() {
      if (!this.possuiElenco) {
        return [];
      }

      return this.titulo.credits.cast.slice(0, 7);
    },
    prepararUrlVideo() {
      if (!this.possuiVideo) {
        return "";
      }

      return `https://www.youtube.com/embed/${this.titulo.videos.results[0].key}`;
    },
    possuiVideo() {
      return this.titulo.videos.results[0];
    },
    possuiElenco() {
      return this.titulo.credits.cast.length > 0;
    },
    tipoConteudo() {
      return this.$store.getters.tipoConteudo;
    },
  },
  async mounted() {
    await this.inserirTitulo(this.$route.params.id, this.tipoConteudo);
  }
}
</script>

<template>
  <section id="detalhamento" class="d-flex flex-column justify-center">
    <div class="d-flex flex-column mt-15" v-if="dadosCarregados">
      <div id="container-informacoes-titulo" class="ajustar-background" :class="{ 'cor-background': !possuiBackground }"
        :style="{ backgroundImage: `url(${prepararUrlBackground})` }">

        <div id="informacoes-titulo" class="d-flex justify-space-between">
          <div id="logo-titulo" class="rounded-lg">
            <img class="rounded-lg" :src="prepararUrlLogo" :alt="titulo.title">
          </div>

          <div class="d-flex justify-space-between gap w-100">
            <div class="d-flex flex-column justify-space-between gap">
              <div>
                <h1>{{ titulo.title || titulo.original_name }} {{ formatarAnoLancamento }}</h1>
              </div>

              <div class="d-flex justify-start">
                <p>{{ formatarDataLancamento }}</p>
                <i class="bi bi-dot"></i>
                <p>{{ formatarListaGeneros }}</p>
                <i class="bi bi-dot"></i>
                <p>{{ formatarDuracao }}</p>
              </div>

              <div class="d-flex flex-row align-center gap">
                <IndicadorNota :nota="titulo.vote_average" />
                <p>Avaliação <br> dos <br> usuários</p>
              </div>

              <div class="d-flex flex-column gap">
                <p>{{ titulo.tagline }}</p>

                <h2>Sinopse</h2>
                <p>{{ formatarOverview }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="possuiElenco" class="rounded-md">
        <h3 class="mb-3">Elenco principal</h3>
        <div id="elenco" class="d-flex justify-start">
          <MiniaturaElenco v-for="membroElenco in filtrarElenco" :key="membroElenco.id" :nome="membroElenco.name"
            :papel="membroElenco.character" :url="membroElenco.profile_path" />
        </div>
      </div>

      <div v-if="possuiVideo" class="container-iframe">
        <iframe class="iframe-responsivo rounded-lg mt-5" width="100%" height="515px" :src="prepararUrlVideo"
          title="YouTube video player" allowfullscreen>
        </iframe>
      </div>
    </div>

    <div id="indicador-carregamento" v-else>
      <IndicadorCarregamento />
    </div>
  </section>
</template>

<style scoped>
#detalhamento {
  min-height: 100vh;
  height: auto;
  padding-bottom: 40px;
}

#detalhamento>div:last-child {
  height: 100%;
  gap: 30px;
  color: var(--branco);
}

#container-informacoes-titulo {
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px var(--preto);
}

#container-informacoes-titulo>div {
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px) brightness(0.3);
  background: linear-gradient(to right, var(--preto), transparent, transparent, var(--preto)),
    linear-gradient(to bottom, var(--preto), transparent, transparent, var(--preto));
}

#informacoes-titulo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  min-width: 100%;
  width: 100% !important;
}

@media (min-width: 768px) {
  #informacoes-titulo {
    flex-direction: row;
  }
}

#container-informacoes-titulo h1 {
  font-size: 1.5rem;
  font-weight: bolder;
}

#container-informacoes-titulo p {
  font-size: 1.05rem;
}

#indicador-carregamento {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: auto !important;
}

#logo-titulo {
  max-width: 300px;
  max-height: 450px;
}

#logo-titulo>img {
  width: 100%;
  height: 100%;
}

.ajustar-imagem {
  width: 100%;
  height: 100%;
}

#elenco {
  width: 100%;
  padding: 20px 0;
  overflow-x: scroll;
}

.cor-background {
  background-color: var(--amber);
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

.container-iframe {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%;
}

.iframe-responsivo {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 90%;
}
</style>