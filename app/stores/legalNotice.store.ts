import { defineStore } from 'pinia'
import { type Ref } from "vue";

export const useLegalNoticeStore = defineStore('LegalNotice', () => {
  const legalNoticeData: Ref<LegalNotice | null> = ref(null);

  function setData(legalNoticeDate: LegalNotice) {
    legalNoticeData.value = legalNoticeDate;
  }

  function clearStore() {
    legalNoticeData.value = null;
  }

  return {
    setData,
    clearStore,
    legalNoticeData,
  } as const;
})
