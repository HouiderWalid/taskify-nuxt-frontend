<script setup lang="ts">
const props = defineProps(['items', 'label', 'errorMessages', 'itemValueKey', 'itemTextKey'])
const model = defineModel()
import get from 'lodash-es/get'
import { v4 as uuidv4 } from 'uuid'
const id = uuidv4()
</script>

<template>
  <div>
    <div class="flex flex-col gap-2">
      <label :for="id">
        {{ $t(props.label) }}
      </label>
      <select v-model="model"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-16 p-2.5">
        <option v-for="item in props.items" value="5">
          {{ item }}
        </option>
      </select>
    </div>
    <div class="text-red-400 h-5 text-xs mt-0.5"> {{ props.errorMessages }}</div>
  </div>
</template>

<style scoped>

</style>