<script setup lang="ts">
	import { onMounted, reactive } from "vue"	
	import { useStore } from '@/store/store'
	import { RouterLink } from "vue-router";
	const storePinia = useStore();

	interface stateContacts{
		list_conctacts: Array<[]>,
	}

	const stateContacts = reactive({
		list_conctacts: []
	})



	onMounted( async()=>{
    const resultado = await storePinia.RequestGetWithToken("contacto/mis-contactos")
		console.group("Mis contactos");
    console.log(resultado)
		console.groupEnd()

		stateContacts.list_conctacts = resultado;
  }) 
</script>
<template>
	<main class="text-center">
		<RouterLink to="solicitudes" class="bg-orange-500 text-white font-bold p-2 rounded-md w-2/5 mb-3">
			solicitudes
		</RouterLink>
		
		<h1 v-if="stateContacts.list_conctacts.length > 1">Hay contactos</h1>
		<h1 v-else class="font-bold text-red-500 text-xl">No hay contactos registrados</h1>
	</main>
</template>