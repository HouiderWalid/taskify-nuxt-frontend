<script setup lang="ts">
import {v4} from "uuid";
import {isString} from "assets/ts/helpers/helpers";

const props = defineProps({
  id: {
    type: String,
    default: v4()
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
  labelClasses: {
    type: String,
    default: 'text-black'
  },
  inputClasses: {
    type: String,
    default: 'border-black text-black placeholder:text-blue/60'
  },
  hideDetails: {
    type: Boolean,
    default: false
  }
})
const firstMessage = computed(() => props.errorMessages?.[0])
const model = defineModel()

const imageLoaded = ref('')
const imageUrl = computed(() => String(imageLoaded.value ? imageLoaded.value : isString(model.value) ? model.value : ''))

function onFileSelected(e: any) {
  const file = e.target.files[0]
  const fileReader = new FileReader()
  fileReader.onload = e => imageLoaded.value = String(e.target?.result ?? '')
  fileReader.readAsDataURL(file)
  model.value = file
}
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <label class="flex flex-col justify-center items-center gap-2">
      <span class="text-center">{{ label }}</span>
      <span
          :class="[inputClasses, 'cursor-pointer border rounded-lg w-52 h-52 flex flex-col justify-center items-center']">
        <img v-if="imageUrl" :src="imageUrl" alt="">
        <span class="flex flex-col justify-center items-center gap-2" v-else>
          <Icon name="mdi:cloud-upload" size="60"/>
          <span>click to upload</span>
        </span>
      </span>
      <input class="hidden" type="file" accept="image/jpeg, image/png, image/jpg, image/webp" @change="onFileSelected"/>
    </label>
    <div v-if="!props.hideDetails" class="text-red-400 h-5 text-xs mt-0.5"> {{ firstMessage }}</div>
  </div>
</template>

<style scoped>

</style>