<script setup lang="ts">
  import { ChatIcon, UsersIcon } from "@heroicons/vue/solid"
  import chatComponent from "../components/ChatComponent.vue"
</script>

<template>
  <main class="bg-orange-500 h-screen w-screen overflow-y-scroll">
    <div class="text-center font-bold text-white space-y-2">
      <h2 class="mt-2">Aplicación de Mensajeria</h2>
      <div class="flex flex-wrap items-center justify-between mx-auto w-3/4 p-2 rounded-md bg-orange-700">
        <button class="flex items-center space-x-2"> 
          <p>Contacts</p> <UsersIcon class="h-5 w-5"/> 
        </button>
        <button class="flex items-center space-x-2">
          <p>Messages</p> <ChatIcon class="h-5 w-5"/>
        </button>
      </div>
    </div>

    <div class="w-full rounded-t-xl p-3 h-full overflow-y-scroll mt-3 m-auto bg-gray-100">
      <ul class="space-y-1">
        <li><chatComponent name="rodrigo" message="You have a new messageeeeeeee eeeeeeee ee eeee eeeee eeeee eeeeeee eeeeee eeeeee ee!"/></li>
        <li><chatComponent name="Gabriel" message="tiene un mensaje pendejo" /></li>
      </ul>
      
    </div>
  </main>
</template>