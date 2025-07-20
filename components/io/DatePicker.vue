<script setup lang="ts">
import {v4} from "uuid";

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
  labelClasses: {
    type: String,
    default: 'text-black'
  },
  inputClasses: {
    type: String,
    default: 'border-black text-black placeholder:text-blue/60'
  }
})
const firstMessage = computed(() => props.errorMessages?.[0])
const model = defineModel()
</script>

<template>
  <div>
    <div class="flex flex-col gap-2">
      <label v-if="props.label" :for="props.id" :class="props.labelClasses">
        {{ props.label }}
      </label>
      <div class="flex gap-2">
        <input v-model="model" :id="props.id" :type="props.type"
               :class="[{'border-red-400!':firstMessage}, props.inputClasses]" :name="props.name"
               class="px-3 py-2 outline-0 border focus:ring-primary-500 focus:border-primary-500 focus:outline-1 rounded-lg"/>
      </div>
    </div>
    <div class="text-red-400 h-5 text-xs mt-0.5"> {{ firstMessage }}</div>
  </div>
</template>

<style scoped>

</style>