<script lang="ts" setup>
const { locale, setLocale } = useI18n()

const emit = defineEmits<{ languageChanged: [value: string] }>()
interface LangOption { text: string; value: string; label: string }

const selected: Ref<'de-DE' | 'en-US'> = ref(locale.value as 'de-DE' | 'en-US')
const isOpen = ref(false)
const highlightedIndex = ref(0)

const options: Ref<LangOption[]> = ref([
  { text: 'de', value: 'de-DE', label: 'deutsch' },
  { text: 'en', value: 'en-US', label: 'english' }
])

const selectedOption = computed(() => options.value.find(o => o.value === selected.value) || null)
const dropdownRef = ref<HTMLElement | null>(null)
const optionRefs = ref<HTMLElement[]>([])

function openDropdown() {
  if (isOpen.value) return
  isOpen.value = true
  highlightedIndex.value = Math.max(0, options.value.findIndex(o => o.value === selected.value))
  nextTick(() => { optionRefs.value[highlightedIndex.value]?.focus() })
}
function closeDropdown() { if (!isOpen.value) return; isOpen.value = false }
function toggleDropdown() { isOpen.value ? closeDropdown() : openDropdown() }

function selectOption(option: LangOption) {
  if (!option) return
  selected.value = option.value as 'de-DE' | 'en-US'
  setLocale(option.value as 'de-DE' | 'en-US')
  emit('languageChanged', option.value)
  closeDropdown()
}

function moveHighlight(delta: number) {
  if (!isOpen.value) openDropdown()
  const len = options.value.length
  highlightedIndex.value = (highlightedIndex.value + delta + len) % len
  nextTick(() => optionRefs.value[highlightedIndex.value]?.focus())
}

function handleButtonKeydown(e: KeyboardEvent) {
  switch (e.key) {
    case 'Enter':
    case ' ': e.preventDefault(); toggleDropdown(); break
    case 'ArrowDown': e.preventDefault(); moveHighlight(1); break
    case 'ArrowUp': e.preventDefault(); moveHighlight(-1); break
    case 'Escape': closeDropdown(); break
  }
}
function handleOptionKeydown(e: KeyboardEvent, option: LangOption, idx: number) {
  switch (e.key) {
    case 'Enter':
    case ' ': e.preventDefault(); selectOption(option); break
    case 'ArrowDown': e.preventDefault(); highlightedIndex.value = (idx + 1) % options.value.length; optionRefs.value[highlightedIndex.value]?.focus(); break
    case 'ArrowUp': e.preventDefault(); highlightedIndex.value = (idx - 1 + options.value.length) % options.value.length; optionRefs.value[highlightedIndex.value]?.focus(); break
    case 'Home': e.preventDefault(); highlightedIndex.value = 0; optionRefs.value[0]?.focus(); break
    case 'End': e.preventDefault(); highlightedIndex.value = options.value.length - 1; optionRefs.value.at(-1)?.focus(); break
    case 'Escape': e.preventDefault(); closeDropdown(); break
  }
}

onClickOutside(dropdownRef, () => closeDropdown())
onMounted(() => { selected.value = locale.value as 'de-DE' | 'en-US' })
</script>

