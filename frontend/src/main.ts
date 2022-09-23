import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useStore } from './store/store'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)

router.beforeEach( async (to, from, next) =>{
  const store = useStore();
  console.log("Hola")
  console.log(to.meta)
  if(store.token == "") await store.requiresToken();
  if(to.meta.requireAuth && store.token == "") return next('/auth/login')
  if(!to.meta.requireAuth && store.token != "") return next({name: 'me'});
  return next();
})

app.mount('#app')
