<script setup lang="ts">

import Permission from "assets/ts/models/permission/Permission";
import SmallStatCard from "~/components/overview/SmallStatCard.vue";
import ChartCard from "~/components/overview/ChartCard.vue";
import {
  useChartTasksCountApi, useChartTasksDoneCountApi,
  useLast7DaysTasksCountApi,
  useLast7DaysTasksDoneCountApi,
  useProjectsCountApi
} from "assets/ts/apis/OverviewApis";
import Response from "~/assets/ts/models/Response";
import ChartTasksCountCollection from "assets/ts/models/json/overview/ChartTasksCountCollection";

definePageMeta({
  layout: 'dashboard',
  permission: Permission.VIEW_OVERVIEW
})

const projectsCount = reactive({
  loading: true,
  data: 0
})
const last7DaysTasksCount = reactive({
  loading: true,
  data: 0
})
const last7DaysTasksDoneCount = reactive({
  loading: true,
  data: 0
})
const chartTasksCount = reactive({
  loading: true,
  data: new ChartTasksCountCollection()
})
const chartTasksDoneCount = reactive({
  loading: true,
  data: new ChartTasksCountCollection()
})

function getProjectsCount() {
  useSyncFetchData(useProjectsCountApi())
      .onStart(() => projectsCount.loading = true)
      .onSuccess((response: Response) => projectsCount.data = response.getData())
      .onFinished(() => projectsCount.loading = false)
}

function getLast7DaysTasksCount() {
  useSyncFetchData(useLast7DaysTasksCountApi())
      .onStart(() => last7DaysTasksCount.loading = true)
      .onSuccess((response: Response) => last7DaysTasksCount.data = response.getData())
      .onFinished(() => last7DaysTasksCount.loading = false)
}

function getLast7DaysTasksDoneCount() {
  useSyncFetchData(useLast7DaysTasksDoneCountApi())
      .onStart(() => last7DaysTasksDoneCount.loading = true)
      .onSuccess((response: Response) => last7DaysTasksDoneCount.data = response.getData())
      .onFinished(() => last7DaysTasksDoneCount.loading = false)
}

function getChartTasksCount() {
  useSyncFetchData(useChartTasksCountApi())
      .onStart(() => chartTasksCount.loading = true)
      .onSuccess((chartTaskCountCollection: ChartTasksCountCollection) => chartTasksCount.data = chartTaskCountCollection, ChartTasksCountCollection)
      .onFinished(() => chartTasksCount.loading = false)
}

function getChartTasksDoneCount() {
  useSyncFetchData(useChartTasksDoneCountApi())
      .onStart(() => chartTasksDoneCount.loading = true)
      .onSuccess((chartTaskCountCollection: ChartTasksCountCollection) => chartTasksDoneCount.data = chartTaskCountCollection, ChartTasksCountCollection)
      .onFinished(() => chartTasksDoneCount.loading = false)
}

onMounted(() => {
  getProjectsCount()
  getLast7DaysTasksCount()
  getLast7DaysTasksDoneCount()
  getChartTasksCount()
  getChartTasksDoneCount()
})

</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap gap-4">
      <SmallStatCard class="grow basis-[200px]" :text="$t('overview.smallCards.projects.title')"
                     :value="projectsCount.data" :loading="projectsCount.loading"
                     :time="$t('overview.smallCards.projects.time')" icon="mdi:folder"/>
      <SmallStatCard class="grow basis-[200px]" :text="$t('overview.smallCards.tasks.title')"
                     :value="last7DaysTasksCount.data" :loading="last7DaysTasksCount.loading"
                     :time="$t('overview.smallCards.tasks.time')" icon="mdi:note-outline"/>
      <SmallStatCard class="grow basis-[200px]" :text="$t('overview.smallCards.doneTasks.title')"
                     :value="last7DaysTasksDoneCount.data" :loading="last7DaysTasksDoneCount.loading"
                     :time="$t('overview.smallCards.doneTasks.time')" icon="mdi:note-check-outline"/>
    </div>
    <div class="flex gap-4">
      <ChartCard :data="chartTasksCount.data" :loading="chartTasksCount.loading" name="Tasks">
        <template #title>
          {{ $t('overview.charts.tasksCount.title') }}
        </template>
      </ChartCard>
      <ChartCard :data="chartTasksDoneCount.data" :loading="chartTasksDoneCount.loading" name="Tasks Done">
        <template #title>
          {{ $t('overview.charts.tasksDoneCount.title') }}
        </template>
      </ChartCard>
    </div>
  </div>
</template>

<style scoped>

</style>