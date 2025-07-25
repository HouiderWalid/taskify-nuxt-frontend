<script setup lang="ts">
import Spinner from "~/components/Spinner.vue";

const props = defineProps(['value', 'icon', 'time', 'text', 'loading'])
</script>

<template>
  <div class="flex flex-col gap-8 p-2 border bg-white shadow-sm rounded-xl border-gray-200">
    <div class="flex justify-between text-primary-700">
      <Icon :name="props.icon" size="35"/>
      <div class="flex flex-col items-center">
        <span class="text-xs">{{ text }}</span>
        <span class="text-3xl font-bold">
          <Spinner v-if="props.loading" class="p-2" size="20"></Spinner>
          <span v-else>{{ props.value }}</span>
        </span>
      </div>
    </div>
    <span class="flex gap-2 pt-1 items-center border border-0 border-t-2 border-t-gray-300 text-gray-500">
      <Icon name="mdi:clock-time-eight" size="14"/>
      <span class="text-xs">{{ props.time }}</span>
    </span>
  </div>
</template>

<style scoped>

</style>