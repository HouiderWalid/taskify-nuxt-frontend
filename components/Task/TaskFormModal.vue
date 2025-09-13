<script setup lang="ts">

import Button from "~/components/io/Button.vue";
import FormAlertMessage from "~/components/FormAlertMessage.vue";
import Task from "assets/ts/models/task/Task";
import {useCreateTaskApi, useFormMembersApi, useFormProjectsApi, useUpdateTaskApi} from "assets/ts/apis/TaskApis";
import TaskPagination from "assets/ts/models/task/TaskPagination";
import TaskForm from "assets/ts/forms/TaskForm";
import ProjectCollection from "assets/ts/models/project/ProjectCollection";
import UserCollection from "assets/ts/models/user/UserCollection";

const props = defineProps(['task', 'pagination'])
const emit = defineEmits(['close', 'cancel', 'paginate', 'successSnackMessage'])
const modalTitle = computed(() => ['task.dialogs.form.title', props.task instanceof Task ? 'edit' : 'create'].join('.'))
const taskForm = reactive(new TaskForm())
const modal = defineModel()

function createTask() {
  useSyncFetchData(useCreateTaskApi(taskForm, {
    per_page: props.pagination.getPerPage(),
    page: props.pagination.getCurrentPage()
  }))
      .onStart(() => taskForm.closeAlertMessage().emptyValidationMessages().startCreateLoading())
      .onValidationErrors((errors: any) => taskForm.setValidationMessages(errors))
      .onSuccess((taskPagination: TaskPagination, message: string) => {
        modal.value = false
        emit('paginate', taskPagination)
        emit('successSnackMessage', message)
      }, TaskPagination)
      .onFailure((message: any) => taskForm.setErrorAlertMessage(message))
      .onFinished(() => taskForm.endCreateLoading())
}

function updateTask() {
  const taskId = props.task instanceof Task ? props.task.getId() : null
  if (!taskId) {
    return
  }

  useSyncFetchData(useUpdateTaskApi(taskId, taskForm, {
    per_page: props.pagination.getPerPage(),
    page: props.pagination.getCurrentPage()
  }))
      .onStart(() => taskForm.closeAlertMessage().emptyValidationMessages().startSaveLoading())
      .onValidationErrors((errors: any) => taskForm.setValidationMessages(errors))
      .onSuccess((taskPagination: TaskPagination, message: string) => {
        modal.value = false
        emit('paginate', taskPagination)
        emit('successSnackMessage', message)
      }, TaskPagination)
      .onFailure((message: any) => taskForm.setErrorAlertMessage(message))
      .onFinished(() => taskForm.endSaveLoading())
}

function getTaskFormProjects() {
  useSyncFetchData(useFormProjectsApi())
      .onStart(() => taskForm.project.startLoading())
      .onSuccess((projectCollection: ProjectCollection) => taskForm.project.setOptions(projectCollection), ProjectCollection)
      .onFinished(() => taskForm.project.endLoading())
}

function getTaskFormMembers() {
  useSyncFetchData(useFormMembersApi())
      .onStart(() => taskForm.member.startLoading())
      .onSuccess((userCollection: UserCollection) => taskForm.member.setOptions(userCollection), UserCollection)
      .onFinished(() => taskForm.member.endLoading())
}

watch(modal, newValue => {
  if (!newValue) {
    return
  }

  taskForm.emptyValidationMessages().emptyFormFields().closeAlertMessage()
  if (props.task instanceof Task) {
    taskForm.populateFields(props.task)
  }

  getTaskFormProjects()
  getTaskFormMembers()
})

</script>

<template>
  <Modal id="task-form-modal" v-model="modal" @close="emit('close')">
    <template #title>
      {{ $t(modalTitle) }}
    </template>
    <FormAlertMessage :data="taskForm.formAlertMessage" :full-width="true"/>
    <FormFieldComponent v-for="field in taskForm" class="w-full" :field="field"/>
    <template #action>
      <Button id="task-form-create-btn" v-if="!props.task" class="w-20" variant="filled"
              :loading="taskForm.isCreateLoading()" @click="createTask">
        {{ $t('task.dialogs.form.buttons.create') }}
      </Button>
      <Button id="task-form-edit-btn" v-if="props.task" class="w-20" variant="filled"
              :loading="taskForm.isSaveLoading()" @click="updateTask">
        {{ $t('task.dialogs.form.buttons.save') }}
      </Button>
      <Button @click="emit('cancel')">
        {{ $t('task.dialogs.form.buttons.cancel') }}
      </Button>
    </template>
  </Modal>
</template>

<style scoped>

</style>