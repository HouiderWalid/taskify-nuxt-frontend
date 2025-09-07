import {defineStore} from "pinia";
import AuthData from "assets/ts/models/AuthData.ts";
import User from "assets/ts/models/user/User.js";

export const useAuthenticationStore = defineStore('authenticationStore', () => {

        const accessToken = ref(null)
        const user = ref(null)

        function setAuthData(authData) {

            if (!(authData instanceof AuthData)) {
                return
            }

            accessToken.value = authData.getAccessToken()
            user.value = authData.getUser()
        }

        function setUser(newUser) {
            user.value = JSON.parse(JSON.stringify(newUser))
        }

        function getUser() {
            return user.value ? user.value instanceof User ? user.value : new User(user.value) : null
        }

        function signOut() {
            accessToken.value = null
            user.value = null
        }

        function isPermitted(permission) {
            const authUser = getUser()
            return authUser instanceof User && authUser.isPermitted(permission)
        }

        return {
            accessToken,
            setAuthData,
            setUser,
            signOut,
            getUser,
            isPermitted
        }
    },
    {
        persist: {
            storage: piniaPluginPersistedstate.cookies(),
            pick: ['accessToken']
        },
        devtools: {autoSerialize: false}
    })