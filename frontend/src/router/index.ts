import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth/login',
      name: 'Login',
      component: () => import('../views/auth/Login.vue')
    },
    {
      path: '/auth/Create-acount',
      name: 'Create-acount',
      component: () => import('../views/auth/CreateAcount.vue')
    },
    {
      path: '/auth/Reset-pass',
      name: 'Reset-pass',
      component: () => import('../views/auth/ResetPassword.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
