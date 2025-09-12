import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {mockNuxtImport, mountSuspended} from "@nuxt/test-utils/runtime";
import signin from "~/pages/signin.vue"
import signup from "~/pages/signup.vue"
import type {TestingPinia} from "@pinia/testing";
import {createTestingPinia} from "@pinia/testing";
import User from "assets/ts/models/user/User";
import AuthData from "assets/ts/models/AuthData";
import {setActivePinia} from "pinia";
import axios from 'axios';
import authMiddleware from "../../middleware/auth.global"
import GuestRoutes from "assets/ts/other/GuestRoutes";
import type {RouteLocationNormalized} from "#vue-router";
import DashboardRoutes from "assets/ts/other/DashboardRoutes";
import Permission from "assets/ts/models/permission/Permission";
import MockAdapter from 'axios-mock-adapter';
import {flushPromises} from "@vue/test-utils";

describe('user authentication', () => {

    const {navigateToMock} = vi.hoisted(() => ({navigateToMock: vi.fn()}))
    mockNuxtImport('navigateTo', () => navigateToMock)
    let axiosMock: MockAdapter
    let pinia: TestingPinia

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
        pinia = createTestingPinia({
            createSpy: vi.fn,
            stubActions: false
        });
        setActivePinia(pinia)
        vi.clearAllMocks()
    });

    afterEach(() => {
        axiosMock.restore();
    });

    it('check user redirection to home after successful sign up',
        async () => {

            const authStore = useAuthenticationStore()
            axiosMock.onPost('http://localhost/api/sign_up').reply(200, {
                code: 200,
                data: {
                    [AuthData.getUserAttributeName()]: {[User.getFullNameAttributeName()]: 'walid houider'},
                    [AuthData.getAccessTokenAttributeName()]: 'fake_token'
                },
                messages: ''
            });

            const wrapper = await mountSuspended(signup,
                {
                    global: {
                        plugins: [
                            pinia
                        ]
                    }
                }
            )

            const button = wrapper.find('#signup-btn')
            await button.trigger('click')
            await flushPromises()

            expect(authStore.setAuthData).toHaveBeenCalledWith(expect.any(AuthData))
            expect(navigateTo).toBeCalled()
        }
    )

    it('check user redirection to home after successful sign in',
        async () => {

            const authStore = useAuthenticationStore()
            axiosMock.onPost('http://localhost/api/sign_in').reply(200, {
                code: 200,
                data: {
                    [AuthData.getUserAttributeName()]: {[User.getFullNameAttributeName()]: 'walid houider'},
                    [AuthData.getAccessTokenAttributeName()]: 'fake_token'
                },
                messages: ''
            });

            const wrapper = await mountSuspended(signin,
                {
                    global: {
                        plugins: [
                            pinia
                        ]
                    }
                }
            )

            const button = wrapper.find('#signin-btn')
            await button.trigger('click')
            await flushPromises()

            expect(authStore.setAuthData).toHaveBeenCalledWith(expect.any(AuthData))
            expect(navigateTo).toBeCalled()
        }
    )

    it('redirect to sign in page when user not authenticated', async () => {

        const to = {
            name: DashboardRoutes.OVERVIEW.NAME,
            params: {},
            meta: {permission: Permission.VIEW_OVERVIEW},
            matched: [],
            path: DashboardRoutes.OVERVIEW.PATH,
            fullPath: DashboardRoutes.OVERVIEW.PATH,
            query: {},
            hash: "",
            redirectedFrom: undefined
        }

        await authMiddleware(to as RouteLocationNormalized, {} as RouteLocationNormalized);

        expect(navigateTo).toBeCalledWith('/en' + GuestRoutes.SIGNIN.PATH);
    })

    it("let authenticated users through", async () => {

        axiosMock.onGet('http://localhost/api/auth_user').reply(200, {
            code: 200,
            data: {
                [User.getFullNameAttributeName()]: 'walid houider 2',
                [User.getPermissionsAttributeName()]: [
                    {
                        [Permission.getIdAttributeName()]: 1,
                        [Permission.getNameAttributeName()]: Permission.VIEW_OVERVIEW
                    }
                ]
            },
            messages: ''
        });

        const store = useAuthenticationStore();
        store.setAccessToken('my_token')

        const to = {
            name: DashboardRoutes.OVERVIEW.NAME,
            params: {},
            meta: {permission: Permission.VIEW_OVERVIEW},
            matched: [],
            path: DashboardRoutes.OVERVIEW.PATH,
            fullPath: DashboardRoutes.OVERVIEW.PATH,
            query: {},
            hash: "",
            redirectedFrom: undefined
        }

        await authMiddleware(to as RouteLocationNormalized, {} as RouteLocationNormalized);

        expect(navigateTo).toBeCalledTimes(0)
    });

    it("redirects if user lacks permission", async () => {

        axiosMock.onGet('http://localhost/api/auth_user').reply(200, {
            code: 200,
            data: {
                [User.getFullNameAttributeName()]: 'walid houider 3',
                [User.getPermissionsAttributeName()]: []
            },
            messages: ''
        });

        const store = useAuthenticationStore();
        store.setAccessToken('my_token')

        const to = {
            name: DashboardRoutes.OVERVIEW.NAME,
            params: {},
            meta: {permission: Permission.VIEW_OVERVIEW},
            matched: [],
            path: DashboardRoutes.OVERVIEW.PATH,
            fullPath: DashboardRoutes.OVERVIEW.PATH,
            query: {},
            hash: "",
            redirectedFrom: undefined
        }

        await authMiddleware(to as RouteLocationNormalized, {} as RouteLocationNormalized);

        expect(navigateTo).toBeCalledWith('/en' + DashboardRoutes.NOT_PERMITTED.PATH)
    });
})