<script setup lang="ts">
	import {CheckCircleIcon} from "@heroicons/vue/solid"
	import {RouterLink} from 'vue-router'
	import { reactive } from 'vue'
	import axios from 'axios'
	import Swal from 'sweetalert2'

	interface estate {
		// Datos de la persona
		id_person: Number,
		first_name: String,
		last_name: String,
		nick_name: String,
		// Datos del usuario
		correo: String,
		telefono: Number,
		clave: String,
		confirm: String,
		pregunta_1: String,
		pregunta_2: String,
		respuesta_1: String,
		respuesta_2: String
	}

	const estate:estate = reactive({
		id_person: 0,
		first_name: '',
		last_name: '',
		nick_name: '',
		// Datos del usuario
		correo: "",
		telefono: 0,
		clave: "",
		confirm: "",
		pregunta_1: "",
		pregunta_2: "",
		respuesta_1: "",
		respuesta_2: ""
	});

	const registroPersona = () => {
		axios.post("http:///localhost:8080/api/v1/persona/registrar", {
			nick_name: estate.nick_name, 
			nombre: estate.first_name, 
			apellido: estate.last_name
		}).then( ({data}) => {

			alerta(data.mensaje_respuesta, data.codigo_respuesta)
			if(data.codigo_respuesta != 200) return false;

			estate.id_person = data.datos_respuesta[0].id_persona
			console.log(data)
		}).catch( error => console.error(error))
	}

	const RegistroUsuario = () => {
		axios.post("http:///localhost:8080/api/v1/usuario/registrar", {
			id_persona: estate.id_person,
			correo: estate.correo,
			telefono: estate.telefono,
			clave: estate.clave,
			pregunta_1: estate.pregunta_1,
			pregunta_2: estate.pregunta_2,
			respuesta_1: estate.respuesta_1,
			respuesta_2: estate.respuesta_2
		}).then( ({data}) => {

			alerta(data.mensaje_respuesta, data.codigo_respuesta)
			if(data.codigo_respuesta != 200) return false;

			resetForm();
			console.log(data)
		}).catch( error => console.error(error))
	}

	const resetForm = () => {
		estate.id_person = 0;
		estate.first_name = "";
		estate.last_name = "";
		estate.nick_name = "";
		estate.correo = "";
		estate.telefono = 0;
		estate.clave = "";
		estate.pregunta_1 = "";
		estate.pregunta_2 = "";
		estate.respuesta_1 = "";
		estate.respuesta_2 = "";
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
			<h2 v-if="estate.id_person == 0" class="flex justify-center font-bold text-white text-3xl mt-8 mx-auto">Registro de Personas</h2>
			<h2 v-else class="flex justify-center font-bold text-white text-3xl mt-8 mx-auto">Registro de usuario</h2>
		</header>
		<div class="flex flex-col justify-start items-center space-y-2 md:h-2/6">
			<form v-if="estate.id_person == 0" @submit.prevent="registroPersona" class="bg-gray-100 w-80 md:w-5/6 rounded-lg shadow-lg p-3 space-y-8">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-2 pt-4">
					<input type="text" v-model="estate.first_name" required :class="clasesInput" name="nombre" id="name-form1" placeholder="Nombre de la persona">
					<input type="text" v-model="estate.last_name" required :class="clasesInput" name="apellido" id="lastname-form1" placeholder="Apellido de la persona">
					<input type="text" v-model="estate.nick_name" required :class="clasesInput" class="md:col-span-2" name="nick_name" id="nick-form1" placeholder="Ingrese su nombre de usuario">
				</div>
				<div class="flex items-center flex-wrap justify-center divide-y-2 divide-dashed divide-orange-500 space-y-3">
					<button type="submit" :class="clasesButton">
						Registro <CheckCircleIcon class="w-6 h-6"/>
					</button>
					<div class="w-full p-2">
						<ul class="flex flex-col list-disc list-inside text-blue-400 font-semibold">
							<li>
								<a class="underline" href="#">Recuperación de contraseña</a>
							</li>
							<li>
								<router-link to="login" class="underline">Ir al login</router-link>
							</li>
						</ul>
					</div>
				</div>
			</form>

			<form v-else @submit.prevent="RegistroUsuario" class="bg-gray-100 w-80 md:w-5/6 rounded-lg shadow-lg p-3 space-y-8">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-2 pt-4">
					<input type="text" v-model="estate.first_name" disabled :class="clasesInput" name="nom" id="nom-form2" placeholder="Nombre de la persona">
					<input type="text" v-model="estate.last_name" disabled :class="clasesInput" name="ape" id="ape-form2" placeholder="Apellido de la persona">
					<input type="text" v-model="estate.nick_name" disabled :class="clasesInput" class="md:col-span-2" name="nick" id="nick-form2" placeholder="Ingrese su nombre de usuario">
					<hr class="border-orange-500 divide-y-2 border-2 border-solid md:col-span-2 space-y-3">
					<input type="text" v-model="estate.correo" required :class="clasesInput" name="correo" id="correo-form2" placeholder="Ingrese su correo electronico">
					<input type="tel" v-model="estate.telefono" required :class="clasesInput" name="numero" id="numero-form2" placeholder="Ingrese su numero de telefono">
					<input type="password" v-model="estate.clave" required :class="clasesInput" name="clave" id="clave-form2" placeholder="Ingrese su clave">
					<input type="password" v-model="estate.confirm" required :class="clasesInput" name="confirm" id="confirm-form2" placeholder="Confirme su clave">

					<input type="text" v-model="estate.pregunta_1" required :class="clasesInput" name="pr1" id="pr1-form2" placeholder="Ingrese su pregunta de seguridad 1">
					<input type="text" v-model="estate.respuesta_1" required :class="clasesInput" name="rp1" id="rp1-form2" placeholder="Ingrese su respuesta 1">

					<input type="text" v-model="estate.pregunta_2" required :class="clasesInput" name="pr2" id="pr2-form2" placeholder="Ingrese su pregunta de seguridad 2">
					<input type="text" v-model="estate.respuesta_2" required :class="clasesInput" name="rp2" id="rp2-form2" placeholder="Ingrese su respuesta 2">
				</div>
				<div class="flex items-center flex-wrap justify-center divide-y-2 divide-dashed divide-orange-500 space-y-3">
					<button type="submit" :class="clasesButton">
						Registro <CheckCircleIcon class="w-6 h-6"/>
					</button>
					
				</div>
			</form>

		</div>
	</main>
</template>