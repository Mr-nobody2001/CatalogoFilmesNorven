<script>
export default {
  name: "Paginacao",
  data () {
    return {
      page: 1,
    }
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
              :length="15"
          ></v-pagination>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>