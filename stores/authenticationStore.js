import {defineStore} from "pinia";
import AuthData from "assets/ts/models/AuthData.ts";

export const useAuthenticationStore = defineStore('authenticationStore', () => {

        const accessToken = ref()
        const user = ref()

        function setAuthData(authData) {
            if (!(authData instanceof AuthData)) {
                return
            }

            accessToken.value = authData.getAccessToken()
            user.value = authData.getUser()
        }

        function setUser(user) {
            user.value = user
        }

        function signOut() {
            accessToken.value = null
            user.value = null
        }

        return {
            accessToken,
            setAuthData,
            setUser,
            signOut,
            user
        }
    },
    {
        persist: {
            storage: piniaPluginPersistedstate.cookies(),
            pick: ['accessToken']
        }
    })