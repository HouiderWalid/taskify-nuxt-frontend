// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: '2025-05-15',
    devtools: {enabled: true},
    css: ['~/assets/css/main.css'],
    vite: {
        plugins: [tailwindcss()]
    },
    runtimeConfig: {
        public: {
            apiBaseURL: process.env.API_BASE_URL,
            recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
        }
    },
    modules:[
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
        '@nuxtjs/i18n',
        '@nuxt/test-utils/module',
        'nuxt-icon'
    ],
    i18n: {
        compilation: {
            strictMessage: false
        },
        locales: [
            {
                code: 'ar',
                file: 'ar/index.js',
                dir: 'rtl'
            },
            {
                code: 'en',
                file: 'en/index.js',
                dir: 'ltr'
            },
            {
                code: 'fr',
                file: 'fr/index.js',
                dir: 'ltr'
            }
        ],
        lazy: true,
        defaultLocale: 'en',
        strategy: 'prefix',
    }
})
