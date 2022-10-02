<script setup lang="ts">
  import { useStore } from "@/store/store";
  import { ChatIcon, UsersIcon, ArrowCircleLeftIcon } from "@heroicons/vue/solid"
  import { onMounted } from "@vue/runtime-core";
  import { RouterView, RouterLink, useRouter } from "vue-router";
  const rutas = useRouter();
  const storePinia = useStore();

  const logout = () =>{
    sessionStorage.setItem("token_user","");
    sessionStorage.setItem("user_info","");
    setTimeout( () => rutas.push("/auth/login"), 2000)
  }
  
</script>

<template>
  <main class="bg-orange-500 h-screen w-screen overflow-y-scroll">
    <div class="text-center font-bold text-white space-y-2">
      <h2 class="mt-2">Aplicación de Mensajeria</h2>
      <div class="flex flex-wrap items-center justify-between mx-auto w-3/4 p-2 rounded-md bg-orange-700">
        <RouterLink class="flex items-center space-x-2" to="contactos">
          <p>Contacts</p> <UsersIcon class="h-5 w-5"/> 
        </RouterLink>
        <RouterLink class="flex items-center space-x-2" to="mensajes">
          <p>Messages</p> <ChatIcon class="h-5 w-5"/>
        </RouterLink>
      </div>
      <button type="button" @click="logout" class="absolute top-1 right-7 bg-orange-700 hover:bg-orange-800 active:bg-orange-600 rounded-md p-1">
        <ArrowCircleLeftIcon class="h-5 w-5"/>
      </button>
    </div>
    <div class="w-full rounded-t-xl p-3 h-full overflow-y-scroll mt-3 m-auto bg-gray-100">
      <RouterView/>
    </div>
  </main>
</template>