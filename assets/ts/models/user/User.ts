import JsonMappedModel from "assets/ts/helpers/JsonMappedModel.js";

export default class User extends JsonMappedModel {

    static full_name_attribute_name = 'full_name'
    static email_attribute_name = 'email'
    static password_attribute_name = 'password'

    #attributes = {
        [User.full_name_attribute_name]: null,
        [User.email_attribute_name]: null,
        [User.password_attribute_name]: null,
    }

    constructor(data: any) {
        super(data);
        this.map(data, this.#attributes)
    }

    static getFullNameAttributeName() {
        return this.full_name_attribute_name
    }

    getFullName() {
        return this.getAttribute(User.getFullNameAttributeName())
    }
}