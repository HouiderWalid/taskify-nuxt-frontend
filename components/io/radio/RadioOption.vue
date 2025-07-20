<script setup lang="ts">
import {get, isObjectLike} from "lodash-es";

const props = defineProps({
  id: {
    type: String
  },
  option: {},
  itemValueKey: {
    type: String,
    default: 'value'
  },
  itemTextKey: {
    type: String,
    default: 'text'
  }
})
const model = defineModel()
const value = computed(() => isObjectLike(props.option) ? get(props.option, props.itemValueKey) : props.option)
const text = computed(() => isObjectLike(props.option) ? get(props.option, props.itemTextKey) : props.option)
</script>

<template>
  <label class="flex items-center gap-2">
    <input v-model="model" type="radio" :value="value" :name="props.id"
           class="w-4 h-4 text-primary-800 bg-gray-100 border-gray-300 focus:ring-primary-500 focus:ring-2">
    <span>{{ $t(text) }}</span>
  </label>
</template>

<style scoped>

</style>