<script setup>
// const globalStore = useGlobalStore();
const landingStore = useLandingStore();
const cvStore = useCvStore();
const languageStore = useLanguageStore();
// const router = useRouter()
const config = useRuntimeConfig()
const API_URL = config.public.apiURL
definePageMeta({
  layout: 'sidebars',
  hasSubMenu: false,
  hasHeader: true,
  scrollToTop: true
})

const { t, tStatic, tBySuffix } = useTranslation()
const { data: cvData } = storeToRefs(cvStore)

const age = computed(() => {
  if (!cvStore.data.birthdate) return null;
  const birth = new Date(cvStore.data.birthdate);
  const today = new Date();
  let years = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    years--;
  }
  return years;
});

const ongoingWorkYears = computed(() => {
  if (!cvStore.data.first_work_day) return null;
  const first = new Date(cvStore.data.first_work_day);
  const today = new Date();
  let years = today.getFullYear() - first.getFullYear();
  const m = today.getMonth() - first.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < first.getDate())) {
    years--;
  }
  return years;
});

const cvImage = computed(() => {
  if (cvStore.data.cv_image)
    return cvStore.data.cv_image
  else
    return landingStore.landingData.image
})

const technicalSkills = computed(() => {
  return cvStore.data.skills.filter(skill => skill.collection === 'technical_skills');
});

const otherSkills = computed(() => {
  return cvStore.data.skills.filter(skill => skill.collection === 'other_skills');
});

function groupTechTagsByLevel(skill) {
  const groups = {};
  if (skill.item.tech_tags) {
    skill.item.tech_tags.forEach(tag => {
      const levelObj = tag.tech_stack_tags_id.skill_level;
      if (!levelObj) return;
      const label = levelObj.label;
      const value = levelObj.value;
      if (!groups[value]) {
        groups[value] = { label, tags: [] };
      }
      groups[value].tags.push(tag.tech_stack_tags_id);
    });
  }
  return Object.keys(groups)
    .sort((a, b) => Number(b) - Number(a))
    .map(key => ({
      label: groups[key].label,
      tags: groups[key].tags,
      value: Number(key)
    }));
}

