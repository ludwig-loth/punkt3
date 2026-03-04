<script setup lang="ts">
const props = defineProps<{
  href?: string
  target?: string
}>()

const localePath = useLocalePath()

const isInternal = computed(() => {
  const h = props.href || ''
  return h.startsWith('/') && !h.startsWith('//')
})

const resolvedHref = computed(() => {
  if (isInternal.value) return localePath(props.href || '/')
  return props.href || ''
})

const resolvedTarget = computed(() => {
  if (!isInternal.value) return '_blank'
  return props.target || undefined
})

const resolvedRel = computed(() => {
  if (!isInternal.value) return 'noopener noreferrer'
  return undefined
})
</script>

<template>
  <NuxtLink v-if="isInternal" :to="resolvedHref">
    <slot />
  </NuxtLink>
  <a v-else :href="resolvedHref" :target="resolvedTarget" :rel="resolvedRel">
    <slot />
  </a>
</template>
