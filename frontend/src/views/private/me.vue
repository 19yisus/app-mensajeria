<script setup lang="ts">
  import {useRouter} from 'vue-router'
  import { useStore } from '@/store/store'
  import { onMounted } from '@vue/runtime-core';
  const storePinia = useStore();

  console.log(storePinia.token)

  const logout = () =>{
    storePinia.setToken("");
    storePinia.setUserInfo("");
    setTimeout( () => useRouter().push("/auth/login"), 2000)
  }

  onMounted( async () =>{
    let res = await storePinia.RequestGetWithToken('usuario/yo');
    storePinia.setUserInfo(JSON.stringify(res.datos_respuesta))
    let user = storePinia.getUserInfo()
    console.log(user)
  })

</script>
<template>
  <main>
    <h1>ME</h1>
    <button type="button" @click="logout">Cerrar sesion</button>
  </main>
</template>