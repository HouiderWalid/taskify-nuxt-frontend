import {getMessagesKeyFirstPartRemoved, isFunction, isObject} from "assets/ts/helpers/helpers.js";

export default class Form {

    loading = {
        create: false,
        list: false,
        save: false,
        form: false,
        isVisible() {
            return false
        }
    }

    formAlertMessage = {
        open: false,
        type: null,
        absolute: false,
        timeout: -1,
        content: null,
        isVisible() {
            return false
        }
    }

    formSnackMessage = {
        open: false,
        type: null,
        absolute: true,
        timeout: false,
        content: null,
        isVisible() {
            return false
        }
    }

    startFormLoading() {
        this.loading.form = true
        return this
    }

    startCreateLoading() {
        this.loading.create = true
        return this
    }

    endCreateLoading() {
        this.loading.create = false
        return this
    }

    isCreateLoading() {
        return this.loading.create
    }

    endFormLoading() {
        this.loading.form = false
        return this
    }

    isFormLoading() {
        return this.loading.form
    }

    setValidationMessages(messages) {

        if (!messages) {
            return this
        }

        Object.keys(this).forEach(key => {
            if (!isObject(this[key]) || !this[key].hasOwnProperty('content') || !this[key].hasOwnProperty('fieldName')) return

            let fieldName = isFunction(this[key].getValidationFieldName)
                ? this[key].getValidationFieldName()
                : this[key].fieldName

            if (this[key].hasOwnProperty('messages')) {

                this[key].messages = messages[fieldName] ?? []
                messages[fieldName] = []
            }

            if (this[key].content instanceof Form && isFunction(this[key].content.setValidationMessages)) {

                this[key].content.setValidationMessages(getMessagesKeyFirstPartRemoved(messages, fieldName))

            } else if (Array.isArray(this[key].content)) {

                this[key].content.forEach((item, i) => {

                    if (!(item instanceof Form)) return

                    item.setValidationMessages(getMessagesKeyFirstPartRemoved(messages, [fieldName, i].join('.')))

                })

            }
        })

        return this
    }

    emptyValidationMessages() {

        Object.keys(this).forEach(key => {

            if (!isObject(this[key]) || !this[key].hasOwnProperty('content')) {
                return
            }

            if (this[key].content instanceof Form) {
                this[key].content.emptyValidationMessages()
                return;
            }

            if (Array.isArray(this[key].content)) {
                this[key].content.forEach(item => {
                    if (!(item instanceof Form)) {
                        return
                    }

                    item.emptyValidationMessages()
                })
            }

            if (!this[key].hasOwnProperty('messages')) {
                return
            }

            this[key].messages = []
        })

        return this
    }

    populateFields(data, dataMatchingKeyType = 'mk', other = {}) {
        if (!isObject(data)) return this

        Object.keys(this).forEach(fieldKey => {
            //console.log('field before', fieldKey)

            if (
                !isFunction(this[fieldKey].setContent) ||
                !dataMatchingKeyType ||
                (!this[fieldKey].hasOwnProperty('fieldName') && dataMatchingKeyType === 'fn')
            ) return

            //console.log('field after', fieldKey)

            let content = null
            switch (dataMatchingKeyType) {
                case "mk":
                    content = this[fieldKey].hasOwnProperty('modelKey')
                        ? getValueByDotNotation(data, this[fieldKey].modelKey)
                        : data
                    break;
                case "fn":
                    if (!data.hasOwnProperty(this[fieldKey].fieldName)) return;
                    content = data[this[fieldKey].fieldName]
            }

            //console.log('field model key', this[fieldKey].modelKey)
            //console.log('field data', data)
            //console.log('field content', content)
            if (content !== undefined) {
                this[fieldKey].setContent(content, data[fieldKey], dataMatchingKeyType, other)

                if (isFunction(this[fieldKey].events?.OnChange))
                    this[fieldKey].events.OnChange({fireChangeEvent: false})
            }
        })

        return this;
    }

    emptyFormFields() {
        Object.keys(this).forEach(formField => {
            if (!isObject(this[formField]) || !this[formField].hasOwnProperty('content')) {
                return
            }

            if (this[formField].hasOwnProperty('default')) {

                if (isFunction(this[formField].default)) {
                    this[formField].default()
                    return;
                }

                this[formField].content = this[formField].default
                return;
            }

            this[formField].content = null
        })
        return this
    }

    closeSnackMessage() {
        this.formSnackMessage.open = false
        return this
    }

    closeAlertMessage() {
        this.formAlertMessage.open = false
        return this
    }

    setSnackMessage(message, type) {
        this.formSnackMessage.content = message
        this.formSnackMessage.type = type
        this.formSnackMessage.open = true
        this.formSnackMessage.absolute = true
        this.formSnackMessage.timeout = 5000
    }

    setAlertMessage(message, type) {
        this.formAlertMessage.content = message
        this.formAlertMessage.type = type
        this.formAlertMessage.open = true
    }

    setSuccessSnackMessage(message) {
        this.setSnackMessage(message, 'success')
        return this
    }

    setErrorSnackMessage(message) {
        this.setSnackMessage(message, 'error')
        return this
    }

    setSuccessAlertMessage(message) {
        this.setAlertMessage(message, 'success')
        return this
    }

    setErrorAlertMessage(message) {
        this.setAlertMessage(message, 'error')
        return this
    }
}