<script setup lang="ts">
interface Props {
  item: Social;
}
const props = defineProps<Props>()

const config = useRuntimeConfig()
const API_URL = config.public.apiURL

</script>
<template>
  <div>
    <a :href="item.link" target="_blank"
      class="relative flex items-center w-full gap-2 transition-all border-2 rounded-sm cursor-pointer group focus:ring-4 focus:ring-primary bg-accent hover:outline-4 hover:outline-primary post-content-none border-base-content "
      style="text-decoration: none;" tabindex="0">
      <div class="flex items-center w-full gap-2 p-0 group-hover:bg-accent group-hover:rounded-xs">
        <div
          class="relative flex-shrink-0 p-1 rounded-l-xs bg-primary group-hover:bg-transparent group-hover:scale-112 light">
          <NuxtImg :src="`${API_URL}/assets/${item.icon}`" alt="icon"
            class="object-contain p-0.5 size-8 bg-white rounded-[100%] transition-[border-radius] group-hover:rounded-[2px] group-hover:outline-2 group-hover:outline-accent" />
        </div>
        <div
          class="flex flex-col items-start w-full h-full gap-0 pr-4 transition-all group-hover:text-secondary-content text-accent-content">
          <div class="!m-0 text-md font-bold">
            {{ item.name }}
          </div>
        </div>
      </div>
    </a>
  </div>
</template>
<style scoped></style>