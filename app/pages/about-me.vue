<script setup>
const landingStore = useLandingStore();
const cvStore = useCvStore();
const cvStore_old = useCvStore_old();
const languageStore = useLanguageStore();
const config = useRuntimeConfig()
const API_URL = config.public.apiURL
definePageMeta({
  layout: 'sidebars',
  hasSubMenu: false,
  hasHeader: true,
  scrollToTop: true
})

const { t, tStatic, tBySuffix } = useTranslation()
const { data: cvData } = storeToRefs(cvStore_old)

const age = computed(() => {
  if (!cvStore.cvData.birthdate) return null;
  const birth = new Date(cvStore.cvData.birthdate);
  const today = new Date();
  let years = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    years--;
  }
  return years;
});

const cvImage = computed(() => {
  if (cvStore.cvData.image)
    return cvStore.cvData.image
  else
    return landingStore.landingData.image
})


const groupedSkills = computed(() => {
  if (!cvStore.cvData.skills) return [];

  const sections = new Map();

  cvStore.cvData.skills.forEach(skill => {
    const sectionId = skill.section.id;

    if (!sections.has(sectionId)) {
      sections.set(sectionId, {
        section: skill.section,
        subsections: new Map()
      });
    }

    const section = sections.get(sectionId);
    const subsectionName = t(skill, 'subsection');

    if (!section.subsections.has(subsectionName)) {
      section.subsections.set(subsectionName, {
        subsection: subsectionName,
        tags: []
      });
    }
    section.subsections.get(subsectionName).tags.push(...skill.tags);
  });

  return Array.from(sections.values()).map(section => ({
    section: section.section,
    subsections: Array.from(section.subsections.values())
  }));
});


