import Form from "assets/ts/forms/Form";
import moment from "moment";

export default class ProjectForm extends Form {

    title = {
        fieldTitle: 'project.form.fields.title.title',
        fieldName: 'name',
        component: 'TextField',
        content: null,
        messages: [],
        isVisible() {
            return true
        }
    }

    dueDate = {
        fieldTitle: 'project.form.fields.due_date.title',
        fieldName: 'due_date',
        type: 'datetime-local',
        component: 'DatePicker',
        content: moment(new Date()).format('YYYY-MM-DD HH:mm:ss').toString(),
        messages: [],
        isVisible() {
            return true
        }
    }

    description = {
        fieldTitle: 'project.form.fields.description.title',
        fieldName: 'description',
        component: 'TextArea',
        content: null,
        messages: [],
        isVisible() {
            return true
        }
    }
}