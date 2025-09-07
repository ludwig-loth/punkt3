<script setup>
const { t, tBySuffix } = await useTranslation()
const config = useRuntimeConfig()
const API_URL = config.public.apiURL
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  // subtext: {
  //   type: String,
  //   default: ''
  // }
})

const containerClasses = computed(() => {
  return [
    skillLevel.value ? 'h-11' : 'h-8',
    props.item.color ? 'bg-[var(--item-color)] ring-[var(--item-color)] border-[var(--item-color)]' : 'bg-secondary ring-secondary border-secondary'
  ]
})

const containerStyle = computed(() => {
  return props.item.color ? { '--item-color': props.item.color } : {}
})

const skillLevel = computed(() => {
  return t(props.item, 'skill_level')
})
</script>

<template>
  <div
    class="flex flex-wrap items-center gap-2 text-sm rounded-sm text-secondary-content border-3 w-fit"
    :class="containerClasses" :style="containerStyle">
    <NuxtImg v-if="item.icon" :src="`${API_URL}/assets/${item.icon}`"
      :alt="`icon of ${t(item, 'name')}`" class="self-center h-full mr-0 rounded-xs bg-base-100 min-w-5"
      :class="skillLevel ? 'p-0.5 pt-2' : 'p-0.5'" />
    <div v-else
      class="flex justify-center h-full mr-1 text-xl rounded-xs bg-base-100 font-league-spartan size-7 "
      :class="skillLevel ? 'p-0.5 pt-2' : 'p-0.5'">
      {{ t(item, 'name').charAt(0).toUpperCase() }}
    </div>
    <div class="flex flex-col justify-center gap-0 ">
      <p class="pr-2 font-semibold">{{ t(item, 'name') }}</p>
      <p v-if="skillLevel" class="pr-2 text-xs italic text-secondary-content">{{ skillLevel }}</p>
    </div>
  </div>
</template>
<style></style>