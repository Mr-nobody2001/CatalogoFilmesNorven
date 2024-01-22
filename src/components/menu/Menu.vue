<script setup>
import BarraPesquisa from "@/components/input/BarraPesquisa.vue";
</script>

<template>
  <div id="menu" class="d-flex justify-space-between align-center gap">
    <div>
      <ul class="d-flex gap">
        <li>Filmes</li>
        <li>Séries</li>
      </ul>
    </div>

    <BarraPesquisa/>
  </div>
</template>

<style scoped>
#menu {
  width: 100%;
  padding: 25px 60px 0 60px;
  background-color: var(--preto);
  color: var(--branco);
}

#menu ul {
  list-style: none;
}

.gap {
  gap: 20px;
}
</style>