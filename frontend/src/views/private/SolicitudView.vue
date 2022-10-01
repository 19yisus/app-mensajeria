<script setup lang="ts">
	import { useStore } from "@/store/store";
	import { onMounted, reactive, ref, watch } from "vue";
	import ModalComponentVue from "@/components/ModalComponent.vue";
	// import {
	// 	TransitionRoot,
	// 	TransitionChild,
	// 	Dialog,
	// 	DialogPanel,
	// 	DialogTitle,
	// } from '@headlessui/vue'

	import modal from '@/components/modal.vue'

	const storePinia = useStore();
	const numero = ref(1)
	
	interface stateSolicitud {
		list_solicitudes_enviadas: Array<[]>,
		list_solicitudes_recibidas: Array<[]>,
	}

	const stateSolicitud:stateSolicitud = reactive({
		list_solicitudes_enviadas: [],
		list_solicitudes_recibidas: [],
	})

  const isOpen = ref(true)

  function closeModal() {
    isOpen.value = false
  }

	function openModal(){
		console.log("MODAAAAl")
		isOpen.value = true
	}

	onMounted( async() => await consultaSolicitudes(1) ) 
	watch(numero, async(newNumber:number, oldNumber:number) => await consultaSolicitudes(newNumber))

	const consultaSolicitudes = async (tipo:number)=>{
		if(tipo == 1){
			let resultado = await storePinia.RequestGetWithToken("solicitud/consultar/solicitudes")
			console.group("Solicitudes para mi")
			console.log(resultado)
			console.groupEnd()
			return false;
		}

		let resultado = await storePinia.RequestGetWithToken("solicitud/consultar/mis-solicitudes-enviadas")
		console.group("Solicitudes hechas por mi")
		console.log(resultado)
		console.groupEnd()
	}

	const Modal = () => {
		console.log("HOLAAAA");
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

		<Teleport to="body">
			<ModalComponentVue :isOpen="true" :eventClick="Modal"/>
		</Teleport>


		<!-- <Teleport to="body">
			<modal :show="isOpen" @close="isOpen = false">
				<template #header>
					<h3>custom header</h3>
				</template>
				<template #body>
					<h1>HOla body</h1>
				</template>
			</modal>
		</Teleport> -->



		<!-- <TransitionRoot appear :show="isOpen" as="template">
			<Dialog as="div" @close="closeModal" :open="isOpen" class="relative z-10">
				<TransitionChild
					as="template"
					enter="duration-300 ease-out"
					enter-from="opacity-0"
					enter-to="opacity-100"
					leave="duration-200 ease-in"
					leave-from="opacity-100"
					leave-to="opacity-0"
				>
					<div class="fixed inset-0 bg-black bg-opacity-25" />
				</TransitionChild>

				<div class="fixed inset-0 overflow-y-auto">
					<div
						class="flex min-h-full items-center justify-center p-4 text-center"
					>
						<TransitionChild
							as="template"
							enter="duration-300 ease-out"
							enter-from="opacity-0 scale-95"
							enter-to="opacity-100 scale-100"
							leave="duration-200 ease-in"
							leave-from="opacity-100 scale-100"
							leave-to="opacity-0 scale-95"
						>
							<DialogPanel
								class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
							>
								<DialogTitle
									as="h3"
									class="text-lg font-medium leading-6 text-gray-900"
								>
									Payment successful
								</DialogTitle>
								<div class="mt-2">
									<p class="text-sm text-gray-500">
										Your payment has been successfully submitted. We’ve sent you
										an email with all of the details of your order.
									</p>
								</div>

								<div class="mt-4">
									<button
										type="button"
										class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
										@click="closeModal"
									>
										Got it, thanks!
									</button>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</TransitionRoot> -->
	</main>
</template>