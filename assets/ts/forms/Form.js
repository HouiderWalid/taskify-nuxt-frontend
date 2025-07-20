import {getMessagesKeyFirstPartRemoved, isFunction, isObject} from "assets/ts/helpers/helpers.js";
import {get} from "lodash-es";

export default class Form {

    loading = {
        create: false,
        list: false,
        save: false,
        delete: false,
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
        form: false,
        content: null,
        isVisible() {
            return false
        }
    }

    startFormLoading() {
        this.loading.form = true
        return this
    }

    endFormLoading() {
        this.loading.form = false
        return this
    }

    isFormLoading(){
        return this.loading.form
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

    startSaveLoading() {
        this.loading.save = true
        return this
    }

    endSaveLoading() {
        this.loading.save = false
        return this
    }

    isSaveLoading() {
        return this.loading.save
    }

    startDeleteLoading() {
        this.loading.delete = true
        return this
    }

    endDeleteLoading() {
        this.loading.delete = false
        return this
    }

    isDeleteLoading() {
        return this.loading.delete
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

            if (
                !isFunction(this[fieldKey].setContent) ||
                !dataMatchingKeyType ||
                (!this[fieldKey].hasOwnProperty('fieldName') && dataMatchingKeyType === 'fn')
            ) return

            let content = null
            switch (dataMatchingKeyType) {
                case "mk":
                    content = this[fieldKey].hasOwnProperty('modelKey')
                        ? get(data, this[fieldKey].modelKey)
                        : data
                    break;
                case "fn":
                    if (!data.hasOwnProperty(this[fieldKey].fieldName)) return;
                    content = data[this[fieldKey].fieldName]
            }

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

    closeSnackMessage() {
        this.formSnackMessage.open = false
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

    closeAlertMessage(){
        this.formAlertMessage.open = false
        return this
    }
}