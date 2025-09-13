<script setup lang="ts">

import SignInForm from "assets/ts/forms/SignInForm";
import Button from "~/components/io/Button.vue";
import {useSignInApi} from "assets/ts/apis/AuthenticationApis";
import AuthData from "assets/ts/models/AuthData";
import DashboardRoutes from "assets/ts/other/DashboardRoutes";

definePageMeta({
  layout: 'authentication',
})

const signUpForm = reactive(new SignInForm())
const {setAuthData} = useAuthenticationStore()
const localePath = useLocalePath()

function signIn() {
  useSyncFetchData(useSignInApi(signUpForm))
      .onStart(() => signUpForm.emptyValidationMessages().startFormLoading())
      .onValidationErrors((messages: any) => signUpForm.setValidationMessages(messages))
      .onSuccess((authData: AuthData) => {
        setAuthData(authData);
        navigateTo(localePath(DashboardRoutes.OVERVIEW.PATH))
      }, AuthData)
      .onFinished(() => signUpForm.endFormLoading())
}
</script>

<template>
  <div class="flex items-center justify-center w-full h-full">
    <div class="w-full max-w-md bg-white/15 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
      <div class="text-2xl text-center font-bold text-white">{{ $t('signin.form.title') }}</div>
      <div class="text-center mb-8 text-md text-white/80">{{ $t('signin.form.subtitle') }}</div>
      <form class="flex flex-col gap-6">
        <div class="flex flex-col">
          <FormFieldComponent v-for="field in signUpForm" :field="field"/>
        </div>
        <Button id="signin-btn" @click="signIn" variant="filled-reversed" :loading="signUpForm.isFormLoading()">
          {{ $t('signin.form.buttons.signIn') }}
        </Button>
      </form>
      <div class="mt-6 flex flex-col items-center">
        <div class="text-center text-md text-white/80">{{ $t('signin.form.dontHaveAnAccount.text') }}</div>
        <NuxtLink class="text-center text-white text-sm font-bold" :to="localePath('/signup')">
          {{ $t('signin.form.dontHaveAnAccount.link') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>