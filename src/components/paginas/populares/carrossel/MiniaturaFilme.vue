<script>
export default {
  name: "MiniaturaFilme",
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
    calcularPosicao() {
      return `${this.posicao + 1}°`;
    }
  }
}
</script>

<template>
  <div class="miniatura-filme">
    <v-card
        class="mx-auto rounded-0"
        width="185"
        height="278"
        :image="montarUrl"
        :title="calcularPosicao"
        theme="dark"
    ></v-card>

    <p class="ma-3">{{ titulo }}</p>
  </div>
</template>

<style scoped>
.miniatura-filme {
  display: inline-block;
  font-size: 0.8rem;
  color: var(--branco);
}
</style>