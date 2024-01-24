<script>
export default {
  name: "MensagemAlerta",
  props: {
    type: String,
    title: String,
    text: String,
  }
}
</script>

<template>
  <v-alert
      density="compact"
      :type
      :title
      :text
      closable
  ></v-alert>
</template>

<style scoped>
</style>