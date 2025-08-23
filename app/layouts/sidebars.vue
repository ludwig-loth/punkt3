<script setup>
const route = useRoute()

const designStore = useDesignStore();
const landingStore = useLandingStore();
const projectStore = useProjectStore();
const languageStore = useLanguageStore();

const { t, tMenuItem } = useTranslation()
const { projects } = storeToRefs(projectStore)
// Add reactive reference to landing data
const { landingData } = storeToRefs(landingStore)

const hasSubMenu = computed(() => route.meta.hasSubMenu);
const hasHeader = computed(() => route.meta.hasHeader);
const subMenuItemsPortfolio = ref({
  items: [],
  heading: null,
})

const mobileMenu = ref(false)
const mobileMenuRef = useTemplateRef('mobileMenuRef')
const section_heading = ref(null);
const section_content = ref(null);

const saveDimensions = (entries, observerName) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  designStore.setSidebarDesign(observerName, { width, height });
}

useResizeObserver(section_heading, (entries) => saveDimensions(entries, 'section_heading'))
useResizeObserver(section_content, (entries) => saveDimensions(entries, 'section_content'))
onClickOutside(mobileMenuRef, () => mobileMenu.value = false)

function setSubMenu() {
  let subMenu = {
    items: [],
    heading: null,
  }
  // Add proper null checks
  if (hasSubMenu.value && projects.value && route.path.includes("/portfolio/") && landingData.value) {
    const sortedProjects = [...projects.value].sort((a, b) => b.year - a.year);
    for (const item of sortedProjects) {
      subMenu.items.push({
        slug: item.slug,
        title: t(item, 'title'),
        icon: item.icon,
      });
    }
    const portfolioMenuItem = landingData.value.menu_items?.find(item => item.slug === 'portfolio');

    subMenu.heading = portfolioMenuItem ? tMenuItem(portfolioMenuItem, 'heading') : null;
    subMenuItemsPortfolio.value = subMenu
  }
}

// Add watchers for reactive updates
watch(landingData, () => {
  setSubMenu()
})

watch(projects, () => {
  setSubMenu()
})

watch(hasSubMenu, () => {
  setSubMenu()
})

watch(() => languageStore.currentLanguage, () => {
  setSubMenu()
})

onMounted(() => {
  setSubMenu()
});
</script>

<template>
  <div class="flex flex-col">
    <div class="flex-grow h-full m-auto">
      <sidebarBackgroundDecoration tailwind-classes="max-w-7xl" />
      <div class="flex flex-col items-center justify-center px-0 max-w-7xl sm:pl-1 lg:pr-3">
        <div v-if="hasHeader" class="w-full">
          <sidebarHeader />
        </div>
        <div v-else>
          <div class="h-40"></div>
        </div>
        <div v-if="hasSubMenu"
          class="sticky top-0 z-30 hidden h-1 m-auto left-30 lg:block bg-base-100"
          :class="`w-[calc(100%-280px)]`">
        </div>
        <div v-if="hasSubMenu"
          class="sticky z-30 hidden h-5 m-auto top-1 dots-border-left dots-border-top dots-border-right left-30 lg:block bg-base-100"
          :class="`w-[calc(100%-280px)]`">
        </div>
        <div class="flex flex-row gap-5" ref="section_content">
          <aside class="sticky z-40 hidden top-1 lg:top-5 sm:flex h-fit"
            :class="{ '!top-1': !hasSubMenu }">
            <sidebarMainMenu :submenu="subMenuItemsPortfolio" :hasSubMenu="hasSubMenu" />
          </aside>
          <section class="relative flex flex-col p-2 rounded-sm mb-14 sm:mb-11 bg-base-200">
            <div class="flex flex-col gap-8">
              <NuxtPage />
            </div>
          </section>
          <aside class="sticky z-40 hidden w-40 lg:block top-5 h-fit shrink-0">
            <sidebarMenuRight :submenu="subMenuItemsPortfolio" :active="hasSubMenu" />
          </aside>
        </div>
      </div>
    </div>
    <!-- <div v-else class="flex items-center justify-center h-screen">
            <div class="loading loading-spinner loading-lg"></div>
        </div> -->
    <div>
      <sidebarMobileMenu :submenu="subMenuItemsPortfolio" :hasSubMenu="hasSubMenu" />
    </div>
  </div>
</template>
<style>
.outline-font {
  -webkit-text-fill-color: var(--color-base-300);
  -webkit-text-stroke: 3px var(--color-base-content);
}

.outline-font-dense {
  -webkit-text-fill-color: var(--color-base-300);
  -webkit-text-stroke: 1px var(--color-base-content);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-scale-enter-active,
.v-scale-leave-active {
  transition: transform 0.25s ease;
  transform-origin: right;
}

.v-scale-enter-from,
.v-scale-leave-to {
  transform: scaleX(0);
  translate: 10px 0;
}

.v-scale-enter-to,
.v-scale-leave-from {
  transform: scaleX(1);
  translate: 0 0;
}

.v-scale-y-enter-active,
.v-scale-y-leave-active {
  transition: transform 0.25s ease;
  transform-origin: top;
}

.v-scale-y-enter-from,
.v-scale-y-leave-to {
  transform: scaleY(0);
  translate: 10px 0;
}

.v-scale-y-enter-to,
.v-scale-y-leave-from {
  transform: scaleY(1);
  translate: 0 0;
}
</style>
