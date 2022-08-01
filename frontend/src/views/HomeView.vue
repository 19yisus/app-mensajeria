<script setup lang="ts">
import chat from '@/components/chat_minimizer.vue'
</script>

<template>
  <main class="container mx-auto bg-red-500 flex-column justify-center h-screen">
    <div class="grid gap-1">
      <header class="bg-yellow-500 container p-3">
        <h2>Header</h2>
      </header>  

      <section class="bg-blue-500 container p-3 h-screen">
        <p>Section container</p>
        <chat/>
      </section>
    </div>
  </main>
</template>