</script>
<template>
  <div v-if="cvStore.data" class="flex flex-col w-full gap-3 post-content">
    <div class="flex flex-col items-start gap-3 p-1 rounded-sm bg-base-100">
      <div
        class="flex flex-col items-center w-full gap-2 border-2 border-dotted rounded-sm md:justify-between md:flex-row border-base-200">
        <div
          class="flex flex-col w-fit *:flex *:flex-row *:items-center *:p-2 *:justify-start text-secondary-content font-medium">
          <h2>{{ t(cvData, 'welcome_heading') }}</h2>
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
            <div class="font-bold">{{ ongoingWorkYears }}+ {{
              tStatic('years_in_field') }}</div>
          </div>
          <div>
            <div class="relative basis-32 shrink-0">
              <div class="relative">{{ tStatic('career_status') }}</div>
            </div>
            <div class="basis-4 shrink-0">
              <star-bling v-if="cvStore.data.work_blink" class="relative -left-2.5 size-7" animation
                :interval="5000"></star-bling>
              <div v-else class="single-dot-secondary">
              </div>
            </div>
            <div class="relative font-bold">
              <div class="relative"
                :class="{ ' rounded-sm  px-1 ml-0.5': cvStore.data.work_blink }">{{ t(cvData,
                  'work_status') }}</div>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-start justify-end gap-2 p-3 w-42 shrink-0">
          <div class="relative w-full">
            <light-box v-if="landingStore.landingData.image_me || cvStore.data.cv_image"
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
        <div class="p-2" v-html="t(cvData, 'introduction_text')"></div>
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
          <div v-html="t(cvData, 'skills_introduction')">
          </div>
          <div v-if="technicalSkills.length > 0" class="flex flex-col gap-4">
            <div class="flex flex-row items-center gap-2">
              <h3 class="!mb-0 w-fit shrink-0">{{ tStatic('technical_skills') }}</h3>
            </div>
            <div v-for="skill in technicalSkills" :key="skill.id" class="">
              <h4 class="!text-[1rem] !font-medium !mb-0">
                {{ tBySuffix(skill.item, 'name') }}</h4>
              <div v-if="cvStore.data.show_skill_levels"
                v-for="group in groupTechTagsByLevel(skill)" :key="group.value"
                class="pb-1 pl-2 mb-4 border-l-2 border-secondary">
                <div
                  class="flex flex-row items-center gap-0 text-sm font-medium text-secondary-content">
                  Erfahrungsstufe:
                  <svg v-for="n in group.value" :key="n"
                    class="z-10 size-6 stroke-secondary fill-secondary" viewBox="0 -0.5 25 25"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M14.349 8.515L12.5 5L10.651 8.515C10.5204 8.77186 10.3313 8.99449 10.099 9.165C9.86556 9.33638 9.59543 9.45107 9.31 9.5L5.5 10.247L8.16 13.428C8.52377 13.8267 8.69542 14.3643 8.63 14.9L8.124 19L11.632 17.3C11.9026 17.1689 12.1993 17.1006 12.5 17.1C12.7821 17.1009 13.0599 17.1694 13.31 17.3L16.9 18.895L16.394 14.844C16.33 14.3095 16.502 13.7736 16.865 13.376L19.5 10.247L15.69 9.5C15.4042 9.45122 15.1337 9.33652 14.9 9.165C14.6681 8.99438 14.4793 8.77175 14.349 8.515Z"
                      stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <div class="pb-2 text-sm italic font-medium text-secondary-content">{{ group.label
                  }}
                </div>
                <div class="flex flex-wrap gap-2">
                  <skill-card v-for="tag in group.tags" :key="tag.id" :item="tag" />
                </div>
              </div>
              <div v-else
                class="flex flex-wrap gap-2 *:flex *:flex-wrap *:gap-2 border-l-4 border-secondary p-2 ml-1 md:ml-3">
                <skill-card v-for="tag in skill.item.tech_tags" :key="tag.tech_stack_tags_id.id"
                  :item="tag.tech_stack_tags_id" />
                <skill-card v-for="tag in skill.item.tools_tags" :key="tag.tags_tools_id.id"
                  :item="tag.tags_tools_id" />
                <skill-card v-for="tag in skill.item.other_tags" :key="tag.tags_id.id"
                  :item="tag.tags_id" />
              </div>
            </div>
          </div>
          <div class="divider">
            <div class="w-1/2 mx-auto my-0 border-t-4 border-dotted h-fit border-base-200">
            </div>
          </div>
          <div v-if="otherSkills.length > 0" class="flex flex-col gap-4">
            <div class="relative">
              <h3 class="relative !mb-0 z-10 w-fit pr-1 rounded-br-xs shrink-0 bg-base-100">
                {{ tStatic('other_skills') }}
              </h3>
            </div>
            <div v-for="skill in otherSkills" :key="skill.id">
              <h4 class="!text-[1rem] !font-medium !mb-0">{{ tBySuffix(skill.item, 'name') }}</h4>
              <div
                class="flex flex-wrap gap-2 *:flex *:flex-wrap *:gap-2  border-l-4 border-secondary p-2 ml-1 md:ml-3">
                <div v-if="skill.item.tags_soft_skills && skill.item.tags_soft_skills.length > 0">
                  <skill-card v-for="tag in skill.item.tags_soft_skills"
                    :key="tag.tags_soft_skills_id.id" :item="tag.tags_soft_skills_id" />
                </div>
                <div v-if="skill.item.other_tags && skill.item.other_tags.length > 0">
                  <skill-card v-for="tag in skill.item.other_tags" :key="tag.tags_id.id"
                    :item="tag.tags_id" />
                </div>
                <div v-if="skill.item.languages_tags && skill.item.languages_tags.length > 0">
                  <skill-card v-for="tag in skill.item.languages_tags"
                    :key="tag.tags_languages_id.id" :item="tag.tags_languages_id"
                    :subheading="tBySuffix(tag.tags_languages_id, 'skill_level')" />
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
          <div v-html="t(cvData, 'life_stages_introduction')">
          </div>
          <div v-if="cvStore.data.career_stages && cvStore.data.career_stages.length > 0">
            <h3>{{ tStatic('my_career_stages') }}</h3>
            <ol
              class="relative !pl-1 md:!pl-3 space-y-8 before:absolute before:-ml-px before:h-full before:w-1 before:rounded-full before:bg-secondary">
              <li v-for="(stage, stageIndex) in cvStore.data.career_stages" :key="stage.id"
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
                <div v-if="cvStore.data.career_stages[stageIndex + 1]" class="divider">
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
          <div v-if="cvStore.data.educational_stages && cvStore.data.educational_stages.length > 0">
            <h3>{{ tStatic('my_education_stages') }}</h3>
            <ol
              class="relative space-y-8 before:absolute before:-ml-px before:h-full before:w-1 before:rounded-full before:bg-secondary !pl-1 md:!pl-3">
              <li v-for="(stage, stageIndex) in cvStore.data.educational_stages" :key="stage.id"
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
                <div v-if="cvStore.data.educational_stages[stageIndex + 1]" class="divider">
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
    <div v-if="cvStore.data.publications && cvStore.data.publications.length > 0"
      class="p-1 rounded-sm bg-base-100">
      <div class="border-2 border-dotted rounded-sm bg-base-100 border-base-200">
        <h2 class="p-2 pb-0">{{ tStatic('publications') }}</h2>
        <ol
          class="relative !ml-4 space-y-8 before:absolute before:h-full before:w-1 before:rounded-full before:bg-secondary !pl-1 md:!pl-3">
          <li v-for="(pub, pubIndex) in cvStore.data.publications" :key="pub.publications_id.id"
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
            <div v-if="cvStore.data.publications[pubIndex + 1]" class="divider">
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