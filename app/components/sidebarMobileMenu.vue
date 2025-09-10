<script setup >
const landingStore = useLandingStore();
const { tStatic } = await useTranslation()

const menuItems = computed(() => {
  return landingStore.landingData.menu_items
})
const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  submenu: {
    type: Object,
    default: () => ({
      items: [],
    })
  },
  hasSubMenu: {
    type: Boolean,
    default: false,
  },
})

const mobileMenuOpen = ref(false)
const mobileMenuRef = useTemplateRef('mobileMenuRef')
onClickOutside(mobileMenuRef, () => mobileMenuOpen.value = false)

</script>
<template>
  <Transition>
    <div v-if="mobileMenuOpen"
      class="fixed inset-0 min-w-[100dvw] min-h-[100dvh] transition-all opacity-50 z-100 bg-neutral">
    </div>
  </Transition>
  <div v-if="landingStore.landingData" ref="mobileMenuRef"
    class="fixed z-110 bottom-2 right-2 sm:hidden">
    <div class="flex flex-col items-end justify-end gap-4">
      <Transition name="v-scale">
        <div v-if="mobileMenuOpen"
          class="absolute flex flex-row items-center justify-center gap-4 p-4 pr-6 rounded-tl-sm max-w-96 min-w-50 -bottom-4 -right-4 pb-15 bg-base-100 ring-4 ring-primary outline-2 outline-base-content shrink-0 dots-background">
          <sidebarMainMenu :submenu="menuItems" mobile>
          </sidebarMainMenu>
          <sidebarMenuRight :active="hasSubMenu" :submenu="submenu" class="z-10" :icon="false"
            :btns="false" mobile> </sidebarMenuRight>
        </div>
      </Transition>
      <button :title="tStatic('menu')"
        class="relative flex flex-row-reverse items-center justify-between h-8 p-1 text-xl transition-all duration-300 cursor-pointer rounded-xs ring-2 ring-base-content w-28 bg-accent z-90 font-league-spartan text-base-content group"
        @click="mobileMenuOpen = !mobileMenuOpen"
        :class="{ 'w-44': mobileMenuOpen, 'w-86': hasSubMenu && mobileMenuOpen }">
        <div
          class="absolute z-10 w-6 h-6 transition-[width] origin-left bg-primary group-hover:w-[calc(100%-.5rem)] group-focus:w-[calc(100%-.5rem)] group-hover:rounded-xs rounded-sm mx-auto">
        </div>
        <div class="relative rounded-sm bg-primary">
          <svg width="100%" height="100%" viewBox="0 0 512 512" version="1.1"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            xml:space="preserve" xmlns:serif="http://www.serif.com/"
            style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
            class="relative z-20 size-4 stroke-base-content fill-base-content right-1">
            <g :class="{ 'scale-0': mobileMenuOpen }" class="transition-all origin-center">
              <g transform=" matrix(8.2064e-17,-1.34021,1.4382,8.80645e-17,-3.79787e-14,784.062)">
                <path
                  d="M300,29.881C300,13.389 285.632,0 267.935,0L235.065,0C217.368,0 203,13.389 203,29.881L203,326.119C203,342.611 217.368,356 235.065,356L267.935,356C285.632,356 300,342.611 300,326.119L300,29.881Z" />
              </g>
              <g transform="matrix(8.2064e-17,-1.34021,0.955056,5.84803e-17,7.57172e-14,597.062)">
                <path
                  d="M300,44.997C300,20.162 285.632,0 267.935,0L235.065,0C217.368,0 203,20.162 203,44.997L203,311.003C203,335.838 217.368,356 235.065,356L267.935,356C285.632,356 300,335.838 300,311.003L300,44.997Z" />
              </g>
              <g transform="matrix(8.2064e-17,-1.34021,1.4382,8.80645e-17,-3.79787e-14,402.062)">
                <path
                  d="M300,29.881C300,13.389 285.632,0 267.935,0L235.065,0C217.368,0 203,13.389 203,29.881L203,326.119C203,342.611 217.368,356 235.065,356L267.935,356C285.632,356 300,342.611 300,326.119L300,29.881Z" />
              </g>
              <g transform="matrix(2.35986,0,0,2.44389,273.013,25.3025)">
                <circle cx="73.946" cy="96.763" r="27.326" />
              </g>
            </g>
            <g transform="matrix(1,0,0,1,0.114903,0.114903)" :class="{ 'scale-0': !mobileMenuOpen }"
              class="transition-all origin-center">
              <g transform="matrix(0.947669,-0.947669,1.28069,1.28069,-210.301,266.377)">
                <path
                  d="M300,23.727C300,10.632 285.632,0 267.935,0L235.065,0C217.368,0 203,10.632 203,23.727L203,332.273C203,345.368 217.368,356 235.065,356L267.935,356C285.632,356 300,345.368 300,332.273L300,23.727Z" />
              </g>
              <g transform="matrix(-0.947669,-0.947669,-0.960567,0.960567,608.339,380.339)">
                <path
                  d="M300,31.635C300,14.175 285.632,0 267.935,0L235.065,0C217.368,0 203,14.175 203,31.635L203,324.365C203,341.825 217.368,356 235.065,356L267.935,356C285.632,356 300,341.825 300,324.365L300,31.635Z" />
              </g>
              <g transform="matrix(2.35986,0,0,2.44389,273.013,-169.698)">
                <circle cx="73.946" cy="96.763" r="27.326" />
              </g>
            </g>
          </svg>
        </div>

        <div class="z-20 px-1 mt-1">{{ tStatic('menu') }}</div>
      </button>
    </div>
  </div>
  <!-- Wurstfingerzone -->
  <div
    class="fixed bottom-0 right-0 w-32 h-12 rounded-tl z-105 sm:hidden bg-base-300 outline-0 outline-dotted outline-base-100 ring-5 ring-base-content inset-ring-0 inset-ring-base-content"
    @click="mobileMenuOpen = !mobileMenuOpen">
  </div>
  <!-- <div class="fixed bottom-0 right-0 z-20 rounded-tl w-33 h-13 sm:hidden"
    @click="mobileMenuOpen = !mobileMenuOpen">
  </div> -->
</template>
<style>
.dots-background {

  background-image: radial-gradient(rgba(208, 182, 161, 0.15) 2px, transparent 0);
  background-size: 20px 20px;
  background-position: 0px 0px;
}
</style>