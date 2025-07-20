<script setup lang="ts">
import Button from "~/components/io/Button.vue";
import Task from "assets/ts/models/task/Task";
import FormAlertMessage from "~/components/FormAlertMessage.vue";
import Pagination from "assets/ts/models/Pagination";
import {
  useDeleteTaskApi,
  useFilteredTasksApi
} from "assets/ts/apis/TaskApis";
import TaskPagination from "assets/ts/models/task/TaskPagination";
import ConfirmationModal from "~/components/ConfirmationModal.vue";
import PaginatedItems from "~/components/PaginatedItems.vue";
import useSnackManager from "~/composables/useSnackManager";

definePageMeta({
  layout: 'dashboard',
})

const selectedTask = ref()
const isDeleteModalOpen = ref(false)
const isListLoading = ref(true)
const isFormModalOpen = ref()
const deleteLoading = ref(false)
const data = reactive({
  pagination: new Pagination({
    [Pagination.getPerPageAttributeName()]: 5,
    [Pagination.getCurrentPageAttributeName()]: 1,
  })
})
const {snackMessage, setSuccessMessage, setErrorMessage} = useSnackManager()

function deleteTask(deleteConfirmation: boolean) {

  if (!deleteConfirmation) {
    isDeleteModalOpen.value = false
    return;
  }

  const taskId = selectedTask.value instanceof Task ? selectedTask.value.getId() : null
  if (!taskId) {
    return
  }

  useSyncFetchData(useDeleteTaskApi(taskId, {
    per_page: data.pagination.getPerPage(),
    page: data.pagination.getCurrentPage()
  }))
      .onStart(() => deleteLoading.value = true)
      .onSuccess((projectPagination: TaskPagination, message: string) => {
        isDeleteModalOpen.value = false
        setSuccessMessage(message)
        getFilteredTasks(projectPagination)
      }, TaskPagination)
      .onFailure((message: any) => setErrorMessage(message))
      .onFinished(() => deleteLoading.value = false)
}

function getFilteredPerPageTasks(perPage: number) {
  data.pagination.setPerPage(perPage)
  getFilteredTasks()
}

function editTask(project: Task) {
  selectedTask.value = project
  isFormModalOpen.value = true
}

function deleteTaskConfirmation(project: Task) {
  selectedTask.value = project
  isDeleteModalOpen.value = true
}

function createNewTask() {
  selectedTask.value = null
  isFormModalOpen.value = true
}

function getFilteredTasks(taskPagination?: TaskPagination) {
  if (taskPagination) {
    data.pagination = taskPagination
    return
  }

  useSyncFetchData(useFilteredTasksApi({
    per_page: data.pagination.getPerPage(),
    page: data.pagination.getCurrentPage()
  }))
      .onStart(() => isListLoading.value = true)
      .onSuccess((taskPagination: TaskPagination) => {
        data.pagination = taskPagination
      }, TaskPagination)
      .onFinished(() => isListLoading.value = false)
}

onMounted(() => {
  getFilteredTasks()
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <span class="font-bold text-2xl">Tasks</span>
      <Button @click="createNewTask" variant="filled">New Task</Button>
    </div>

    <PaginatedItems :locading="isListLoading" :pagination="data.pagination"
                    @perPage="getFilteredPerPageTasks">
      <template #item="{item}">
        <TaskItem :project="item" @edit="editTask" @delete="deleteTaskConfirmation"/>
      </template>
    </PaginatedItems>

    <TaskFormModal v-model="isFormModalOpen" :task="selectedTask" :pagination="data.pagination"
                   @paginate="getFilteredTasks" @success-snack-message="setSuccessMessage"
                   @cancel="isFormModalOpen = false" @close="isFormModalOpen = false"/>

    <FormAlertMessage :data="snackMessage"/>

    <ConfirmationModal v-model="isDeleteModalOpen" :loading="deleteLoading"
                       @close="isDeleteModalOpen = false" @action="deleteTask">
      <template #title>
        Delete Task
      </template>
      <template #description>
        Are you sure you want to delete this task?
      </template>
    </ConfirmationModal>
  </div>
</template>

<style scoped>

</style>