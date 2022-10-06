<script setup lang="ts">
	import {UserIcon, PlusCircleIcon} from "@heroicons/vue/solid"
	import { useStore } from '../../store/store'
	import {RouterLink,useRouter} from 'vue-router'
	import { reactive } from 'vue'
	import axios from 'axios'
	const storePinia = useStore()
	const router = useRouter();

	interface loginState {
		email: String,
		password: String,
		loading: boolean
	}		

	const state:loginState = reactive({
		email: "",
		password: "",
		loading: false,
	});

	const login = async () =>{
		await axios.post(`${storePinia.baseURL}login/iniciar-sesion`, {
			correo: state.email,
			clave: state.password
		},{
			onUploadProgress(event){ state.loading = true;}
		}).then( ({data}) =>{
			state.loading = false;
			storePinia.alerta(data.mensaje_respuesta, data.codigo_respuesta)
			if(data.codigo_respuesta != 200) return false;
			storePinia.setToken(data.token)
			router.push("/app")
		}).catch( (dataError) =>{
			state.loading = false;
			if(dataError.response.data){
				storePinia.alerta(dataError.response.data.mensaje_respuesta, dataError.response.data.codigo_respuesta)
			}
		})
	}

	const clasesInput = "p-2 bg-gray-300 rounded-md border-2 outline-none focus:border-2 focus:border-orange-400 transition duration-300 ease-in-out"
	const clasesButton = "font-bold flex items-center text-white bg-green-400 hover:bg-green-500 transition duration-300 ease-in-out p-4 text-lg rounded-lg"
</script>

<template>
	<main class="bg-orange-500 h-screen">
		<header class="h-1/6 p-2">
			<h2 class="flex justify-center font-bold text-white text-3xl mt-8 mx-auto">Login</h2>
		</header>
		<div class="flex flex-col justify-start items-center space-y-2 md:h-2/6">
			<form @submit.prevent="login" class="bg-gray-100 w-80 md:w-5/6 rounded-lg shadow-lg p-3 space-y-8">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-2 pt-4">
					<input type="email" v-model="state.email" required :class="clasesInput" name="email" id="email-form1" placeholder="Ingrese su correo">
					<input type="password" v-model="state.password" required :class="clasesInput" name="clave" id="clave-form1" placeholder="Ingrese su clave">
				</div>
				<div class="flex items-center flex-wrap justify-center divide-y-2 divide-dashed divide-orange-500 space-y-3">
					<button type="submit" :class="clasesButton">
						Login 
						<UserIcon v-if="!state.loading" class="w-6 h-6"/>
						<PlusCircleIcon v-else class="animate-spin w-6 h-6"/>
					</button>
					<div class="w-full p-2">
						<ul class="flex flex-col list-disc list-inside text-blue-400 font-semibold">
							<li>
								<RouterLink to="Reset-pass" class="underline">Recuperación de contraseña</RouterLink>
							</li>
							<li>
								<router-link to="Create-acount" class="underline">Crear cuenta</router-link>
							</li>
						</ul>
					</div>
				</div>
			</form>
		</div>
	</main>
</template>