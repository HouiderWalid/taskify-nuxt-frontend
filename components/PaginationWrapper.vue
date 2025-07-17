<script setup lang="ts">
import Pagination from "assets/ts/models/Pagination";

const props = defineProps(['pagination'])
const emit = defineEmits(['page'])
const currentPage = computed(() => props.pagination instanceof Pagination ? props.pagination.getCurrentPage() : 1)
const totalPages = computed(() => props.pagination instanceof Pagination ? props.pagination.getTotalPages() : 1)
const previousPageEnabled = computed(() => Number(currentPage.value) > 1)
const nextPageEnabled = computed(() => Number(currentPage.value) < Number(totalPages.value))
const pagesBeforeCurrent = computed(() => Array.from({length: 3}).map((item, i) => Number(currentPage.value) - (i + 1)).filter(page => page > 1).reverse())
const pagesAfterCurrent = computed(() => Array.from({length: 3}).map((item, i) => Number(currentPage.value) + (i + 1)).filter(page => page < Number(totalPages.value)))
const hasPreviousDots = computed(() => Number(currentPage.value) - 4 > 1)
const hasNextDots = computed(() => Number(currentPage.value) + 4 < Number(totalPages.value))
const hasFirstPage = computed(() => Number(currentPage.value) !== 1 && Number(currentPage.value) > 1)
const hasLastPage = computed(() => Number(currentPage.value) !== Number(totalPages.value) && Number(currentPage.value) < Number(totalPages.value))
const perPage = computed({
  get() {
    return props.pagination instanceof Pagination ? props.pagination.getPerPage() : 5
  },
  set(v: number) {
    if (!(props.pagination instanceof Pagination)) {
      return
    }

    props.pagination.setPerPage(v)
  }
})
</script>

<template>
  <div class="flex justify-between">
    <nav aria-label="Page navigation example">
      <ul class="flex items-center -space-x-px h-10 text-base">
        <li>
          <div
              :class="[previousPageEnabled ? 'hover:bg-gray-100 cursor-pointer hover:text-gray-700 bg-white' : 'bg-gray-200']"
              class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 border border-e-0 border-gray-300 rounded-s-lg ">
            <span class="sr-only">Previous</span>
            <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M5 1 1 5l4 4"/>
            </svg>
          </div>
        </li>
        <li v-if="hasFirstPage">
        <span @click="emit('page', 1)"
              class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
          1
        </span>
        </li>
        <li class="px-4 h-10 flex items-center justify-center bg-white border border-gray-300" v-if="hasPreviousDots">
          ...
        </li>
        <li v-for="page in pagesBeforeCurrent">
        <span @click="emit('page', page)"
              class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
          {{ page }}
        </span>
        </li>
        <li>
        <span aria-current="page"
              class="z-10 flex items-center justify-center px-4 h-10 leading-tight text-primary-600 border border-primary-300 bg-primary-50 hover:bg-primary-100 hover:text-primary-700">
          {{ currentPage }}
        </span>
        </li>
        <li v-for="page in pagesAfterCurrent">
        <span @click="emit('page', page)"
              class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
          {{ page }}
        </span>
        </li>
        <li class="px-4 h-10 flex items-center justify-center bg-white border border-gray-300" v-if="hasNextDots">
          ...
        </li>
        <li v-if="hasLastPage">
        <span @click="emit('page', totalPages)"
              class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
          {{ totalPages }}
        </span>
        </li>
        <li>
          <div
              :class="[nextPageEnabled ? 'hover:bg-gray-100 cursor-pointer hover:text-gray-700 bg-white' : 'bg-gray-200']"
              class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 border border-gray-300 rounded-e-lg ">
            <span class="sr-only">Next</span>
            <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 9 4-4-4-4"/>
            </svg>
          </div>
        </li>
      </ul>
    </nav>
    <select v-model="perPage" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-16 p-2.5">
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="-1">All</option>
    </select>
  </div>
</template>

<style scoped>

</style>