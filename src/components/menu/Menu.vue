<script>
import BarraPesquisa from "@/components/input/BarraPesquisa.vue";

export default {
  components: { BarraPesquisa },
  data() {
    return {
      tipoConteudo: null,
    }
  },
  methods: {
    mudarTipoConteudo() {
      if (!this.tipoConteudo) {
        this.$store.dispatch('atualizarTipoConteudo', "tv");
      } else {
        this.$store.dispatch('atualizarTipoConteudo', this.tipoConteudo);
      }
    },
    voltarPaginaInicial() {
      if (this.$route.name !== "inicio") {
        this.$router.push({ name: "inicio" });
      }
    },
    acessarFavoritos() {
      if (this.$route.name !== "favoritos") {
        this.$router.push({ name: "favoritos" });
      }
    }
  },
  computed: {
    paginaDetalhamento() {
      return this.$route.name === "detalhamento";
    },
    paginaFavoritos() {
      return this.$route.name === "favoritos";
    }
  },
}
</script>

<template>
  <div id="menu">
    <div class="d-flex w-50 gap">
      <img @click="voltarPaginaInicial" id="logo-menu" src="@/assets/claquete.png" alt="claquete">

      <div v-if="!paginaDetalhamento" id="switch" class="d-flex justify-space-between align-center gap">
        <p>Filmes</p>
        <v-switch @click="mudarTipoConteudo" class="d-flex justify-center" v-model="tipoConteudo" hide-details
          false-value="tv" true-value="filmes"></v-switch>
        <p>TV</p>
      </div>
    </div>

    <BarraPesquisa v-if="!paginaFavoritos"/>

    <i v-if="!paginaFavoritos" @click="acessarFavoritos" id="favoritos" class="bi bi-heart-fill"></i>
  </div>
</template>

<style scoped>
#menu {
  width: 100%;
  color: var(--branco);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

#logo-menu {
  width: 80px;
}

#logo-menu:hover {
  cursor: pointer;
}

#switch {
  gap: 10px;
}

#favoritos {
  margin-left: 20px;
  font-size: 1.5rem;
}

#favoritos:hover {
  cursor: pointer;
}

.gap {
  gap: 80px
}
</style>