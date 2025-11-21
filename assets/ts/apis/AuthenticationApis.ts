import type {ApiData} from "~/composables/useFetchData.js";
import User from "assets/ts/models/user/User";

export const useSignupApi = (data: any): ApiData => {
    return {method: 'POST', uri: 'sign_up', data}
}

export const useSignInApi = (data: any): ApiData => {
    return {method: 'POST', uri: 'sign_in', data}
}

export const useAuthUserApi = (data?: any): ApiData => {
    return {method: 'GET', uri: 'auth_user', model: User, data}
}

export const useSignOutApi = (data?: any): ApiData => {
    return {method: 'PATCH', uri: 'logout', data}
}

export const useSaveProfileApi = (data?: any, contentType = 'multipart/form-data'): ApiData => {
    return {method: 'POST', uri: 'user_profile', contentType, data}
}

