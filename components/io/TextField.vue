<script setup lang="ts">
const props = defineProps({
  id: {
    type: String
  },
  errorMessages: {
    type: Array,
    default: () => []
  },
  name: {
    type: String,
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text',
  },
  theme: {
    type: String
  },
  placeholder: {
    type: String,
  },
  hideDetails: {
    type: Boolean,
    default: false
  }
})
const firstMessage = computed(() => props.errorMessages?.[0])
const model = defineModel()

const titleStyle = computed(() => {
  switch (props.theme) {
    case 'blurry':
      return 'text-white'
    default:
      return 'text-black'
  }
})

const inputStyle = computed(() => {
  switch (props.theme) {
    case 'blurry':
      return 'bg-white/20 placeholder:text-white/30 border-white/20 text-white'
    default:
      return 'border-black text-black placeholder:text-blue/60 text-black'
  }
})
</script>

<template>
  <div>
    <div class="flex flex-col gap-2">
      <label v-if="props.label" :for="props.id" :class="titleStyle">
        {{ props.label }}
      </label>
      <input v-model="model" :id="props.id" :type="props.type" :placeholder="props.placeholder"
             :class="[{'border-red-400!':firstMessage}, inputStyle]" :name="props.name"
             class="px-3 py-2 outline-0 border focus:outline-1 focus:ring-primary-500 focus:border-primary-500 rounded-lg"/>
    </div>
    <div v-if="!props.hideDetails" class="text-red-400 h-5 text-xs mt-0.5"> {{ firstMessage }}</div>
  </div>
</template>

<style scoped>

</style>