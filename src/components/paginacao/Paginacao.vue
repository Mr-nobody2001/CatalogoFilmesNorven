<script>
export default {
  name: "Paginacao",
  data() {
    return {
      page: this.pageProp,
    }
  },
  props: {
    pageProp: Number,
    length: Number,
  },
  watch: {
    pageProp() {
      this.page = this.pageProp;
    }
  },
  methods: {
    requisicaoTrocarPagina() {
      this.$emit('trocar-pagina', this.page);
    },
  },
}
</script>

<template>
  <v-container id="paginacao" class="max-width">
    <v-pagination
        v-model="page"
        class="my-4"
        :length
        :total-visible="7"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        @click="requisicaoTrocarPagina"
    ></v-pagination>
  </v-container>
</template>

<style scoped>
#paginacao {
  color: var(--branco) !important;
}
</style>