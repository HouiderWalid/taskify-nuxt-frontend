<script setup lang="ts">

import RadioOption from "~/components/io/radio/RadioOption.vue";

const props = defineProps({
  id: {
    type: String
  },
  label: {},
  hideDetails: {},
  errorMessages: {
    type: Array<any>,
    default: () => []
  },
  itemValueKey: {
    type: String,
    default: 'value'
  },
  itemTextKey: {
    type: String,
    default: 'text'
  },
  items: {
    type: Array<any>,
    default: () => []
  },
  theme: {},
})

const model = defineModel()
const firstMessage = computed(() => props.errorMessages[0])
const titleStyle = computed(() => {
  switch (props.theme) {
    case 'blurry':
      return 'text-white'
    default:
      return 'text-black'
  }
})
</script>

<template>
  <div class="p-0 border-0">
    <div class="flex flex-col gap-2">
      <div v-if="props.label" :class="titleStyle">
        {{ props.label }}
      </div>
      <div class="flex items-center gap-3">
        <RadioOption :id="props.id" v-model="model" v-for="option in props.items" :option="option" :item-value-key="props.itemValueKey"
                     :item-text-key="itemTextKey"/>
      </div>
    </div>
    <div v-if="!props.hideDetails" class="text-red-400 h-5 text-xs mt-0.5"> {{ firstMessage }}</div>
  </div>
</template>

<style scoped>

</style>