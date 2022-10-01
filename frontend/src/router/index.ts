import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Vistas publicas
    {
      path: '/',
      name: 'home',
      meta:{requireAuth: false},
      component: () => import("@/views/auth/Login.vue")      
    },
    {
      path: '/auth/login',
      name: 'Login',
      meta:{ requireAuth: false},
      component: () => import('@/views/auth/Login.vue')
    },
    {
      path: '/auth/Create-acount',
      name: 'Create-acount',
      meta:{ requireAuth: false},
      component: () => import('@/views/auth/CreateAcount.vue')
    },
    {
      path: '/auth/Reset-pass',
      name: 'Reset-pass',
      meta:{ requireAuth: false},
      component: () => import('@/views/auth/ResetPassword.vue')
    },
    // Vistas privadas o protegidas del sistema
    {
      path: '/app',
      name: 'home',
      meta:{ requireAuth: true },
      component: () => import('@/views/private/HomeApp.vue'),
      redirect:{path: '/app/mensajes'},
      children:[
        {
          path: '/app/mensajes',
          name: 'messages',
          component: () => import("@/views/private/MessagesView.vue")
        },
        {
          path: '/app/contactos',
          name: 'contacts',
          component: () => import("@/views/private/ContactsView.vue")
        },
        {
          path: '/app/solicitudes',
          name: 'solicitudes',
          component: () => import("@/views/private/SolicitudView.vue")
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      meta:{ requireAuth: false},
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/me',
      name: 'me',
      meta:{ requireAuth: true},
      component: () => import('@/views/private/me.vue')
    }
  ]
})

export default router
