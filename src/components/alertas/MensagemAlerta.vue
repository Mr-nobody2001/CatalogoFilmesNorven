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
  <v-alert id="alerta"
      density="compact"
      :type
      :title
      :text
      closable
  ></v-alert>
</template>

<style scoped>
#alerta {
  position: absolute;
  top: 100px;
  right: 100px;
  z-index: 1;
}
</style>