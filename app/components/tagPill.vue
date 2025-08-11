<script setup lang="ts">
const config = useRuntimeConfig()
const API_URL = config.public.apiURL
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>
<template>
  <span
    class="flex items-center text-sm rounded-full bg-secondary text-secondary-content ring-2 ring-secondary">
    <NuxtImg :src="`${API_URL}/assets/${item.tech_stack_tags_id.icon}`"
      :alt="`icon of ${item.tech_stack_tags_id.name}`"
      class="inline-block h-5 p-0.5 mr-1 rounded-l-xl rounded-r-sm bg-base-100 min-w-4" />
    <p class="pr-2 font-semibold"> {{ item.tech_stack_tags_id.name }}</p>
  </span>
</template>
<style></style>