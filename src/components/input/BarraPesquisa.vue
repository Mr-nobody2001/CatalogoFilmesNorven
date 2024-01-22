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
  <div id="barra-pesquisa" class="d-flex">
    <input type="text" v-model="pesquisa" @input="emitirAvisoPesquisa" placeholder="Pesquisar por um filme..."/>
    <i class="bi bi-search"></i>
  </div>
</template>

<style scoped>
#barra-pesquisa {
  width: 50%;
  padding: 10px 20px;
  border-radius: 10px;
  color: var(--branco) !important;
  background-color: var(--cinza-ardosia-escuro);
}

#barra-pesquisa > input {
  width: 100%;
  border: none;
  outline: none;
  color: var(--branco) !important;
}

#barra-pesquisa i {
  color: var(--neve);
}

#barra-pesquisa i:hover {
  cursor: pointer;
  color: var(--branco);
}
</style>