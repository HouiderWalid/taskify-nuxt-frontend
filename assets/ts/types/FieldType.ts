export type Field = {
    fieldName: string
    fieldTitle: string
    component: string
    type?: 'text' | 'password'
    placeholder?: string
    content: any
    messages: string[]
    isVisible: () => boolean
}