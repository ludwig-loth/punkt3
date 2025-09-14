<script setup lang="ts">
const colorMode = useColorMode()

const designStore = useDesignStore()
const isDark = computed(() => designStore.isDarkMode)

function handleToggle() {
  console.log('Toggle clicked, current isDark:', isDark.value)
  designStore.toggleTheme()
  console.log('After toggle, isDark:', designStore.isDarkMode)

  setTimeout(() => {
    const html = document.documentElement
    console.log('HTML classes after toggle:', html.classList.toString())
    console.log('Computed style base-100:', getComputedStyle(html).getPropertyValue('--color-base-100'))
  }, 100)
}
</script>
<template>
  <ColorScheme placeholder="..." tag="span">
    Color mode: <b>{{ $colorMode.preference }}</b>
    <span v-if="$colorMode.preference === 'system'">(<i>{{ $colorMode.value }}</i> mode
      detected)</span>
  </ColorScheme>
  <div>
    <h1>Color mode: {{ $colorMode.value }}</h1>
    <select v-model="$colorMode.preference">
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="sepia">Sepia</option>
    </select>
  </div>
  <select v-model="colorMode.preference"
    class="w-24 h-8 border dark:bg-gray-900 dark:text-white dark:border-gray-700">
    <option value="system">System</option>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
  </select>
  <div class="p-0">
    <label class="relative inline-flex items-center cursor-pointer group">
      <input class="hidden peer" id="toggle" type="checkbox" :checked="isDark"
        @click="handleToggle" />
      <div class="relative w-16 h-7 bg-primary rounded-sm ring-2 ring-base-content 
                  after:absolute after:content-[''] after:w-6 after:h-6 after:bg-secondary
                  after:rounded-sm after:top-0.5 after:left-0.5 after:inset-ring-2 after:inset-ring-secondary-content peer-checked:after:inset-ring-accent-content
                  active:after:w-4 group-[:hover]:after:w-8 dark:ring-base-300
                  peer-checked:after:left-[calc(100%-2px)] peer-checked:after:translate-x-[-100%]
                  duration-100 peer-checked:after:bg-accent after:duration-300">
      </div>
      <svg viewBox="0 0 24 24"
        class="absolute w-4 h-4 fill-base-content peer-checked:opacity-40 left-1.5">
        <path
          d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5ZM13,0h-2V5h2V0Zm0,19h-2v5h2v-5ZM5,11H0v2H5v-2Zm19,0h-5v2h5v-2Zm-2.81-6.78l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54ZM7.76,17.66l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54Zm0-11.31l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Zm13.44,13.44l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Z">
        </path>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg"
        class="absolute w-4 h-4 fill-base-content peer-not-checked:opacity-40 right-1.5"
        viewBox="0 0 24 24">
        <path fill="currentColor"
          d="M9.822 2.238a9 9 0 0 0 11.94 11.94C20.768 18.654 16.775 22 12 22C6.477 22 2 17.523 2 12c0-4.775 3.346-8.768 7.822-9.762Zm8.342.053L19 2.5v1l-.836.209a2 2 0 0 0-1.455 1.455L16.5 6h-1l-.209-.836a2 2 0 0 0-1.455-1.455L13 3.5v-1l.836-.209A2 2 0 0 0 15.29.836L15.5 0h1l.209.836a2 2 0 0 0 1.455 1.455Zm5 5L24 7.5v1l-.836.209a2 2 0 0 0-1.455 1.455L21.5 11h-1l-.209-.836a2 2 0 0 0-1.455-1.455L18 8.5v-1l.836-.209a2 2 0 0 0 1.455-1.455L20.5 5h1l.209.836a2 2 0 0 0 1.455 1.455Z" />
      </svg>
    </label>
  </div>
</template>
