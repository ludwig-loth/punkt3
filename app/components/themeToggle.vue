<script setup lang="ts">
const designStore = useDesignStore()

const emit = defineEmits<{
  (e: 'themeChanged', theme: 'light' | 'dark'): void
}>()

function toggleTheme(): void {
  designStore.toggleTheme()
  emit('themeChanged', designStore.isDarkMode ? 'dark' : 'light')
}

onMounted(() => {
  designStore.initTheme()
})
</script>
<template>
  <div class="p-0">
    <label class="relative inline-flex items-center cursor-pointer group" @click="toggleTheme">
      <input class="hidden peer" id="toggle" type="checkbox" />
      <div class="relative w-16 h-7 bg-primary rounded-sm ring-2 ring-base-content
                  after:absolute after:content-[''] after:w-6 after:h-6 after:bg-secondary
                  after:rounded-sm after:top-0.5 after:left-0.5
                  active:after:w-4 group-[:hover]:after:w-8
                  peer-checked:after:left-[calc(100%-2px)] peer-checked:after:translate-x-[-100%]
                  duration-100 peer-checked:after:bg-accent after:duration-300">
      </div>
      <svg viewBox="0 0 24 24"
        class="absolute w-4 h-4 fill-base-content peer-checked:opacity-40 left-1.5">
        <path
          d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5ZM13,0h-2V5h2V0Zm0,19h-2v5h2v-5ZM5,11H0v2H5v-2Zm19,0h-5v2h5v-2Zm-2.81-6.78l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54ZM7.76,17.66l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54Zm0-11.31l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Zm13.44,13.44l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Z">
        </path>
      </svg>
      <svg viewBox="0 0 24 24"
        class="absolute w-4 h-4 fill-base-content peer-not-checked:opacity-40 right-1.5">
        <path
          d="M12.009,24A12.067,12.067,0,0,1,.075,10.725,12.121,12.121,0,0,1,10.1.152a13,13,0,0,1,5.03.206,2.5,2.5,0,0,1,1.8,1.8,2.47,2.47,0,0,1-.7,2.425c-4.559,4.168-4.165,10.645.807,14.412h0a2.5,2.5,0,0,1-.7,4.319A13.875,13.875,0,0,1,12.009,24Zm.074-22a10.776,10.776,0,0,0-1.675.127,10.1,10.1,0,0,0-8.344,8.8A9.928,9.928,0,0,0,4.581,18.7a10.473,10.473,0,0,0,11.093,2.734.5.5,0,0,0,.138-.856h0C9.883,16.1,9.417,8.087,14.865,3.124a.459.459,0,0,0,.127-.465.491.491,0,0,0-.356-.362A10.68,10.68,0,0,0,12.083,2ZM20.5,12a1,1,0,0,1-.97-.757l-.358-1.43L17.74,9.428a1,1,0,0,1,.035-1.94l1.4-.325.351-1.406a1,1,0,0,1,1.94,0l.355,1.418,1.418.355a1,1,0,0,1,0,1.94l-1.418.355-.355,1.418A1,1,0,0,1,20.5,12ZM16,14a1,1,0,0,0,2,0A1,1,0,0,0,16,14Zm6,4a1,1,0,0,0,2,0A1,1,0,0,0,22,18Z">
        </path>
      </svg>
    </label>
  </div>
</template>
