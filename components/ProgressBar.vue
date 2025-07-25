<script setup lang="ts">
const props = defineProps(['value', 'title'])
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex justify-between">
      <span>{{ props.title }}</span>
      <span>{{ props.value }}%</span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2.5">
      <div class="bg-primary-800 h-2.5 rounded-full" :style="{width: [props.value, '%'].join('')}"></div>
    </div>
  </div>
</template>

<style scoped>

</style>