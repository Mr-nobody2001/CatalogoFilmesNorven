import {createRouter, createWebHashHistory} from "vue-router";

import Populares from "@/views/Populares.vue";
import Pesquisa from "@/views/Pesquisa.vue";
import Detalhamento from "@/views/Detalhamento.vue";

const About = {template: '<div>About</div>'}

const routes = [
    {path: '/', component: Populares},
    {path: '/pesquisa', name: "pesquisa", component: Pesquisa},
    { path: '/detalhamento/:id', name: 'detalhamento', component: Detalhamento },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;