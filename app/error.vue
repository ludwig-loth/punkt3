<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: {
    type: Object as () => NuxtError | undefined,
    default: undefined
  }
})

async function nav(): Promise<void> {
  await navigateTo('/')
}

// Simple fallback translations for error page
const errorTranslations: Record<string, Record<string, string>> = {
  'en-US': {
    error_server_problem: 'Server Problem',
    error_try_again: 'Please try again later',
    error_apology: 'Sorry for the inconvenience',
    error_heading_404: 'Page Not Found',
    error_404_message: 'The page you are looking for does not exist',
    home: 'Home'
  },
  'de-DE': {
    error_server_problem: 'Server Problem',
    error_try_again: 'Bitte versuchen Sie es später erneut',
    error_apology: 'Entschuldigung für die Unannehmlichkeiten',
    error_heading_404: 'Seite nicht gefunden',
    error_404_message: 'Die gesuchte Seite existiert nicht',
    home: 'Startseite'
  }
}

// Get browser language or fallback
const getLanguage = (): string => {
  if (process.client && typeof navigator !== 'undefined') {
    const browserLang = navigator.language || 'en-US'
    return browserLang.startsWith('de') ? 'de-DE' : 'en-US'
  }
  return 'en-US'
}

// Simple translation function that doesn't rely on stores
const t = (key: string): string => {
  const lang = getLanguage()
  return errorTranslations[lang]?.[key] || errorTranslations['en-US']?.[key] || key
}
</script>

<template>
  <div class="flex items-center justify-center w-full h-dvh">
    <div class="relative w-full max-w-4xl">
      <div v-if="error && error.statusCode !== 404"
        class="relative z-20 flex flex-col items-center justify-center p-5 rounded-sm gap-15 bg-base-200">
        <h2 class="flex flex-col items-center justify-center w-full text-4xl text-center">
          <p>{{ t('error_server_problem') }}</p>
        </h2>
        <div class="flex flex-col items-center justify-center w-full text-2xl text-center">
          <p>{{ t('error_try_again') }}</p>
          <p>{{ t('error_apology') }}</p>
        </div>
        <div class="flex flex-row justify-center w-full gap-8 text-xs">
          <div
            class="flex flex-col items-start justify-center p-1 rounded-sm outline-4 outline-dotted w-fit outline-error bg-base-100">
            <div>Code: {{ error?.statusCode }}</div>
            <div>{{ error }}</div>
          </div>
        </div>
      </div>
      <div v-if="error && error.statusCode === 404"
        class="relative z-20 flex flex-col items-center justify-center p-5 rounded-sm gap-15 bg-base-200">
        <h2 class="flex flex-col items-center justify-center w-full text-4xl text-center">
          <p>{{ t('error_heading_404') }}</p>
        </h2>
        <div class="flex flex-col items-center justify-center w-full text-2xl text-center">
          <p>{{ t('error_404_message') }}</p>
        </div>
        <div class="flex flex-col justify-center items-center w-full gap-8 text-xs">
          <div
            class="flex flex-col items-start justify-center p-1 rounded-sm outline-4 outline-dotted w-fit outline-error bg-base-100">
            <div>Code: {{ error?.statusCode }}</div>
          </div>
          <div>
            <link-button :link-text="`${t('home')}`" icon-position="left" icon="arrow-up" back-btn>
            </link-button>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed w-full -z-10">
      <div
        class="relative rounded-full size-120 dots-border bg-base-300 animate-[spin_160s_linear_infinite] ring-7 ring-base-100 -z-10 top-0 left-10">
      </div>
      <div
        class="relative top-0 ml-auto rotate-45 rounded-lg right-45 size-50 dots-border bg-base-300 pulsate-fwd ring-4 ring-base-100">
      </div>
    </div>
  </div>
</template>
<style scoped>
span.blockspam {
  display: none;
}
</style>