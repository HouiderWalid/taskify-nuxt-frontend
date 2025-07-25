<script setup lang="ts">
import Project from "assets/ts/models/project/Project";
import ProgressBar from "~/components/ProgressBar.vue";
import Button from "~/components/io/Button.vue";
import ListItem from "~/components/ListItem.vue";
import List from "~/components/List.vue";

const props = defineProps(['project'])
const emit = defineEmits(['edit', 'delete']);
const name = computed(() => props.project instanceof Project ? props.project.getName() : null)
const description = computed(() => props.project instanceof Project ? props.project.getDescription() : null)
const dueDate = computed(() => props.project instanceof Project ? props.project.getDueDate() : null)
const tasksCount = computed(() => props.project.getTasksCount())
const tasksDoneCount = computed(() => props.project.getTasksDoneCount())
const progress = computed(() => Number(props.project instanceof Project ? tasksCount.value > 0 ? tasksDoneCount.value * 100 / tasksCount.value : 100 : 100).toFixed(2))
const teamMembers = computed(() => props.project instanceof Project ? props.project.getTasksAssignedMembersCount() : 0)
</script>

<template>
  <div class="flex flex-col gap-8 p-4 border bg-white hover:shadow-xl shadow-sm rounded-xl border-gray-200">
    <div class="flex justify-between">
      <div class="flex flex-col gap-4">
        <div class="flex gap-2 items-center">
          <span class="text-2xl font-bold">{{ name }}</span>
        </div>
        <span class="text-gray-500">{{ description }}</span>
      </div>
      <Menu>
        <template #activator="props">
          <Button v-bind="props" icon="dots-vertical"/>
        </template>
        <List>
          <ListItem @click="emit('edit', project)">{{ $t('project.item.buttons.edit') }}</ListItem>
          <ListItem @click="emit('delete', project)">{{ $t('project.item.buttons.delete') }}</ListItem>
        </List>
      </Menu>
    </div>
    <div class="flex flex-col gap-4">
      <ProgressBar :value="progress" :title="$t('project.item.progress')"/>
      <div class="flex text-sm gap-8">
        <div class="flex gap-2">
          <span class="text-gray-500">{{ $t('project.item.team') }}</span>
          <span>{{ teamMembers }}</span>
        </div>
        <div class="flex gap-2">
          <span class="text-gray-600">{{ $t('project.item.due_date') }}</span>
          <span>{{ dueDate }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>