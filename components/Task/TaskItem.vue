<script setup lang="ts">

import Project from "assets/ts/models/project/Project";
import {mdiDotsVertical} from "@mdi/js";
import Button from "~/components/io/Button.vue";
import ListItem from "~/components/ListItem.vue";
import List from "~/components/List.vue";

const props = defineProps(['task'])
const emit = defineEmits(['edit', 'delete']);
const name = computed(() => props.task instanceof Project ? props.task.getName() : null)
const description = computed(() => props.task instanceof Project ? props.task.getDescription() : null)
</script>

<template>
  <div class="flex justify-between">
    <div class="flex flex-col gap-4">
      <div class="flex gap-2 items-center">
        <span class="text-2xl font-bold">{{ name }}</span>
        <Menu>
          <template #activator="props">
            <Button v-bind="props" :icon-path="mdiDotsVertical" :icon="true"/>
          </template>
          <List>
            <ListItem @click="emit('edit', props.task)">Edit</ListItem>
            <ListItem @click="emit('delete', props.task)">Delete</ListItem>
          </List>
        </Menu>
      </div>
      <span>{{ description }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>