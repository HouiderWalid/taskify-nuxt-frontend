<script setup lang="ts">
import Project from "assets/ts/models/project/Project";
import ProgressBar from "~/components/ProgressBar.vue";

const props = defineProps(['project'])
const name = computed(() => props.project instanceof Project ? props.project.getName() : null)
const description = computed(() => props.project instanceof Project ? props.project.getDescription() : null)
const dueDate = computed(() => props.project instanceof Project ? props.project.getDueDate() : null)
</script>

<template>
  <div class="flex flex-col gap-8 p-4 border bg-white hover:shadow-xl shadow-sm rounded-xl border-gray-200">
    <div class="flex justify-between">
      <div class="flex flex-col gap-4">
        <span class="text-2xl font-bold">{{ name }}</span>
        <span>{{ description }}</span>
      </div>
      <span class="text-gray-600 text-sm">{{dueDate}}</span>
    </div>
    <div class="flex flex-col gap-4">
      <ProgressBar value="45"/>
      <span class="text-gray-600 text-sm">team: 5 members</span>
    </div>
  </div>
</template>

<style scoped>

</style>