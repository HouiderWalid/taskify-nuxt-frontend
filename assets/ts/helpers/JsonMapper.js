import JsonArrayMapper from "./JsonArrayMapper";
import JsonMapperModuleResolver from "./JsonMapperModuleResolver";
import {isFunction, isPlainObject} from "lodash-es";

export default class JsonMapper {

    constructor() {

    }

    map(jsonData, attributes = {}) {

        try {
            if (!isPlainObject(attributes) || !isPlainObject(jsonData)) {
                return
            }

            for (let [key, value] of Object.entries(attributes)) {

                if (!jsonData.hasOwnProperty(key)) {
                    continue
                }

                if (isFunction(value)) {

                    let jsonContent = jsonData[key]
                    // this is for when the model is just a regular function to get the actual model
                    if (value === JsonMapperModuleResolver || JsonMapperModuleResolver.isPrototypeOf(value)) {
                        value = value.getResolvedModule(jsonContent)

                        if (!isFunction(value)) {
                            continue
                        }
                    }

                    this[key] = isPlainObject(jsonContent) || Array.isArray(jsonContent)
                        ? JsonMapper.isPrototypeOf(value) || JsonArrayMapper.isPrototypeOf(value)
                            ? new value(jsonContent)
                            : jsonContent
                        : jsonContent
                    continue
                }

                this[key] = jsonData[key]
            }
        } catch (e) {
            console.log('json mapped error', e)
        }


        return this;
    }

    getAttribute(key) {
        return this[key]
    }

    setAttribute(key, value) {
        return this[key] = value
    }
}
