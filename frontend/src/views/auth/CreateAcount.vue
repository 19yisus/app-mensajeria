<script setup lang="ts">
	import {CheckCircleIcon} from "@heroicons/vue/solid"
	import {RouterLink} from 'vue-router'
</script>

<template>
	<main class="bg-orange-500 h-screen overflow-hidden">
		<header class="h-1/6 p-2">
			<h2 class="flex justify-center font-bold text-white text-3xl mt-8 mx-auto">Registro de Personas</h2>
		</header>
		<div class="flex flex-col justify-start items-center space-y-2 h-5/6 md:h-2/6">
			<div class="bg-gray-100 w-80 md:w-5/6 h-2/4 rounded-lg shadow-lg p-3 space-y-8">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-2 pt-4">
					<input type="text" class="p-2 bg-gray-300 rounded-md border-2 outline-none focus:border-2 focus:border-orange-400 transition duration-300 ease-in-out" name="" id="" placeholder="Nombre de la persona">
					<input type="text" class="p-2 bg-gray-300 rounded-md border-2 outline-none focus:border-2 focus:border-orange-400 transition duration-300 ease-in-out" name="" id="" placeholder="Apellido de la persona">
					<input type="text" class="p-2 bg-gray-300 rounded-md border-2 outline-none focus:border-2 focus:border-orange-400 transition duration-300 ease-in-out md:col-span-2" name="" id="" placeholder="Ingrese su nombre de usuario">
				</div>
				<div class="flex items-center flex-wrap justify-center divide-y-2 divide-dashed divide-orange-500 space-y-3">
					<button type="button" class="font-bold flex items-center text-white bg-green-400 hover:bg-green-500 transition duration-300 ease-in-out p-4 text-lg rounded-lg">
						Registro <CheckCircleIcon class="w-6 h-6"/>
					</button>
					<div class="w-full p-2">
						<ul class="flex flex-col list-disc list-inside text-blue-400 font-semibold">
							<li>
								<a class="underline" href="#">Recuperación de contraseña</a>
							</li>
							<li>
								<a class="underline" href="#">Ir al login</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		


		<!-- 
			--- Datos necesarios para el registro de una persona
			- NickName
			- Name 
			- Apellido
		 -->
	</main>
</template>