<script setup lang="ts">
import type { CSSProperties } from 'vue'

interface Props {
  item: Tag
}

const { t } = useTranslation()
const config = useRuntimeConfig()
const API_URL: string = config.public.apiURL

const props = defineProps<Props>()

const containerClasses = computed<string[]>(() => [
  skillLevel.value ? 'h-11' : 'h-8',
  props.item.color
    ? 'bg-[var(--item-color)] ring-[var(--item-color)] border-[var(--item-color)]'
    : 'bg-secondary ring-secondary border-secondary'
])

const containerStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (props.item.color) {
    style['--item-color'] = props.item.color
  }
  return style
})

const skillLevel = computed<string | null>(() => {
  return t(props.item, 'skill_level') || null
})
</script>

<template>
  <div
    class="flex flex-wrap items-center gap-2 text-sm rounded-sm text-secondary-content border-3 w-fit"
    :class="containerClasses" :style="containerStyle">
    <NuxtImg v-if="item.icon" :src="`${API_URL}/assets/${item.icon}`"
      :alt="`icon of ${t(item, 'name')}`"
      class="self-center h-full mr-0 rounded-xs bg-base-100 min-w-5"
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