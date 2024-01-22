<script setup>
import Pesquisa from "@/views/Pesquisa.vue";
import Menu from "@/components/menu/Menu.vue";
</script>

<template>
  <div id="app">
    <header>
      <Menu/>
    </header>

    <main>
      <Pesquisa/>
    </main>
  </div>
</template>

<style scoped>
#app {
  padding: 20px 50px;
  background-color: var(--preto);
}
</style>
