import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {mockNuxtImport, mountSuspended} from "@nuxt/test-utils/runtime";
import axios from "axios";
import MockAdapter from 'axios-mock-adapter';
import Pagination from "assets/ts/models/Pagination";
import tasks from "~/pages/tasks.vue";
import {flushPromises} from "@vue/test-utils";
import Project from "assets/ts/models/project/Project";
import projects from "~/pages/projects.vue";
import ProjectForm from "assets/ts/forms/ProjectForm";
import TaskForm from "assets/ts/forms/TaskForm";
import Task from "assets/ts/models/task/Task";
import User from "assets/ts/models/user/User";

describe('task page', () => {

    const {navigateToMock} = vi.hoisted(() => ({navigateToMock: vi.fn()}))
    mockNuxtImport('navigateTo', () => navigateToMock)
    const axiosMock: MockAdapter = new MockAdapter(axios);

    afterEach(() => {
        vi.clearAllMocks()
    });

    it('successful task creation', async () => {

        axiosMock.onGet('http://localhost/api/task').reply(200, {
            code: 200,
            data: new Pagination(),
            messages: ''
        });

        axiosMock.onGet('http://localhost/api/task/form/members').reply(200, {
            code: 200,
            data: [],
            messages: ''
        });

        axiosMock.onGet('http://localhost/api/task/form/projects').reply(200, {
            code: 200,
            data: [],
            messages: ''
        });

        const wrapper = await mountSuspended(tasks)

        const createTaskBtn = wrapper.find('#create-task-btn')
        await createTaskBtn.trigger('click')

        const taskFormModal = wrapper.find('#task-form-modal')
        expect(taskFormModal.classes()).contains('flex!')

        axiosMock.onPost('http://localhost/api/task').reply(200, {
            code: 200,
            data: new Pagination(),
            messages: ''
        });

        const taskFormCreateBtn = wrapper.find('#task-form-create-btn')
        await taskFormCreateBtn.trigger('click')
        await flushPromises()

        const taskSnackMessage = await wrapper.find('#task-snack-message')
        expect(taskSnackMessage.classes()).contains('flex!')
        expect(taskFormModal.classes()).not.contains('flex!')

    })

    it('successful task edition', async () => {

        const editedTaskId = 1
        const editedTaskTitle = 'Task 1'
        const editedTaskDescription = 'Task 1 Description'
        const editedTaskDueDate = '2025-09-13T20:35:06'
        const editedTaskProject = 1
        const editedTaskProjectName = 'Project 1'
        const editedTaskUser = 1
        const editedTaskUserFullName = 'Full Name 1'
        const editedTaskPriority = Task.HIGH_PRIORITY
        axiosMock.onGet('http://localhost/api/task').reply(200, {
            code: 200,
            data: new Pagination({
                [Pagination.getDataAttributeName()]: [
                    {
                        [Task.getIdAttributeName()]: editedTaskId,
                        [Task.getProjectAttributeName()]: {
                            [Project.getIdAttributeName()]: editedTaskProject,
                            [Project.getNameAttributeName()]: editedTaskProjectName,
                        },
                        [Task.getAssignedToUserAttributeName()]: {
                            [User.getIdAttributeName()]: editedTaskUser,
                            [User.getFullNameAttributeName()]: editedTaskUserFullName,
                        },
                        [Task.getTitleAttributeName()]: editedTaskTitle,
                        [Task.getDescriptionAttributeName()]: editedTaskDescription,
                        [Task.getDueDateAttributeName()]: editedTaskDueDate,
                        [Task.getPriorityAttributeName()]: editedTaskPriority,
                    }
                ]
            }),
            messages: ''
        });

        const wrapper = await mountSuspended(tasks)
        await flushPromises()

        const taskEditBtn = wrapper.find(['#task-edit-btn', editedTaskId].join('-'))
        await taskEditBtn.trigger('click')

        const taskFormModal = wrapper.find('#task-form-modal')
        expect(taskFormModal.classes()).contains('flex!')

        const taskForm = new TaskForm()
        const taskFormTitleField = wrapper.find('#' + taskForm.title.id)
        const taskFormDescriptionField = wrapper.find('#' + taskForm.description.id)
        const taskFormDueDateField = wrapper.find('#' + taskForm.dueDate.id)
        const taskFormProjectField = wrapper.find('#' + taskForm.project.id + '-selected-text')
        const taskFormMemberField = wrapper.find('#' + taskForm.member.id + '-selected-text')
        const taskFormPriorityField = wrapper.find('#' + taskForm.priority.id + '-' + editedTaskPriority)
        expect((taskFormTitleField.element as HTMLInputElement).value).toBe(editedTaskTitle)
        expect((taskFormDescriptionField.element as HTMLInputElement).value).toBe(editedTaskDescription)
        expect((taskFormDueDateField.element as HTMLInputElement).value).toBe(editedTaskDueDate)
        expect(taskFormProjectField.element.innerHTML).toBe(editedTaskProjectName)
        expect(taskFormMemberField.element.innerHTML).toBe(editedTaskUserFullName)
        expect((taskFormPriorityField.element as HTMLInputElement).checked).toBe(true)

        axiosMock.onPut(['http://localhost/api/task', editedTaskId].join('/')).reply(200, {
            code: 200,
            data: new Pagination(),
            messages: ''
        });

        const taskFormEditBtn = wrapper.find('#task-form-edit-btn')
        await taskFormEditBtn.trigger('click')
        await flushPromises()

        const taskSnackMessage = await wrapper.find('#task-snack-message')
        expect(taskSnackMessage.classes()).contains('flex!')
        expect(taskFormModal.classes()).not.contains('flex!')
    })

    it('successful task deletion', async () => {

        const editedTaskId = 1
        axiosMock.onGet('http://localhost/api/task').reply(200, {
            code: 200,
            data: new Pagination({
                [Pagination.getDataAttributeName()]: [
                    {
                        [Task.getIdAttributeName()]: editedTaskId
                    }
                ]
            }),
            messages: ''
        });

        const wrapper = await mountSuspended(tasks)
        await flushPromises()

        const taskEditBtn = wrapper.find(['#task-delete-btn', editedTaskId].join('-'))
        await taskEditBtn.trigger('click')

        const taskDeleteConfirmation = wrapper.find('#task-delete-confirmation')
        expect(taskDeleteConfirmation.classes()).contains('flex!')

        axiosMock.onDelete(['http://localhost/api/task', editedTaskId].join('/')).reply(200, {
            code: 200,
            data: new Pagination(),
            messages: ''
        });

        const confirmationYesBtn = wrapper.find('#confirmation-modal-yes-btn')
        confirmationYesBtn.trigger('click')
        await flushPromises()

        const taskSnackMessage = await wrapper.find('#task-snack-message')
        expect(taskSnackMessage.classes()).contains('flex!')
        expect(taskDeleteConfirmation.classes()).not.contains('flex!')
    })
})