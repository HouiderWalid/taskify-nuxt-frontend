<script setup lang="ts">

import ChartTasksCount from "assets/ts/models/json/overview/ChartTasksCount";

const props = defineProps(['data', 'loading', 'name'])

const categories = computed(() => Array.isArray(props.data) ? props.data.map((chartTaskCount: ChartTasksCount) => chartTaskCount.getMonth()) : [])
const data = computed(() => Array.isArray(props.data) ? props.data.map((chartTaskCount: ChartTasksCount) => chartTaskCount.getTasksCount()) : [])

function getPrimaryColor(variant = '600') {
  // This works in browser environment
  return getComputedStyle(document.documentElement)
      .getPropertyValue(`--color-primary-${variant}`).trim();
}

const options = computed(() => ({
  stroke: {
    curve: 'smooth',
    colors: [getPrimaryColor()]
  },
  chart: {
    toolbar: {
      show: false // This hides the entire toolbar including menu
    }
  },
  xaxis: {
    categories: categories.value
  }
}))

const series = computed(() => ([{
  name: props.name,
  data: data.value
}]))
</script>

<template>
  <div class="pe-2 pt-2 w-full border bg-white shadow-sm rounded-xl border-gray-200">
    <span class="text-xl pt-4 ps-4">
      <slot name="title"/>
    </span>
    <div class="w-full h-[266px] flex justify-center items-center" v-if="loading">
      <Spinner/>
    </div>
    <ApexChart v-else-if="options.xaxis.categories.length" width="100%" style="height: 100%" type="line"
               :options="options" :series="series"/>
  </div>
</template>

<style scoped>

</style>