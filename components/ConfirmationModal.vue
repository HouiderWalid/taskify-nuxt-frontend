<script setup lang="ts">

import Button from "~/components/io/Button.vue";

const props = defineProps(['loading'])
const emit = defineEmits(['close', 'action'])
const model = defineModel()
</script>

<template>
  <Modal v-model="model" @close="emit('close')">
    <template #title>
      <slot name="title"/>
    </template>
    <slot name="description"/>
    <template #action>
      <Button class="w-20" :loading="loading"
              @click="emit('action', true)">
        {{ $t('confirmationModal.buttons.yes') }}
      </Button>
      <Button class="w-20" variant="filled" @click="emit('action', false)">
        {{ $t('confirmationModal.buttons.no') }}
      </Button>
    </template>
  </Modal>
</template>

<style scoped>

</style>