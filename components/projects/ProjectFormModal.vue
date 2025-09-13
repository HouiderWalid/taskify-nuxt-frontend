<script setup lang="ts">

import Button from "~/components/io/Button.vue";
import FormAlertMessage from "~/components/FormAlertMessage.vue";
import ProjectForm from "assets/ts/forms/ProjectForm";
import {useCreateProjectApi, useUpdateProjectApi} from "assets/ts/apis/ProjectApis";
import ProjectPagination from "assets/ts/models/project/ProjectPagination";
import Project from "assets/ts/models/project/Project";

const props = defineProps(['project', 'pagination'])
const emit = defineEmits(['close', 'cancel', 'paginate', 'successSnackMessage'])
const modal = defineModel()
const projectForm = reactive(new ProjectForm())
const modalTitle = computed(() => ['project.dialogs.form.title', props.project instanceof Project ? 'edit' : 'create'].join('.'))

function createProject() {
  useSyncFetchData(useCreateProjectApi(projectForm, {
    per_page: props.pagination.getPerPage(),
    page: props.pagination.getCurrentPage()
  }))
      .onStart(() => projectForm.closeAlertMessage().emptyValidationMessages().startCreateLoading())
      .onValidationErrors((errors: any) => projectForm.setValidationMessages(errors))
      .onSuccess((projectPagination: ProjectPagination, message: string) => {
        modal.value = false
        emit('paginate', projectPagination)
        emit('successSnackMessage', message)
      }, ProjectPagination)
      .onFailure((message: any) => projectForm.setErrorAlertMessage(message))
      .onFinished(() => projectForm.endCreateLoading())
}

function updateProject() {
  const projectId = props.project instanceof Project ? props.project.getId() : null
  if (!projectId) {
    return
  }

  useSyncFetchData(useUpdateProjectApi(projectId, projectForm, {
    per_page: props.pagination.getPerPage(),
    page: props.pagination.getCurrentPage()
  }))
      .onStart(() => projectForm.closeAlertMessage().emptyValidationMessages().startSaveLoading())
      .onValidationErrors((errors: any) => projectForm.setValidationMessages(errors))
      .onSuccess((projectPagination: ProjectPagination, message: string) => {
        modal.value = false
        emit('paginate', projectPagination)
        emit('successSnackMessage', message)
      }, ProjectPagination)
      .onFailure((message: any) => projectForm.setErrorAlertMessage(message))
      .onFinished(() => projectForm.endSaveLoading())
}

watch(modal, newValue => {
  if (!newValue) {
    return
  }

  projectForm.emptyValidationMessages().emptyFormFields().closeAlertMessage()
  if (props.project instanceof Project) {
    projectForm.populateFields(props.project)
  }
})
</script>

<template>
  <Modal id="project-form-modal" v-model="modal" @close="emit('close')">
    <template #title>
      {{ $t(modalTitle) }}
    </template>
    <FormAlertMessage :data="projectForm.formAlertMessage"/>
    <FormFieldComponent v-for="field in projectForm" class="w-full" :field="field"/>
    <template #action>
      <Button id="project-form-create-btn" v-if="!props.project" class="w-20" variant="filled"
              :loading="projectForm.isCreateLoading()" @click="createProject">
        {{ $t('project.dialogs.form.buttons.create') }}
      </Button>
      <Button id="project-form-edit-btn" v-if="props.project" class="w-20" variant="filled"
              :loading="projectForm.isSaveLoading()" @click="updateProject">
        {{ $t('project.dialogs.form.buttons.save') }}
      </Button>
      <Button @close="emit('cancel')">
        {{ $t('project.dialogs.form.buttons.cancel') }}
      </Button>
    </template>
  </Modal>
</template>

<style scoped>

</style>