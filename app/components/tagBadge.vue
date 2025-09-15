<script setup lang="ts">
interface Props {
  item: Tag
}
const config = useRuntimeConfig()
const API_URL: string = config.public.apiURL
const { t } = useTranslation()
const props = defineProps<Props>()


</script>
<template>
  <span
    class="flex items-center text-sm rounded-full bg-secondary text-secondary-content ring-2 ring-secondary">
    <NuxtImg v-if="item.icon" :src="`${API_URL}/assets/${item.icon}`"
      :alt="`icon of ${t(item, 'name')}`"
      class="inline-block h-5 p-0.5 mr-1 rounded-l-xl rounded-r-sm bg-white min-w-4" />
    <div v-else
      class="h-5 p-0.5 mr-1 rounded-l-xl rounded-r-sm bg-base-100 min-w-5  flex self-center justify-center font-league-spartan">
      {{ t(item, 'name').charAt(0).toUpperCase() }}
    </div>
    <p class="pr-2 font-semibold"> {{ t(item, 'name') }}</p>
  </span>
</template>
<style></style>