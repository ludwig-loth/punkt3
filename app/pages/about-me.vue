<script setup lang="ts">
const landingStore = useLandingStore();
const cvStore = useCvStore();
const config = useRuntimeConfig()
const API_URL: string = config.public.apiURL
definePageMeta({
  layout: 'sidebars',
  hasHeader: true,
  scrollToTop: true,
  hasSubMenu: false,
})

interface GroupedSkillSubsection {
  subsection: string
  tags: Tag[]
}
interface GroupedSkillSection {
  section: Section
  subsections: GroupedSkillSubsection[]
}

const { t, tStatic } = useTranslation()

const age = computed<number | null>(() => {
  if (!cvStore.cvData?.birthdate) return null
  const birth = new Date(cvStore.cvData.birthdate)
  const today = new Date()
  let years = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) years--
  return years
})

const cvImage = computed<string | null>(() => {
  return cvStore.cvData?.image || landingStore.landingData?.image || null
})


const groupedSkills = computed<GroupedSkillSection[]>(() => {
  if (!cvStore.cvData?.skills) return []

  const sections = new Map<
    string,
    {
      section: Section
      subsections: Map<string, GroupedSkillSubsection>
    }
  >()

  cvStore.cvData.skills.forEach(skill => {
    const sectionId = skill.section.id
    if (!sections.has(sectionId)) {
      sections.set(sectionId, {
        section: skill.section,
        subsections: new Map()
      })
    }
    const section = sections.get(sectionId)!
    const subsectionName = t(skill, 'subsection') || ''
    if (!section.subsections.has(subsectionName)) {
      section.subsections.set(subsectionName, {
        subsection: subsectionName,
        tags: []
      })
    }
    if (skill.tags?.length) {
      section.subsections.get(subsectionName)!.tags.push(...skill.tags)
    }
  })

  return Array.from(sections.values()).map(s => ({
    section: s.section,
    subsections: Array.from(s.subsections.values())
  }))
})


