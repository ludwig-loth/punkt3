<script setup>
const designStore = useDesignStore();

onMounted(() => {
});
</script>
<template>
  <div class="relative flex flex-col min-h-screen overflow-hidden">
    <div class="flex-grow m-auto">
      <div class="absolute flex flex-col items-center justify-center w-full max-w-5xl">
        <div class="self-start hidden w-1/2 dots-border-right justify-self-start sm:block"
          :style="{ height: `calc(${designStore.landingPageDesign.opening_line.height}px + 6rem)` }">
        </div>
        <div class="self-start block w-1/2 dots-border-right justify-self-start sm:hidden"
          :style="{ height: `calc(${designStore.landingPageDesign.opening_line.height}px + 10rem)` }">
        </div>
        <div class="flex flex-row self-start w-1/2 -mt-1 justify-self-start">
          <div class="flex-shrink-0 w-8 sm:w-29">
          </div>
          <div
            class="self-start hidden w-full justify-self-start dots-border-top dots-border-left sm:block "
            :style="{ height: `calc(${designStore.landingPageDesign.about_me.height}px + 6rem)` }">
          </div>
          <div
            class="self-start block w-full justify-self-start dots-border-top dots-border-left sm:hidden "
            :style="{ height: `calc(${designStore.landingPageDesign.about_me.height}px + 1rem)` }">
          </div>
        </div>
        <div class="w-full -z-20">
          <div class="absolute flex flex-col self-start w-2/3 -mt-1 justify-self-start">
            <div class="flex flex-row">
              <div class="flex-shrink-0 w-8 sm:w-29">
              </div>
              <div
                class="self-start w-full h-10 justify-self-start dots-border-top dots-border-right">
              </div>
            </div>
            <div
              class="self-end -mr-40 rounded-full size-80 dots-border bg-base-300 ring-4 ring-base-100 -z-0 animate-[spin_240s_linear_infinite]">
            </div>
            <div class="flex flex-row w-full">
              <div class="flex-shrink-0 w-8 sm:w-1/3">
              </div>
              <div class="self-start w-full h-10 justify-self-start dots-border-right">
              </div>
            </div>
            <div class="flex flex-row w-full mt-1">
              <div class="flex-shrink-0 w-8 sm:w-2/5">
              </div>
              <div
                class="self-start w-full h-10 ml-0.5 justify-self-start dots-border-top dots-border-left">
              </div>
            </div>
            <div class="flex">
              <div class="flex-shrink-0 w-8 sm:w-2/5">
              </div>
              <div
                class="rounded-sm size-40 rotate-225 pulsate-fwd mt-9 -ml-19 dots-border bg-base-300 -z-0 ring-4 ring-base-100">
              </div>
            </div>
          </div>
          <div class="absolute flex flex-row justify-start w-full h-180 -z-20">
            <div class="relative w-8 sm:w-[calc(27/100*100%-0.2rem)]">
            </div>
            <div
              class="self-end h-10 mb-1 ml-0.5 w-[calc(50%-2rem)] sm:w-23/100 dots-border-bottom dots-border-left">
            </div>
            <div class="relative h-screen -ml-1 top-180 dots-border-right">
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="h-full rounded-sm mt-18 bg-base-200 -z-30"
            :style="{ height: `calc(${designStore.landingPageDesign.menu_items.height}px - 0rem)`, width: `calc(${designStore.landingPageDesign.menu_items.width}px + 6rem)` }">
          </div>
        </div>
      </div>
      <slot />
    </div>
    <footer>
      <footer-global></footer-global>
    </footer>
  </div>
</template>
<style scoped></style>