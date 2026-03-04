<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()
const shortLocale = computed(() => locale.value)

definePageMeta({
    layout: 'sidebars',
    hasHeader: true,
    hasSubMenu: true,
    subMenu: {
        type: 'projects',
        headingSlug: 'portfolio'
    },
    scrollToTop: true
})

const { t, tStatic } = useTranslation()

const { data: project } = await useAsyncData(
    `project-${route.params.slug}`,
    () => queryCollection('projects')
        .where('slug', '=', String(route.params.slug))
        .where('stem', 'LIKE', `${shortLocale.value}/portfolio/%`)
        .first(),
    { watch: [shortLocale] }
)
</script>

<template>
    <div class="min-h-150">
        <div v-if="project">
            <div class="flex flex-col justify-start w-full gap-0 p-0">
                <div class="p-1 rounded-sm bg-base-100">
                    <div
                        class="flex flex-col-reverse flex-wrap p-2 border-2 border-dotted rounded-sm md:flex-row bg-base-100 border-base-200">
                        <div class="flex flex-col justify-between gap-4 md:basis-1/2">
                            <div class="border-2 rounded-sm border-base-100 w-fit">
                                <table
                                    class="text-left border-collapse rounded-sm table-auto text-secondary-content dark:text-secondary-content-dark **:border-base-100 w-fit font-medium">
                                    <tbody class="">
                                        <tr class="border-b-2">
                                            <td class="p-1">
                                                {{ tStatic('year') }}
                                            </td>
                                            <td class="p-1">
                                                <div
                                                    class="mt-0.5 transition-all rounded-full bg-secondary size-2 ">
                                                </div>
                                            </td>
                                            <td class="p-1 font-bold">{{ project.year }}</td>
                                        </tr>
                                        <tr class="border-b-2">
                                            <td class="p-1">
                                                {{ tStatic('scope') }}
                                            </td>
                                            <td class="p-1">
                                                <div
                                                    class="mt-0.5 transition-all rounded-full bg-secondary size-2 ">
                                                </div>
                                            </td>
                                            <td class="p-1 font-bold">
                                                {{ t(project, 'type') }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="p-1">
                                                {{ tStatic('my_role') }}
                                            </td>
                                            <td class="p-1">
                                                <div
                                                    class="mt-0.5 transition-all rounded-full bg-secondary size-2 ">
                                                </div>
                                            </td>
                                            <td class="p-1 font-bold">{{ t(project, 'role') }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div v-if="project.tags && project.tags.length"
                                class="flex flex-wrap gap-2">
                                <div v-for="tag in project.tags" :key="tag.id">
                                    <tag-badge :item="tag" />
                                </div>
                            </div>
                            <div class="flex flex-row flex-wrap gap-3">
                                <div v-if="project.project_url">
                                    <link-button :link="project.project_url"
                                        :link-text="tStatic('open_project')"></link-button>
                                </div>
                                <div v-if="project.source_code_url">
                                    <link-button :link="project.source_code_url"
                                        :link-text="tStatic('open_source_code')"></link-button>
                                </div>
                            </div>
                        </div>
                        <div
                            class="flex flex-col items-center justify-center gap-2 p-1 pb-3 md:pl-3 md:p-1 md:basis-1/2">
                            <div class="relative">
                                <light-box :img-src="project.post_image">
                                    <template #trigger="{ openLightbox }">
                                        <picture class="self-center flex-shrink-0 mt-0">
                                            <NuxtImg
                                                :src="project.post_image"
                                                alt="Header image of the project"
                                                class="relative object-cover object-left-top transition-transform cursor-zoom-in outline-2 rounded-xs"
                                                @click="openLightbox" />
                                        </picture>
                                    </template>
                                </light-box>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="h-1 mx-auto my-3 w-3/4 dots-border-top !border-base-300">
                </div>
                <div class="prose-project post-content">
                    <ContentRenderer v-if="project.body" :value="project" />
                </div>
            </div>
        </div>
        <div v-else class="flex flex-col items-center justify-center w-full min-h-150 md:p-8">
            <div class="w-full text-center ">
                <div
                    class="w-full p-8 mb-6 border-2 border-dotted rounded-sm bg-base-100 border-base-200">
                    <h1 class="mb-4 text-4xl font-bold tracking-wide text-base-content">
                        {{ tStatic('project_not_found') }}
                    </h1>
                    <p class="mb-6 text-lg leading-relaxed text-base-content/80">
                        {{ tStatic('project_not_found_description') }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
