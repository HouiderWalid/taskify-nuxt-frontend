<script setup lang="ts">
import Pagination from "assets/ts/models/Pagination";
import SelectField from "~/components/io/select/SelectField.vue";
import Button from "~/components/io/Button.vue";

const props = defineProps(['pagination'])
const emit = defineEmits(['page', 'perPage'])
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
const perPageList = [
  {value: 5, text: '5'},
  {value: 15, text: '15'},
  {value: 50, text: '50'},
  //{value: -1, text: 'All'}
]
</script>

<template>
  <div class="flex justify-between items-center">
    <nav aria-label="Page navigation example">
      <ul class="flex items-center gap-2 h-10 text-base">
        <li>
          <Button :disabled="!previousPageEnabled" @click="emit('page', currentPage - 1)" icon="chevron-left"/>
        </li>
        <li v-if="hasFirstPage">
          <Button @click="emit('page', 1)">1</Button>
        </li>
        <li class="px-4 h-10 flex items-center justify-center" v-if="hasPreviousDots">
          ...
        </li>
        <li v-for="page in pagesBeforeCurrent">
          <Button @click="emit('page', page)">{{ page }}</Button>
        </li>
        <li>
          <Button class="bg-primary-800! text-white!">{{ currentPage }}</Button>
        </li>
        <li v-for="page in pagesAfterCurrent">
          <Button @click="emit('page', page)">{{ page }}</Button>
        </li>
        <li class="px-4 h-10 flex items-center justify-center" v-if="hasNextDots">
          ...
        </li>
        <li v-if="hasLastPage">
          <Button @click="emit('page', totalPages)">{{ totalPages }}</Button>
        </li>
        <li>
          <Button :disabled="!nextPageEnabled" @click="emit('page', currentPage + 1)" icon="chevron-right"/>
        </li>
      </ul>
    </nav>
    <SelectField v-model="perPage" :items="perPageList" @change="emit('perPage', perPage)"/>
  </div>
</template>

<style scoped>

</style>