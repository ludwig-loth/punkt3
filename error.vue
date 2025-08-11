<script setup lang="ts">
import type { NuxtError } from '#app'
const router = useRouter();
const route = useRoute();
const languageStore = useLanguageStore()
const { tStatic } = useTranslation()

const props = defineProps({
  error: Object as () => NuxtError
})

const encEmail = "aW5mb0BsdWR3aWdsb3RoLmRl";
function mailTo() {
  const mail = document.getElementById("mail");
  mail?.setAttribute("href", "mailto:".concat(atob(encEmail)));
}

async function nav() {
  await navigateTo('/')
}
onMounted(async () => {
  if (!languageStore.staticTranslations || Object.keys(languageStore.staticTranslations).length === 0) {
    await languageStore.initLanguage()
  }
})
</script>

<template>
  <div class="flex items-center justify-center w-full h-screen">
    <div class="relative w-full max-w-4xl">
      <div v-if="error.statusCode !== 404"
        class="relative z-20 flex flex-col items-center justify-center p-5 rounded-sm gap-15 bg-base-200">
        <h2 class="flex flex-col items-center justify-center w-full text-4xl text-center">
          <p>{{ tStatic('error_server_problem') }}</p>
        </h2>
        <div class="flex flex-col items-center justify-center w-full text-2xl text-center">
          <p>{{ tStatic('error_try_again') }}</p>
          <p>{{ tStatic('error_apology') }}</p>
        </div>
        <div class="flex flex-row justify-center w-full gap-8 text-xs">
          <div class="flex flex-col gap-2">
          {{ tStatic('error_contact_info') }}
            <a id="mail" href="" class="p-1 bg-primary w-fit rounded-xs" @click="mailTo">
              <span class="blockspam" aria-hidden="true">Anti spam detection</span>
              info@<!-- sdfjsdhfkjypcsasdasdweqrvreq -->ludwigloth.de
            </a>
            <div class="text-[10px]">
              {{ tStatic('error_include_info') }}
            </div>
          </div>
          <div
            class="flex flex-col items-start justify-center p-1 rounded-sm outline-4 outline-dotted w-fit outline-error bg-base-100">
            <div>Code: {{ error.statusCode }}</div>
            <div>{{ error }}</div>
          </div>
        </div>
      </div>
      <div v-if="error.statusCode === 404"
        class="relative z-20 flex flex-col items-center justify-center p-5 rounded-sm gap-15 bg-base-200">
        <h2 class="flex flex-col items-center justify-center w-full text-4xl text-center">
          <p>{{ tStatic('error_heading_404') }}</p>
        </h2>
        <div class="flex flex-col items-center justify-center w-full text-2xl text-center">
          <p>{{ tStatic('error_404_message') }}</p>
        </div>
        <div class="flex flex-row justify-center w-full gap-8 text-xs">
          <div
            class="flex flex-col items-start justify-center p-1 rounded-sm outline-4 outline-dotted w-fit outline-error bg-base-100">
            <NuxtLink @click="nav()" class="text-2xl font-bold cursor-pointer">
              {{ tStatic('home') }}
            </NuxtLink>
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