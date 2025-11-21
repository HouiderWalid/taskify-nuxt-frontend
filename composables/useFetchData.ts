import JsonMapper from "assets/ts/helpers/JsonMapper";
import axios, {AxiosHeaders, type AxiosResponse, type RawAxiosRequestHeaders} from "axios";
import Response from "assets/ts/models/Response";
import {useAuthenticationStore} from "~/stores/authenticationStore";
import {apiRequestStringifier, getFormData, isObject} from "assets/ts/helpers/helpers";

export type ApiData = {
    data?: JsonObject,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    uri: string,
    query?: object,
    baseURL?: string,
    model?: any,
    contentType?: string
}

type JsonObject = {
    [key: string]: any
}

export function useSyncFetchData<ResponseType extends typeof JsonMapper>(
    {
        data = {},
        method = 'GET',
        uri,
        query = {},
        baseURL = import.meta.env.VITE_API_BASE_URL,
        contentType = 'application/json',
    }: ApiData
): CustomRequestBody<ResponseType> {
    const endPoint = [baseURL, uri].join('')

    let bodyData = null
    let headers: RawAxiosRequestHeaders | AxiosHeaders = {}
    if (contentType === 'multipart/form-data') {
        headers['content-type'] = 'multipart/form-data'
        const form_data = new FormData();
        if (!Array.isArray(data) && isObject(data)) data = getFormData(data)
        if (Array.isArray(data)) {
            data.forEach(field => {
                Array.isArray(field.value)
                    ? field.value.length > 0
                        ? field.value.forEach((sv:any) => form_data.append(`${field.name}[]`, sv))
                        : form_data.append(`${field.name}[]`, field.value)
                    : form_data.append(field.name, field.value)
            })
        }
        if (method === 'PUT') {
            form_data.append('_method', method)
            method = 'POST'
        }
        bodyData = form_data
    } else {
        bodyData = Array.isArray(data)
            ? data.map((i: any) => JSON.stringify(i, apiRequestStringifier)).reduce((pi: object, i: any) => Object.assign(pi, JSON.parse(i)), {})
            : JSON.parse(JSON.stringify(data, apiRequestStringifier))
    }




    const {accessToken} = useAuthenticationStore()
    if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`
    }

    console.log('headers', headers)

    return new CustomRequestBody<ResponseType>(axios({
        method,
        url: endPoint,
        data: bodyData,
        headers,
        params: {
            ...query,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
    }))
}

class CustomRequestBody<ResponseType extends typeof JsonMapper> {

    #request: Promise<ResponseType>

    constructor(request: Promise<ResponseType>) {
        this.#request = request
    }

    onStart = (callBack: Function) => {

        callBack()

        return this
    }

    onValidationErrors = (callBack: Function) => {

        this.#request.then((response: any) => {
            const responseCode = response.data.code
            if (responseCode === 401) {
                callBack(response.data.messages)
            }
        })

        return this
    }

    onSuccess = (callBack: Function, Model?: any) => {

        this.#request.then((response: any) => {
            const responseCode = response.data.code
            const responseMessage = response.data.messages
            if (!responseCode) {
                return Model ? new Model(response) : new Response(response.data)
            } else if (responseCode > 199 && responseCode < 299) {
                callBack(Model ? new Model(response.data.data) : new Response(response.data), responseMessage)
            }
        })

        return this
    }

    onFailure = (callBack: Function) => {

        this.#request.then((response: any) => {
            const responseCode = response.data.code
            const responseMessage = response.data.messages
            if (responseCode === 404 || responseCode === 500) {
                callBack(responseMessage)
            }
        }).catch(error => callBack(error))

        return this
    }

    onPaymentFailure = (callBack: Function) => {

        this.#request.then((response: any) => {
            const responseCode = response.data.code
            const responseMessage = response.data.messages
            if (responseCode === 501) {
                callBack(responseMessage)
            }
        }).catch(error => callBack(error))

        return this
    }

    onFinished = (callBack: Function) => {

        this.#request.then(() => callBack()).catch(() => callBack())

        return this
    }
}

export function useFetchData<ResponseType extends typeof JsonMapper>(
    {
        data = {},
        method = 'GET',
        uri,
        query = {},
        baseURL = import.meta.env.VITE_API_BASE_URL,
        model
    }: ApiData,
): Promise<{ data: ResponseType, message?: null }> {

    const endPoint = [baseURL, uri].join('')
    const bodyData = Array.isArray(data)
        ? data.map((i: any) => JSON.stringify(i, apiRequestStringifier)).reduce((pi: object, i: any) => Object.assign(pi, JSON.parse(i)), {})
        : JSON.stringify(data, apiRequestStringifier)
    let headers: RawAxiosRequestHeaders | AxiosHeaders = {}

    const {accessToken} = useAuthenticationStore()
    if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`
    }

    const request = axios({
        method,
        url: endPoint,
        data: bodyData,
        headers,
        params: {
            ...query,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
    })
    return new Promise<{ data: ResponseType, message?: null }>((resolve, reject) => {
        request.then((response: AxiosResponse<any, any>) => {
            const responseCode = response.data.code
            const responseData = response.data.data
            const responseMessage = response.data.messages

            if (!responseCode) {
                return resolve({data: model ? new model(response) : response})
            } else if (responseCode > 199 && responseCode < 299) {
                return resolve({
                    data: model ? new model(responseData) : new Response(response),
                    message: responseMessage
                })
            }

            reject(responseMessage)
        }).catch(error => {
            reject(error)
        })
    })
}