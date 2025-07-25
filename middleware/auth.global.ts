import {useAuthenticationStore} from "~/stores/authenticationStore";
import User from "assets/ts/models/user/User";
import GuestRoutes from "assets/ts/other/GuestRoutes";
import DashboardRoutes from "assets/ts/other/DashboardRoutes";
import {useAuthUserApi} from "assets/ts/apis/AuthenticationApis";
import {useFetchData} from "~/composables/useFetchData";

export default defineNuxtRouteMiddleware(async (to, from) => {
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
    }else {
        authUser = user
    }

    if (DashboardRoutes.getAllRoutesNames().includes(String(routeName)) && !(authUser instanceof User)) {
        return navigateTo(localePath(GuestRoutes.SIGNIN.PATH))
    }

    if (routePermission && !isPermitted(routePermission)) {
        return navigateTo(localePath(DashboardRoutes.NOT_PERMITTED.PATH))
    }

    if (GuestRoutes.getAllRoutesNames().includes(String(routeName)) && authUser instanceof User) {
        return navigateTo(localePath(DashboardRoutes.OVERVIEW.PATH))
    }
})