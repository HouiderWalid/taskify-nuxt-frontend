<script setup lang="ts">
import Permission from "assets/ts/models/permission/Permission";
import SettingsForm from "assets/ts/forms/SettingsForm";
import Button from "~/components/io/Button.vue";
import {useSaveProfileApi} from "assets/ts/apis/AuthenticationApis";
import User from "assets/ts/models/user/User";
import FormAlertMessage from "~/components/FormAlertMessage.vue";

definePageMeta({
  layout: 'dashboard',
  permission: Permission.VIEW_SETTINGS
})

const settingsForm = reactive(new SettingsForm())
const {getUser} = useAuthenticationStore()

function saveSettings() {
  useSyncFetchData(useSaveProfileApi(settingsForm))
      .onStart(() => settingsForm.startSaveLoading())
      .onValidationErrors((messages: any) => settingsForm.setValidationMessages(messages))
      .onSuccess((user: User, message: any) => {
        settingsForm.populateFields(user).setSuccessSnackMessage(message);
      }, User)
      .onFailure((message: any) => settingsForm.setErrorAlertMessage(message))
      .onFinished(() => settingsForm.endSaveLoading())
}

onMounted(() => {
  const user = getUser()
  if (user) {
    settingsForm.fullName.setContent(user.getFullName())
    settingsForm.email.setContent(user.getEmail())
    settingsForm.avatar.setContent(user.getAvatar())
  }
})
</script>

<template>
  <div class="flex flex-col gap-2 p-6 items-center border bg-white shadow-sm rounded-xl border-gray-200">
    <div class="w-full mb-6">
      <h1 class="text-2xl font-bold">{{ $t('settings.title') }}</h1>
      <span class="text-gray-500">{{ $t('settings.subtitle') }}</span>
    </div>
    <FormAlertMessage :data="settingsForm.formAlertMessage" full-width="true"/>
    <FormFieldComponent v-for="field in settingsForm" class="w-full" :field="field"/>
    <div class="flex w-full justify-end mt-4">
      <Button id="save-setting-btn" @click="saveSettings" variant="filled" :loading="settingsForm.isSaveLoading()">
        {{ $t('settings.form.buttons.save') }}
      </Button>
    </div>
    <FormAlertMessage id="settings-profile-snack-message" :data="settingsForm.formSnackMessage"/>
  </div>
</template>

<style scoped>

</style>