import Form from "assets/ts/forms/Form";
import moment from "moment";
import Project from "assets/ts/models/project/Project";

export default class ProjectForm extends Form {

    title = {
        id: 'project-title',
        modelKey: Project.getNameAttributeName(),
        fieldTitle: 'project.form.fields.title.title',
        fieldName: 'name',
        component: 'TextField',
        placeholder: 'Enter the project title',
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
        fieldTitle: 'project.form.fields.due_date.title',
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
        fieldTitle: 'project.form.fields.description.title',
        fieldName: 'description',
        component: 'TextArea',
        placeholder: 'Describe your project',
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