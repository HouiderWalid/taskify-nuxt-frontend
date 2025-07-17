import Form from "assets/ts/forms/Form";

export default class SignUpForm extends Form {

    fullName = {
        id: 'sign-up-full-name',
        fieldTitle: 'signup.form.fields.full_name.title',
        fieldName: 'full_name',
        component: 'TextField',
        content: null,
        messages: [],
        isVisible() {
            return true
        }
    }

    email = {
        id:'sign-up-email',
        fieldTitle: 'signup.form.fields.email.title',
        fieldName: 'email',
        component: 'TextField',
        content: null,
        messages: [],
        isVisible() {
            return true
        }
    }

    password = {
        id:'sign-up-password',
        fieldTitle: 'signup.form.fields.password.title',
        fieldName: 'password',
        component: 'TextField',
        type: 'password',
        content: null,
        messages: [],
        isVisible() {
            return true
        }
    }

    passwordConfirmation = {
        id:'sign-up-password_confirmation',
        fieldTitle: 'signup.form.fields.password_confirmation.title',
        fieldName: 'password_confirmation',
        component: 'TextField',
        type: 'password',
        content: null,
        messages: [],
        isVisible() {
            return true
        }
    }
}