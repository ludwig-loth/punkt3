<script setup>
const { tBySuffix } = useTranslation()
const config = useRuntimeConfig()
const API_URL = config.public.apiURL
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  subheading: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div
    class="flex items-center text-sm rounded-sm bg-secondary text-secondary-content border-3 border-secondary w-fit"
    :class="subheading ? 'h-10' : 'h-8'">
    <NuxtImg v-if="item.icon" :src="`${API_URL}/assets/${item.icon}`" :alt="`icon of ${item.name}`"
      class="inline-block h-full p-0.5 mr-0 rounded-xs bg-base-100 min-w-5"
      :class="subheading ? 'p-0.5 pt-1.5' : 'p-0.5'" />
    <div v-else
      class="h-full p-0.5 mr-1 rounded-xs bg-base-100 text-xl font-league-spartan size-7 flex self-center justify-center"
      :class="subheading ? 'p-0.5 pt-1.5' : 'p-0.5'">
      {{ tBySuffix(item, 'name').charAt(0).toUpperCase() }}
    </div>
    <div class="flex flex-col justify-center gap-0">
      <p class="pr-2 font-semibold">{{ tBySuffix(item, 'name') }}</p>
      <p v-if="subheading" class="text-xs italic text-secondary-content">{{ subheading }}</p>
    </div>
  </div>
</template>
<style></style>