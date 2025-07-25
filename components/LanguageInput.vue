<script setup lang="ts">

import SelectField from "~/components/io/select/SelectField.vue";

const {locale, setLocale} = useI18n()
const language = ref('en')
const languageList = [
  {
    value: "en",
    text: "English",
  },
  {
    value: "ar",
    text: "العربية",
  }
]

onMounted(() => {
  language.value = locale.value
})
</script>

<template>
  <SelectField v-model="language" :items="languageList" @update:model-value="setLocale" :hide-details="true">

  </SelectField>
</template>

<style scoped>

</style>