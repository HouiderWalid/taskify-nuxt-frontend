<script setup lang="ts">
import SignUpForm from "assets/ts/forms/SignUpForm";
import Button from "~/components/io/Button.vue";
import {useSignupApi} from "assets/ts/apis/AuthenticationApis";
import AuthData from "assets/ts/models/AuthData";
import DashboardRoutes from "assets/ts/other/DashboardRoutes";

definePageMeta({
  layout: 'authentication',
})

const signupForm = reactive(new SignUpForm())
const { setAuthData } = useAuthenticationStore()
const localePath = useLocalePath()

function signup() {
  useSyncFetchData(useSignupApi(signupForm))
      .onStart(() => signupForm.emptyValidationMessages().startFormLoading())
      .onValidationErrors((messages:any) => signupForm.setValidationMessages(messages))
      .onSuccess((authData:any) => {
        setAuthData(authData);
        navigateTo(localePath(DashboardRoutes.OVERVIEW.PATH))
      }, AuthData)
      .onFinished(() => signupForm.endFormLoading())
}

</script>

<template>
  <div class="flex items-center justify-center w-full h-full">
    <div class="w-full max-w-md bg-white/15 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
      <div class="text-2xl text-center font-bold text-white">{{ $t('signup.form.title') }}</div>
      <div class="text-center mb-8 text-md text-white/80">{{ $t('signup.form.subtitle') }}</div>
      <form class="flex flex-col gap-6">
        <div class="flex flex-col">
          <FormFieldComponent v-for="field in signupForm" :field="field"/>
        </div>
        <Button id="signup-btn" @click="signup" variant="filled-reversed" :loading="signupForm.isFormLoading()">
          {{ $t('signup.form.buttons.signIn') }}
        </Button>
      </form>
      <div class="mt-6 flex flex-col items-center">
        <div class="text-center text-md text-white/80">{{ $t('signup.form.alreadyHaveAccount.text') }}</div>
        <NuxtLink class="text-center text-white text-sm font-bold" :to="localePath('/signin')">
          {{ $t('signup.form.alreadyHaveAccount.link') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>