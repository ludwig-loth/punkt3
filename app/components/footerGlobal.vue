<script setup lang="ts">
const { tStatic } = useTranslation()
const legalNoticeStore = useLegalNoticeStore()
</script>
<template>
  <div class="relative flex items-end justify-start p-1 mx-auto md:h-12 max-w-7xl">
    <div
      class="flex flex-col-reverse items-start gap-2 p-1 px-2 text-sm rounded-sm sm:flex-row md:justify-center bg-base-100">
      <div class="flex items-center justify-center h-full gap-1 text-base-content">
        <!-- icon copyright -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" class="mt-0.5 size-3">
          <path fill="currentColor"
            d="M512 1024q-139 0-257-68.5T68.5 769T0 512t68.5-257T255 68.5T512 0t257 68.5T955.5 255t68.5 257t-68.5 257T769 955.5T512 1024zm0-896q-104 0-192.5 51.5t-140 140T128 512t51.5 192.5t140 140T512 896t192.5-51.5t140-140T896 512t-51.5-192.5t-140-140T512 128zm222 304q-6 21-23 34.5T672 480q-8 0-16-3t-13-6t-11.5-10t-9-10t-7-10.5t-5.5-8.5q-39-48-98-48q-53 0-90.5 37.5T384 512t37.5 90.5T512 640q59 0 98-48q2-2 9.5-13.5t12.5-17t16-11.5t24-6q22 0 39 13.5t23 34.5q1 4 2 11t-3.5 23.5T714 656q-37 50-90 81t-112 31q-106 0-181-75t-75-181t75-181t181-75q61 0 114.5 31.5T717 371q12 11 16 26.5t2 25.5z" />
        </svg>
        {{ legalNoticeStore.legalNoticeData?.full_name }}
      </div>
      <div class="hidden sm:block">|</div>
      <NuxtLink to="/legal-notice" class="text-sm font-medium text-base-content link-highlight">
        {{ tStatic('legal_notice') }}
      </NuxtLink>
      <div class="hidden sm:block">|</div>
      <div class="flex items-center justify-center h-full gap-1 text-xs text-base-content">
        <div><span class="hidden pr-2 md:inline">powered by</span>
          <a href="https://github.com/ludwig-loth/punkt3" target="_blank" rel="noopener"
            class="text-sm font-medium text-base-content link-highlight">
            PUNKT3
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>