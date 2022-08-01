<script >
	import minimizer from '@/components/chat_minimizer.vue';

	export default {
		components:{ minimizer },
		data(){
			return {
				datos:[
					{name: "Mauroooooooooooooooooooooooooooooooo", lastHour: "30:00", lastMess: "fasfsad"},
					{name: "Lucas", lastHour: "30:00", lastMess: "hola buenos dias, buenos dias buenios dias, bom dia, buenos dias buenios dias, bom dia"},
					{name: "Maria", lastHour: "30:00", lastMess: "fasfsad"},
					{name: "Daniel", lastHour: "30:00", lastMess: "fasfsad"}
				]
			}
		},
		methods:{
			enterChat(){
				alert("Entrando al chat")
			}
		}
	}
</script>

<template>
	<main class="h-screen w-screen bg-gray-700">
		<header class="container mx-auto w-72 pt-1 grid gap-2 mb-3">
			<div class="mx-2 flex justify-between items-center">
				<h2 class="text-white font-bold">Mensajes</h2>
				<button type="button" class="bg-white font-bold rounded w-6 h-6 text-center"><span class="text-lg"></span></button>
			</div>
			<input type="search" name="" id="" placeholder="Search" class="rounded-xl bg-gray-800 p-1 w-full transition duration-200 outline-none focus:border-2 focus:border-green-500">
		</header>

		<section class="bg-white h-full rounded-t-3xl p-4 space-y-1">
			<minimizer v-for="item in datos" :lastMess="item.lastMess" :nameContact="item.name" :lastMessHour="item.lastHour" :eventCLick="enterChat"/>
		</section>

	</main>
</template>