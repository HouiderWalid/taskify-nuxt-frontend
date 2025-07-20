<script setup lang="ts">
import Button from "~/components/io/Button.vue";
import {useAuthenticationStore} from "~/stores/authenticationStore";
import User from "assets/ts/models/user/User";
import {mdiLogout} from "@mdi/js"

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
          <div class="rounded-full flex justify-center text-xs items-center bg-primary-800 text-white h-9 w-9">
            {{ nameLetters }}
          </div>
          <Button @click="signOutCall" icon="logout" variant="plain"/>
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