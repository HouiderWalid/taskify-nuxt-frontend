<script setup lang="ts">
import Button from "~/components/io/Button.vue";
import {useAuthenticationStore} from "~/stores/authenticationStore";
import User from "assets/ts/models/user/User";

const {user, signOut} = useAuthenticationStore();
const fullName = user instanceof User ? user.getFullName() : null
const nameLetters = String(fullName).split(' ').map(name => String(name).charAt(0).toUpperCase()).join('');
const localePath = useLocalePath()
const router = useRouter()

const navigationList = [
  {
    link: '/',
    name: 'Overview'
  },
  {
    link: '/projects',
    name: 'Projects'
  },
  {
    link: '/tasks',
    name: 'Tasks'
  },
  {
    link: '/users',
    name: 'Users'
  },
  {
    link: '/chat',
    name: 'Chat'
  },
  {
    link: '/settings',
    name: 'Settings'
  }
]

function signOutCall() {
  signOut();
  router.push('/signin');
}

</script>

<template>
  <div class="h-screen bg-primary-50">
    <div class="bg-white shadow-sm flex justify-center">
      <div class="bg-white w-full max-w-6xl p-4 px-6 flex justify-center items-center">
        <div class="w-full">
          <span class="text-3xl text-primary-800 font-bold">Taskify</span>
        </div>
        <div class="flex gap-4 items-center justify-center">
          <div class="rounded-full flex justify-center text-xs items-center bg-primary-800 text-white h-8 w-8">
            {{ nameLetters }}
          </div>
          <Button @click="signOutCall" variant="outlined" class="text-nowrap" :icon="true">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24">
              <path
                  d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12M4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z"/>
            </svg>
          </Button>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="w-full max-w-6xl flex gap-10 px-6 py-10">
        <div class="w-72 flex flex-col gap-2">
          <NuxtLink v-for="(item, i) in navigationList" :key="i"
                    active-class="bg-primary-800 text-white! hover:bg-primary-800"
                    class="px-4 py-3 rounded-2xl text-gray-600! hover:bg-primary-100" :to="localePath({path: item.link})">
            {{ item.name }}
          </NuxtLink>
        </div>
        <div class="text-black w-full">
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>