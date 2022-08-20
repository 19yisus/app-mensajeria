<script setup lang="ts">
  import { ChatIcon, UsersIcon } from "@heroicons/vue/solid"
	defineProps<{
		name: String,
		message: String
	}>()
</script>

<template>
	<div class="p-2 h-24 max-w-sm mx-auto overflow-hidden text-ellipsis bg-white rounded-xl shadow-lg flex items-center space-x-4">
		<div class="shrink-0">
			<ChatIcon class="h-12 w-12 text-orange-500"/>
		</div>
		<div class="text-ellipsis h-full space-y-3 overflow-hidden">
			<div class="text-xl font-medium text-black mt-2">{{name}}</div>
			<p class="text-slate-500 text-ellipsis">{{message}}</p>
		</div>
	</div>
</template>