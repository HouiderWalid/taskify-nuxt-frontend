<script setup lang="ts">
import SelectFieldOption from "~/components/io/select/SelectFieldOption.vue";
import {v4 as uuidv4} from 'uuid'

const id = uuidv4()
const emit = defineEmits(['change'])
const props = defineProps({
  items: {
    type: Array,
  },
  label: {
    type: String,
    default: ''
  },
  errorMessages: {
    type: Array,
    default: () => []
  },
  itemValueKey: {
    type: String,
    default: 'value',
  },
  itemTextKey: {
    type: String,
    default: 'text',
  },
  hideDetails: {
    type: Boolean,
    default: false
  }
})
const firstMessage = computed(() => props.errorMessages?.[0])
const model = defineModel()
</script>

<template>
  <div class="border-0 p-0">
    <div class="flex flex-col gap-2">
      <label v-if="props.label" :for="id">
        {{ $t(props.label) }}
      </label>
      <select v-model="model" @change="emit('change')"
              class="bg-white border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-16 p-2.5">
        <SelectFieldOption v-for="item in props.items" :option="item" :option-value-key="props.itemValueKey"
                           :option-text-key="props.itemTextKey"/>
      </select>
    </div>
    <div v-if="!props.hideDetails" class="text-red-400 h-5 text-xs mt-0.5"> {{ firstMessage }}</div>
  </div>
</template>

<style scoped>

</style>