export const getType = v => Object.prototype.toString.call(v).slice(8, -1)
export const isObject = v => getType(v) === 'Object'
export const isString = v => getType(v) === 'String'
export const isArray = v => getType(v) === 'Array'
export const isFunction = v => ['AsyncFunction', 'Function'].includes(getType(v))

export function getMessagesKeyFirstPartRemoved(messages, stringToRemove) {
    if (!isObject(messages)) return messages

    return Object.fromEntries(Object.entries(messages).map(item =>
        [item[0].replace(new RegExp(`^${stringToRemove}\.?`), ''), item[1]]))
}

function objectStringifier(key, object, fieldContentResolver) {

    if (isObject(object)) {

        if (object.hasOwnProperty('fieldName')) {
            return {
                [object.fieldName]: fieldContentResolver(object)
            }
        }

        return Object.keys(object)
            .filter(subKey => isObject(object[subKey]) && object[subKey].hasOwnProperty('fieldName'))
            .reduce((init, nextKey) => {
                init[object[nextKey].fieldName] = fieldContentResolver(object[nextKey])
                return init
            }, {})
    }

    return object
}

export function apiRequestStringifier(key, object) {
    return objectStringifier(
        key,
        object,
        field => isFunction(field.customContent)
            ? field.customContent()
            : isFunction(field.apiCustomContent)
                ? field.apiCustomContent()
                : Array.isArray(field.content)
                    ? field.content.map(item => item.getId ? item.getId() : item)
                    : field.content?.getId
                        ? field.content.getId()
                        : field.content ?? null
    )
}

function getFormData(formData = {}) {
    let data = []
    if (formData) {
        Object.keys(formData).forEach(key => {
            if (formData[key]?.fieldName !== undefined) {
                if (getType(formData[key]?.content) === 'Object') {
                    data.push({
                        name: formData[key]?.fieldName,
                        value: formData[key]?.content?.Id?.content
                    })
                } else if (Array.isArray(formData[key]?.content)) {
                    data.push({
                        name: formData[key]?.fieldName,
                        value: formData[key]?.content
                    })
                } else {
                    data.push({
                        name: formData[key]?.fieldName,
                        value: formData[key]?.content || formData[key]?.content === 0 ? formData[key]?.content : ''
                    })
                }
            }
        })
    }
    return data
}

export {
    getFormData,
}