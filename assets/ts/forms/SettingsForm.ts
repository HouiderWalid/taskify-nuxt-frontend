import User from "assets/ts/models/user/User";
import Form from "assets/ts/forms/Form";

export default class SettingsForm extends Form {

    avatar = {
        id: 'settings-avatar',
        modelKey: User.getAvatarAttributeName(),
        fieldTitle: 'settings.form.fields.avatar.title',
        fieldName: 'avatar',
        component: 'ImageUpload',
        content: null,
        messages: [],
        setContent(content: any) {
            this.content = content
        },
        isVisible() {
            return true
        }
    }

    fullName = {
        id: 'settings-full-name',
        modelKey: User.getFullNameAttributeName(),
        fieldTitle: 'settings.form.fields.full_name.title',
        fieldName: 'full_name',
        component: 'TextField',
        placeholder: 'settings.form.fields.full_name.placeholder',
        content: null,
        messages: [],
        setContent(content: any) {
            this.content = content
        },
        isVisible() {
            return true
        }
    }

    email = {
        id: 'settings-email',
        modelKey: User.getEmailAttributeName(),
        fieldTitle: 'settings.form.fields.email.title',
        fieldName: 'email',
        component: 'TextField',
        placeholder: 'settings.form.fields.email.placeholder',
        content: null,
        messages: [],
        setContent(content: any) {
            this.content = content
        },
        isVisible() {
            return true
        }
    }

    oldPassword = {
        id: 'settings-old-password',
        fieldTitle: 'settings.form.fields.old_password.title',
        fieldName: 'old_password',
        component: 'TextField',
        placeholder: 'settings.form.fields.old_password.placeholder',
        content: null,
        messages: [],
        isVisible() {
            return true
        }
    }

    newPassword = {
        id: 'settings-new-password',
        fieldTitle: 'settings.form.fields.new_password.title',
        fieldName: 'new_password',
        component: 'TextField',
        placeholder: 'settings.form.fields.new_password.placeholder',
        content: null,
        messages: [],
        isVisible() {
            return true
        }
    }

    newPasswordConfirmation = {
        id: 'settings-new-password',
        fieldTitle: 'settings.form.fields.new_password_confirmation.title',
        fieldName: 'new_password_confirmation',
        component: 'TextField',
        placeholder: 'settings.form.fields.new_password_confirmation.placeholder',
        content: null,
        messages: [],
        isVisible() {
            return true
        }
    }
}