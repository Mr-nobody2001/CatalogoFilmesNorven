<script>
import MiniaturaTitulo from "@/components/cards/MiniaturaTitulo.vue";
import Paginacao from "@/components/paginacao/Paginacao.vue";
import { pesquisarListaFavoritos } from "@/service/TmdbService.js";
import IndicadorCarregamento from "@/components/indicadores/carregamento/IndicadorCarregamento.vue";
import BarraPesquisa from "@/components/input/BarraPesquisa.vue";

export default {
    name: "Listagem",
    components: { IndicadorCarregamento, Paginacao, MiniaturaTitulo, BarraPesquisa },
    data() {
        return {
            pagina: 1,
            titulos: [],
            quantidadePaginas: 0,
            gridCarregada: false,
            paginaCarregada: false,
            erroPesquisa: false,
        }
    },
    computed: {
        tipoConteudo() {
            return this.$store.getters.tipoConteudo;
        },
        numeroTitulosPositivo() {
            return this.titulos.length > 0;
        },
    },
    watch: {
        tipoConteudo: {
            handler() {
                this.realizarPesquisaListaFavoritos(this.tipoConteudo);
            }
        }
    },
    methods: {
        async obterListaFavoritos(tipoConteudo, pagina) {
            this.titulos = [];
            this.gridCarregada = false;

            const resposta = await pesquisarListaFavoritos(tipoConteudo, pagina);

            console.log(resposta)

            this.titulos = resposta.results;
            this.quantidadePaginas = resposta.total_pages;
            this.pagina = pagina;
            this.gridCarregada = true;
        },
        realizarPesquisaListaFavoritos(tipoConteudo) {
            this.obterListaFavoritos(tipoConteudo, 1);
        },
        trocarPagina(pagina) {
            this.obterListaFavoritos(this.tipoConteudoDetalhamento, pagina);
        },
        acessarDetalhamento(id) {
            this.$store.dispatch('atualizarTipoConteudoDetalhamento', this.tipoConteudo);

            this.$router.push({ name: 'detalhamento', params: { id: id } });
        },
    },
    mounted() {
        this.realizarPesquisaListaFavoritos(this.tipoConteudo);

        this.paginaCarregada = true;
    }
}
</script>

<template>
    <section id="pesquisa">
        <div v-show="paginaCarregada" class="d-flex flex-column mt-10">
            <div v-show="gridCarregada" id="grid-pesquisa">
                <MiniaturaTitulo v-for="filme in titulos" :key="filme.id" :url="filme.poster_path"
                    :titulo="filme.title || filme.original_name" @click="acessarDetalhamento(filme.id)" />
            </div>

            <div v-if="gridCarregada && !numeroTitulosPositivo" id="mensagem"
                class="d-flex flex-column align-center centralizar">
                <i class="bi bi-database-slash"></i>
                <p>Nenhum título encontrado.</p>
            </div>

            <div v-show="gridCarregada && numeroTitulosPositivo">
                <Paginacao @trocar-pagina="trocarPagina" :pageProp="pagina" :length="quantidadePaginas" />
            </div>

            <div v-if="!gridCarregada && !numeroTitulosPositivo" class="centralizar">
                <IndicadorCarregamento />
            </div>
        </div>

        <div v-if="!paginaCarregada" class="centralizar">
            <IndicadorCarregamento />
        </div>
    </section>
</template>
  
<style scoped>
#pesquisa {
    min-height: 100vh;
    height: auto;
}

#pesquisa>div {
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

#mensagem>p,
#mensagem>i {
    color: var(--branco);
}

#mensagem>i {
    font-size: 4rem;
}

#mensagem>p {
    font-size: 1.4rem;
}

.centralizar {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>