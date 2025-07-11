import { createWebHistory, createRouter } from 'vue-router';
import Home from '../views/Home.vue';

// Khai báo route
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
