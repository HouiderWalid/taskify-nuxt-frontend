<script lang="ts" setup>

const props = defineProps(['field'])

const components = {
  'TextField': defineAsyncComponent(() => import('~/components/io/TextField.vue')),
  'TextArea': defineAsyncComponent(() => import('~/components/io/TextArea.vue')),
  'DatePicker': defineAsyncComponent(() => import('~/components/io/DatePicker.vue')),
}

const component = computed(() => components[props.field.component])
const isVisible = computed(()=>props.field.isVisible() && component.value)

</script>

<template>
  <component v-if="isVisible" :is="component" :field="field"/>
</template>

<style scoped>

</style>