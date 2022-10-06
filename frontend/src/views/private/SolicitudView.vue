<script setup lang="ts">
	import { useStore } from "@/store/store";
	import { onMounted, reactive, ref, watch } from "vue";
	import modal from '@/components/modal.vue'

	const storePinia = useStore();
	const numero = ref(1)
	const isOpen = ref(false)
	
	interface stateSolicitud {
		list_solicitudes_enviadas: Array<[]>,
		list_solicitudes_recibidas: Array<[]>,
		list_personas_busqueda: Array<[{nombre: string}]>,
		nick_name_busqueda: string,
	}

	const stateSolicitud:stateSolicitud = reactive({
		list_solicitudes_enviadas: [],
		list_solicitudes_recibidas: [],
		list_personas_busqueda: [],
		nick_name_busqueda: ""
	})

  const closeModal = ()=> isOpen.value = false;
	const openModal = ()=> isOpen.value = true;

	onMounted( async() => await consultaSolicitudes(1) ) 
	watch(numero, async(newNumber:number, oldNumber:number) => await consultaSolicitudes(newNumber))

	const consultaSolicitudes = async (tipo:number)=>{
		if(tipo == 1){			
			let resultado = await storePinia.RequestGetWithToken("solicitud/consultar/mis-solicitudes-enviadas")
			console.group("Solicitudes hechas por mi")
			console.log(resultado)
			console.groupEnd()
			return false;
		}

		let resultado = await storePinia.RequestGetWithToken("solicitud/consultar/solicitudes")
		console.group("Solicitudes para mi")
		console.log(resultado)
		console.groupEnd()
	}

	const Busqueda = async () => {
		if(stateSolicitud.nick_name_busqueda == "") return false;
		let resultado = await storePinia.RequestGetWithToken(`persona/consultar/${stateSolicitud.nick_name_busqueda}`)
		stateSolicitud.list_personas_busqueda = resultado.datos_respuesta
		console.log(resultado)
	}

	const EnvioSolicitud = async (id: number) => {
		let resultado = await storePinia.RequestPostWithToken("solicitud/enviar-solicitud",{
			id_solicita: id
		})

		console.log(resultado)
	}

</script>
<template>
	<main class="text-center">
		<div class="text-center font-bold flex flex-row justify-between w-1/4 mx-auto">
			<button type="button" @click="numero = 1;" :class="[numero == 1 ? 'text-orange-700 underline' : 'text-orange-400']">Enviadas</button>
			<hr class="border-2 border-orange-600 border-dashed rotate-90 w-11">
			<button type="button" @click="numero = 2;" :class="[numero == 2 ? 'text-orange-700 underline' : 'text-orange-400']">Recibidas</button>
		</div>
		<button type="button" @click="openModal" class="bg-orange-500 hover:bg-orange-600 text-white font-bold p-2 rounded-md w-2/5 mb-3">
			Nueva solicitud
		</button> 
		
		<div class="bg-gray-300 rounded-md text-center">
			<h2 v-if="numero == 1">Solicitudes realizadas</h2>
			<h2 v-else>Solicitudes Recibidas {{isOpen}} </h2>
		</div>

		<modal :show="isOpen" :close="closeModal">
			<h6 class="text-center">Busqueda de usuarios</h6>
			<div class="flex flex-row flex-wrap justify-between">
				<input type="text" name="" v-model="stateSolicitud.nick_name_busqueda" id="" placeholder="Nick name" class="p-1 w-5/6 border-2 outline-none focus:border-orange-600 transition duration-300 ease-in-out rounded-l-md border-orange-500">
				<button type="button" @click="Busqueda" class="w-1/6 border-2 text-white font-bold bg-orange-600 border-orange-500 rounded-r-md">Buscar</button>
			</div>
			<div class="pt-3">
				<ul>
					<li v-for="(item,index) in stateSolicitud.list_personas_busqueda" :key="index" class="flex justify-between bg-orange-600 rounded-md text-white font-bold p-1">
						<div class="font-light">
							<p>Nombre y Apellido: <span class="font-bold underline">{{item.nombre}} {{item.apellido}}</span> </p>
							<p>Nombre de usuario: <span class="font-bold underline">{{item.nick_name}}</span></p>
						</div>
						<button type="button" @click="EnvioSolicitud(item.id_persona)" class="bg-orange-700 hover:bg-orange-800 rounded-md p-1">Invite</button>
					</li>
				</ul>
			</div>
		</modal>
	</main>
	<!-- Datos de los usuarios
		1 - moralesmorales@gmail.com cl: 12345678
		2 - morales02 morales02@gmail.com cl: 12346578
	 -->
</template>