<script setup lang="ts">
const projectStore = useProjectStore()
const config = useRuntimeConfig()
const API_URL: string = config.public.apiURL
const route = useRoute()

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

const { t, tStatic } = await useTranslation()

const project: Ref<Project | null> = ref(null)

const slug = computed(() => String(route.params.slug || ''))

watchEffect(() => {
    if (!slug.value) {
        project.value = null
        return
    }
    const list = projectStore.projects as Project[] | undefined
    project.value = list?.find(p => p.slug === slug.value) || null
})
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
                                    class="text-left border-collapse rounded-sm table-auto text-secondary-content **:border-base-100 w-fit font-medium">
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
                                    <tag-pill :item="tag" />
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
                                <light-box :img-src="`${API_URL}/assets/${project.post_image}`">
                                    <template #trigger="{ openLightbox }">
                                        <picture class="self-center flex-shrink-0 mt-0">
                                            <NuxtImg
                                                :src="`${API_URL}/assets/${project.post_image}`"
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
                <div v-for="(block, index) in project.content_blocks" :key="block.id">
                    <div :class="block.divider_at_bottom ? '' : 'rounded-t-sm bg-base-100'">
                        <div class="relative p-1"
                            :class="block.divider_at_bottom ? 'rounded-sm bg-base-100' : ''">
                            <div
                                class="p-1 border-2 border-dotted rounded-sm bg-base-100 border-base-200">
                                <h2 v-if="block.show_heading"
                                    class="p-2 font-sans text-2xl text-base-content">
                                    {{ t(block, 'heading') }}
                                </h2>
                                <div class="clearfix gap-4"
                                    :class="{ 'flex flex-col-reverse': block.image_position === 'bottom', 'flex-col flex': block.image_position === 'top' }">
                                    <div v-if="block.image"
                                        :class="{ 'float-left w-1/2 bg-base-100': block.image_position === 'left', 'float-right w-1/2 bg-base-100': block.image_position === 'right' }">
                                        <picture
                                            class="flex flex-col items-center self-center flex-shrink-0 w-full p-3 pb-0">
                                            <light-box :img-src="`${API_URL}/assets/${block.image}`"
                                                :caption="t(block, 'image_caption')">
                                                <template #trigger="{ openLightbox }">
                                                    <NuxtImg
                                                        :src="`${API_URL}/assets/${block.image}`"
                                                        :alt="t(block, 'image_caption')"
                                                        class="relative object-cover object-center transition-transform cursor-zoom-in outline-2 rounded-xs max-h-96"
                                                        @click="openLightbox" />
                                                </template>
                                            </light-box>
                                            <caption v-if="block.translations?.[0]?.image_caption"
                                                class="mt-2 text-sm italic font-semibold text-secondary-content ">
                                                {{ t(block, 'image_caption') }}
                                            </caption>
                                        </picture>
                                    </div>
                                    <p v-html="t(block, 'text')" class="p-1 post-content">
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            v-if="block.divider_at_bottom && index !== project.content_blocks.length - 1">
                            <div
                                class="h-fit mx-auto my-3 max-w-1/2 dots-border-top !border-base-300">
                            </div>
                        </div>
                        <div v-else-if="!block.divider_at_bottom && index !== project.content_blocks.length - 1"
                            class="absolute w-[calc(100%-1rem)] bg-base-100 z-20">
                            <!-- this is a filthy hack to to create the illusion of a continous post -->
                            <div class="px-1 bg-base-100">
                                <div
                                    class="z-20 w-full h-5 p-1 mx-auto -mt-[.5rem] border-dotted bg-base-100 border-x-2 border-base-200">
                                </div>
                            </div>
                        </div>
                    </div>
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
<style>
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}
</style>