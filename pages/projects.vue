<script setup lang="ts">
import Button from "~/components/io/Button.vue";
import {
  useDeleteProjectApi,
  useFilteredProjectsApi,
} from "assets/ts/apis/ProjectApis";
import ProjectPagination from "assets/ts/models/project/ProjectPagination";
import FormAlertMessage from "~/components/FormAlertMessage.vue";
import Pagination from "assets/ts/models/Pagination";
import PaginatedItems from "~/components/PaginatedItems.vue";
import ProjectItem from "~/components/projects/ProjectItem.vue";
import Project from "assets/ts/models/project/Project";
import ConfirmationModal from "~/components/ConfirmationModal.vue";
import ProjectFormModal from "~/components/projects/ProjectFormModal.vue";
import useSnackManager from "~/composables/useSnackManager";

definePageMeta({
  layout: 'dashboard',
})

const isFormModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const data = reactive({
  pagination: new Pagination({
    [Pagination.getPerPageAttributeName()]: 5,
    [Pagination.getCurrentPageAttributeName()]: 1,
  })
})
const isListLoading = ref(true)
const deleteLoading = ref(false)
const selectedProject = ref()
const {snackMessage, setSuccessMessage, setErrorMessage} = useSnackManager()

function deleteProject(deleteConfirmation: boolean) {

  if (!deleteConfirmation) {
    isDeleteModalOpen.value = false
    return;
  }

  const projectId = selectedProject.value instanceof Project ? selectedProject.value.getId() : null
  if (!projectId) {
    return
  }

  useSyncFetchData(useDeleteProjectApi(projectId, {
    per_page: data.pagination.getPerPage(),
    page: data.pagination.getCurrentPage()
  }))
      .onStart(() => deleteLoading.value = true)
      .onSuccess((projectPagination: ProjectPagination, message: string) => {
        isDeleteModalOpen.value = false
        getFilteredProjects(projectPagination)
        setSuccessMessage(message)
      }, ProjectPagination)
      .onFailure((message: any) => setErrorMessage(message))
      .onFinished(() => deleteLoading.value = false)
}

function editProject(project: Project) {
  selectedProject.value = project
  isFormModalOpen.value = true
}

function deleteProjectConfirmation(project: Project) {
  selectedProject.value = project
  isDeleteModalOpen.value = true
}

function createNewProject() {
  selectedProject.value = null
  isFormModalOpen.value = true
}

function getFilteredPerPageProjects(perPage: number) {
  data.pagination.setPerPage(perPage)
  getFilteredProjects()
}

function getFilteredProjects(projectPagination?: ProjectPagination) {
  if (projectPagination) {
    data.pagination = projectPagination
    return
  }

  useSyncFetchData(useFilteredProjectsApi({
    per_page: data.pagination.getPerPage(),
    page: data.pagination.getCurrentPage()
  }))
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
      <Button @click="createNewProject" variant="filled">New Project</Button>
    </div>

    <PaginatedItems :locading="isListLoading" :pagination="data.pagination"
                    @perPage="getFilteredPerPageProjects">
      <template #item="{item}">
        <ProjectItem :project="item" @edit="editProject" @delete="deleteProjectConfirmation"/>
      </template>
    </PaginatedItems>

    <ProjectFormModal v-model="isFormModalOpen" :project="selectedProject" :pagination="data.pagination"
                   @paginate="getFilteredProjects" @success-snack-message="setSuccessMessage"
                   @cancel="isFormModalOpen = false" @close="isFormModalOpen = false"/>

    <ConfirmationModal v-model="isDeleteModalOpen" :loading="deleteLoading"
                       @close="isDeleteModalOpen = false" @action="deleteProject">
      <template #title>
        Delete Project
      </template>
      <template #description>
        Are you sure you want to delete this project?
      </template>
    </ConfirmationModal>
    <FormAlertMessage :data="snackMessage"/>
  </div>
</template>

<style scoped>

</style>