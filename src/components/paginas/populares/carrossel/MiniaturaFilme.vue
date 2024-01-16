<script>
export default {
  name: "MiniaturaFilme"
}
</script>

<template>
  <div class="miniatura-filme">
    <v-card
        class="mx-auto rounded-0"


        width="200"


        height="200"
        image="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        theme="dark"
    ></v-card>

    <p class="mt-3">Imagem</p>
  </div>
</template>

<style scoped>
 .miniatura-filme {
   display: inline-block;
   color: var(--branco);
 }
</style>