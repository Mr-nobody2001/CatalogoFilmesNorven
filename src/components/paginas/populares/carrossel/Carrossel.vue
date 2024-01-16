<script>
import MiniaturaFilme from "@/components/paginas/populares/carrossel/MiniaturaFilme.vue";
import {Carousel, Slide, Navigation} from "vue3-carousel";

import 'vue3-carousel/dist/carousel.css'

export default {
  name: "Carrossel",
  components: {Slide, Carousel, Navigation, MiniaturaFilme},
  data() {
    return {
      filmes: null,
    }
  },
  async mounted() {
    try {
      const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTI4Nzg3ZDM5YWVlOTc0M2M2ZDY5ZGM1MzgyYzkyMCIsInN1YiI6IjY1OWZmOWE1YzE0ZmVlMDEyNzZkODJiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Cn2m5y2JxhK2nFFwguw6oY_i_mmcP953HeIYgI4UMOw'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      this.filmes = (await response.json()).results;
    } catch (error) {
      console.error(`Erro ao buscar os dados: ${error}`);
    }
  }
}
</script>

<template>
  <Carousel :itemsToShow="5.95"
            :wrapAround="true"
            :transition="500"
            :autoplay="5000">

    <Slide v-for="(filme, index) in filmes" :key="filme.id">
      <div class="carousel__item">
        <MiniaturaFilme :url="filme.poster_path" :titulo="filme.title" :posicao="index"/>
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