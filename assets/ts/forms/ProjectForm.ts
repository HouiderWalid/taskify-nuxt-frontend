import Form from "assets/ts/forms/Form";
import moment from "moment";
import Project from "assets/ts/models/project/Project";

export default class ProjectForm extends Form {

    title = {
        id: 'project-title',
        modelKey: Project.getNameAttributeName(),
        fieldTitle: 'project.dialogs.form.fields.title.title',
        fieldName: 'name',
        component: 'TextField',
        placeholder: 'project.dialogs.form.fields.title.placeholder',
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
        id: 'project-due-date',
        modelKey: Project.getDueDateAttributeName(),
        fieldTitle: 'project.dialogs.form.fields.due_date.title',
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

    description = {
        id: 'project-description',
        modelKey: Project.getDescriptionAttributeName(),
        fieldTitle: 'project.dialogs.form.fields.description.title',
        fieldName: 'description',
        component: 'TextArea',
        placeholder: 'project.dialogs.form.fields.description.placeholder',
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