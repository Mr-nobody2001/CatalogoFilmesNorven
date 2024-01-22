<script>
import Miniatura from "@/components/cards/Miniatura.vue";
import {Carousel, Slide, Navigation} from "vue3-carousel";

import 'vue3-carousel/dist/carousel.css'

export default {
  name: "Carrossel",
  components: {Slide, Carousel, Navigation, Miniatura},
  data() {
    return {
      breakpoints: {
        576: {
          itemsToShow: 2.95,
          snapAlign: 'center',
        },
        992: {
          itemsToShow: 5.95,
          snapAlign: 'center',
        },
        1200: {
          itemsToShow: 8.95,
          snapAlign: 'center',
        },
        1400: {
          itemsToShow: 10.95,
          snapAlign: 'center',
        },
      },
    }
  },
  props: {
    filmes: Array,
  },
  methods: {
    alertarInicioTroca() {
      this.$emit('alertar-inicio-troca');
    },
    alertarFimTroca({currentSlideIndex}) {
      this.$emit('alertar-fim-troca', currentSlideIndex);
    },
  },
}
</script>

<template>
  <Carousel @slide-start="alertarInicioTroca"
            @slide-end="alertarFimTroca"
            :items-to-show="1"
            :wrapAround="true"
            :transition="500"
            :autoplay="8000"
            :breakpoints="breakpoints">

    <Slide v-for="(filme) in filmes" :key="filme.id">
      <div class="carousel__item">
        <Miniatura :width="114" :height="191" :url="filme.poster_path"/>
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