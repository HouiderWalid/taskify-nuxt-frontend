import Form from "assets/ts/forms/Form.js";

export default class SignInForm extends Form {

    email = {
        fieldTitle: 'signup.form.fields.email.title',
        fieldName: 'email',
        component: 'TextField',
        class: 'bg-white/10 border border-white/20 text-white placeholder:text-white/60',
        titleClass: 'text-white',
        content: null,
        messages: [],
        isVisible() {
            return true
        }
    }

    password = {
        fieldTitle: 'signup.form.fields.password.title',
        fieldName: 'password',
        component: 'TextField',
        class: 'bg-white/10 border border-white/20 text-white placeholder:text-white/60',
        titleClass: 'text-white',
        type: 'password',
        content: null,
        messages: [],
        isVisible() {
            return true
        }
    }
}