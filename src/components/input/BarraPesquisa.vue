<script setup>

</script>

<template>
  <div id="barra-pesquisa" class="d-flex gap">
    <input type="text" placeholder="Pesquisar por um filme..."/>
    <i class="bi bi-search"></i>
  </div>
</template>

<style scoped>
#barra-pesquisa {
  width: 50%;
  padding: 15px 25px;
  border-radius: 50px;
  font-size: 1.1rem;
  color: var(--branco) !important;
  background-color: #424242;
}

#barra-pesquisa > input {
  width: 100%;
  border: none;
  outline: none;
  color: var(--branco) !important;
}

.gap {
  gap: 20px;
}
</style>