import {useAuthenticationStore} from "~/stores/authenticationStore";
import User from "assets/ts/models/user/User";
import GuestRoutes from "assets/ts/other/GuestRoutes";
import DashboardRoutes from "assets/ts/other/DashboardRoutes";
import {useAuthUserApi} from "assets/ts/apis/AuthenticationApis";
import {useFetchData} from "~/composables/useFetchData";

export default defineNuxtRouteMiddleware(async (to, from) => {
    let {user, accessToken, setUser} = useAuthenticationStore()

    const routeName = to.name?.toString().split('__')[0]

    if (accessToken && !(user instanceof User)) {

        try {
            const {data} = await useFetchData(useAuthUserApi())
            user = data
        } catch (err) {

        }

        if (user instanceof User) {
            setUser(user)
        }
    }

    if (GuestRoutes.getAllRoutesNames().includes(String(routeName)) && user instanceof User) {
        return navigateTo(DashboardRoutes.OVERVIEW.PATH)
    }

    if (DashboardRoutes.getAllRoutesNames().includes(String(routeName)) && !(user instanceof User)) {
        return navigateTo(GuestRoutes.SIGNIN.PATH)
    }

})