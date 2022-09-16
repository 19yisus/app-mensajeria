<script setup lang="ts">
	import {UserIcon} from "@heroicons/vue/solid"
	// import { useStore } from '../../store/store'
	import {RouterLink} from 'vue-router'
	import { reactive } from 'vue'
	import axios from 'axios'
	import Swal from 'sweetalert2'
	
	interface loginState {
		email: String,
		password: String
	}

	// const tienda = useStore()
	// console.log(useStore)
	

	const state:loginState = reactive({
		email: "",
		password: "",
	});
	
	const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9wZXJzb25hIjo1LCJpZF91c3VhcmlvIjozLCJub21icmUiOiJhbGZyZWRvIiwiYXBlbGxpZG8iOiJtb2xpbmEiLCJuaWNrbmFtZSI6Im1vbGluYWFhIiwiY29ycmVvIjoibW9saW5hQGdtYWlsLmNvbSIsImlhdCI6MTY2MzI1ODgxOH0.0H92ahRXfosfuOkMnWHVaHkH24kevDJndjrQ7RN2iOE"

	const login = () =>{
		axios.post("http:///localhost:8080/api/v1/login/iniciar-sesion", {
			correo: state.email,
			clave: state.password
		}).then( ({data}) =>{
			alerta(data.mensaje_respuesta, data.codigo_respuesta)
			if(data.codigo_respuesta != 200) return false;

		}).catch( (dataError) => alerta(dataError.response.data.mensaje_respuesta, dataError.response.data.codigo_respuesta))
	}

	const alerta = (title, icon) =>{
		const Toast = Swal.mixin({
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			didOpen: (toast) =>{
				toast.addEventListener('mouseenter', Swal.stopTimer)
				toast.addEventListener('mouseleave', Swal.resumeTimer)
			}
		})

		Toast.fire({
			icon: (icon == 200) ? "success" : "error",
			title: title
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
						Login <UserIcon class="w-6 h-6"/>
					</button>
					<div class="w-full p-2">
						<ul class="flex flex-col list-disc list-inside text-blue-400 font-semibold">
							<li>
								<a class="underline" href="#">Recuperación de contraseña</a>
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