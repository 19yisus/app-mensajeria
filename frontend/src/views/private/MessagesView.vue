<script setup lang="ts">
  import { useStore } from "@/store/store";
  import ChatComponent from "@/components/ChatComponent.vue"
  import { onMounted } from "@vue/runtime-core";

</script>

<template>
  <ul class="space-y-1">
    <li><ChatComponent name="rodrigo" message="You have a new messageeeeeeee eeeeeeee ee eeee eeeee eeeee eeeeeee eeeeee eeeeee ee!"/></li>
    <li><ChatComponent name="Gabriel" message="tiene un mensaje pendejo" /></li>
  </ul>
</template>