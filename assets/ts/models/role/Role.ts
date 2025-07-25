import JsonMappedModel from "assets/ts/helpers/JsonMappedModel";

export default class Role extends JsonMappedModel {

    static name_attribute_name = 'name'

    #attributes = {
        [Role.name_attribute_name]: null
    }

    constructor(data: any) {
        super();
        this.map(data, this.#attributes)
    }
}