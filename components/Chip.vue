<script setup lang="ts">
const props = defineProps({
  bgColor: {
    type: String,
    default: 'bg-gray-500'
  },
  color: {
    type: String,
    default: 'text-white'
  }
})

</script>

<template>
  <div class="rounded-xl py-1 px-3 text-xs" :class="[props.bgColor, props.color]">
    <slot/>
  </div>
</template>

<style scoped>

</style>