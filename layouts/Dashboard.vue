<script setup lang="ts">
import Button from "~/components/io/Button.vue";
import {useAuthenticationStore} from "~/stores/authenticationStore";
import Permission from "assets/ts/models/permission/Permission";

const {getUser, signOut, isPermitted} = useAuthenticationStore();
const user = getUser();
const fullName = user?.getFullName()
const nameLetters = String(fullName).split(' ').map(name => String(name).charAt(0).toUpperCase()).join('');
const avatar = user?.getAvatar()
const localePath = useLocalePath()
const router = useRouter()
const {locale} = useI18n()
const direction = computed(() => locale.value === 'ar' ? 'rtl' : 'ltr')

const navigationList = [
  {
    link: '/',
    name: 'overview',
    translation: 'navbar.overview',
    icon: 'mdi:view-dashboard',
    permission: Permission.VIEW_OVERVIEW
  },
  {
    link: '/projects',
    name: 'projects',
    translation: 'navbar.projects',
    icon: 'mdi:folder',
    permission: Permission.VIEW_PROJECTS
  },
  {
    link: '/tasks',
    name: 'tasks',
    translation: 'navbar.tasks',
    icon: 'mdi:note-outline',
    permission: Permission.VIEW_TASKS
  },
  {
    link: '/users',
    name: 'users',
    translation: 'navbar.users',
    icon: 'mdi:account',
    permission: Permission.VIEW_USERS
  },
  {
    link: '/settings',
    name: 'settings',
    translation: 'navbar.settings',
    icon: 'mdi:cog',
    permission: Permission.VIEW_SETTINGS
  }
]

function signOutCall() {
  signOut();
  router.push('/signin');
}

</script>

<template>
  <div :dir="direction" class="h-screen overflow-auto bg-primary-50">
    <div class="bg-white shadow-sm flex justify-center">
      <div class="bg-white w-full max-w-6xl p-4 px-6 flex justify-center items-center">
        <div class="w-full">
          <span class="text-3xl text-primary-800 font-bold">Taskify</span>
        </div>
        <div class="flex gap-4 items-center justify-center">
          <LanguageInput/>
          <div class="rounded-full flex justify-center text-xs items-center bg-primary-800 text-white h-9 w-9">
            <img class="rounded-full" v-if="avatar" :src="avatar" alt="Dashboard User Avatar">
            <span v-else>{{ nameLetters }}</span>
          </div>
          <Button @click="signOutCall" icon="logout" variant="plain"/>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="w-full max-w-6xl flex gap-10 px-6 py-10">
        <div class="w-72 flex flex-col gap-2">
          <template v-for="(item, i) in navigationList">
            <NuxtLink v-if="isPermitted(item.permission)" :key="i"
                      active-class="bg-primary-800 text-white! hover:bg-primary-800"
                      class="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-600! hover:bg-primary-100"
                      :to="localePath( {path: item.link})">
              <Icon :name="item.icon" size="20"/>
              <span>{{ $t(item.translation) }}</span>
            </NuxtLink>
          </template>
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