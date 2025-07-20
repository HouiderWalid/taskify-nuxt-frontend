<script setup lang="ts">
import Pagination from "assets/ts/models/Pagination";

const props = defineProps(['pagination', 'locading'])
const items = computed(() => props.pagination instanceof Pagination ? props.pagination.getData() : [])
</script>

<template>
  <div class="flex flex-col gap-8">
    <PaginationWrapper :pagination="props.pagination" v-bind="$attrs"/>
    <div v-if="props.locading" class="h-56 w-full bg-gray-600 rounded-md animate-pulse"/>
    <template v-else>
      <template v-if="items.length">
        <slot v-for="item in items" :item="item" name="item"/>
      </template>
      <template v-else>
        <slot name="not-found">No Items Found</slot>
      </template>
    </template>
    <PaginationWrapper :pagination="props.pagination" v-bind="$attrs"/>
  </div>
</template>

<style scoped>

</style>