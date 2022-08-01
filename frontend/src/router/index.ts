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
      path: '/messages',
      name: 'Messages',
      component: () => import('../views/MessagesView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
