<script setup lang="ts">
const props = defineProps(['field'])
const id = computed(() => props.field.id)
const name = computed(() => props.field.fieldName)
const messages = computed(() => props.field.messages)
const firstMessage = computed(() => messages.value?.[0])
const classes = computed(() => props.field.class ?? 'border-black text-black placeholder:text-blue/60')
const titleClasses = computed(()=> props.field.titleClass ?? 'text-black')
</script>

<template>
  <div>
    <div class="flex flex-col gap-2">
      <label :for="id" :class="titleClasses">
        {{ $t(props.field.fieldTitle) }}
      </label>
      <textarea v-model="props.field.content" rows="5" :id="id" :placeholder="props.field.placeholder"
             :class="[{'border-red-400!':firstMessage}, classes]" :name="name"
             class="px-3 py-2 outline-0 border focus:outline-1 rounded-lg"/>
    </div>
    <div class="text-red-400 h-5 text-xs mt-0.5"> {{ firstMessage }}</div>
  </div>
</template>

<style scoped>

</style>