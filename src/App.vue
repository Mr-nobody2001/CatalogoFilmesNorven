<script setup>
import Menu from "@/components/menu/Menu.vue";
</script>

<template>
  <div id="app">
    <header>
      <Menu/>
    </header>

    <main>
      <router-view/>
    </main>
  </div>
</template>

<style scoped>
#app {
  padding: 20px 50px;
  background-color: var(--preto);
}
</style>
