<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: { 'dots-magnify': true },
  },
})

const landingStore = useLandingStore()
const projectStore = useProjectStore()
const designStore = useDesignStore()
const cvStore = useCvStore()
const contactStore = useContactStore()
const legalNoticeStore = useLegalNoticeStore()

const { locale } = useI18n()
const shortLocale = computed(() => locale.value)

// Fetch data from Nuxt Content collections
const { data: landing } = await useAsyncData(
  'landing_page',
  () => queryCollection('landing').where('stem', '=', `${shortLocale.value}/landing`).first(),
  { watch: [shortLocale] }
)

const { data: cvData } = await useAsyncData(
  'cv_data',
  () => queryCollection('cv').where('stem', '=', `${shortLocale.value}/cv`).first(),
  { watch: [shortLocale] }
)

const { data: projectPosts } = await useAsyncData(
  'projects',
  () => queryCollection('projects').where('stem', 'LIKE', `${shortLocale.value}/portfolio/%`).all(),
  { watch: [shortLocale] }
)

const { data: contact } = await useAsyncData(
  'contact',
  () => queryCollection('contact').where('stem', '=', `${shortLocale.value}/contact`).first(),
  { watch: [shortLocale] }
)

const { data: legalNotice } = await useAsyncData(
  'legalNotice',
  () => queryCollection('legalNotice').where('stem', '=', `${shortLocale.value}/legal-notice`).first(),
  { watch: [shortLocale] }
)

const loading: Ref<boolean> = ref(false)

const isLoading = computed((): boolean => {
  return loading.value ||
    !landing.value ||
    !contact.value ||
    !cvData.value ||
    !projectPosts.value ||
    !legalNotice.value
})

// Sync content data to Pinia stores for components that access them
watch([landing, projectPosts, cvData, contact, legalNotice], () => {
  if (landing.value) landingStore.setLandingData(landing.value as any)
  if (projectPosts.value) projectStore.setProjectsData(projectPosts.value as any)
  if (cvData.value) cvStore.setData(cvData.value as any)
  if (contact.value) contactStore.setData(contact.value as any)
  if (legalNotice.value) legalNoticeStore.setData(legalNotice.value as any)
}, { immediate: true })

const handleLanguageChange = (newLanguage: string): void => {
  if (newLanguage === 'de' || newLanguage === 'en') {
    locale.value = newLanguage
  } else {
    locale.value = 'en'
  }
}
</script>
<template>
  <Loader v-if="isLoading"></Loader>
  <NuxtErrorBoundary>
    <header class="relative mx-auto max-w-7xl">
      <div
        class="absolute z-50 flex flex-row-reverse justify-between w-full gap-0 p-0 px-1 sm:justify-start sm:gap-3 top-1 sm:flex-row">
        <ThemeToggle />
        <LangToggle @language-changed="handleLanguageChange" />
      </div>
    </header>
    <main>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </main>
  </NuxtErrorBoundary>
</template>
<style>
.page-enter-active,
.page-enter-leave {
  transition: opacity 0.5s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.layout-enter-active,
.layout-enter-leave {
  transition: opacity 0.5s ease;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}

.pulsate-fwd {
  -webkit-animation: pulsate-fwd 15s linear infinite both;
  animation: pulsate-fwd 15s linear infinite both;
}

@-webkit-keyframes pulsate-fwd {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  50% {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes pulsate-fwd {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  50% {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
