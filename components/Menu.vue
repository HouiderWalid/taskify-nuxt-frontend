<script setup lang="ts">
import {v4} from "uuid"

const id = v4()
const isOpen = ref(false)
const menuRef = ref()

function onActivated() {
  isOpen.value = !isOpen.value
}

const clickOutsideCallBack = (e: MouseEvent) => {
  const menuId = menuRef.value?.id
  if (document.getElementById(menuId)) {
    const escapedId = CSS.escape(menuId);

    if (isOpen.value && e.target instanceof HTMLElement && e.target.closest(`#${escapedId}`)) {
      isOpen.value = false
      return
    }

    isOpen.value = e.target instanceof HTMLElement && !!e.target.closest(`#${escapedId}`)
  }
}

onMounted(() => {
  document.addEventListener('click', clickOutsideCallBack)
})

onUnmounted(()=>{
  document.removeEventListener('click', clickOutsideCallBack)
})
</script>

<template>
  <div class="relative">
    <slot name="activator" @click.stop="onActivated"/>
    <div ref="menuRef" :id="id" :class="{'hidden':!isOpen}"
         class="absolute z-10 top-[50px] bg-white rounded-lg">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>

</style>