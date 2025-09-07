<script setup>
const landingStore = useLandingStore();
const designStore = useDesignStore();
const route = useRoute()
const { tMenuItem, tStatic } = await useTranslation()

const props = defineProps({
  submenu: {
    type: Object,
    default: () => ({
      items: []
    })
  },
  hasSubMenu: {
    type: Boolean,
    default: false,
  },
  mobile: {
    type: Boolean,
    default: false
  }
})
const isActiveOrChild = (menuItemPath) => {
  return route.fullPath === menuItemPath || route.fullPath.startsWith(menuItemPath + '/');
};

const menuItems = computed(() => {
  return landingStore.landingData?.menu_items || []
})


const menuRef = ref(null)
const mainMenuRef = useTemplateRef('mainMenuRef')

const saveDimensions = (entries, observerName) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  designStore.setSidebarDesign(observerName, { width, height });
}

onMounted(() => {
  useResizeObserver(mainMenuRef, (entries) => saveDimensions(entries, 'main_menu'))

})
</script>
<template>
  <div v-if="hasSubMenu && designStore.sidebarDesign.main_menu"
    class="absolute self-start hidden w-9 -z-10 top-5 dots-border-bottom dots-border-top dots-border-right left-35 sm:block lg:hidden"
    :style="{ height: `calc(${designStore.sidebarDesign.main_menu.height}px + 1.25rem)` }">
  </div>
  <nav v-if="landingStore.landingData"
    class="z-0 flex flex-col flex-none w-40 gap-2 mt-2 text-sm h-fit" ref="menuRef">
    <div
      class="p-1 outline-2 outline-base-content bg-base-100 w-40 h-[calc(100%+20px)] -z-20 -mt-2 rounded-sm"
      ref="mainMenuRef">
      <h2
        class="relative flex flex-row items-center justify-between gap-1 p-2 mb-1 text-sm rounded-sm bg-base-200">
        {{ tStatic('main_menu') }}
        <svg v-if="hasSubMenu" width="100%" height="100%" viewBox="0 0 401 512" version="1.1"
          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
          xml:space="preserve" xmlns:serif="http://www.serif.com/"
          style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
          class="relative rotate-90 lg:rotate-0 size-5 stroke-base-content fill-base-content left-1">
          <g transform="matrix(1,0,0,1,-59.7367,-7.59393e-14)">
            <g transform="matrix(1,0,0,1.02103,4.41063,-3.17039)">
              <path
                d="M70.956,240C99.394,255.022 409.797,255.022 440.074,240C467.103,226.589 456.158,174.37 431.659,149.87L305.644,23.856C277.977,-3.812 233.052,-3.812 205.385,23.856L79.37,149.87C54.871,174.37 44.275,225.907 70.956,240Z" />
            </g>
            <g transform="matrix(3.69478,0,0,3.90683,-9.76677,27.2044)">
              <circle cx="73.946" cy="96.763" r="27.326" />
            </g>
          </g>
        </svg>
      </h2>
      <div class="flex flex-col gap-2 py-1 px-1.5 mb-1 overflow-y-auto max-h-72 custom-scrollbar"
        :class="menuItems.length > 5 ? 'w-41.5 pr-2.5' : 'w-full'">
        <NuxtLink href="/">
          <div class="relative transition-all active:scale-97 hover:scale-103 ">
            <div
              class="flex p-1 transition-all border-2 rounded-sm cursor-pointer hover:outline-0 outline-primary bg-base-100 peer">
              <div class="flex flex-col justify-start align-middle">
                <div class="flex items-center align-middle">
                  <h2 class="mt-1">
                    {{ tStatic('home') }}
                  </h2>
                </div>
              </div>
            </div>
            <div
              class="absolute -bottom-[3px] h-[calc(100%+6px)] w-[calc(100%+6px)] -left-[3px] bg-primary -z-10  scale-y-10 origin-bottom peer-hover:color-primary-content peer-hover:scale-y-100 transition-transform rounded-sm">
            </div>
          </div>
        </NuxtLink>
        <div v-for="item in menuItems" :key="item.slug">
          <NuxtLink :href="`/${item.slug}`">
            <div class="relative transition-all"
              :class="{ 'active:scale-97 hover:scale-103': !isActiveOrChild(`/${item.slug}`), 'hover:scale-103': (isActiveOrChild(`/${item.slug}`) && hasSubMenu) }">
              <div
                class="flex items-center p-1 transition-all border-2 rounded-sm cursor-default outline-secondary bg-base-100 peer"
                :class="{
                  'scale-95 bg-base-300 outline-3': isActiveOrChild(`/${item.slug}`),
                  'bg-base-100 hover:outline-0 cursor-pointer': !isActiveOrChild(`/${item.slug}`),
                  '!outline-0 cursor-pointer hover:scale-100': (isActiveOrChild(`/${item.slug}`) && hasSubMenu)
                }">
                <div class="flex flex-col justify-start align-middle">
                  <div class="flex items-center align-middle">
                    <h2 class="mt-1">{{ tMenuItem(item, 'heading') }}</h2>
                  </div>
                </div>
              </div>
              <div
                class="absolute -bottom-[3px] h-[calc(100%+6px)] w-[calc(100%+6px)] -left-[3px]  mx-auto bg-primary  origin-bottom scale-y-0 transition-transform rounded-sm -z-10"
                :class="{ 'peer-hover:color-primary-content peer-hover:scale-y-100 scale-y-10': (!isActiveOrChild(`/${item.slug}`) || hasSubMenu) }">
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div v-if="hasSubMenu" class="hidden sm:block lg:hidden">
      <sidebarMenuRight :submenu="submenu" :active="hasSubMenu" />
    </div>
  </nav>
</template>
<style></style>