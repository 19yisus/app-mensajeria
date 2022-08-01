<script setup lang="ts">
	defineProps<{
		image: String,
		lastMess: String,
		nameContact: String,
		lastMessHour: String,
		eventCLick: void,
	}>()
</script>

<template>
	<main class="flex-column bg-gray-400 p-1 rounded-lg">
		<div class="" @click="eventCLick">
			<div class="flex items-center justify-between">
				<div class="flex items-center overflow-hidden">
					<img src="@/assets/logo.svg" alt="" class="rounded-xl" width="30">
					<label class="overflow-hidden text-ellipsis" for="">{{nameContact}} </label>
				</div>
				<label class="font-semibold text-sm" for=""> |{{lastMessHour}}</label>
			</div>	
		</div>
		<div class="h-8 overflow-scroll">
			<p class="overflow-hidden text-ellipsis">{{lastMess}}</p>
		</div>
	</main>
</template>