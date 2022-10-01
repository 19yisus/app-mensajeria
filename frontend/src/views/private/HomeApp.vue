<script setup lang="ts">
  import { useStore } from "@/store/store";
  import { ChatIcon, UsersIcon } from "@heroicons/vue/solid"
  import { onMounted } from "@vue/runtime-core";
  import { RouterView, RouterLink } from "vue-router";

  const storePinia = useStore();

  // onMounted( async()=>{
  //   const resultado = await storePinia.RequestGetWithToken("solicitud/consultar/solicitudes")
  //   console.group("Consultando mis solicitudes")
  //   console.log(resultado)
  //   console.groupEnd();
  // }) 
  
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
    </div>
    <div class="w-full rounded-t-xl p-3 h-full overflow-y-scroll mt-3 m-auto bg-gray-100">
      <RouterView/>
    </div>
  </main>
</template>