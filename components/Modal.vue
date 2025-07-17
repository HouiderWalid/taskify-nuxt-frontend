<script setup lang="ts">
const model = defineModel()
</script>

<template>
  <div id="default-modal" aria-hidden="true" @click.prevent.stop="model=false"
       class="hidden overflow-y-auto overflow-x-hidden bg-black/50 fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen"
       :class="{'flex!': model}">
    <div class="relative p-4 w-full max-w-2xl max-h-full" @click.stop>
      <div class="relative bg-white rounded-lg shadow-sm">
        <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900">
            <slot name="title"/>
          </h3>
          <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
                d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
          </svg>
        </div>
        <div class="p-4 md:p-5">
          <slot/>
        </div>
        <div class="flex items-center justify-end gap-4 p-4 md:p-5 border-t border-gray-200 rounded-b">
          <slot name="action"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>