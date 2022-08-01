<script setup >
	
</script>

<template>
	<main class="bg-gray-800 h-screen flex flex-wrap justify-center items-center -space-y-28">
		<div class="w-full bg-red-500">
			<h1 class="text-center p-2 font-bold text-2xl text-white">Login</h1>
		</div>
		<div class="bg-white rounded-lg w-56 md:w-96 md:h-96 h-72">
			<form action="" class="container p-2 h-full space-y-8 md:space-y-10" autocomplete="off">
				<input type="text" name="username" id="username" placeholder="Username" class="mt-2 rounded outline-none border-b-2 border-black focus:border-green-500 focus:transition focus:duration-300 p-1 w-full">
				<input type="password" name="password" id="pass" placeholder="Password" class="rounded outline-none border-b-2 border-black focus:border-green-500 focus:transition focus:duration-300 p-1 w-full">
				<div class="flex justify-center">
					<button class="bg-green-500 hover:bg-green-400 active:bg-green-600 rounded p-2 font-bold text-white" type="button">Iniciar sesión</button>
				</div>
			</form>
		</div>
	</main>
</template>