</script>
<template>
  <div v-if="cvStore_old.data" class="flex flex-col w-full gap-3 post-content">
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
            <light-box v-if="landingStore.landingData.image_me || cvStore_old.data.cv_image"
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
                :key="subsectionGroup.subsection" class="ml-2 ">
                <h4 class="!text-[1rem] !font-medium !mb-2">{{ subsectionGroup.subsection }}</h4>
                <div class="flex flex-wrap gap-2 p-2 ml-1 border-l-4 border-secondary md:ml-3">
                  <skill-card v-for="tag in subsectionGroup.tags" :key="tag.id" :item="tag" />
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
          <div v-if="cvStore.cvData.career_stages > 0">
            <h3>{{ tStatic('my_career_stages') }}</h3>
            <ol
              class="relative !pl-1 md:!pl-3 space-y-8 before:absolute before:-ml-px before:h-full before:w-1 before:rounded-full before:bg-secondary">
              <!-- ab hier weiter  -->
              <li v-for="(stage, stageIndex) in cvStore.cvData.career_stages" :key="stage.id"
                class="list-none">
                <div class="relative flex items-start gap-2 -ml-2.25">
                  <span
                    class="-mt-1 rounded-full bg-secondary size-5 shrink-0 ring-2 ring-base-100"></span>
                  <div class="flex flex-col w-full gap-2 -mt-1">
                    <div
                      class="flex flex-col flex-wrap items-start justify-between gap-2 text-sm font-medium md:flex-row text-secondary-content">
                      <div v-if="stage.show_only_year" class="flex flex-row items-center gap-1">
                        <nuxt-time :datetime="stage.from" year="numeric"
                          :locale="languageStore.getCurrentLanguage()"></nuxt-time>
                        <span>-</span>
                        <nuxt-time v-if="stage?.to" :datetime="stage.to" year="numeric"
                          :locale="languageStore.getCurrentLanguage()"></nuxt-time>
                        <div v-else-if="stage.until_today">{{ tStatic('today') }}</div>
                        <div></div>
                      </div>
                      <div v-else-if="stage?.show_month_and_year"
                        class="flex flex-row items-center gap-1">
                        <nuxt-time :datetime="stage.from" month="long" year="numeric"
                          :locale="languageStore.getCurrentLanguage()"></nuxt-time>
                        <span>-</span>
                        <nuxt-time v-if="stage?.to" :datetime="stage.to" month="long" year="numeric"
                          :locale="languageStore.getCurrentLanguage()"></nuxt-time>
                        <div v-else-if="stage.until_today">{{ tStatic('today') }}</div>
                      </div>
                      <div v-else class="flex flex-row items-center gap-1">
                        <nuxt-time :datetime="stage.from" day="numeric" month="long" year="numeric"
                          :locale="languageStore.getCurrentLanguage()"></nuxt-time>
                        <span>-</span>
                        <nuxt-time v-if="stage?.to" :datetime="stage.to" day="numeric" month="long"
                          year="numeric" :locale="languageStore.getCurrentLanguage()"></nuxt-time>
                        <div v-else-if="stage.until_today">{{ tStatic('today') }}</div>
                      </div>
                      <div>{{ tBySuffix(stage, 'location') }}</div>
                    </div>
                    <div v-if="stage.role && stage.institution"
                      class="text-lg font-bold text-base-content">
                      <p>{{ tBySuffix(stage, 'role') }}</p>
                      <p class="text-sm">{{ tBySuffix(stage, 'institution')
                      }}
                      </p>
                    </div>
                    <p v-if="stage.additional_infos" v-html="tBySuffix(stage, 'additional_infos')">
                    </p>
                    <div v-if="stage.responsibilities" class="custom-content-list">
                      <div class="font-medium">{{ tStatic('responsibilities') }}:</div>
                      <div v-html="tBySuffix(stage, 'responsibilities')" class="!m-0"></div>
                    </div>
                    <div v-if="stage.final_grade" class="text-sm font-semibold">
                      {{ tStatic('final_grade') }}: {{ stage.final_grade }}
                    </div>
                  </div>
                </div>
                <div v-if="cvStore_old.data.career_stages[stageIndex + 1]" class="divider">
                  <div
                    class="h-fit mx-auto my-4 max-w-9/10 border-t-2 border-dotted !border-base-200">
                  </div>
                </div>
              </li>
            </ol>
          </div>
          <div class="divider">
            <div class="w-1/2 mx-auto my-0 border-t-4 border-dotted h-fit border-base-200">
            </div>
          </div>
          <div
            v-if="cvStore_old.data.educational_stages && cvStore_old.data.educational_stages.length > 0">
            <h3>{{ tStatic('my_education_stages') }}</h3>
            <ol
              class="relative space-y-8 before:absolute before:-ml-px before:h-full before:w-1 before:rounded-full before:bg-secondary !pl-1 md:!pl-3">
              <li v-for="(stage, stageIndex) in cvStore_old.data.educational_stages" :key="stage.id"
                class="list-none">
                <div class="relative flex items-start gap-2 -ml-2.25">
                  <span
                    class="-mt-1 rounded-full bg-secondary size-5 shrink-0 ring-2 ring-base-100"></span>
                  <div class="flex flex-col w-full gap-2 -mt-1">
                    <div
                      class="flex flex-col flex-wrap items-start justify-between gap-2 text-sm font-medium md:flex-row text-secondary-content">
                      <div v-if="stage.show_only_year" class="flex flex-row items-center gap-1">
                        <nuxt-time :datetime="stage.from" year="numeric"
                          :locale="languageStore.getCurrentLanguage()"></nuxt-time>
                        <span>-</span>
                        <nuxt-time v-if="stage?.to" :datetime="stage.to" year="numeric"
                          :locale="languageStore.getCurrentLanguage()"></nuxt-time>
                        <div v-else-if="stage.until_today">{{ tStatic('today') }}</div>
                        <div></div>
                      </div>
                      <div v-else-if="stage?.show_month_and_year"
                        class="flex flex-row items-center gap-1">
                        <nuxt-time :datetime="stage.from" month="long" year="numeric"
                          :locale="languageStore.getCurrentLanguage()"></nuxt-time>
                        <span>-</span>
                        <nuxt-time v-if="stage?.to" :datetime="stage.to" month="long" year="numeric"
                          :locale="languageStore.getCurrentLanguage()"></nuxt-time>
                        <div v-else-if="stage.until_today">{{ tStatic('today') }}</div>
                      </div>
                      <div v-else class="flex flex-row items-center gap-1">
                        <nuxt-time :datetime="stage.from" day="numeric" month="long" year="numeric"
                          :locale="languageStore.getCurrentLanguage()"></nuxt-time>
                        <span>-</span>
                        <nuxt-time v-if="stage?.to" :datetime="stage.to" day="numeric" month="long"
                          year="numeric" :locale="languageStore.getCurrentLanguage()"></nuxt-time>
                        <div v-else-if="stage.until_today">{{ tStatic('today') }}</div>
                      </div>
                      <div>{{ tBySuffix(stage, 'location') }}</div>
                    </div>
                    <div v-if="stage.degree && stage.institution" class="text-base-content">
                      <p class="text-lg font-bold">{{ tBySuffix(stage, 'degree') }}</p>
                      <p class="italic">{{ tBySuffix(stage, 'institution') }}</p>
                    </div>
                    <p v-if="stage.additional_infos" v-html="tBySuffix(stage, 'additional_infos')">
                    </p>
                    <div v-if="stage.final_thesis">
                      <div class="font-medium">{{ tStatic('final_thesis') }}:</div>
                      <div>{{ tBySuffix(stage, 'final_thesis') }}</div>
                      <div v-if="stage.final_thesis_grade">({{ tStatic('final_thesis_grade') }}: {{
                        stage.final_thesis_grade
                      }})
                      </div>
                    </div>
                    <div v-if="stage.final_grade" class="font-medium ">
                      {{ tStatic('final_grade') }}: {{ tBySuffix(stage, 'final_grade') }}
                    </div>
                  </div>
                </div>
                <div v-if="cvStore_old.data.educational_stages[stageIndex + 1]" class="divider">
                  <div
                    class="h-fit mx-auto my-4 max-w-9/10 border-t-2 border-dotted !border-base-200">
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </div>
        <!-- hier alt -->
        <div class="flex flex-col gap-6 p-2">
          <div v-html="t(cvData, 'life_stages_introduction')">
          </div>
          <div v-if="cvStore_old.data.career_stages && cvStore_old.data.career_stages.length > 0">
            <h3>{{ tStatic('my_career_stages') }}</h3>
            <ol
              class="relative !pl-1 md:!pl-3 space-y-8 before:absolute before:-ml-px before:h-full before:w-1 before:rounded-full before:bg-secondary">
              <li v-for="(stage, stageIndex) in cvStore_old.data.career_stages" :key="stage.id"
                class="list-none">
                <div class="relative flex items-start gap-2 -ml-2.25">
                  <span
                    class="-mt-1 rounded-full bg-secondary size-5 shrink-0 ring-2 ring-base-100"></span>
                  <div class="flex flex-col w-full gap-2 -mt-1">
                    <div
                      class="flex flex-col flex-wrap items-start justify-between gap-2 text-sm font-medium md:flex-row text-secondary-content">
                      <div v-if="stage.show_only_year" class="flex flex-row items-center gap-1">
                        <nuxt-time :datetime="stage.from" year="numeric"
                          :locale="languageStore.getCurrentLanguage()"></nuxt-time>
                        <span>-</span>
                        <nuxt-time v-if="stage?.to" :datetime="stage.to" year="numeric"
                          :locale="languageStore.getCurrentLanguage()"></nuxt-time>
                        <div v-else-if="stage.until_today">{{ tStatic('today') }}</div>
                        <div></div>
                      </div>
                      <div v-else-if="stage?.show_month_and_year"
                        class="flex flex-row items-center gap-1">
                        <nuxt-time :datetime="stage.from" month="long" year="numeric"
                          :locale="languageStore.getCurrentLanguage()"></nuxt-time>
                        <span>-</span>
                        <nuxt-time v-if="stage?.to" :datetime="stage.to" month="long" year="numeric"
                          :locale="languageStore.getCurrentLanguage()"></nuxt-time>
                        <div v-else-if="stage.until_today">{{ tStatic('today') }}</div>
                      </div>
                      <div v-else class="flex flex-row items-center gap-1">
                        <nuxt-time :datetime="stage.from" day="numeric" month="long" year="numeric"
                          :locale="languageStore.getCurrentLanguage()"></nuxt-time>
                        <span>-</span>
                        <nuxt-time v-if="stage?.to" :datetime="stage.to" day="numeric" month="long"
                          year="numeric" :locale="languageStore.getCurrentLanguage()"></nuxt-time>
                        <div v-else-if="stage.until_today">{{ tStatic('today') }}</div>
                      </div>
                      <div>{{ tBySuffix(stage, 'location') }}</div>
                    </div>
                    <div v-if="stage.role && stage.institution"
                      class="text-lg font-bold text-base-content">
                      <p>{{ tBySuffix(stage, 'role') }}</p>
                      <p class="text-sm">{{ tBySuffix(stage, 'institution')
                      }}
                      </p>
                    </div>
                    <p v-if="stage.additional_infos" v-html="tBySuffix(stage, 'additional_infos')">
                    </p>
                    <div v-if="stage.responsibilities" class="custom-content-list">
                      <div class="font-medium">{{ tStatic('responsibilities') }}:</div>
                      <div v-html="tBySuffix(stage, 'responsibilities')" class="!m-0"></div>
                    </div>
                    <div v-if="stage.final_grade" class="text-sm font-semibold">
                      {{ tStatic('final_grade') }}: {{ stage.final_grade }}
                    </div>
                  </div>
                </div>
                <div v-if="cvStore_old.data.career_stages[stageIndex + 1]" class="divider">
                  <div
                    class="h-fit mx-auto my-4 max-w-9/10 border-t-2 border-dotted !border-base-200">
                  </div>
                </div>
              </li>
            </ol>
          </div>
          <div class="divider">
            <div class="w-1/2 mx-auto my-0 border-t-4 border-dotted h-fit border-base-200">
            </div>
          </div>
          <div
            v-if="cvStore_old.data.educational_stages && cvStore_old.data.educational_stages.length > 0">
            <h3>{{ tStatic('my_education_stages') }}</h3>
            <ol
              class="relative space-y-8 before:absolute before:-ml-px before:h-full before:w-1 before:rounded-full before:bg-secondary !pl-1 md:!pl-3">
              <li v-for="(stage, stageIndex) in cvStore_old.data.educational_stages" :key="stage.id"
                class="list-none">
                <div class="relative flex items-start gap-2 -ml-2.25">
                  <span
                    class="-mt-1 rounded-full bg-secondary size-5 shrink-0 ring-2 ring-base-100"></span>
                  <div class="flex flex-col w-full gap-2 -mt-1">
                    <div
                      class="flex flex-col flex-wrap items-start justify-between gap-2 text-sm font-medium md:flex-row text-secondary-content">
                      <div v-if="stage.show_only_year" class="flex flex-row items-center gap-1">
                        <nuxt-time :datetime="stage.from" year="numeric"
                          :locale="languageStore.getCurrentLanguage()"></nuxt-time>
                        <span>-</span>
                        <nuxt-time v-if="stage?.to" :datetime="stage.to" year="numeric"
                          :locale="languageStore.getCurrentLanguage()"></nuxt-time>
                        <div v-else-if="stage.until_today">{{ tStatic('today') }}</div>
                        <div></div>
                      </div>
                      <div v-else-if="stage?.show_month_and_year"
                        class="flex flex-row items-center gap-1">
                        <nuxt-time :datetime="stage.from" month="long" year="numeric"
                          :locale="languageStore.getCurrentLanguage()"></nuxt-time>
                        <span>-</span>
                        <nuxt-time v-if="stage?.to" :datetime="stage.to" month="long" year="numeric"
                          :locale="languageStore.getCurrentLanguage()"></nuxt-time>
                        <div v-else-if="stage.until_today">{{ tStatic('today') }}</div>
                      </div>
                      <div v-else class="flex flex-row items-center gap-1">
                        <nuxt-time :datetime="stage.from" day="numeric" month="long" year="numeric"
                          :locale="languageStore.getCurrentLanguage()"></nuxt-time>
                        <span>-</span>
                        <nuxt-time v-if="stage?.to" :datetime="stage.to" day="numeric" month="long"
                          year="numeric" :locale="languageStore.getCurrentLanguage()"></nuxt-time>
                        <div v-else-if="stage.until_today">{{ tStatic('today') }}</div>
                      </div>
                      <div>{{ tBySuffix(stage, 'location') }}</div>
                    </div>
                    <div v-if="stage.degree && stage.institution" class="text-base-content">
                      <p class="text-lg font-bold">{{ tBySuffix(stage, 'degree') }}</p>
                      <p class="italic">{{ tBySuffix(stage, 'institution') }}</p>
                    </div>
                    <p v-if="stage.additional_infos" v-html="tBySuffix(stage, 'additional_infos')">
                    </p>
                    <div v-if="stage.final_thesis">
                      <div class="font-medium">{{ tStatic('final_thesis') }}:</div>
                      <div>{{ tBySuffix(stage, 'final_thesis') }}</div>
                      <div v-if="stage.final_thesis_grade">({{ tStatic('final_thesis_grade') }}: {{
                        stage.final_thesis_grade
                      }})
                      </div>
                    </div>
                    <div v-if="stage.final_grade" class="font-medium ">
                      {{ tStatic('final_grade') }}: {{ tBySuffix(stage, 'final_grade') }}
                    </div>
                  </div>
                </div>
                <div v-if="cvStore_old.data.educational_stages[stageIndex + 1]" class="divider">
                  <div
                    class="h-fit mx-auto my-4 max-w-9/10 border-t-2 border-dotted !border-base-200">
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="divider">
      <div class="h-fit mx-auto my-0 max-w-1/2 dots-border-top !border-base-300">
      </div>
    </div>
    <div v-if="cvStore_old.data.publications && cvStore_old.data.publications.length > 0"
      class="p-1 rounded-sm bg-base-100">
      <div class="border-2 border-dotted rounded-sm bg-base-100 border-base-200">
        <h2 class="p-2 pb-0">{{ tStatic('publications') }}</h2>
        <ol
          class="relative !ml-4 space-y-8 before:absolute before:h-full before:w-1 before:rounded-full before:bg-secondary !pl-1 md:!pl-3">
          <li v-for="(pub, pubIndex) in cvStore_old.data.publications" :key="pub.publications_id.id"
            class="list-none">
            <div class="relative flex items-start gap-2 -ml-[.35rem]">
              <span
                class="mt-1 rotate-45 rounded-xs bg-secondary size-4 shrink-0 ring-2 ring-base-100"></span>
              <span>
                <span>
                  <template v-for="(author, idx) in pub.publications_id.authors">
                    <span class="font-semibold">
                      <template v-if="author.first_name">
                        {{author.first_name.split(' ').map(n => n[0] + '.').join(' ')}}
                      </template>
                      {{ author.last_name }}
                    </span>
                    <span v-if="idx < pub.publications_id.authors.length - 1">, </span>
                  </template>
                </span>
                ,
                <span class="font-normal"> "{{ pub.publications_id.title }}"</span>,
                <span class="italic">
                  {{ pub.publications_id.journal || pub.publications_id.conference }}
                </span>
                <span v-if="pub.publications_id.publisher">
                  , {{ pub.publications_id.publisher }}
                </span>
                <span v-if="pub.publications_id.location">
                  , {{ pub.publications_id.location }}
                </span>
                <span v-if="pub.publications_id.year">
                  , {{ pub.publications_id.year }}
                </span>
                <div
                  v-if="pub.publications_id.identifier && pub.publications_id.identifier_type === 'DOI'"
                  class="flex flex-nowrap">
                  DOI: <a :href="`https://doi.org/${pub.publications_id.identifier}`"
                    target="_blank" class="ml-2">
                    {{ pub.publications_id.identifier }}
                  </a>
                </div>
              </span>
            </div>
            <div v-if="cvStore_old.data.publications[pubIndex + 1]" class="divider">
              <div class="h-fit mx-auto my-4 max-w-9/10 border-t-2 border-dotted !border-base-200">
              </div>
            </div>
          </li>
        </ol>
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