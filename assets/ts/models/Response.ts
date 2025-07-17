import JsonMapper from "assets/ts/helpers/JsonMapper";

export default class Response extends JsonMapper {

    static code_attribute_name = 'code'
    static data_attribute_name = 'data'
    static messages_attribute_name = 'messages'

    static ATTRIBUTES = {
        [this.code_attribute_name]: null,
        [this.data_attribute_name]: null,
        [this.messages_attribute_name]: null,
    }

    constructor(data: any) {
        super()
        this.map(data, Response.ATTRIBUTES)
    }

    static getDataAttributeName() {
        return Response.data_attribute_name
    }

    getResponseData() {
        return this.getAttribute(Response.getDataAttributeName())
    }

    getVisitId() {
        return this.getResponseData()?.['visit_id'] ?? null
    }

    getPublishableKey() {
        return this.getResponseData()?.['publishable_key'] ?? null
    }
}