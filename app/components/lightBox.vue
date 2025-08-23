<script setup>
const props = defineProps({
  imgSrc: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    default: ''
  },
});

const isOpen = ref(false);
const transformOrigin = ref('center center');
const triggerSlot = useTemplateRef('trigger-slot')
const { x, y } = usePointer()

function openLightbox() {
  const { innerWidth, innerHeight } = window;
  const xPercent = (x.value / innerWidth) * 100;
  const yPercent = (y.value / innerHeight) * 100;
  transformOrigin.value = `${xPercent}% ${yPercent}%`;

  isOpen.value = true;
}

function closeLightbox() {
  isOpen.value = false;
}
onKeyStroke('Escape', (e) => {
  if (e.key === 'Escape') {
    e.preventDefault()
  }
  isOpen.value = false;
})
watch(isOpen, (newValue) => {
  if (newValue) {
    document.body.classList.add('overflow-hidden');
  } else {
    document.body.classList.remove('overflow-hidden');
  }
});
onBeforeUnmount(() => {
  document.body.classList.remove('overflow-hidden');
});
</script>
<template>
  <div class="relative transition-all group user-select-none">
    <div ref="trigger-slot" class="transition-transform hover:scale-101">
      <div
        class="absolute rounded-full size-4 bg-primary -left-2 -bottom-2 group-hover:w-[calc(100%+1rem)] group-hover:rounded-sm group-hover:h-full transition-[width,height]">
      </div>
      <div
        class="absolute rounded-xs size-4 bg-primary -right-2 -top-2 group-hover:w-[calc(100%+1rem)] group-hover:rounded-sm group-hover:h-full transition-[width,height]">
      </div>
      <slot name="trigger" :openLightbox="openLightbox"></slot>
    </div>
    <button v-if="isOpen" @click="closeLightbox"
      class="fixed flex items-center justify-center transition-all rounded-full cursor-pointer size-12 bg-accent top-4 right-4 z-120 group/btn ring-2 ring-accent-content hover:scale-106 active:scale-94"
      aria-label="Close">
      <div
        class="relative flex items-center justify-center transition-all rounded-full size-10 bg-primary group-hover/btn:size-12">
        <svg width="100%" height="100%" viewBox="0 0 512 512" version="1.1"
          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
          xml:space="preserve" xmlns:serif="http://www.serif.com/"
          style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
          class="p-0 m-auto size-6 stroke-base-content fill-base-content">
          <g transform="matrix(1,0,0,1,0.114903,0.114903)">
            <g transform="matrix(0.947669,-0.947669,1.28069,1.28069,-210.301,266.377)">
              <path
                d="M300,23.727C300,10.632 285.632,0 267.935,0L235.065,0C217.368,0 203,10.632 203,23.727L203,332.273C203,345.368 217.368,356 235.065,356L267.935,356C285.632,356 300,345.368 300,332.273L300,23.727Z" />
            </g>
            <g transform="matrix(-0.947669,-0.947669,-0.960567,0.960567,608.339,380.339)">
              <path
                d="M300,31.635C300,14.175 285.632,0 267.935,0L235.065,0C217.368,0 203,14.175 203,31.635L203,324.365C203,341.825 217.368,356 235.065,356L267.935,356C285.632,356 300,341.825 300,324.365L300,31.635Z" />
            </g>
            <g transform="matrix(2.35986,0,0,2.44389,273.013,-169.698)">
              <circle cx="73.946" cy="96.763" r="27.326" />
            </g>
          </g>
        </svg>
      </div>
    </button>

    <div v-if="isOpen" class="fixed inset-0 transition-opacity duration-300 z-118 bg-base-content"
      :class="isOpen ? 'opacity-95' : 'opacity-0 pointer-events-none'">
    </div>

    <Transition name="zoom" mode="out-in">
      <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center w-full z-119"
        :style="{ transformOrigin: transformOrigin }">
        <div
          class="relative flex flex-col items-center justify-center w-full h-full max-w-[100vw] max-h-[99vh]">
          <NuxtImg :src="imgSrc" :alt="caption"
            class="relative object-contain w-[95vw] max-h-[95vh] pb-1" />
          <caption v-if="caption"
            class="p-1 text-sm italic font-semibold rounded-sm text-secondary-content bg-base-200">
            {{ caption }}
          </caption>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style>
.zoom-enter-active,
.zoom-leave-active {
  transition: clip-path 0.3s linear, transform 0.5s ease;
}

.zoom-enter-from,
.zoom-leave-to {
  clip-path: circle(0% at center);
  transform: scale(0);
}

.zoom-enter-to,
.zoom-leave-from {
  clip-path: circle(100% at center);
  transform: scale(1);
}
</style>
