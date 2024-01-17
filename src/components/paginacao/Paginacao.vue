<script>
export default {
  name: "Paginacao",
  data () {
    return {
      page: 1,
    }
  },
  props: {
    length: Number,
  },
  methods: {
    requisicaoTrocarPagina() {
      this.$emit('trocar-pagina', this.page);
    },
  },
}
</script>

<template>
  <v-container class="text-center">
    <v-row justify="center">
      <v-col cols="8">
        <v-container class="max-width">
          <v-pagination
              v-model="page"
              class="my-4"
              :length
              @click="requisicaoTrocarPagina"
          ></v-pagination>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>