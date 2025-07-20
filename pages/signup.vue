<script setup lang="ts">
import SignUpForm from "assets/ts/forms/SignUpForm";
import Button from "~/components/io/Button.vue";
import {useSignupApi} from "assets/ts/apis/AuthenticationApis";
import AuthData from "assets/ts/models/AuthData";

definePageMeta({
  layout: 'authentication',
})

const signupForm = reactive(new SignUpForm())
const { setAuthData } = useAuthenticationStore()
const router = useRouter()

function signup() {
  useSyncFetchData(useSignupApi(signupForm))
      .onStart(() => signupForm.emptyValidationMessages().startFormLoading())
      .onValidationErrors((messages:any) => signupForm.setValidationMessages(messages))
      .onSuccess((authData:any) => {
        setAuthData(authData);
        router.push('/')
      }, AuthData)
      .onFinished(() => signupForm.endFormLoading())
}

</script>

<template>
  <div class="flex items-center justify-center w-full h-full">
    <div class="w-full max-w-md bg-white/15 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
      <div class="text-2xl text-center font-bold text-white">Join Taskify</div>
      <div class="text-center mb-8 text-md text-white/80">Create an account to get started</div>
      <form class="flex flex-col gap-6">
        <div class="flex flex-col">
          <FormFieldComponent v-for="field in signupForm" :field="field"/>
        </div>
        <Button @click="signup" variant="filled-reversed" :loading="signupForm.isFormLoading()">Sign Up</Button>
      </form>
      <div class="mt-6 flex flex-col items-center">
        <div class="text-center text-md text-white/80">Already have an account?</div>
        <NuxtLink class="text-center text-white text-sm font-bold" to="/signin">Sign in</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>