</script>
<template>
  <div v-if="cvStore.cvData" class="flex flex-col w-full gap-3 post-content">
    <div class="flex flex-col items-start gap-3 p-1 rounded-sm bg-base-100">
      <div
        class="flex flex-col items-center w-full gap-2 border-2 border-dotted rounded-sm md:justify-between md:flex-row border-base-200">
        <div
          class="flex flex-col w-fit *:flex *:flex-row *:items-center *:p-2 *:justify-start text-secondary-content font-medium">
          <h2>{{ t(cvStore.cvData, 'welcome_heading') }}</h2>
          <div>
            <div class="basis-32 shrink-0">{{ tStatic('age') }}</div>
            <div class="basis-4 shrink-0">
              <div class="single-dot-secondary">
              </div>
            </div>
            <div class="font-bold">{{ age }} {{ tStatic('years') }}</div>
          </div>
          <div>
            <div class="basis-32 shrink-0">{{ tStatic('work_experience') }}</div>
            <div class="basis-4 shrink-0">
              <div class="single-dot-secondary">
              </div>
            </div>
            <div class="font-bold">{{ cvStore.workExperienceYears }}+ {{
              tStatic('years_in_field') }}</div>
          </div>
          <div>
            <div class="relative basis-32 shrink-0">
              <div class="relative">{{ tStatic('career_status') }}</div>
            </div>
            <div class="basis-4 shrink-0">
              <star-bling v-if="cvStore.cvData.work_status_attention"
                class="relative -left-2.5 size-7" animation :interval="5000"></star-bling>
              <div v-else class="single-dot-secondary">
              </div>
            </div>
            <div class="relative font-bold">
              <div class="relative"
                :class="{ ' rounded-sm  px-1 ml-0.5': cvStore.cvData.work_status_attention }">{{
                  t(cvStore.cvData,
                    'work_status') }}</div>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-start justify-end gap-2 p-3 w-42 shrink-0">
          <div class="relative w-full">
            <light-box v-if="cvStore.cvData.image"
              :img-src="`${API_URL}/assets/${cvImage}`" class="">
              <template #trigger="{ openLightbox }">
                <picture class="self-center mt-0 shrink-0">
                  <NuxtImg :src="`${API_URL}/assets/${cvImage}`" alt="Portrait of Ludwig Loth"
                    class="relative object-cover object-center w-full h-40 transition-transform cursor-zoom-in outline-2 rounded-xs"
                    @click="openLightbox" />
                </picture>
              </template>
            </light-box>
          </div>
        </div>
      </div>
    </div>
    <div class="divider">
      <div class="h-fit mx-auto my-0 max-w-1/2 dots-border-top !border-base-300">
      </div>
    </div>
    <div class="p-1 rounded-sm bg-base-100">
      <div class="border-2 border-dotted rounded-sm bg-base-100 border-base-200">
        <h2 class="p-2 pb-0">{{ tStatic('about_me') }}</h2>
        <div class="p-2" v-html="t(cvStore.cvData, 'summary')"></div>
      </div>
    </div>
    <div class="divider">
      <div class="h-fit mx-auto my-0 max-w-1/2 dots-border-top !border-base-300">
      </div>
    </div>
    <div class="p-1 rounded-sm bg-base-100">
      <div class="border-2 border-dotted rounded-sm bg-base-100 border-base-200">
        <h2 class="p-2 pb-0">{{ tStatic('my_skills') }}</h2>
        <div class="flex flex-col gap-6 p-2">
          <div v-html="t(cvStore.cvData, 'skills_summary')">
          </div>
          <div v-if="cvStore.cvData.skills.length > 0" class="flex flex-col gap-4">
            <div v-for="(sectionGroup, index) in groupedSkills" :key="sectionGroup.section.id"
              class="flex flex-col gap-4">
              <div v-if="index > 0" class="divider">
                <div class="w-1/2 mx-auto my-0 border-t-4 border-dotted h-fit border-base-200">
                </div>
              </div>
              <div class="flex flex-row items-center gap-2">
                <h3 class="!mb-0 w-fit shrink-0">{{ t(sectionGroup.section, 'heading') }}</h3>
              </div>
              <div v-for="subsectionGroup in sectionGroup.subsections"
                :key="subsectionGroup.subsection" class="ml-4">
                <h4 class="!text-[1rem] !font-medium !mb-2 -ml-1 md:ml-0">{{
                  subsectionGroup.subsection
                  }}</h4>
                <div
                  class="flex flex-wrap gap-2 p-2 ml-1 md:ml-3 relative before:absolute before:-ml-4 before:-mt-2 before:h-full before:w-1 before:rounded-full before:bg-secondary">
                  <skill-badge v-for="tag in subsectionGroup.tags" :key="tag.id" :item="tag" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="divider">
      <div class="h-fit mx-auto my-0 max-w-1/2 dots-border-top !border-base-300">
      </div>
    </div>
    <div class="p-1 rounded-sm bg-base-100">
      <div class="border-2 border-dotted rounded-sm bg-base-100 border-base-200">
        <h2 class="p-2 pb-0">{{ tStatic('my_life_stages') }}</h2>
        <div class="flex flex-col gap-6 p-2">
          <div v-html="t(cvStore.cvData, 'stages_summary')">
          </div>
          <stages-timeline type="career" :items="cvStore.cvData.career_stages"
            milestone-style="circle" />
          <div class="divider">
            <div class="w-1/2 mx-auto my-0 border-t-4 border-dotted h-fit border-base-200">
            </div>
          </div>
          <stages-timeline type="educational" :items="cvStore.cvData.educational_stages"
            milestone-style="square" />
        </div>
      </div>
    </div>
    <div class="divider">
      <div class="h-fit mx-auto my-0 max-w-1/2 dots-border-top !border-base-300">
      </div>
    </div>
    <div v-if="cvStore.cvData.publications && cvStore.cvData.publications.length > 0"
      class="p-1 rounded-sm bg-base-100">
      <div class="border-2 border-dotted rounded-sm bg-base-100 border-base-200  post-content">
        <h2 class="p-2 pb-0">{{ tStatic('publications') }}</h2>
        <div class="p-2">
          <publications-timeline :items="cvStore.cvData.publications" milestone-style="diamond" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
:deep(.custom-content-list li),
:deep(.custom-content-list ol),
:deep(.custom-content-list ul) {
  margin-bottom: 0em !important;
  margin-top: 0em !important;
}
</style>