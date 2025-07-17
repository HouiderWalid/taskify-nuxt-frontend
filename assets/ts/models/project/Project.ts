import JsonMappedModel from "assets/ts/helpers/JsonMappedModel";

export default class Project extends JsonMappedModel {

    static name_attribute_name = 'name'
    static description_attribute_name = 'description'
    static due_date_attribute_name = 'due_date'
    static tasks_attribute_name = 'tasks'

    #attributes = {
        [Project.name_attribute_name]: null,
        [Project.description_attribute_name]: null,
        [Project.due_date_attribute_name]: null
    }

    constructor(data: any) {
        super(data);
        this.map(data, this.#attributes)
    }

    static getNameAttributeName() {
        return this.name_attribute_name
    }

    static getDescriptionAttributeName() {
        return this.description_attribute_name
    }

    static getDueDateAttributeName() {
        return this.due_date_attribute_name
    }

    getName() {
        return this.getAttribute(Project.getNameAttributeName())
    }

    getDescription() {
        return this.getAttribute(Project.getDescriptionAttributeName())
    }

    getDueDate() {
        return this.getAttribute(Project.getDueDateAttributeName())
    }
}