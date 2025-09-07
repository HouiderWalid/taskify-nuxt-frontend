<script setup lang="ts">
import {get, isObjectLike} from "lodash-es";
import ListObjectItem from "~/components/io/select/ListObjectItem.vue";

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
  labelClasses: {
    type: String,
    default: 'text-black'
  },
  inputClasses: {
    type: String,
    default: 'border-black text-black placeholder:text-primary/60'
  },
  placeholder: {
    type: String,
  },
  hideDetails: {
    type: Boolean,
    default: false
  },
  items: {
    type: Array<any>,
    default: () => []
  },
  itemValueKey: {
    type: String,
    default: 'value'
  },
  itemTextKey: {
    type: String,
    default: 'text'
  }
})
const firstMessage = computed(() => props.errorMessages?.[0])
const isInputFocused = ref(false)
const containerId = computed(() => [props.id, 'container'].join('-'))
const model = defineModel()
const modelText = computed(() => isObjectLike(model) ? get(model.value, props.itemTextKey) : model)
const search = ref('')
const items = computed(() => props.items.filter(item => new RegExp(search.value, 'gi').test(get(item, props.itemTextKey))))

const clickOutsideCallBack = (e: MouseEvent) => {
  if (e.target instanceof HTMLElement && !e.target.closest(`#${containerId.value}`)) {
    isInputFocused.value = false
  }
}

function objectItemClicked(item: any) {
  model.value = item
  isInputFocused.value = false
}

function toggleInputFocused() {
  const input = props.id ? document.getElementById(props.id) : null
  if (input instanceof HTMLInputElement) {
    isInputFocused.value ? input.blur() : input.focus()
  }
}

onMounted(() => {
  document.addEventListener('click', clickOutsideCallBack)
})

onUnmounted(() => {
  document.removeEventListener('click', clickOutsideCallBack)
})
</script>

<template>
  <div class="p-0 border-0">
    <div :id="containerId" class="flex relative flex-col gap-2">
      <label v-if="props.label" :for="props.id" :class="props.labelClasses">
        {{ props.label }}
      </label>
      <div :class="[{'border-red-400!':firstMessage}, props.inputClasses]"
           class="px-3 py-2 flex gap-2 border bg-white focus-within:ring-primary-500 focus-within:border-primary-500 rounded-lg">
        <span v-if="modelText" class="text-nowrap">{{ modelText }}</span>
        <input v-model="search" @focus="isInputFocused=true" :id="props.id" type="text"
               class="p-0 border-0 focus:border-0! focus:outline-0! focus:shadow-[none]! w-full"
               :placeholder="props.placeholder" :name="props.name"/>
        <Icon v-if="search.length" class="cursor-pointer" name="mdi:close" size="24" @click="search = ''"/>
        <Icon class="cursor-pointer" @click="toggleInputFocused" :name="`mdi:chevron-${isInputFocused ? 'up' : 'down'}`"
              size="24"/>
      </div>
      <List v-if="isInputFocused" class="bg-white absolute w-full max-h-60 shadow-md overflow-auto top-20 z-10">
        <template v-if="items.length">
          <ListObjectItem v-for="item in items" @click="objectItemClicked(item)" :item="item" :selected="model"
                          :item-text-key="props.itemTextKey" :item-value-key="props.itemValueKey"/>
        </template>
        <template v-else>
          <li class="p-2">{{ $t('components.autocomplete.noResultsFound') }}</li>
        </template>
      </List>
    </div>
    <div v-if="!props.hideDetails" class="text-red-400 h-5 text-xs mt-0.5"> {{ firstMessage }}</div>
  </div>
</template>

<style>

</style>