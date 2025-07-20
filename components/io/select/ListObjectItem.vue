<script setup lang="ts">

import {get, isObjectLike} from "lodash-es";

const props = defineProps(['selected', 'item', 'itemTextKey', 'itemValueKey'])
const itemText = computed(() => isObjectLike(props.item) ? get(props.item, props.itemTextKey) : props.item)
const itemValue = computed(()=> isObjectLike(props.item) ? get(props.item, props.itemValueKey) : props.item)
const selectedValue = computed(()=> isObjectLike(props.selected) ? get(props.selected, props.itemValueKey) : props.selected)
</script>

<template>
  <ListItem :class="{'bg-primary-200': itemValue === selectedValue && (selectedValue || selectedValue === 0)}">
    {{ itemText }}
  </ListItem>
</template>

<style scoped>

</style>