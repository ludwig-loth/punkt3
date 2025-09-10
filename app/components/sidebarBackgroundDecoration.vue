<script setup lang="ts">
interface Props {
  tailwindClasses?: string;
}
const designStore = useDesignStore();
const landingStore = useLandingStore();
const route = useRoute()
const { tMenuItem, tStatic } = useTranslation()

const { tailwindClasses = 'max-w-5xl' } = defineProps<Props>()


const getParentRoute = computed<string>(() => {
  const fullPath = route.fullPath || '/'
  const segments = fullPath.split('/').filter(Boolean)

  if (segments.length === 0) return tStatic('home')

  // We want the segment before the current (parent). If only one, it's home.
  const parentSlug = segments.length > 1 ? segments[segments.length - 2] : ''
  if (!parentSlug) return tStatic('home')

  const menuItems = landingStore.landingData?.menu_items
  if (!menuItems || menuItems.length === 0) return tStatic('home')

  const parent = menuItems.find(item => item.slug === parentSlug)
  return parent ? tMenuItem(parent, 'heading') : tStatic('home')
})
</script>
<template>
  <div v-if="landingStore.landingData && designStore.sidebarDesign"
    class="absolute flex flex-col items-center justify-center w-full" :class="tailwindClasses">
    <div></div>
    <link-button class="z-50 border-t-0 rounded-t-none" :link-text="`${getParentRoute}`"
      icon-position="right" icon="arrow-up" back-btn>
    </link-button>
    <div class="self-start block w-1/2 h-6 dots-border-right justify-self-start">
    </div>
    <div class="flex flex-row self-start w-1/2 -mt-1 justify-self-start">
      <div class="flex-shrink-0 w-8 sm:w-8">
      </div>
      <div class="self-start w-full justify-self-start dots-border-top dots-border-left"
        :style="{ height: `calc(${designStore.sidebarDesign.section_heading.height}px + 12rem)` }">
      </div>
    </div>
    <div
      class="self-start -mt-5.5 rounded-full -ml-16.5 h-50 w-50 dots-border bg-base-300 animate-[spin_160s_linear_infinite] ring-7 ring-base-100">
    </div>
    <div class="self-start dots-border-right w-9"
      :style="{ height: `calc(${designStore.sidebarDesign.section_content.height - designStore.sidebarDesign.section_heading.height}px - 19.5rem)` }">
    </div>
    <div
      class="self-start size-20 mt-2 -ml-1.5 rotate-45 rounded-lg dots-border bg-base-300 pulsate-fwd ring-4 ring-base-100">
    </div>
    <div class="self-start h-15 dots-border-right w-9">
    </div>
    <div class="flex flex-row self-start w-1/2 -mt-1 justify-self-start">
      <div class="flex-shrink-0 w-8 sm:w-8">
      </div>
      <div
        class="self-start w-full justify-self-start dots-border-left sm:dots-border-top sm:dots-border-right sm:border-l-0 min-h-15"
        :style="{ height: `calc(100vh - ${designStore.sidebarDesign.section_content.height + designStore.sidebarDesign.section_heading.height}px - 3.5rem)` }">
      </div>
    </div>
    <footer class="absolute bottom-0 w-full p-1 justify-self-start">
      <footer-global></footer-global>
    </footer>
  </div>
</template>
<style></style>