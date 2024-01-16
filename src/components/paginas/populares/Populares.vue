<script>
import Carrossel from "@/components/paginas/populares/carrossel/Carrossel.vue";

export default {
  name: "Populares",
  components: {Carrossel},
}
</script>

<template>
  <section class="populares d-flex flex-column justify-center">
    <Carrossel/>
  </section>

  <section class="populares">

  </section>
</template>

<style scoped>
.populares {
  min-height: 100vh;
  background-color: darkblue !important;
}
</style>