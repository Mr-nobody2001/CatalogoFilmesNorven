<script setup>
import BarraPesquisa from "@/components/input/BarraPesquisa.vue";
</script>

<template>
  <div id="menu" class="d-flex justify-space-between align-center gap">
    <div id="switch" class="d-flex justify-space-between align-center gap">
      <p>Filmes</p>
      <v-switch class="d-flex justify-center"
                v-model="model"
                hide-details
                inset
      ></v-switch>
      <p>Séries</p>
    </div>

    <BarraPesquisa/>
  </div>
</template>

<style scoped>
#menu {
  width: 100%;
  color: var(--branco);
}

#switch {
  gap: 10px;
}
</style>