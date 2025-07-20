import Form from "assets/ts/forms/Form.js";

export default class SignInForm extends Form {

    email = {
        id: 'sign-in-email',
        fieldTitle: 'signup.form.fields.email.title',
        fieldName: 'email',
        component: 'TextField',
        theme: 'blurry',
        placeholder: 'Enter your email',
        titleClass: 'text-white',
        content: null,
        messages: [],
        isVisible() {
            return true
        }
    }

    password = {
        id: 'sign-in-password',
        fieldTitle: 'signup.form.fields.password.title',
        fieldName: 'password',
        component: 'TextField',
        theme: 'blurry',
        placeholder: 'Enter your password',
        titleClass: 'text-white',
        type: 'password',
        content: null,
        messages: [],
        isVisible() {
            return true
        }
    }
}