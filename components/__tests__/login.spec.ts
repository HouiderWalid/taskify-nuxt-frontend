import {beforeEach, describe, expect, it, vi} from "vitest";
import {mountSuspended} from "@nuxt/test-utils/runtime";
import signin from "~/pages/signin.vue"
import {createTestingPinia} from "@pinia/testing";
import User from "assets/ts/models/user/User";
import AuthData from "assets/ts/models/AuthData";
import {useAuthenticationStore} from "~/stores/authenticationStore";
import {setActivePinia} from "pinia";

describe('Login Page', () => {

    beforeEach(() => {
        console.log('running before each')
        // Create a testing pinia and set it as active
        setActivePinia(createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {
                authenticationStore: {
                    accessToken: 'mock-token-123',
                    user: {
                        id: 1,
                        full_name: 'Test User'
                    }
                }
            }
        }));
    });

    it('check if login function called',
        async () => {

            const store = useAuthenticationStore()
            console.log('Authentication Successful before', store.accessToken)

            const wrapper = await mountSuspended(signin)

            // vi.mock('axios', () => ({
            //     default: vi.fn(config => {
            //
            //         return Promise.resolve({
            //             data: {
            //                 code: 200,
            //                 data: {
            //                     [AuthData.getUserAttributeName()]: {[User.getFullNameAttributeName()]: 'walid houider'},
            //                     [AuthData.getAccessTokenAttributeName()]: 'fake_token'
            //                 },
            //                 messages: ''
            //             },
            //             status: 200,
            //             statusText: 'OK',
            //             headers: {},
            //             config
            //         })
            //     })
            // }));
            //
            // const router = useRouter();
            // const pushSpy = vi.spyOn(router, 'push');
            //
            // const wrapper = await mountSuspended(signin,
            //     {
            //     global: {
            //         plugins: [
            //             createTestingPinia({
            //                 createSpy: vi.fn,
            //                 stubActions: false,
            //                 initialState:{
            //                     authenticationStore: {  // Your store name (e.g., 'authentication')
            //                         accessToken: 'mock-token-123',
            //                         user: {
            //                             id: 1,
            //                             full_name: 'Test User'
            //                         }
            //                     }
            //                 }
            //             })
            //         ]
            //     }
            // }
            // )
            //
            // const button = wrapper.find('#signin-btn')
            // const store = useAuthenticationStore()
            //
            // await button.trigger('click')
            // console.log('Authentication Successful', store.accessToken)
            //
            //
            //
            //
            // console.log('location', window.location.href)
            //expect(pushSpy).toHaveBeenCalledWith('/');
        }
    )
})