<script setup lang="ts">
const colorMode = useColorMode()
const isReady = ref(false)
const isDark = ref(false)

onMounted(() => {
  isDark.value = colorMode.value === 'dark'
  isReady.value = true
})

watch(
  () => colorMode.value,
  (val) => {
    isDark.value = val === 'dark'
  }
)

watch(isDark, (val) => {
  colorMode.preference = val ? 'dark' : 'light'
})
</script>
<template>
  <div class="p-0" v-if="isReady">
    <label class="relative inline-flex items-center cursor-pointer group">
      <input class="hidden peer" id="toggle" type="checkbox" v-model="isDark" />
      <div class="relative w-16 h-7 bg-primary rounded-sm ring-2 ring-base-content 
                  after:absolute after:content-[''] after:w-6 after:h-6 after:bg-secondary
                  after:rounded-sm after:top-0.5 after:left-0.5 after:inset-ring-2 after:inset-ring-secondary-content peer-checked:after:inset-ring-accent-content
                  active:after:w-4 group-[:hover]:after:w-8 
                  peer-checked:after:left-[calc(100%-2px)] peer-checked:after:translate-x-[-100%]
                  duration-100 peer-checked:after:bg-accent after:duration-300">
      </div>
      <!-- sun -->
      <svg viewBox="0 0 24 24"
        class="absolute w-4 h-4 fill-secondary-content peer-checked:opacity-40 left-1.5">
        <path
          d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5ZM13,0h-2V5h2V0Zm0,19h-2v5h2v-5ZM5,11H0v2H5v-2Zm19,0h-5v2h5v-2Zm-2.81-6.78l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54ZM7.76,17.66l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54Zm0-11.31l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Zm13.44,13.44l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Z">
        </path>
      </svg>
      <!-- moon -->
      <svg xmlns="http://www.w3.org/2000/svg"
        class="absolute w-4 h-4 fill-accent-content peer-not-checked:opacity-40 right-1.5"
        viewBox="0 0 24 24">
        <path
          d="M9.822 2.238a9 9 0 0 0 11.94 11.94C20.768 18.654 16.775 22 12 22C6.477 22 2 17.523 2 12c0-4.775 3.346-8.768 7.822-9.762Zm8.342.053L19 2.5v1l-.836.209a2 2 0 0 0-1.455 1.455L16.5 6h-1l-.209-.836a2 2 0 0 0-1.455-1.455L13 3.5v-1l.836-.209A2 2 0 0 0 15.29.836L15.5 0h1l.209.836a2 2 0 0 0 1.455 1.455Zm5 5L24 7.5v1l-.836.209a2 2 0 0 0-1.455 1.455L21.5 11h-1l-.209-.836a2 2 0 0 0-1.455-1.455L18 8.5v-1l.836-.209a2 2 0 0 0 1.455-1.455L20.5 5h1l.209.836a2 2 0 0 0 1.455 1.455Z" />
      </svg>
    </label>
  </div>
</template>
