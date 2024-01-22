<script>
export default {
  name: "BarraPesquisa",
  data() {
    return {
      pesquisa: null,
    }
  },
  methods: {
    emitirAvisoPesquisa() {
      this.$emit('pesquisar', this.pesquisa);
    }
  }
}
</script>

<template>
  <div id="barra-pesquisa" class="d-flex gap">
    <input type="text" v-model="pesquisa" @input="emitirAvisoPesquisa" placeholder="Pesquisar por um filme..."/>
    <i class="bi bi-search"></i>
  </div>
</template>

<style scoped>
#barra-pesquisa {
  width: 100%;
  padding: 10px 20px;
  border-radius: 10px;
  color: var(--branco) !important;
  background-color: #424242;
}

#barra-pesquisa > input {
  width: 100%;
  border: none;
  outline: none;
  color: var(--branco) !important;
}

.gap {
  gap: 20px;
}
</style>