<script>
export default {
  name: "Miniatura",
  props: {
    url: String,
    titulo: String,
  },
  computed: {
    montarUrl() {
      return `http://image.tmdb.org/t/p/w342/${this.url}`
    },
    truncarString() {
      if (this.titulo.length > 28) {
        return this.titulo.slice(0, 28) + '...';
      }
      return this.titulo;
    }
  }
}
</script>

<template>
  <div class="miniatura">
    <v-card width="185"
        height="278"
        :image="montarUrl"
        theme="dark"
        hover
    ></v-card>
    <p v-if="titulo" class="ma-3">{{ truncarString }}</p>
  </div>
</template>

<style scoped>
.miniatura {
  font-size: 0.8rem;
}
</style>