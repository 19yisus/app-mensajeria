<script setup lang="ts">
  defineProps<{
    isOpen: boolean,
    eventClick: void | any,
  }>()

  import { Dialog, DialogTitle, DialogPanel, DialogDescription } from '@headlessui/vue';
</script>

<template>
  <Transition>
   <Dialog :open="isOpen" @close="eventClick">
      <DialogPanel>
        <DialogTitle>Deactivate account</DialogTitle>
        <DialogDescription>
          This will permanently deactivate your account
        </DialogDescription>

        <p>
          Are you sure you want to deactivate your account? All of your data will be
          permanently removed. This action cannot be undone.
        </p>

        <button @click="eventClick">Deactivate</button>
        <button @click="eventClick">Cancel</button>
      </DialogPanel>
    </Dialog>
  </Transition>
</template>