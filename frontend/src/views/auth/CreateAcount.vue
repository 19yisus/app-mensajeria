<script setup >
	import {RouterLink} from 'vue-router'
</script>

<template>
	<main class="bg-gray-800 h-screen flex flex-wrap justify-center items-center -space-y-28">
		<div class="w-full bg-red-500">
			<h1 class="text-center p-2 font-bold text-2xl text-white">Create Acount</h1>
		</div>
		<div class="bg-white rounded-lg w-56 md:w-3/5 md:h-96 ">
			<form action="" class="container flex flex-col justify-center p-2 h-full space-y-6 md:space-y-8" autocomplete="off">

				<div class="grid gap-2 grid-cols-1 md:grid-cols-2">
					<input type="text" name="username" id="username" placeholder="First name" class="rounded outline-none border-2 border-gray-400 focus:border-green-500 focus:transition focus:duration-300 p-1 md:p-2 ">
					<!-- ./ Firstname input  -->
					<input type="text" name="username" id="username" placeholder="Last name" class="rounded outline-none border-2 border-gray-400 focus:border-green-500 focus:transition focus:duration-300 p-1 md:p-2 ">
					<!-- ./Lastname input -->
					<input type="email" name="username" id="username" placeholder="Email" class="rounded outline-none border-2 border-gray-400 focus:border-green-500 focus:transition focus:duration-300 p-1 md:p-2 ">
					<!-- ./Email input -->
					<input type="tel" name="username" id="username" placeholder="Cellphone number" class="rounded outline-none border-2 border-gray-400 focus:border-green-500 focus:transition focus:duration-300 p-1 md:p-2 ">
					<!-- ./Cellphone number input -->
					<input type="text" name="username" id="username" placeholder="Username" class="rounded outline-none border-2 border-gray-400 focus:border-green-500 focus:transition focus:duration-300 p-1 md:p-2 ">
					<!-- ./Username input -->
					<input type="password" name="password" id="pass" placeholder="Password" class="rounded outline-none border-2 border-gray-400 focus:border-green-500 focus:transition focus:duration-300 p-1 md:p-2">
					<!-- ./Password input -->
				</div>

				<div class="flex justify-center">
					<button class="bg-green-500 hover:bg-green-600 hover:transition hover:duration-300 active:bg-green-700 rounded p-2 md:text-md font-bold text-white" type="button">Create</button>
				</div>
				<div class="flex flex-wrap justify-between mx-2">
					<RouterLink to="/auth/Login" class="font-bold text-green-500 text-sm md:text-lg hover:underline">Login</RouterLink>
					<RouterLink to="/auth/Reset-pass" class="font-bold text-red-500 text-sm md:text-lg hover:underline">Olvidé mi contraseña</RouterLink>
				</div>
			</form>
		</div>
	</main>
</template>