import { createWebHistory, createRouter } from 'vue-router';
import Home from '../views/Home.vue';
import Blogs from '@/views/Blogs.vue';
import Login from '@/views/Login.vue';

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
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
