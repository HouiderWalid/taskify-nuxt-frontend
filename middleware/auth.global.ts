import {useAuthenticationStore} from "~/stores/authenticationStore";
import User from "assets/ts/models/user/User";
import GuestRoutes from "assets/ts/other/GuestRoutes";
import DashboardRoutes from "assets/ts/other/DashboardRoutes";
import {useAuthUserApi} from "assets/ts/apis/AuthenticationApis";
import {useFetchData} from "~/composables/useFetchData";
import type {RouteLocationNormalizedGeneric} from "#vue-router";

export default defineNuxtRouteMiddleware(async (to:RouteLocationNormalizedGeneric, from) => {
    const {getUser, isPermitted, accessToken, setUser} = useAuthenticationStore()

    const routeName = to.name?.toString().split('__')[0]
    const routePermission = to.meta.permission
    const localePath = useLocalePath()
    const user = getUser()

    let authUser = null
    if (accessToken && !(user instanceof User)) {

        try {
            const {data} = await useFetchData(useAuthUserApi())
            if (data instanceof User) {
                authUser = data
                setUser(data)
            }
        } catch (err) {
        }
    } else {
        authUser = user
    }

    if (DashboardRoutes.getAllRoutesNames().includes(String(routeName)) && !(authUser instanceof User)) {
        return navigateTo(localePath(GuestRoutes.SIGNIN.PATH))
    }

    const notPermittedPath = localePath(DashboardRoutes.NOT_PERMITTED.PATH)
    if (routeName !== DashboardRoutes.NOT_PERMITTED.NAME && routePermission && !isPermitted(routePermission)) {
        return navigateTo(notPermittedPath)
    }

    if (GuestRoutes.getAllRoutesNames().includes(String(routeName)) && authUser instanceof User) {
        return navigateTo(localePath(DashboardRoutes.OVERVIEW.PATH))
    }
})