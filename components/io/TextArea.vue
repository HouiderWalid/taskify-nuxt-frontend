<script setup lang="ts">
import {v4} from 'uuid'

const props = defineProps({
  id: {
    type: String,
    default: v4()
  },
  errorMessages: {
    type: Array,
    default: () => []
  },
  name: {
    type: String,
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
  }
})
const firstMessage = computed(() => props.errorMessages?.[0])
const model = defineModel<string>()
</script>

<template>
  <div>
    <div class="flex flex-col gap-2">
      <label v-if="props.label" :for="id" class="text-black">
        {{ props.label }}
      </label>
      <textarea v-model="model" rows="5" :id="props.id" :placeholder="props.placeholder"
             :class="[{'border-red-400!':firstMessage}]" :name="props.name"
             class="px-3 py-2 outline-0 border border-black text-black placeholder:text-blue/60 focus:ring-primary-500 focus:border-primary-500 focus:outline-1 rounded-lg"/>
    </div>
    <div class="text-red-400 h-5 text-xs mt-0.5"> {{ firstMessage }}</div>
  </div>
</template>

<style scoped>

</style>