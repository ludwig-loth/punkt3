<script setup lang="ts">
const designStore = useDesignStore()

const emit = defineEmits < {
  (e: 'themeChanged', theme: 'light' | 'dark'): void
}> ()

function toggleTheme(): void {
  designStore.toggleTheme()
  emit('themeChanged', designStore.isDarkMode ? 'dark' : 'light')
}

onMounted(() => {
  designStore.initTheme()
})
</script>
<template>
  <div class="absolute z-50 p-0 rounded-sm top-1 right-1">
    <button @click="toggleTheme"
      class="flex items-center gap-1 p-1 text-sm font-semibold transition-all rounded-sm cursor-pointer text-accent-content group hover:text-base-content focus:text-base-content active:scale-97 bg-accent hover:bg-primary focus:bg-primary"
      :title="designStore.isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
      aria-label="Toggle theme">
      <div
        class="relative bg-primary *:relative *:z-20 *:p-1 *:size-6 *:stroke-accent-content rounded-sm">
        <!-- Sun icon for light mode -->
        <svg v-if="!designStore.isDarkMode" width="100%" height="100%" viewBox="0 0 24 24"
          fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke-width="0"></g>
          <g stroke-linecap="round" stroke-linejoin="round"></g>
          <g>
            <path
              d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5M17.6859 17.69L18.5 18.5M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
              stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </g>
        </svg>

        <!-- Moon icon for dark mode -->
        <svg v-else width="100%" height="100%" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g stroke-width="0"></g>
          <g stroke-linecap="round" stroke-linejoin="round"></g>
          <g>
            <path
              d="M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z"
              stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </g>
        </svg>
      </div>
    </button>
  </div>
</template>