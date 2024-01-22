<script setup>
</script>

<template>
  <div id="menu" class="d-flex justify-space-around align-center gap">
    <div>
      <ul class="d-flex gap">
        <li>Filmes</li>
        <li>Séries</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
#menu {
  width: 100%;
  padding: 40px 0;
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