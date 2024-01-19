<script>
export default {
  name: "IndicadorNota",
  props: {
    nota: Number,
  },
  computed: {
    notaFormatadaIndicador() {
      return this.nota * 10;
    },
    notaFormatadaMostrador() {
      return this.nota.toFixed(1)
    },
  }
}
</script>

<template>
  <v-progress-circular
      :size="65"
      :width="5"
      :model-value="notaFormatadaIndicador"
      color="amber"
  >
    {{ notaFormatadaMostrador }}
  </v-progress-circular>
</template>

<style scoped>

</style>