<script lang="ts" setup>
const languageStore = useLanguageStore();
const { t, tStatic } = await useTranslation()

interface Props {
  type: 'career' | 'educational' | 'publication'
  items: (CareerStage | EducationalStage)[] | [] | null
  milestoneStyle?: 'square' | 'circle' | 'diamond' | 'triangle'
}
/*  Attention!:
* 'triangle' is an experimantal feature and it is just ok in firefox based browsers
* I don't know about Safari
*/
const props = withDefaults(defineProps<Props>(), {
  milestoneStyle: 'circle'
})
</script>

<template>
  <div v-if="(items && items.length > 0)">
    <h3 v-if="type === 'career'">{{ tStatic('my_career_stages') }}</h3>
    <h3 v-else-if="type === 'educational'">{{ tStatic('my_education_stages') }}</h3>
    <ol
      class="relative !pl-1 md:!pl-3 space-y-8 before:absolute before:-ml-px before:h-full before:w-1 before:rounded-full before:bg-secondary">
      <li v-for="(stage, stageIndex) in items" :key="stage.id" class="list-none">
        <div class="relative flex items-start gap-2">
          <span v-if="milestoneStyle === 'circle'"
            class="-mt-1 rounded-full bg-secondary size-5 shrink-0 ring-2 ring-base-100  -ml-2.25">
          </span>
          <span v-else-if="milestoneStyle === 'square'"
            class="-mt-1 rounded-sm bg-secondary size-4.5 shrink-0 ring-2 ring-base-100  -ml-2">
          </span>
          <span v-else-if="milestoneStyle === 'diamond'"
            class="-mt-1 rotate-45 rounded-sm bg-secondary size-4.5 shrink-0 ring-2 ring-base-100 ml-0.25">
          </span>
          <div v-else-if="milestoneStyle === 'triangle'"
            class="relative flex items-center justify-center -mt-1 -ml-[2.25px]">
            <span class="triangle-ring absolute -mt-0.5"></span>
            <span class="triangle shrink-0 bg-secondary">
            </span>
          </div>
          <div class="flex flex-col w-full gap-2 -mt-1">
            <div
              class="flex flex-col flex-wrap items-start justify-between gap-2 text-sm font-medium md:flex-row text-secondary-content">
              <div class="flex">
                <div v-if="stage.date_display === 'year'" class="flex flex-row items-center gap-1">
                  <nuxt-time v-if="stage.from" :datetime="stage.from" year="numeric"
                    :locale="languageStore.getCurrentLanguage()"></nuxt-time>
                  <span>-</span>
                  <nuxt-time v-if="stage.to" :datetime="stage.to" year="numeric"
                    :locale="languageStore.getCurrentLanguage()"></nuxt-time>
                  <div v-else-if="stage.until_today">{{ tStatic('today') }}</div>
                  <div></div>
                </div>
                <div v-else-if="stage.date_display === 'month_year'"
                  class="flex flex-row items-center gap-1">
                  <nuxt-time v-if="stage.from" :datetime="stage.from" month="long" year="numeric"
                    :locale="languageStore.getCurrentLanguage()"></nuxt-time>
                  <span>-</span>
                  <nuxt-time v-if="stage.to" :datetime="stage.to" month="long" year="numeric"
                    :locale="languageStore.getCurrentLanguage()"></nuxt-time>
                  <div v-else-if="stage.until_today">{{ tStatic('today') }}</div>
                </div>
                <div v-else-if="stage.date_display === 'full'"
                  class="flex flex-row items-center gap-1">
                  <nuxt-time v-if="stage.from" :datetime="stage.from" day="numeric" month="long"
                    year="numeric" :locale="languageStore.getCurrentLanguage()"></nuxt-time>
                  <span>-</span>
                  <nuxt-time v-if="stage?.to" :datetime="stage.to" day="numeric" month="long"
                    year="numeric" :locale="languageStore.getCurrentLanguage()"></nuxt-time>
                  <div v-else-if="stage.until_today">{{ tStatic('today') }}</div>
                </div>
                <span v-if="t(stage, 'employment_level') && type === 'career'" class="text-sm">
                  ({{ t(stage, 'employment_level') }})
                </span>
              </div>
              <div>{{ t(stage, 'location') }}</div>
            </div>
            <div v-if="type === 'career'" class="font-bold text-base-content">
              <p class="text-lg">
                {{ t(stage, 'position') }}
              </p>
              <p>
                {{ t(stage, 'company') }}
              </p>
            </div>
            <div v-else-if="type === 'educational'">
              <div class="font-bold text-base-content">
                <p class="text-lg">
                  {{ t(stage, 'degree') }}
                </p>
                <p>{{ t(stage, 'institution') }}
                </p>
              </div>
              <div class="text-sm">
                <div v-if="t(stage, 'final_thesis_title') || t(stage, 'final_thesis_grade')"
                  class="py-2">
                  <div v-if="t(stage, 'final_thesis_title')" class="font-medium">{{
                    tStatic('final_thesis') }}:</div>
                  <div>{{ t(stage, 'final_thesis_title') }}</div>
                  <div v-if="t(stage, 'final_thesis_grade')">({{ tStatic('grading') }}: {{
                    t(stage, 'final_thesis_grade')
                    }})
                  </div>
                </div>
                <div v-if="t(stage, 'final_grade')" class="font-medium ">
                  {{ tStatic('final_grade') }}: {{ t(stage, 'final_grade') }}
                </div>
              </div>
            </div>
            <p v-html="t(stage, 'additional_info')" class="text-sm">
            </p>
          </div>
        </div>
        <div v-if="items[stageIndex + 1]" class="pl-4 divider">
          <div class="h-fit my-4 max-w-full border-t-3 border-dotted !border-base-200">
          </div>
        </div>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.triangle {
  --r: 0.2rem;
  width: 1.55rem;
  aspect-ratio: 1/cos(30deg);
  --_g: calc(tan(60deg)*var(--r)) bottom var(--r), #000 98%, #0000 101%;
  -webkit-mask:
    conic-gradient(from -30deg at 50% calc(200% - 3*var(--r)/2), #000 60deg, #0000 0) 0 100%/100% calc(100% - 3*var(--r)/2) no-repeat,
    radial-gradient(var(--r) at 50% calc(2*var(--r)), #000 98%, #0000 101%),
    radial-gradient(var(--r) at left var(--_g)),
    radial-gradient(var(--r) at right var(--_g));
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
  background: var(--color-secondary);
}

.triangle-ring {
  --r: 0.3rem;
  width: calc(1.55rem + 8px);
  aspect-ratio: 1/cos(30deg);
  --_g: calc(tan(60deg)*var(--r)) bottom var(--r), #000 98%, #0000 101%;
  -webkit-mask:
    conic-gradient(from -30deg at 50% calc(200% - 3*var(--r)/2), #000 60deg, #0000 0) 0 100%/100% calc(100% - 3*var(--r)/2) no-repeat,
    radial-gradient(var(--r) at 50% calc(2*var(--r)), #000 98%, #0000 101%),
    radial-gradient(var(--r) at left var(--_g)),
    radial-gradient(var(--r) at right var(--_g));
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
  background: var(--color-base-100);
}
</style>