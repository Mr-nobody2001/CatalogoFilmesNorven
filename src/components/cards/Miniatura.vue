<script>
export default {
  name: "Miniatura",
  props: {
    url: String,
    titulo: String,
    posicao: Number,
  },
  computed: {
    montarUrl() {
      console.log(this.url)
      return `http://image.tmdb.org/t/p/w342/${this.url}`
    },
  }
}
</script>

<template>
  <v-card
      class="miniatura mx-auto rounded-0"
      width="185"
      height="278"
      :image="montarUrl"
      theme="dark"
  ></v-card>
</template>

<style scoped>
.miniatura {
  display: inline-block;
  font-size: 0.8rem;
  color: var(--branco);
  background-color: darkblue;
}

.miniatura:hover {
  cursor: pointer;
}
</style>