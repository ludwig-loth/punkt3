<script setup lang="ts">

interface ContactForm {
  name: string;
  mail: string;
  text: string;
}

definePageMeta({
  layout: 'sidebars',
  hasSubMenu: false,
  hasHeader: true,
  scrollToTop: true
})

const contactStore = useContactStore();
const { $directus, $createItem } = useNuxtApp();
const { t, tStatic } = await useTranslation()

const contactFrom = ref<ContactForm>({
  name: '',
  mail: '',
  text: ''
});

const { textarea, input } = useTextareaAutosize({ styleProp: 'minHeight' })
const message_send = ref<boolean>(false);
const showToastDuration = ref<number>(5000);

async function sendContactForm(): Promise<void> {
  try {
    contactFrom.value.text = input.value || '';

    const response = await $fetch('/api/contactForm', {
      method: 'POST',
      body: contactFrom.value
    })

    message_send.value = true;
    contactFrom.value = {
      name: '',
      mail: '',
      text: ''
    };

    setTimeout(() => {
      message_send.value = false;
    }, showToastDuration.value);
  } catch (error: unknown) {
    console.error('Error submitting contact form:', error);
  }
}
</script>
<template>
  <div v-if="contactStore.contactData" class="flex flex-col w-full gap-3 post-content">
    <div class="p-1 rounded-sm bg-base-100">
      <div class="border-2 border-dotted rounded-sm bg-base-100 border-base-200">
        <h2 class="p-2 pb-0">{{ tStatic('social_media') }}</h2>
        <div class="px-2 pb-2" v-html="t(contactStore.contactData, 'contact_introduction')"></div>
        <div
          class="flex flex-row flex-wrap w-fit *:flex *:flex-row *:items-center *:justify-start p-2 pb-4 gap-5 relative justify-center">
          <contact-card v-for="social in contactStore.contactData?.socials || []" :key="social.id"
            :item="social" class="post-content-none">
          </contact-card>
        </div>
      </div>
    </div>
    <div v-if="contactStore.contactData.show_direct_message" class="p-1 rounded-sm bg-base-100">
      <div class="border-2 border-dotted rounded-sm bg-base-100 border-base-200">
        <h2 class="p-2 pb-0">{{ tStatic('direct_message') }}</h2>
        <div class="p-2">
          <div v-html="t(contactStore.contactData, 'direct_message_introduction')"></div>
          <div>
            <form @submit.prevent="sendContactForm"
              class="flex flex-col w-full gap-4 py-5 pl-2 md:pr-10">
              <div class="flex flex-col gap-1 group/1">
                <label
                  class="text-sm font-semibold transition-all -translate-x-1.5 -translate-y-0.5 text-base-content group-focus-within/2:text-primary-content group-focus-within/1:-translate-x-0.5 group-focus-within/1:translate-y-0.5"
                  for="name">Name</label>
                <input id="name" type="text" v-model="contactFrom.name"
                  :placeholder="tStatic('name_placeholder')"
                  class="w-full px-4 py-2 text-base transition-all rounded-tl-[0px] bg-base-100 rounded-xs placeholder:text-base-400 outline-primary outline-3 outline-offset-4 group-focus-within/1:outline-offset-0 ring-1 ring-primary-content group-focus-within/1:bg-white/50"
                  required />
              </div>
              <div class="flex flex-col gap-1 group/2">
                <label
                  class="text-sm font-semibold transition-all -translate-x-1.5 -translate-y-0.5 text-base-content group-focus-within/2:text-primary-content group-focus-within/2:-translate-x-0.5 group-focus-within/2:translate-y-0.5"
                  for="mail">E-Mail</label>
                <input id="mail" type="email" v-model="contactFrom.mail"
                  :placeholder="tStatic('mail_placeholder')"
                  class="w-full px-4 py-2 text-base transition-all rounded-tl-none bg-base-100 rounded-xs placeholder:text-base-400 outline-primary outline-3 outline-offset-4 group-focus-within/2:outline-offset-0 ring-1 ring-primary-content group-focus-within/2:bg-white/50"
                  required />
              </div>
              <div class="flex flex-col gap-1 group/3">
                <label
                  class="text-sm font-semibold transition-all -translate-x-1.5 -translate-y-0.5 text-base-content group-focus-within/3:text-primary-content group-focus-within/3:-translate-x-0.5 group-focus-within/3:translate-y-0.5"
                  for="text">{{ tStatic('message') }}</label>
                <textarea id="text" ref="textarea" v-model="input"
                  :placeholder="tStatic('message_placeholder')" rows="5"
                  class="w-full px-4 py-2 text-base resize-none transition-[outline-offset] transition-color rounded-tl-none bg-base-100 rounded-xs placeholder:text-base-400 outline-primary outline-3 outline-offset-4 group-focus-within/3:outline-offset-0 ring-1 ring-primary-content group-focus-within/3:bg-white/50"
                  required></textarea>
              </div>
              <div class="flex flex-row flex-wrap items-center gap-2">
                <action-button type="submit" :button-text="tStatic('send_message')"></action-button>
                <alert v-if="message_send" type="success" :message="tStatic('message_sent')"
                  :display-duration="showToastDuration">
                </alert>
              </div>
            </form>
          </div>
          <div class="flex flex-row items-start gap-2 p-2 text-xs text-accent-content">
            <div>
              <svg width="800px" height="800px" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg" class="size-5 fill-info">
                <path fill-rule="evenodd"
                  d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0zm8-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm.01 8a1 1 0 102 0V9a1 1 0 10-2 0v5z" />
              </svg>
            </div>
            <div v-html="t(contactStore.contactData, 'gdpr_info')"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>