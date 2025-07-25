<script setup lang="ts">
import Button from "~/components/io/Button.vue";
import {useAuthenticationStore} from "~/stores/authenticationStore";

definePageMeta({
  layout: 'authentication'
})

const router = useRouter()
const {signOut} = useAuthenticationStore();

function signOutCall() {
  signOut();
  router.push('/signin');
}
</script>

<template>
  <div class="flex items-center justify-center w-full h-full">
    <div class="w-full max-w-md flex flex-col text-white items-center gap-4 bg-white/15 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
      <Icon name="mdi:shield-outline" size="100"/>
      <span class="text-3xl font-bold">403</span>
      <span class="text-2xl">Access Denied</span>
      <span class="text-gray-100">You don't have permission to access this page</span>
      <Button to="/" class="w-full" variant="filled-reversed">Return to Home</Button>
      <Button @click="signOutCall" class="w-full" variant="outlined-reversed">Logout</Button>
    </div>
  </div>
</template>

<style scoped>

</style>