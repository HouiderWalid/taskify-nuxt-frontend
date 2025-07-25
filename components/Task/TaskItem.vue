<script setup lang="ts">
import Button from "~/components/io/Button.vue";
import ListItem from "~/components/ListItem.vue";
import List from "~/components/List.vue";
import Task from "assets/ts/models/task/Task";
import User from "assets/ts/models/user/User";
import Project from "assets/ts/models/project/Project";

const props = defineProps(['task'])
const emit = defineEmits(['edit', 'delete']);
const name = computed(() => props.task instanceof Task ? props.task.getTitle() : null)
const description = computed(() => props.task instanceof Task ? props.task.getDescription() : null)
const dueDate = computed(() => props.task instanceof Task ? props.task.getDueDate() : null)
const assignedToUser = computed(() => props.task instanceof Task ? props.task.getAssignedToUser() : null)
const assignedToUserFullName = computed(() => assignedToUser.value instanceof User ? assignedToUser.value.getFullName() : null)
const assignedToUserNameLetters = computed(() => String(assignedToUserFullName.value).split(' ').map(name => String(name).charAt(0).toUpperCase()).join(''))
const project = computed(() => props.task instanceof Task ? props.task.getProject() : null)
const projectName = computed(() => project.value instanceof Project ? project.value.getName() : null)
const taskPriority = computed(() => props.task instanceof Task ? props.task.getPriority() : null)
const taskStatus = computed(() => props.task instanceof Task ? props.task.getStatus() : null)
const taskStatusTranslation = computed(() => ['globals.task.statuses', taskStatus.value].join('.'))
const taskPriorityTranslation = computed(() => ['globals.task.priorities', taskPriority.value].join('.'))

const priorityColor = computed(() => {

  switch (taskPriority.value) {
    case Task.LOW_PRIORITY:
      return 'bg-green-500'
    case Task.MEDIUM_PRIORITY:
      return 'bg-yellow-500'
    case Task.HIGH_PRIORITY:
      return 'bg-red-500'
  }
})

const statusColor = computed(() => {

  switch (taskStatus.value) {
    case Task.DONE_STATUS:
      return 'bg-green-500'
    case Task.IN_PROGRESS_STATUS:
      return 'bg-blue-500'
    case Task.TODO_STATUS:
      return 'bg-yellow-500'
  }
})
</script>

<template>
  <div class="flex flex-col gap-8 p-4 border bg-white hover:shadow-xl shadow-sm rounded-xl border-gray-200">
    <div class="flex justify-between">
      <div class="flex flex-col gap-4">
        <div class="flex gap-4 items-center">
          <span class="text-2xl font-bold">{{ name }}</span>
          <Chip :bg-color="statusColor">{{ $t(taskStatusTranslation) }}</Chip>
          <Chip :bg-color="priorityColor">{{ $t(taskPriorityTranslation) }}</Chip>
        </div>
        <span class="text-gray-500">{{ description }}</span>
      </div>
      <Menu>
        <template #activator="props">
          <Button v-bind="props" icon="dots-vertical"/>
        </template>
        <List>
          <ListItem @click="emit('edit', props.task)">{{ $t('task.item.buttons.edit') }}</ListItem>
          <ListItem @click="emit('delete', props.task)">{{ $t('task.item.buttons.delete') }}</ListItem>
        </List>
      </Menu>
    </div>
    <div class="flex text-sm gap-8">
      <div class="flex items-center gap-2">
        <div class="rounded-full flex justify-center text-xs items-center bg-primary-800 text-white h-7 w-7">
          {{ assignedToUserNameLetters }}
        </div>
        <span>{{ assignedToUserFullName }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-gray-500">{{ $t('task.item.project') }}</span>
        <div>{{ projectName }}</div>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-gray-500">{{ $t('task.item.due_date') }}</span>
        <span>{{ dueDate }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>