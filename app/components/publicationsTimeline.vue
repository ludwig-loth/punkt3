<script lang="ts" setup>
interface Props {
  items: Publication[]
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
  <ol v-if="(items && items.length > 0)"
    class="relative space-y-8 before:absolute before:h-full before:w-1 before:rounded-full before:bg-secondary !pl-1 md:!pl-3">
    <li v-for="(pub, pubIndex) in items" :key="pub.id" class="list-none">
      <div class="relative flex items-start gap-2 -ml-2">
        <span v-if="milestoneStyle === 'circle'"
          class="-mt-1 rounded-full bg-secondary size-5 shrink-0 ring-2 ring-base-100 -ml-2.25">
        </span>
        <span v-else-if="milestoneStyle === 'square'"
          class="-mt-1 rounded-sm bg-secondary size-4.5 shrink-0 ring-2 ring-base-100 -ml-2">
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
        <span class="-mt-2">
          <span>
            <template v-for="(author, idx) in pub.authors">
              <span class="font-semibold">
                <template v-if="author.first_name">
                  {{author.first_name.split(' ').map((n: string) => n[0] + '.').join(' ')}}
                </template>
                {{ author.last_name }}
              </span>
              <span v-if="pub.authors && idx < pub.authors.length - 1">, </span>
            </template>
          </span>
          ,
          <span class="font-normal"> "{{ pub.title }}"</span>,
          <span class="italic">
            {{ pub.journal || pub.conference }}
          </span>
          <span v-if="pub.publisher">
            , {{ pub.publisher }}
          </span>
          <span v-if="pub.location">
            , {{ pub.location }}
          </span>
          <span v-if="pub.year">
            , {{ pub.year }}
          </span>
          <span v-for="(field, index) in pub.additional_fields" :key="field.value">
            , {{ field.name }}
          </span>
          <div v-if="pub.identifier && pub.identifier.type === 'DOI'" class="flex flex-nowrap">
            DOI: <a :href="`https://doi.org/${pub.identifier.value}`" target="_blank" class="ml-2">
              {{ pub.identifier.value }}
            </a>
          </div>
          <div v-else-if="pub.identifier" class="flex flex-nowrap">
            {{ pub.identifier.type }}: <span class="ml-2 font-medium">
              {{ pub.identifier.value }}
            </span>
          </div>
        </span>
      </div>
      <div v-if="items[pubIndex + 1]" class="pl-4 divider">
        <div class="h-fit my-4 max-w-full border-t-3 border-dotted !border-base-200">
        </div>
      </div>
    </li>
  </ol>
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