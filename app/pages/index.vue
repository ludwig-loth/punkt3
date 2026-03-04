<script setup lang="ts">
definePageMeta({
    layout: 'default',
    scrollToTop: true,
})
const localePath = useLocalePath()

const designStore = useDesignStore();
const landingStore = useLandingStore();

const { t, tMenuItem } = useTranslation()
const { landingData } = storeToRefs(landingStore) as { landingData: Ref<Landing | null> }

useLandingSeo(landingData)

const opening_line: Ref<HTMLElement | null> = ref(null);
const about_me: Ref<HTMLElement | null> = ref(null);
const menu_items: Ref<HTMLElement | null> = ref(null);

type DimensionKey = 'opening_line' | 'about_me' | 'menu_items'
const { saveDimensions } = useElementDimensions<DimensionKey>({
    set: designStore.setLandingPageDesign
})

saveDimensions(opening_line, 'opening_line')
saveDimensions(about_me, 'about_me')
saveDimensions(menu_items, 'menu_items')

const mainMenuItems = computed((): Array<MenuItem> => landingData.value?.menu_items ?? [])
</script>
<template>
    <div v-if="landingData" class="relative">
        <div class="flex flex-col items-center justify-center max-w-5xl">
            <div class="my-11" ref="opening_line">
                <h1
                    class="max-w-sm p-4 text-center rounded-sm sm:max-w-lg text-5xl/14 sm:text-7xl/16 bg-base-100">
                    {{ t(landingData, 'opening_line') }}
                </h1>
            </div>
            <div class="flex flex-col items-center px-10 sm:flex-row sm:gap-3 my-11" ref="about_me">
                <picture
                    class="z-10 self-center flex-shrink-0 w-24 h-24 -mt-10 sm:mt-0 sm:w-34 sm:h-34">
                    <div
                        class="absolute block mt-4 w-22 h-22 sm:w-32 sm:h-32 -z-10 dots-border bg-base-300 rounded-xs ring-6 ring-base-100">
                    </div>
                    <NuxtImg v-if="landingData" :src="landingData.image"
                        :alt="`Portrait of ${landingData.my_name}`"
                        class="object-cover ml-4 w-22 h-22 sm:w-32 sm:h-32 outline-2 rounded-xs" />
                </picture>
                <div class="flex px-3 rounded-sm post-content bg-base-100 mt-9 sm:mt-0">
                    <div v-if="landingData.body" class="prose-landing text-xl text-left md:text-2xl">
                        <ContentRenderer :value="landingData" />
                    </div>
                </div>
            </div>
            <nav class="relative flex flex-col sm:my-11" ref="menu_items">
                <div class="grid grid-cols-1 sm:gap-10 sm:grid-cols-2 mt-25 sm:mt-20">
                    <div v-for="item in mainMenuItems" :key="item.slug">
                        <NuxtLink :to="localePath(`/${item.slug}`)">
                            <div
                                class="relative transition-all active:scale-95 hover:scale-103 focus:scale-103">
                                <div class="flex p-4 mx-auto transition-all border-2 cursor-pointer sm:ml-auto w-[calc(100%-6rem)] sm:w-64 hover:outline-0 outline-primary bg-base-100 peer h-35 rounded-sm focus:outline-0  mb-10 sm:mb-0"
                                    tabindex="0">
                                    <div class="z-20 flex flex-col justify-start align-middle ">
                                        <div class="flex items-center align-middle">
                                            <h2 class="text-xl md:text-2xl">
                                                {{ tMenuItem(item, 'heading') }}
                                            </h2>
                                        </div>
                                        <p class="line-clamp-3">
                                            {{ tMenuItem(item, 'description') }}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    class="absolute -bottom-[7.5%] h-[115%] w-[calc(100%-4rem)] sm:w-[110%] mx-auto left-[2rem] sm:-left-[5%] bg-primary -z-10 scale-y-10 origin-bottom peer-hover:color-primary-content peer-hover:scale-y-100 transition-transform rounded-sm peer-focus:color-primary-content peer-focus:scale-y-100">
                                </div>
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>
<style></style>