<template>
  <div class="relative inline-block" ref="dropdownRef">
    <!-- Trigger Button -->
    <button type="button" tabindex="0"
      class="group relative flex items-center gap-2 rounded-sm bg-primary h-7 pl-1.5 pr-1 font-semibold text-sm ring-2 ring-base-content transition-all duration-200 hover:scale-[1.03] focus:scale-[1.02] active:scale-[0.97] focus:outline-none cursor-pointer"
      :aria-expanded="isOpen" aria-haspopup="listbox" aria-label="Sprache auswählen"
      @click="toggleDropdown" @keydown="handleButtonKeydown">

      <!-- Icon globe -->
      <svg xmlns="http://www.w3.org/2000/svg"
        class="relative z-10 flex items-center justify-center size-5 !stroke-primary-content"
        viewBox="0 0 24 24">
        <path fill="none" stroke-width="2"
          d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1S1 5.925 1 12s4.925 11 11 11Zm0 0c3 0 4-5 4-11S15 1 12 1S8 6 8 12s1 11 4 11ZM2 16h20M2 8h20" />
      </svg>

      <!-- Language short code -->
      <div
        class="relative z-10 px-0.5 tracking-wide uppercase rounded-xs bg-secondary text-secondary-content ring-2 ring-secondary-content ">
        {{ selectedOption?.text }}</div>
    </button>

    <Transition enter-active-class="transition duration-150 ease-out"
      enter-from-class="scale-95 -translate-y-1 opacity-0"
      enter-to-class="scale-100 translate-y-0 opacity-100"
      leave-active-class="transition ease-in duration-120"
      leave-from-class="scale-100 translate-y-0 opacity-100"
      leave-to-class="scale-95 -translate-y-1 opacity-0">
      <div v-if="isOpen"
        class="absolute right-0 sm:!left-0 mt-1.5 z-30 min-w-36 rounded-sm bg-base-200 shadow-lg border-2 border-base-content ring-2 ring-primary p-1"
        role="listbox" :aria-activedescendant="`lang-option-${options[highlightedIndex]?.value}`">
        <ul class="flex flex-col gap-1">
          <li v-for="(option, idx) in options" :key="option.value"
            :id="`lang-option-${option.value}`">
            <button ref="optionRefs" type="button"
              class="flex items-center w-full gap-2 px-2 py-1 text-sm font-semibold transition-all duration-100 outline-none group rounded-xs text-base-content focus:ring-2 focus:ring-base-content ring-2 ring-base-content hover:bg-primary"
              :class="{
                'bg-secondary text-secondary-content ring-2 ring-secondary relative': option.value === selected,
                'ring-2 ring-transparent': option.value !== selected
              }" role="option" :aria-selected="option.value === selected"
              @click="selectOption(option)"
              @keydown="(e: KeyboardEvent) => handleOptionKeydown(e, option, idx)">
              <!-- Flag -->
              <span
                class="relative flex items-center justify-center size-6 rounded-xs ring-2 ring-base-content bg-base-100 shrink-0 *:rounded-full *:size-5.5 *:border-1 *:border-base-content">
                <!-- uk -->
                <svg v-if="option.text === 'en'" viewBox="0 0 512 512">
                  <mask id="miniEn">
                    <circle cx="256" cy="256" r="256" fill="#fff" />
                  </mask>
                  <g mask="url(#miniEn)">
                    <path fill="#eee"
                      d="m0 0l8 22l-8 23v23l32 54l-32 54v32l32 48l-32 48v32l32 54l-32 54v68l22-8l23 8h23l54-32l54 32h32l48-32l48 32h32l54-32l54 32h68l-8-22l8-23v-23l-32-54l32-54v-32l-32-48l32-48v-32l-32-54l32-54V0l-22 8l-23-8h-23l-54 32l-54-32h-32l-48 32l-48-32h-32l-54 32L68 0z" />
                    <path fill="#0052b4"
                      d="M336 0v108L444 0Zm176 68L404 176h108zM0 176h108L0 68ZM68 0l108 108V0Zm108 512V404L68 512ZM0 444l108-108H0Zm512-108H404l108 108Zm-68 176L336 404v108z" />
                    <path fill="#d80027"
                      d="M0 0v45l131 131h45zm208 0v208H0v96h208v208h96V304h208v-96H304V0zm259 0L336 131v45L512 0zM176 336L0 512h45l131-131zm160 0l176 176v-45L381 336z" />
                  </g>
                </svg>
                <!-- german -->
                <svg v-else-if="option.text === 'de'" viewBox="0 0 512 512" class="size-5">
                  <mask id="miniDe">
                    <circle cx="256" cy="256" r="256" fill="#fff" />
                  </mask>
                  <g mask="url(#miniDe)">
                    <path fill="#ffda44" d="m0 345l256.7-25.5L512 345v167H0z" />
                    <path fill="#d80027" d="m0 167l255-23l257 23v178H0z" />
                    <path fill="#333" d="M0 0h512v167H0z" />
                  </g>
                </svg>
              </span>
              <span class="flex-1 text-left capitalize">{{ option.label }}</span>
            </button>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<style scoped></style>