import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {mockNuxtImport, mountSuspended} from "@nuxt/test-utils/runtime";
import projects from "~/pages/projects.vue";
import axios from "axios";
import MockAdapter from 'axios-mock-adapter';
import Pagination from "assets/ts/models/Pagination";
import {flushPromises} from "@vue/test-utils";
import Project from "assets/ts/models/project/Project";
import ProjectForm from "assets/ts/forms/ProjectForm";

describe('project page', () => {

    const {navigateToMock} = vi.hoisted(() => ({navigateToMock: vi.fn()}))
    mockNuxtImport('navigateTo', () => navigateToMock)
    const axiosMock: MockAdapter = new MockAdapter(axios);

    afterEach(() => {
        vi.clearAllMocks()
    });

    it('successful project creation', async () => {

        axiosMock.onGet('http://localhost/api/project').reply(200, {
            code: 200,
            data: new Pagination(),
            messages: ''
        });

        const wrapper = await mountSuspended(projects)

        const createProjectBtn = wrapper.find('#create-project-btn')
        await createProjectBtn.trigger('click')

        const projectFormModal = wrapper.find('#project-form-modal')
        expect(projectFormModal.classes()).contains('flex!')

        axiosMock.onPost('http://localhost/api/project').reply(200, {
            code: 200,
            data: new Pagination(),
            messages: ''
        });

        const projectFormCreateBtn = wrapper.find('#project-form-create-btn')
        await projectFormCreateBtn.trigger('click')
        await flushPromises()

        const projectSnackMessage = await wrapper.find('#project-snack-message')
        expect(projectSnackMessage.classes()).contains('flex!')
        expect(projectFormModal.classes()).not.contains('flex!')
    });

    it('successful project edition', async () => {

        const editedProjectId = 1
        const editedProjectName = 'Project 1'
        const editedProjectDescription = 'Project 1 Description'
        const editedProjectDueDate = '2025-09-13T20:35:06'
        axiosMock.onGet('http://localhost/api/project').reply(200, {
            code: 200,
            data: new Pagination({
                [Pagination.getDataAttributeName()]: [
                    {
                        [Project.getIdAttributeName()]: editedProjectId,
                        [Project.getNameAttributeName()]: editedProjectName,
                        [Project.getDescriptionAttributeName()]: editedProjectDescription,
                        [Project.getDueDateAttributeName()]: editedProjectDueDate,
                    }
                ]
            }),
            messages: ''
        });

        const wrapper = await mountSuspended(projects)
        await flushPromises()

        const projectEditBtn = wrapper.find(['#project-edit-btn', editedProjectId].join('-'))
        await projectEditBtn.trigger('click')

        const projectFormModal = wrapper.find('#project-form-modal')
        expect(projectFormModal.classes()).contains('flex!')

        const projectForm = new ProjectForm()
        const projectFormTitleField = wrapper.find('#' + projectForm.title.id)
        const projectFormDescriptionField = wrapper.find('#' + projectForm.description.id)
        const projectFormDueDateField = wrapper.find('#' + projectForm.dueDate.id)
        expect((projectFormTitleField.element as HTMLInputElement).value).toBe(editedProjectName)
        expect((projectFormDescriptionField.element as HTMLInputElement).value).toBe(editedProjectDescription)
        expect((projectFormDueDateField.element as HTMLInputElement).value).toBe(editedProjectDueDate)

        axiosMock.onPut(['http://localhost/api/project', editedProjectId].join('/')).reply(200, {
            code: 200,
            data: new Pagination(),
            messages: ''
        });

        const projectFormEditBtn = wrapper.find('#project-form-edit-btn')
        await projectFormEditBtn.trigger('click')
        await flushPromises()

        const projectSnackMessage = await wrapper.find('#project-snack-message')
        expect(projectSnackMessage.classes()).contains('flex!')
        expect(projectFormModal.classes()).not.contains('flex!')
    })

    it('successful project deletion', async () => {

        const editedProjectId = 1
        axiosMock.onGet('http://localhost/api/project').reply(200, {
            code: 200,
            data: new Pagination({
                [Pagination.getDataAttributeName()]: [
                    {
                        [Project.getIdAttributeName()]: editedProjectId
                    }
                ]
            }),
            messages: ''
        });

        const wrapper = await mountSuspended(projects)
        await flushPromises()

        const projectEditBtn = wrapper.find(['#project-delete-btn', editedProjectId].join('-'))
        await projectEditBtn.trigger('click')

        const projectDeleteConfirmation = wrapper.find('#project-delete-confirmation')
        expect(projectDeleteConfirmation.classes()).contains('flex!')

        axiosMock.onDelete(['http://localhost/api/project', editedProjectId].join('/')).reply(200, {
            code: 200,
            data: new Pagination(),
            messages: ''
        });

        const confirmationYesBtn = wrapper.find('#confirmation-modal-yes-btn')
        confirmationYesBtn.trigger('click')
        await flushPromises()

        const projectSnackMessage = await wrapper.find('#project-snack-message')
        expect(projectSnackMessage.classes()).contains('flex!')
        expect(projectDeleteConfirmation.classes()).not.contains('flex!')
    })
})