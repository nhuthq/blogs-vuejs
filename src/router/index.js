import { createWebHistory, createRouter } from 'vue-router';
import Home from '../views/Home.vue';
import Blogs from '@/views/Blogs.vue';

// Khai báo route
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
