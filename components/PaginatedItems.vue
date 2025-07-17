<script setup lang="ts">
import Pagination from "assets/ts/models/Pagination";

const props = defineProps(['pagination'])
const items = computed(() => props.pagination instanceof Pagination ? props.pagination.getData() : [])
</script>

<template>
  <div class="flex flex-col gap-8">
    <PaginationWrapper :pagination="props.pagination"/>
    <template v-if="items.length">
      <slot v-for="item in items" :item="item" name="item"/>
    </template>
    <template v-else>
      <slot name="not-found">No Items Found</slot>
    </template>
    <PaginationWrapper :pagination="props.pagination"/>
  </div>
</template>

<style scoped>

</style>