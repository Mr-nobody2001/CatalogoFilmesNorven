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
        return "https://placehold.co/185x288?text=Foto+do+Elenco&font=roboto"
      }

      return `https://image.tmdb.org/t/p/original/${this.url}`
    }
  }
}
</script>

<template>
  <v-card class="mx-auto pb-5" min-width="185px" max-width="185px" min-height="288px" max-height="auto">
    <v-img :src="prepararUrl" min-width="185px" max-width="185px" min-height="288px" max-height="288px" cover></v-img>

    <v-card-title>
      {{ nome }}
    </v-card-title>

    <v-card-subtitle>
      {{ papel }}
    </v-card-subtitle>
  </v-card>
</template>

<style scoped></style>