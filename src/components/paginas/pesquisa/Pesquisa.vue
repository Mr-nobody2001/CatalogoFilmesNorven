<script>
import Miniatura from "@/components/cards/Miniatura.vue";
import Paginacao from "@/components/paginacao/Paginacao.vue";

export default {
  name: "Pesquisa",
  components: {Paginacao, Miniatura}
}
</script>

<template>
  <section>
    <div id="pesquisa">
      <Miniatura v-for="filme in 12"
                 :url="filme"
                 :titulo="filme"
                 :posicao="filme"/>
    </div>

    <div>
      <Paginacao/>
    </div>
  </section>
</template>

<style scoped>
#pesquisa {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(185px, 1fr));
  padding: 25px;
  gap: 20px;
}
</style>