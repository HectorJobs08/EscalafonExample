import { createWebHashHistory, createRouter } from "vue-router";

import Escalafon from "@/components/pages/Escalafon.vue";


const routes = [
    {
        path: '/',
        component: Escalafon,
    },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});