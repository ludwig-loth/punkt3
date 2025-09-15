<script setup lang="ts">
const legalNoticeStore = useLegalNoticeStore()
const { t, tStatic } = useTranslation()
definePageMeta({
  layout: 'sidebars',
  hasSubMenu: false,
  hasHeader: false,
  scrollToTop: true
})
</script>
<template>
  <div class="flex flex-col w-full gap-3 post-content">
    <div class="p-1 rounded-sm bg-base-100">
      <div class="border-2 border-dotted rounded-sm bg-base-100 border-base-200">
        <h2 class="p-2 pb-0">{{ tStatic('legal_notice') }}</h2>
        <div class="px-2 pb-2">
          <h3 id="m46">{{ tStatic('service_provider') }}</h3>
          <div>{{ legalNoticeStore.legalNoticeData?.full_name }}</div>
          <div>{{ legalNoticeStore.legalNoticeData?.street_and_number }}</div>
          <div>{{ legalNoticeStore.legalNoticeData?.zipcode_and_town }}</div>
          <div>{{ t(legalNoticeStore.legalNoticeData, 'country') }}</div>
          <div class="flex flex-row items-center gap-2 p-2 pl-0 text-xs text-base-content/80">
            <div>
              <svg width="800px" height="800px" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg" class="size-5 fill-info">
                <path fill-rule="evenodd"
                  d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0zm8-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm.01 8a1 1 0 102 0V9a1 1 0 10-2 0v5z" />
              </svg>
            </div>
            <div>{{ t(legalNoticeStore.legalNoticeData, 'address_info') }}</div>
          </div>
          <h3 id="m56">{{ tStatic('contact') }}</h3>
          <div>E-Mail: <span>{{ legalNoticeStore.legalNoticeData?.mail_address }}</span>
          </div>
          <div>{{ tStatic('contact_form') }}: <NuxtLink to="/contact">
              {{ legalNoticeStore.legalNoticeData?.contact_form_url }}
            </NuxtLink>
          </div>
          <div v-html="t(legalNoticeStore.legalNoticeData, 'text')"
            class="pt-6"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<style></style>