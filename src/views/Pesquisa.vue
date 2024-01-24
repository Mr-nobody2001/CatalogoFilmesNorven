<script>
import MiniaturaTitulo from "@/components/cards/MiniaturaTitulo.vue";
import Paginacao from "@/components/paginacao/Paginacao.vue";
import {pesquisarPorTitulo, pesquisarTitulosPopulares} from "@/service/TmdbService.js";
import IndicadorCarregamento from "@/components/indicadores/carregamento/IndicadorCarregamento.vue";
import BarraPesquisa from "@/components/input/BarraPesquisa.vue";

export default {
  name: "Pesquisa",
  components: {IndicadorCarregamento, Paginacao, MiniaturaTitulo, BarraPesquisa},
  data() {
    return {
      titulos: [],
      pagina: 1,
      gridCarregada: false,
      quantidadePaginas: 0,
      paginaCarregada: false,
    }
  },
  computed: {
    tipoConteudo() {
      return this.$store.getters.tipoConteudo;
    },
    pesquisa() {
      return this.$store.getters.pesquisa;
    },
    numeroTitulosPositivo() {
      return this.titulos.length > 0;
    },
  },
  watch: {
    pesquisa: {
      handler() {
        if (this.pesquisa !== null) {
          this.realizarPesquisaPorNome(this.pesquisa, this.tipoConteudo, 1);
        }
      },
    },
    tipoConteudo: {
      handler() {
        if (!this.pesquisa) {
          this.obterTitulosPopulares(this.tipoConteudo);
        } else {
          this.realizarPesquisaPorNome(this.pesquisa, this.tipoConteudo, 1);
        }
      }
    }
  },
  methods: {
    async obterTitulosPorNome(titulo, tipoConteudo, pagina) {
      try {
        this.gridCarregada = false;
        this.titulos = [];

        const resposta = await pesquisarPorTitulo(titulo, tipoConteudo, pagina);

        this.titulos = resposta.results;

        this.quantidadePaginas = resposta.total_pages;
        this.pagina = pagina;
        this.gridCarregada = true;
      } catch (error) {
        console.error('Erro ao obter títulos: ', error.message);
      }
    },
    async obterTitulosPopulares(tipoConteudo) {
      try {
        this.gridCarregada = false;
        this.titulos = [];

        const resposta = await pesquisarTitulosPopulares(tipoConteudo);

        this.titulos = resposta.results;

        this.quantidadePaginas = 1;
        this.pagina = 1;
        this.gridCarregada = true;
      } catch (error) {
        console.error('Erro ao obter títulos populares: ', error.message);
      }
    },
    trocarPagina(pagina) {
      this.obterTitulosPorNome(this.pesquisa, this.tipoConteudo, pagina)
    },
    realizarPesquisaPorNome(pesquisa, tipoConteudo) {
      this.obterTitulosPorNome(pesquisa, tipoConteudo, 1);
    },
    acessarDetalhamento(id) {
      this.$router.push({name: 'detalhamento', params: {id: id}});
    },
  },
  mounted() {
    if (!this.pesquisa) {
      this.obterTitulosPopulares("filmes");
    } else {
      this.realizarPesquisaPorNome(this.pesquisa, this.tipoConteudo);
    }

    this.paginaCarregada = true;
  }
}
</script>

<template>
  <section id="pesquisa">
    <div v-show="paginaCarregada" class="d-flex flex-column mt-10">
      <div v-show="gridCarregada" id="grid-pesquisa">
        <MiniaturaTitulo v-for="filme in titulos"
                         :key="filme.id"
                         :url="filme.poster_path"
                         :titulo="filme.title || filme.original_name"
                         @click="acessarDetalhamento(filme.id)"/>
      </div>

      <div v-if="gridCarregada && !numeroTitulosPositivo" id="mensagem"
           class="d-flex flex-column align-center centralizar">
        <i class="bi bi-database-slash"></i>
        <p>Nenhum filme encontrado.</p>
      </div>

      <div v-show="gridCarregada && numeroTitulosPositivo">
        <Paginacao @trocar-pagina="trocarPagina" :pageProp="pagina" :length="quantidadePaginas"/>
      </div>

      <div v-if="!gridCarregada && !numeroTitulosPositivo" class="centralizar">
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