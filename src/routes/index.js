import { createRouter, createWebHashHistory } from "vue-router";

import Populares from "@/views/Populares.vue";
import Listagem from "@/views/Listagem.vue";
import Detalhamento from "@/views/Detalhamento.vue";
import Favoritos from "@/views/Favoritos.vue"

const About = { template: "<div>About</div>" };

const routes = [
  { path: "/", name: "inicio", component: Populares },
  { path: "/pesquisa", name: "pesquisa", component: Listagem },
  { path: "/detalhamento/:id", name: "detalhamento", component: Detalhamento },
  { path: "/favoritos", name: "favoritos", component: Favoritos },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
