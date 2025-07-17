<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'
import {mdiCheckCircle, mdiClose} from '@mdi/js'

const props = defineProps(['data'])

const timeout = computed(() => props.data.timeout)

watch(() => props.data.open, function (newValue) {
  if (!newValue || !timeout.value || timeout.value < 0) {
    return
  }

  setTimeout(() => props.data.open = false, timeout.value)
})
const bgColor = computed(() => props.data.type === 'success' ? 'bg-green-600' : props.data.type === 'error' ? 'bg-red-600' : 'bg-gray-600')
const message = computed(() => props.data.content)
const absolute = computed(() => props.data.absolute)
</script>

<template>
  <div id="toast-default" :class="[{'flex!':props.data.open, 'absolute':absolute}, bgColor]"
       class="hidden bottom-4 mb-4 mx-auto left-1/2 flex items-center w-full max-w-xs p-4 text-white rounded-lg shadow-sm"
       role="alert" style="z-index: 100">
    <svg-icon type="mdi" :path="mdiCheckCircle" :size="24"/>
    <div class="ms-3 text-sm font-normal">{{ message }}</div>
    <div class="ms-auto" @click="props.data.open = false">
      <svg-icon type="mdi" :path="mdiClose" :size="24"/>
    </div>
  </div>
</template>

<style scoped>

</style>