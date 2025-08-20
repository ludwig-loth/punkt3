<script setup>
const designStore = useDesignStore();
const globalStore = useGlobalStore();
const projectStore = useProjectStore();
const route = useRoute()

const { t, tMenuItem } = useTranslation()

const getFirstLetter = computed(() => {
  return (heading) => heading ? heading.charAt(0) : '';
});

const headerData = computed(() => {
  let headerData = {}

  if (route.params.slug) {
    // Handle project pages
    for (const item of projectStore.projects) {
      if (item.slug === route.params.slug) {
        // Find the portfolio menu item for the group
        const portfolioMenuItem = globalStore.landingPageData.menu_items?.find(
          menuItem => menuItem.global_menu_items_id.slug === 'portfolio'
        );

        headerData = {
          heading: t(item, 'title'),
          subheading: t(item, 'subtitle'),
          icon: item.icon,
          group: portfolioMenuItem ? tMenuItem(portfolioMenuItem, 'heading') : null
        };
      }
    }
  } else if (route.name) {
    // Handle main pages
    const menuItem = globalStore.landingPageData.menu_items?.find(
      item => item.global_menu_items_id.slug === route.name
    );

    if (menuItem) {
      headerData = {
        heading: tMenuItem(menuItem, 'heading'),
        subheading: tMenuItem(menuItem, 'subheading'),
        icon: null
      };
    }
  }

  return headerData
})

const section_heading = ref(null);

const saveDimensions = (entries, observerName) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  designStore.setSidebarDesign(observerName, { width, height });
}

onMounted(() => {
  useResizeObserver(section_heading, (entries) => saveDimensions(entries, 'section_heading'))
}); 
</script>

<template>
  <div v-if="globalStore.landingPageData"
    class="z-10 flex flex-col flex-grow w-full px-3 pb-10 sm:px-0" ref="section_heading">
    <div class="flex flex-row items-start gap-1 pl-1 mt-10 sm:gap-3 sm:mb-6 sm:mt-22">
      <picture class="relative z-10 self-center flex-shrink-0 size-12 sm:size-16" ref="heroImg">
        <div
          class="absolute block mt-2 sm:mt-4 size-12 sm:size-16 -z-10 dots-border bg-base-300 rounded-xs ring-4 ring-base-100">
        </div>
        <div
          class="flex items-center justify-center ml-2 sm:ml-4 size-12 sm:size-16 outline-2 rounded-xs bg-base-200">
          <h1 v-if="!headerData.icon"
            class="font-league-spartan !text-base-300 outline-font text-4xl sm:text-5xl w-fit h-fit "
            :class="['Ä', 'Ü', 'Ö', 'ä', 'ü', 'ö'].includes(getFirstLetter(headerData.heading)) ? 'mt-6' : 'mt-3'">
            {{ getFirstLetter(headerData.heading) }}
          </h1>
          <NuxtImg v-else :src="headerData.icon" alt="Icon"
            class="absolute mt-4 opacity-0 size-12 sm:size-16 -z-10 rounded-xs" />
        </div>
      </picture>
      <div class="flex flex-col px-5 rounded-sm mt-11 bg-base-100 sm:mt-0">
        <div class="flex flex-row h-5 gap-1 text-sm text-gray-500">
          <h2 v-show="headerData.group"> {{ headerData.group }} </h2>
        </div>
        <h1 ref="heading" class="mt-2 text-3xl break-all sm:text-4xl font-league-spartan">
          {{ headerData.heading }}
        </h1>
        <div class="min-h-6">{{ headerData.subheading }}</div>
      </div>
    </div>
  </div>
</template>
<style></style>