import Form from "assets/ts/forms/Form";
import moment from "moment/moment";
import Task from "assets/ts/models/task/Task";
import Project from "assets/ts/models/project/Project";
import User from "assets/ts/models/user/User";

export default class TaskForm extends Form {

    project = {
        id: 'task-project',
        modelKey: Task.getProjectAttributeName(),
        fieldTitle: 'task.form.fields.project.title',
        fieldName: 'project_id',
        component: 'Autocomplete',
        placeholder: 'task.form.fields.project.placeholder',
        itemTextKey: Project.getNameAttributeName(),
        itemValueKey: Project.getIdAttributeName(),
        loading: false,
        content: null,
        options: [],
        messages: [],
        setContent(content: any) {
            this.content = content
        },
        isVisible() {
            return true
        },
        setOptions(options: any) {
            this.options = options
        },
        startLoading() {
            this.loading = true
            return this
        },
        endLoading() {
            this.loading = false
            return this
        }
    }

    member = {
        id: 'task-member',
        modelKey: Task.getProjectAttributeName(),
        fieldTitle: 'task.form.fields.member.title',
        fieldName: 'member_id',
        component: 'Autocomplete',
        placeholder: 'task.form.fields.member.placeholder',
        itemTextKey: User.getFullNameAttributeName(),
        itemValueKey: User.getIdAttributeName(),
        loading: false,
        content: null,
        options: [],
        messages: [],
        setContent(content: any) {
            this.content = content
        },
        isVisible() {
            return true
        },
        setOptions(options: any) {
            this.options = options
        },
        startLoading() {
            this.loading = true
            return this
        },
        endLoading() {
            this.loading = false
            return this
        }
    }

    title = {
        id: 'task-title',
        modelKey: Task.getTitleAttributeName(),
        fieldTitle: 'task.form.fields.title.title',
        fieldName: 'title',
        component: 'TextField',
        placeholder: 'task.form.fields.title.placeholder',
        content: null,
        messages: [],
        setContent(content: any) {
            this.content = content
        },
        isVisible() {
            return true
        }
    }

    dueDate = {
        id: 'task-due-date',
        modelKey: Task.getDueDateAttributeName(),
        fieldTitle: 'task.form.fields.due_date.title',
        fieldName: 'due_date',
        type: 'datetime-local',
        component: 'DatePicker',
        content: moment(new Date()).format('YYYY-MM-DD HH:mm:ss').toString(),
        messages: [],
        default() {
            this.content = moment(new Date()).format('YYYY-MM-DD HH:mm:ss').toString()
        },
        setContent(content: any) {
            this.content = content
        },
        isVisible() {
            return true
        }
    }

    priority = {
        id: 'task-priority',
        modelKey: Task.getPriorityAttributeName(),
        fieldTitle: 'task.form.fields.priority.title',
        fieldName: 'priority',
        component: 'RadioButton',
        content: Task.LOW_PRIORITY,
        messages: [],
        options: [
            {value: Task.LOW_PRIORITY, text: ['globals.task.priorities', Task.LOW_PRIORITY].join('.')},
            {value: Task.MEDIUM_PRIORITY, text: ['globals.task.priorities', Task.MEDIUM_PRIORITY].join('.')},
            {value: Task.HIGH_PRIORITY, text: ['globals.task.priorities', Task.HIGH_PRIORITY].join('.')}
        ],
        default() {
            this.content = Task.LOW_PRIORITY
        },
        setContent(content: any) {
            this.content = content
        },
        isVisible() {
            return true
        }
    }

    description = {
        id: 'task-description',
        modelKey: Task.getDescriptionAttributeName(),
        fieldTitle: 'task.form.fields.description.title',
        fieldName: 'description',
        component: 'TextArea',
        placeholder: 'task.form.fields.description.placeholder',
        content: null,
        messages: [],
        setContent(content: any) {
            this.content = content
        },
        isVisible() {
            return true
        }
    }
}