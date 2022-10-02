<script setup lang="ts">
  defineProps<{
		show: boolean,
		close: any
	}>()
</script>
<template>
  <teleport to="body">
    <transition
      enter-active-class="transition ease-out duration-300 transform"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-300 transform"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-show="show" ref="modal-backdrop"
        class="fixed z-10 transition-opacity inset-0 overflow-y-auto bg-black bg-opacity-50"
      >
        <div class="flex items-start justify-center min-h-screen pt-24 text-center">
          <transition
            enter-active-class="transition ease-out duration-300 transform"
            enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to-class="opacity-100 translate-y-0 sm:scale-100"
            leave-active-class="transition ease-in duration-300 transform"
            leave-from-class="opacity-100 translate-y-0 sm:scale-100"
            leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
          
            <div
              class="bg-white rounded-lg transform transition-all text-left overflow-hidden shadow-xl p-8 w-1/2"
              role="dialog"
              ref="modal"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <button type="button" @click="close" class="absolute top-2 right-4">
                cerrar
              </button>
              <slot></slot>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </teleport>
</template>