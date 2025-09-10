<script setup lang="ts">
import type { ComputedRef } from 'vue'

const projectStore = useProjectStore()
const router = useRouter()

definePageMeta({
  layout: 'sidebars',
  hasHeader: true,
  hasSubMenu: false,
  scrollToTop: true
})

const { t, tStatic } = await useTranslation()

const config = useRuntimeConfig()
const API_URL: string = config.public.apiURL

function openProject(slug: string): void {
  router.push(`/portfolio/${slug}`)
}

const sortedProjects: ComputedRef<Project[]> = computed(() => {
  const list = (projectStore.projects ?? []) as Project[]
  return [...list].sort((a, b) => Number(b.year) - Number(a.year))
})
</script>
<template>
  <div class="flex flex-col gap-0">
    <div v-for="project in sortedProjects" :key="project.id" class="relative divider">
      <NuxtLink class="cursor-pointer" @click="openProject(project.slug)">
        <article
          class="flex flex-col gap-0 p-2 pr-3 transition-all border-2 rounded-sm group hover:ring-4 ring-primary bg-base-100 focus:ring-3 focus:scale-99 inset-ring-2 inset-ring-primary hover:inset-ring-0 focus:inset-ring-0"
          tabindex="0">
          <div class="flex flex-col justify-between md:flex-row">
            <div class="md:pr-4">
              <div class="flex flex-col flex-wrap justify-between gap-3">
                <div class="flex flex-row flex-wrap justify-between gap-1">
                  <h2 class="text-xl">
                    <span
                      class="relative inline-block z-10 after:h-[8px] after:w-[calc(100%+8px)] after:absolute after:-left-[4px] after:bottom-0 after:text-primary-content after:bg-primary after:transition-all after:-z-10 after:rounded-xs group-hover:after:h-[32px] group-hover:after:rounded-sm group-focus:after:h-[32px] group-focus:after:rounded-sm">
                      {{ t(project, 'title') }}
                    </span>
                  </h2>
                  <div
                    class="flex flex-row items-center gap-2 ml-4 font-semibold transition-transform md:hidden text-base-content group-hover:-translate-x-1 group-hover:text-accent-content group-focus:-translate-x-1 group-focus:text-accent-content">
                    <div> {{ t(project, 'type') }}</div>
                    <div class="size-2">
                      <div
                        class="size-1 mt-0.5 transition-all rounded-full bg-base-content flex-shrink-0 group-hover:size-2 group-hover:bg-accent group-focus:size-2 group-focus:bg-accent">
                      </div>
                    </div>
                    <div class="float-right font-semibold transition-transform">
                      {{ project.year }}
                    </div>
                  </div>
                </div>
                <div
                  class="flex flex-row items-center h-auto gap-1 transition-transform text-base-content group-hover:text-secondary-content group-focus:text-secondary-content">
                  <div
                    class="flex-shrink-0 w-2 h-0.5 transition-all rounded-[3px] bg-base-content group-hover:h-5 group-hover:w-1 group-hover:bg-primary group-focus:h-5 group-focus:w-1 group-focus:bg-primary">
                  </div>
                  <h2
                    class="text-sm ml-1 group-hover:!text-primary-content group-focus:!text-primary-content">
                    {{ t(project, 'subtitle') }}
                  </h2>
                </div>
              </div>
              <div class="relative flex flex-col items-center gap-0">
                <div class="py-3 md:pt-4">
                  <div class="py-2 transition-all rounded-sm md:pr-3">
                    <p class="line-clamp-4">
                      {{ t(project, 'description') }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="relative flex flex-col-reverse items-start flex-shrink-0 gap-6 mb-4 md:gap-2 md:items-end md:flex-col md:-right-2 md:mb-0">
              <div
                class="flex-row items-center hidden gap-2 ml-4 font-semibold transition-transform md:flex md:ml-1 text-base-content group-hover:-translate-x-4 group-hover:text-accent-content group-focus:-translate-x-4 group-focus:text-accent-content">
                <div> {{ t(project, 'type') }}</div>
                <div
                  class="size-1 mt-0.5 transition-all rounded-full bg-base-content flex-shrink-0 group-hover:size-2 group-hover:bg-accent group-focus:size-2 group-focus:bg-accent">
                </div>
                <div class="float-right font-semibold transition-transform">
                  {{ project.year }}
                </div>
              </div>
              <div class="flex flex-shrink-0 w-[calc(100%-1rem)] transition-transform md:w-fit">
                <picture class="self-center flex-shrink-0 w-full mt-0">
                  <div
                    class="absolute z-10 block w-[calc(100%-1rem)] mt-2 md:mt-4 transition-transform h-42 md:size-42 dots-border bg-base-300 rounded-xs group-hover:scale-x-98 group-hover:scale-y-95 group-focus:scale-97 group-hover:focus-y-95 md:group-hover:scale-95 md:group-focus:scale-95">
                  </div>
                  <NuxtImg :src="`${API_URL}/assets/${project.post_image}`"
                    alt="Header image of the project"
                    class="relative z-20 object-cover object-left-top w-full ml-2 transition-transform md:ml-4 h-42 md:size-42 outline-2 rounded-xs group-hover:-translate-x-2 group-hover:translate-y-2 group-focus:-translate-x-2 group-focus:translate-y-2 md:group-hover:-translate-x-4 md:group-hover:translate-y-4 md:group-focus:-translate-x-4 md:group-focus:translate-y-4 " />
                </picture>
                <div
                  class="md:hidden flex-shrink-0 w-1 h-43 transition-transform origin-right scale-x-0 dots-border-left !border-accent group-focus:scale-x-100 group-hover:scale-x-100 translate-y-1.5 translate-x-2.5">
                </div>
              </div>
            </div>
            <div
              class="hidden md:flex flex-shrink-0 w-1 transition-transform origin-right scale-x-0 group-focus:scale-x-100 group-hover:scale-x-100 dots-border-left !border-accent h-54 translate-x-0.75">
            </div>
          </div>
          <div class="flex items-end justify-between mt-2">
            <div class="flex flex-col gap-2 ">
              <div class="transition-all w-fit text-base-content">
                <div class="mt-1">
                  <div class="relative flex flex-row items-center gap-1">
                    <div
                      class="flex-shrink-0 w-0.5 h-3 bg-base-content transition-all absolute origin-left rounded-[3px] group-hover:w-full group-hover:h-1 group-hover:bg-secondary group-hover:-translate-y-4 group-focus:w-full group-focus:h-1 group-focus:bg-secondary group-focus:-translate-y-4">
                    </div>
                    <h2
                      class="text-sm ml-4 transition-all group-hover:!text-secondary-content group-hover:ml-3 group-focus:!text-secondary-content group-focus:ml-3">
                      {{ tStatic('primary_technologies') }}
                    </h2>
                  </div>
                </div>
              </div>
              <div v-if="project.tags && project.tags.length" class="flex flex-wrap gap-2 ml-4">
                <div v-for="tag in project.tags" :key="tag.id">
                  <tag-badge :item="tag" />
                </div>
              </div>
            </div>
          </div>
        </article>
      </NuxtLink>
      <div
        v-if="(sortedProjects?.length ?? 0) > 1 && project.id !== sortedProjects?.[sortedProjects.length - 1]?.id"
        class="h-fit mx-auto my-2 max-w-1/4 dots-border-top !border-base-300 divider">
      </div>
    </div>
  </div>
</template>
<style>
.delayed {
  transition-duration: 1s;
}
</style>