<script lang="ts" setup>

const languageStore = useLanguageStore()
const emit = defineEmits<{
  languageChanged: [value: string]
}>()
const selected: Ref<string> = ref('')
const isOpen: Ref<boolean> = ref(false)

const options: Ref<Array<{ text: string; value: string; label: string }>> = ref([
  { text: 'de', value: 'de-DE', label: 'deutsch' },
  { text: 'en', value: 'en-US', label: 'english' },
])

const selectedOption = computed(() => {
  return options.value.find(option => option.value === selected.value)
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: any) => {
  selected.value = option.value
  isOpen.value = false
  emit('languageChanged', option.value)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    isOpen.value = false
  } else if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    toggleDropdown()
  } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    if (!isOpen.value) {
      isOpen.value = true
    }
  }
}

const handleOptionKeydown = (event: KeyboardEvent, option: any) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    selectOption(option)
  }
}

const dropdownRef = ref<HTMLElement | null>(null)
onClickOutside(dropdownRef, () => {
  isOpen.value = false
})

onMounted(() => {
  selected.value = languageStore.getCurrentLanguage()
})
</script>
<template>
  <div class="absolute z-50 p-0 rounded-sm top-1 left-1">
    <div ref="dropdownRef" class="relative inline-block">
      <Transition name="v-scale">
        <button type="button" tabindex="0"
          class="flex flex-row items-start gap-1 p-0 text-sm font-semibold rounded-sm cursor-pointer text-accent-content group hover:text-base-content focus:text-base-content active:scale-97"
          :class="{ 'w-25 outline-2 outline-primary border-2 border-base-conent bg-base-100 h-25 shadow-lg ': isOpen, 'w-fit hover:scale-105': !isOpen }"
          @click="toggleDropdown" @keydown="handleKeydown" :aria-expanded="isOpen"
          aria-haspopup="listbox" aria-label="Sprache auswählen">
          <div class="relative bg-primary *:relative *:z-20 *:p-1 *:size-7 *:stroke-accent-content"
            :class="{ 'rounded-l-xs': isOpen, 'rounded-sm': !isOpen }">
            <svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
              fill="none">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M12 2C15 4 15.9228 8.29203 16 12C15.9228 15.708 15 20 12 22M12 2C9 4 8.07725 8.29203 8 12C8.07725 15.708 9 20 12 22M12 2C6.47715 2 2 6.47715 2 12M12 2C17.5228 2 22 6.47715 22 12M12 22C17.5229 22 22 17.5228 22 12M12 22C6.47716 22 2 17.5228 2 12M22 12C20 15 15.708 15.9228 12 16C8.29203 15.9228 4 15 2 12M22 12C20 9 15.708 8.07725 12 8C8.29203 8.07725 4 9 2 12"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </g>
            </svg>
          </div>
          <span
            class="mt-1 text-sm font-medium text-primary-content group-hover:text-primary-content">
            {{ selectedOption?.text }}
          </span>
        </button>
      </Transition>
      <div v-if="isOpen" role="listbox" :aria-activedescendant="`option-${selected}`"
        class="absolute z-20 mt-1.5  right-1.5 top-7 bg-base-100 w-22 space-y-1 group/option">
        <div v-for="option in options" :key="option.value" :id="`option-${option.value}`"
          role="option" :aria-selected="option.value === selected" :tabindex="0"
          @click="selectOption(option)" @keydown="handleOptionKeydown($event, option)"
          class="flex items-center gap-2 px-1.5 py-1 text-sm font-semibold cursor-pointer  focus:bg-primary focus:outline-none hover:bg-primary hover:outline-primary rounded-xs"
          :class="{
            'bg-base-300 text-base-content outline-3 outline-secondary': option.value === selected,
            'text-base-content': option.value !== selected
          }">
          <span
            class="flex items-center rounded-full outline-2 size-4 outline-base-content shrink-0 -left-0.5 relative">
            <svg v-if="option.text === 'en'" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512">
              <mask id="circleFlagsLangEn0">
                <circle cx="256" cy="256" r="256" fill="#fff" />
              </mask>
              <g mask="url(#circleFlagsLangEn0)">
                <path fill="#eee"
                  d="m0 0l8 22l-8 23v23l32 54l-32 54v32l32 48l-32 48v32l32 54l-32 54v68l22-8l23 8h23l54-32l54 32h32l48-32l48 32h32l54-32l54 32h68l-8-22l8-23v-23l-32-54l32-54v-32l-32-48l32-48v-32l-32-54l32-54V0l-22 8l-23-8h-23l-54 32l-54-32h-32l-48 32l-48-32h-32l-54 32L68 0z" />
                <path fill="#0052b4"
                  d="M336 0v108L444 0Zm176 68L404 176h108zM0 176h108L0 68ZM68 0l108 108V0Zm108 512V404L68 512ZM0 444l108-108H0Zm512-108H404l108 108Zm-68 176L336 404v108z" />
                <path fill="#d80027"
                  d="M0 0v45l131 131h45zm208 0v208H0v96h208v208h96V304h208v-96H304V0zm259 0L336 131v45L512 0zM176 336L0 512h45l131-131zm160 0l176 176v-45L381 336z" />
              </g>
            </svg>
            <svg v-else-if="option.text === 'de'" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512">
              <mask id="circleFlagsDe0">
                <circle cx="256" cy="256" r="256" fill="#fff" />
              </mask>
              <g mask="url(#circleFlagsDe0)">
                <path fill="#ffda44" d="m0 345l256.7-25.5L512 345v167H0z" />
                <path fill="#d80027" d="m0 167l255-23l257 23v178H0z" />
                <path fill="#333" d="M0 0h512v167H0z" />
              </g>
            </svg>
          </span>
          {{ option.label }}
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>