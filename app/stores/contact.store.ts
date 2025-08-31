import { defineStore } from 'pinia'
import { type Ref } from "vue";

export const useContactStore = defineStore('Contact', () => {
  const contactData: Ref<Contact | null> = ref(null);

  function setData(contact: Contact) {
    contactData.value = contact;
  }

  function clearStore() {
    contactData.value = null;
  }

  return {
    setData,
    clearStore,
    contactData
  } as const;
})
