<script>
import BarraPesquisa from "@/components/input/BarraPesquisa.vue";

export default {
  components: {BarraPesquisa},
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
    }
  },
  computed: {
    paginaDetalhamento() {
      return this.$route.name === "detalhamento";
    }
  },
}
</script>

<template>
  <div id="menu">
    <img src="" alt="">

    <div v-if="!paginaDetalhamento" id="switch" class="d-flex justify-space-between align-center gap">
      <p>Filmes</p>
      <v-switch @click="mudarTipoConteudo" class="d-flex justify-center"
                v-model="tipoConteudo"
                hide-details
                false-value="tv"
                true-value="filmes"
      ></v-switch>
      <p>TV</p>
    </div>

    <BarraPesquisa/>
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

#switch {
  gap: 10px;
}
</style>