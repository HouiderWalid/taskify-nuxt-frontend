<script setup lang="ts">
import {isObjectLike, get} from "lodash-es/lodash";

const props = defineProps(['option', 'optionValueKey', 'optionTextKey'])
const value = computed(() => isObjectLike(props.option) ? get(props.option, props.optionValueKey) : props.option)
const text = computed(() => isObjectLike(props.option) ? get(props.option, props.optionTextKey) : props.option)
</script>

<template>
  <option :value="value">
    {{ text }}
  </option>
</template>

<style scoped>

</style>