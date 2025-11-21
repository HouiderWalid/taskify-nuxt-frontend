<script lang="ts" setup>

const props = defineProps(['field'])

const components = {
  TextField: defineAsyncComponent(() => import('~/components/io/TextField.vue')),
  TextArea: defineAsyncComponent(() => import('~/components/io/TextArea.vue')),
  DatePicker: defineAsyncComponent(() => import('~/components/io/DatePicker.vue')),
  SelectField: defineAsyncComponent(() => import('~/components/io/select/SelectField.vue')),
  Autocomplete: defineAsyncComponent(() => import('~/components/io/select/Autocomplete.vue')),
  RadioButton: defineAsyncComponent(() => import('~/components/io/radio/RadioButton.vue')),
  ImageUpload: defineAsyncComponent(() => import('~/components/io/ImageUpload.vue')),
}

const component = computed(() => components[props.field.component])
const isVisible = computed(() => props.field.isVisible() && component.value)
const label = computed(() => props.field.fieldTitle)
const errorMessages = computed(() => props.field.messages)
const id = computed(() => props.field.id)
const name = computed(() => props.field.name)
const type = computed(() => props.field.type ?? 'text')
const labelClasses = computed(() => props.field.labelClasses ?? '')
const inputClasses = computed(() => props.field.inputClasses ?? '')
const items = computed(() => props.field.options ?? [])
</script>

<template>
  <component v-if="isVisible" v-model="props.field.content" :is="component" :theme="props.field.theme"
             :placeholder="props.field.placeholder ? $t(props.field.placeholder) : props.field.placeholder" :items="items" :id="id"
             :item-value-key="props.field.itemValueKey" :error-messages="errorMessages" :name="name" :label="label ? $t(label) : label"
             :item-text-key="props.field.itemTextKey" :type="type" :label-classes="labelClasses"
             :input-classes="inputClasses"/>
</template>

<style scoped>

</style>