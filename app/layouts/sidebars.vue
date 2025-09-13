<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()
const designStore = useDesignStore();
const landingStore = useLandingStore();
const projectStore = useProjectStore();
const languageStore = useLanguageStore();

const { t, tMenuItem } = useTranslation()
const { projects } = storeToRefs(projectStore) as { projects: Ref<Project[] | null> }
const { landingData } = storeToRefs(landingStore) as { landingData: Ref<Landing | null> }

const hasSubMenu = computed<boolean>(() => Boolean(route.meta.hasSubMenu));
const hasHeader = computed<boolean>(() => Boolean(route.meta.hasHeader));

const mobileMenu = ref(false)
const mobileMenuRef = useTemplateRef<HTMLElement | null>('mobileMenuRef')

const section_heading = ref<HTMLElement | null>(null)
const section_content = ref<HTMLElement | null>(null)

type DimensionKey = 'section_heading' | 'section_content'
const { saveDimensions } = useElementDimensions<DimensionKey>({
  set: designStore.setSidebarDesign
})
saveDimensions(section_heading, 'section_heading')
saveDimensions(section_content, 'section_content')

onClickOutside(mobileMenuRef, () => { mobileMenu.value = false })

const subMenuMeta = computed<SubMenuMeta | undefined>(() => (route.meta as any).subMenu)
const subMenuItemsPortfolio = ref<SubMenu>({ heading: null, items: [] })

function buildProjectItems(): SubMenuItem[] {
  if (!projects.value) return []
  return [...projects.value]
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
    .map(p => ({
      slug: p.slug,
      title: t(p, 'title'),
      icon: (p as any).icon ?? null
    }))
}

// Placeholder for future blog articles
function buildBlogItems(): SubMenuItem[] {
  // TODO implement when blog data is available
  return []
}

function setSubMenu(): void {
  if (!hasSubMenu.value || !landingData.value) {
    subMenuItemsPortfolio.value = { items: [], heading: null }
    return
  }
  const meta = subMenuMeta.value
  if (!meta) {
    subMenuItemsPortfolio.value = { items: [], heading: null }
    return
  }

  let items: SubMenuItem[] = []
  if (meta.type === 'projects') items = buildProjectItems()
  else if (meta.type === 'blog') items = buildBlogItems()

  const headingSlug = meta.headingSlug || (meta.type === 'projects' ? 'portfolio' : 'blog')
  const headingMenuItem = landingData.value.menu_items?.find(m => m.slug === headingSlug)
  const heading = headingMenuItem ? tMenuItem(headingMenuItem, 'heading') : null

  subMenuItemsPortfolio.value = { items, heading }
}

watch(
  [landingData, projects, hasSubMenu, () => locale.value, subMenuMeta],
  () => setSubMenu(),
  { immediate: true }
)

onMounted(() => {
  setSubMenu()
});
</script>

<template>
  <div class="flex flex-col">
    <div class="flex-grow h-full m-auto">
      <sidebarBackgroundDecoration tailwind-classes="max-w-7xl" />
      <div class="flex flex-col items-center justify-center px-0 max-w-7xl sm:pl-1 lg:pr-3">
        <div v-if="hasHeader" class="w-full">
          <sidebarHeader />
        </div>
        <div v-else>
          <div class="h-40"></div>
        </div>
        <div v-if="hasSubMenu"
          class="sticky top-0 z-30 hidden h-1 m-auto left-30 lg:block bg-base-100"
          :class="`w-[calc(100%-280px)]`">
        </div>
        <div v-if="hasSubMenu"
          class="sticky z-30 hidden h-5 m-auto top-1 dots-border-left dots-border-top dots-border-right left-30 lg:block bg-base-100"
          :class="`w-[calc(100%-280px)]`">
        </div>
        <div class="flex flex-row gap-5" ref="section_content">
          <aside class="sticky z-40 hidden top-1 lg:top-5 sm:flex h-fit"
            :class="{ '!top-1': !hasSubMenu }">
            <sidebarMainMenu :submenu="subMenuItemsPortfolio" :hasSubMenu="hasSubMenu"
              :mobile="false" />
          </aside>
          <section class="relative flex flex-col p-2 rounded-sm mb-14 sm:mb-11 bg-base-200">
            <div class="flex flex-col gap-8">
              <NuxtPage />
            </div>
          </section>
          <aside class="sticky z-40 hidden w-40 lg:block top-5 h-fit shrink-0">
            <sidebarMenuRight :submenu="subMenuItemsPortfolio" :active="hasSubMenu" />
          </aside>
        </div>
      </div>
    </div>
    <div>
      <sidebarMobileMenu :submenu="subMenuItemsPortfolio" :hasSubMenu="hasSubMenu" :open="false" />
    </div>
  </div>
</template>
<style>
.outline-font {
  -webkit-text-fill-color: var(--color-base-300);
  -webkit-text-stroke: 3px var(--color-base-content);
}

.outline-font-dense {
  -webkit-text-fill-color: var(--color-base-300);
  -webkit-text-stroke: 1px var(--color-base-content);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-scale-enter-active,
.v-scale-leave-active {
  transition: transform 0.25s ease;
  transform-origin: right;
}

.v-scale-enter-from,
.v-scale-leave-to {
  transform: scaleX(0);
  translate: 10px 0;
}

.v-scale-enter-to,
.v-scale-leave-from {
  transform: scaleX(1);
  translate: 0 0;
}

.v-scale-y-enter-active,
.v-scale-y-leave-active {
  transition: transform 0.25s ease;
  transform-origin: top;
}

.v-scale-y-enter-from,
.v-scale-y-leave-to {
  transform: scaleY(0);
  translate: 10px 0;
}

.v-scale-y-enter-to,
.v-scale-y-leave-from {
  transform: scaleY(1);
  translate: 0 0;
}
</style>
