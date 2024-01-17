<script>
import Miniatura from "@/components/cards/Miniatura.vue";
import {Carousel, Slide, Navigation} from "vue3-carousel";

import 'vue3-carousel/dist/carousel.css'
import {pesquisarFilmesPopulares} from "@/components/service/TmdbService.js";

export default {
  name: "Carrossel",
  components: {Slide, Carousel, Navigation, Miniatura},
  props: {
    filmes: Array,
  },
}
</script>

<template>
  <Carousel :itemsToShow="5.95"
            :wrapAround="true"
            :transition="500"
            :autoplay="5000">

    <Slide v-for="(filme, index) in filmes" :key="filme.id">
      <div class="carousel__item">
        <Miniatura :url="filme.poster_path" :titulo="filme.title" :posicao="index"/>
      </div>
    </Slide>

    <template #addons>
      <Navigation/>
    </template>
  </Carousel>
</template>

<style scoped>
.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}
</style>