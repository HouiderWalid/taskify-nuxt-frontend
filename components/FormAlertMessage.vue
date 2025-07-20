<script setup lang="ts">
const props = defineProps(['data', 'fullWidth'])

const timeout = computed(() => props.data.timeout)

watch(() => props.data.open, function (newValue) {
  if (!newValue || !timeout.value || timeout.value < 0) {
    return
  }

  setTimeout(() => props.data.open = false, timeout.value)
})
const bgColor = computed(() => props.data.type === 'success' ? 'bg-green-600' : props.data.type === 'error' ? 'bg-red-600' : 'bg-gray-600')
const icon = computed(() => props.data.type === 'success' ? 'check-circle' : props.data.type === 'error' ? 'close-circle' : 'alert-circle')
const message = computed(() => props.data.content)
const absolute = computed(() => props.data.absolute)
</script>

<template>
  <div :class="[{'flex!':props.data.open, 'absolute':absolute, 'max-w-xs':!props.fullWidth}, bgColor]"
       class="hidden bottom-4 mb-4 mx-auto left-1/2 items-center w-full p-4 text-white rounded-lg shadow-sm"
       role="alert" style="z-index: 100">
    <Icon :name="['mdi', icon].join(':')" size="24"/>
    <div class="ms-3 text-sm font-normal">{{ message }}</div>
    <div class="ms-auto" @click="props.data.open = false">
      <Icon name="mdi:close" size="24"/>
    </div>
  </div>
</template>

<style scoped>

</style>