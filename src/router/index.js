import { createRouter, createWebHistory } from 'vue-router'
import project from '@/page/project/index.vue';
const routes = [
    {
        path: '/project',
        component: project
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;