import JsonMappedModel from "assets/ts/helpers/JsonMappedModel";
import User from "assets/ts/models/user/User";
import Project from "assets/ts/models/project/Project";

export default class Task extends JsonMappedModel {

    static TODO_STATUS = 'todo';
    static IN_PROGRESS_STATUS = 'in_progress';
    static DONE_STATUS = 'done';

    static LOW_PRIORITY = 'low';
    static MEDIUM_PRIORITY = 'medium';
    static HEIGHT_PRIORITY = 'height';

    static assigned_to_user_id_attribute_name = 'assigned_to_user_id';
    static title_attribute_name = 'title';
    static description_attribute_name = 'description';
    static status_attribute_name = 'status';
    static priority_attribute_name = 'priority';
    static due_date_attribute_name = 'due_date';
    static project_attribute_name = 'project';

    #attributes = {
        [Task.assigned_to_user_id_attribute_name]: User,
        [Task.title_attribute_name]: null,
        [Task.description_attribute_name]: null,
        [Task.status_attribute_name]: null,
        [Task.priority_attribute_name]: null,
        [Task.due_date_attribute_name]: null,
        [Task.project_attribute_name]: Project,
    }

    constructor(data: any) {
        super(data);
        this.map(data, this.#attributes)
    }
}