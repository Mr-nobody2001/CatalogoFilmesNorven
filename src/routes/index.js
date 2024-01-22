import {createRouter, createWebHashHistory} from "vue-router";

import Populares from "@/views/Populares.vue";

const About = {template: '<div>About</div>'}

const routes = [
    {path: '/', component: Populares},
    //{path: '/about', component: About},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;