<script setup lang="ts">
import {mdiClose} from "@mdi/js";
import SvgIcon from '@jamescoyle/vue-icon'

const props = defineProps(['id'])
const emit = defineEmits(['close'])
const model = defineModel()

function onContainerClick(e:MouseEvent) {
  if (e.target === e.currentTarget) {
    emit('close')
  }
}

</script>

<template>
  <div :id="props.id" aria-hidden="true" @click="onContainerClick"
       class="hidden overflow-y-auto overflow-x-hidden bg-black/50 fixed justify-center items-center w-full md:inset-0 h-screen"
       :class="{'flex!': model}">
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <div class="relative bg-white rounded-lg shadow-sm">
        <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900">
            <slot name="title"/>
          </h3>
          <svg-icon class="cursor-pointer" type="mdi" :path="mdiClose" @click="emit('close')" :size="24"/>
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