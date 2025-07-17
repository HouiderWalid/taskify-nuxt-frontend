import JsonMapper from "./JsonMapper";

export default class JsonMappedModel extends JsonMapper {

    static id_attribute_name = 'id'

    #attributes = {
        [JsonMappedModel.id_attribute_name]: null
    }

    constructor(data) {
        super();
        this.map(data, this.#attributes)
    }

    static getIdAttributeName() {
        return this.id_attribute_name
    }

    getId() {
        return this.getAttribute(this.constructor.getIdAttributeName())
    }
}