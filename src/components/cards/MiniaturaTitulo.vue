<script>
export default {
  name: "MiniaturaTitulo",
  data() {
    return {
      possuiLogo: false,
    }
  },
  props: {
    url: String,
    titulo: {
      type: String,
      default: "",
    },
    width: {
      type: Number,
      default: 185,
    },
    height: {
      type: Number,
      default: 288,
    },
  },
  computed: {
    montarUrl() {
      if (!this.url) {
        return "";
      }

      this.possuiLogo = true;
      return `http://image.tmdb.org/t/p/original/${this.url}`
    },
    truncarString() {
      if (this.titulo.length > 20) {
        return this.titulo.slice(0, 20) + '...';
      }
      return this.titulo;
    }
  }
}
</script>

<template>
  <div class="miniatura">
    <v-card class="d-flex justify-center"
            :width
            :height
            :image="montarUrl"
            theme="dark"
            hover
    >
      <i v-if="!possuiLogo" class="bi bi-film align-self-center"></i>
    </v-card>

    <p v-if="titulo" class="ma-3">{{ truncarString }}</p>
  </div>
</template>

<style scoped>
.miniatura {
  font-size: 0.8rem;
  color: var(--branco);
}

.miniatura i {
  font-size: 2.5rem;
}
</style>