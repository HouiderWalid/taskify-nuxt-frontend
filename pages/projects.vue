<script setup lang="ts">
import Button from "~/components/io/Button.vue";
import ProjectForm from "assets/ts/forms/ProjectForm";
import {useCreateProjectApi, useFilteredProjectsApi} from "assets/ts/requestApis";
import ProjectPagination from "assets/ts/models/project/ProjectPagination";
import FormAlertMessage from "~/components/FormAlertMessage.vue";
import Pagination from "assets/ts/models/Pagination";
import PaginatedItems from "~/components/PaginatedItems.vue";
import ProjectItem from "~/components/projects/ProjectItem.vue";

definePageMeta({
  layout: 'dashboard',
})

const isModalOpen = ref(false)
const projectForm = reactive(new ProjectForm())
const data = reactive({pagination: new Pagination()})
const isListLoading = ref(true)

function createProject() {
  useSyncFetchData(useCreateProjectApi(projectForm))
      .onStart(() => projectForm.closeAlertMessage().emptyValidationMessages().startCreateLoading())
      .onValidationErrors((errors: any) => projectForm.setValidationMessages(errors))
      .onSuccess((projectPagination: ProjectPagination, message: string) => {
        isModalOpen.value = false
        getFilteredProjects(projectPagination)
        projectForm.setSuccessSnackMessage(message);
      }, ProjectPagination)
      .onFailure((message: any) => projectForm.setErrorAlertMessage(message))
      .onFinished(() => projectForm.endCreateLoading())
}

function getFilteredProjects(projectPagination?: ProjectPagination) {
  if (projectPagination) {
    data.pagination = projectPagination
    return
  }

  useSyncFetchData(useFilteredProjectsApi())
      .onStart(() => isListLoading.value = true)
      .onSuccess((projectPagination: ProjectPagination) => {
        data.pagination = projectPagination
      }, ProjectPagination)
      .onFinished(() => isListLoading.value = false)
}

onMounted(() => {
  getFilteredProjects()
})

</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <span class="font-bold text-2xl">Projects</span>
      <Button color="bg-primary-800!" textColor="text-white" @click="isModalOpen=true">New Project</Button>
    </div>
    <div v-if="isListLoading" class="h-48 w-full bg-gray-600 rounded-md animate-pulse"/>
    <PaginatedItems v-else :pagination="data.pagination">
      <template #item="{item}">
        <ProjectItem :project="item"/>
      </template>
    </PaginatedItems>
    <Modal v-model="isModalOpen" title="New Project">
      <template #title>
        {{ $t('project.create.title') }}
      </template>
      <FormAlertMessage :data="projectForm.formAlertMessage"/>
      <FormFieldComponent v-for="field in projectForm" class="w-full" :field="field"/>
      <template #action>
        <Button color="bg-primary-800!" class="w-20" textColor="text-white" :loading="projectForm.isCreateLoading()"
                @click="createProject">Create
        </Button>
        <Button @click="isModalOpen=false">Cancel</Button>
      </template>
    </Modal>
    <FormAlertMessage :data="projectForm.formSnackMessage"/>
  </div>
</template>

<style scoped>

</style>