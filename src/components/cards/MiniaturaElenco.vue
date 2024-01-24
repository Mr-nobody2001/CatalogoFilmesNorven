<script>
export default {
  name: "MiniaturaElenco",
  props: {
    nome: String,
    papel: String,
    url: String,
  },
  computed: {
    prepararUrl() {
      if (!this.url) {
        return "src/assets/placeholder.svg"
      }

      return `https://image.tmdb.org/t/p/original/${this.url}`
    }
  }
}
</script>

<template>
  <v-card
      class="mx-auto pb-5"
      min-width="185px"
      min-height="288px"
  >
    <v-img
        :src="prepararUrl"
        min-width="185px"
        min-height="288px"
        cover
    ></v-img>

    <v-card-title>
      {{ nome }}
    </v-card-title>

    <v-card-subtitle>
      {{ papel }}
    </v-card-subtitle>
  </v-card>
</template>

<style scoped>

</style>