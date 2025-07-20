export default function useSnackManager() {

    const snackMessage = reactive({
        open: false,
        type: '',
        absolute: true,
        timeout: 5000,
        content: ''
    })

    function setSuccessMessage(message: string) {
        snackMessage.open = true
        snackMessage.type = 'success'
        snackMessage.content = message
    }

    function setErrorMessage(message: string) {
        snackMessage.open = true
        snackMessage.type = 'error'
        snackMessage.content = message
    }

    return {
        snackMessage,
        setSuccessMessage,
        setErrorMessage
    }
}