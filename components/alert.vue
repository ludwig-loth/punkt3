<script setup>
const { tStatic } = useTranslation()
const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['info', 'warning', 'error', 'success'].includes(value)
  },
  message: {
    type: String,
    default: 'This is an alert message'
  },
  displayDuration: {
    type: Number,
    default: 5000
  }
});

const heading = computed(() => {
  switch (props.type) {
    case 'info':
      return `${tStatic('alert_info')}:`;
    case 'warning':
      return `${tStatic('alert_warning')}:`;
    case 'error':
      return `${tStatic('alert_error')}:`;
    case 'success':
      return `${tStatic('alert_success')}:`;
    default:
      return '';
  }
});

const colorClass = computed(() => {
  switch (props.type) {
    case 'info':
      return 'bg-info text-blue-500';
    case 'warning':
      return 'bg-yellow-100 text-yellow-500';
    case 'error':
      return 'bg-red-100 text-red-500';
    case 'success':
      return 'bg-success text-success-content';
    default:
      return 'bg-gray-100 text-gray-500';
  }
});
const colorClassIcon = computed(() => {
  switch (props.type) {
    case 'info':
      return 'bg-info text-blue-500';
    case 'warning':
      return 'bg-yellow-100 text-yellow-500';
    case 'error':
      return 'bg-red-100 text-red-500';
    case 'success':
      return 'fill-success-content text-success-content';
    default:
      return 'bg-gray-100 text-gray-500';
  }
});
const barWidth = ref('100%')

function triggerBar() {
  barWidth.value = '100%'
  // nextTick ensures DOM update before transition
  setTimeout(() => {
    barWidth.value = '0%'
  }, 10)
}

// Watch for alert being shown (v-if or v-show)
watch(
  () => props.modelValue ?? true, // fallback for always-on if no v-model
  (show) => {
    if (show) triggerBar()
  },
  { immediate: true }
)

// Also retrigger if displayDuration changes while visible
watch(
  () => props.displayDuration,
  () => {
    if (props.modelValue ?? true) triggerBar()
  }
)
const barStyle = computed(() => ({
  width: barWidth.value,
  transition: `width ${props.displayDuration}ms linear`
}))
</script>
<template>
  <div class="relative flex items-center justify-between gap-2 p-1 rounded-sm w-fit"
    :class="colorClass">
    <div class="flex items-center gap-2">
      <div class=" *:size-7">
        <svg v-if="type === 'success'" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
          :class="colorClassIcon">
          <g>
            <path
              d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z">
            </path>
          </g>
        </svg>
        <svg v-if="type === 'info'" width="800px" height="800px" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg" class="fill-info">
          <path fill-rule="evenodd"
            d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0zm8-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm.01 8a1 1 0 102 0V9a1 1 0 10-2 0v5z" />
        </svg>
      </div>
      <div class="text-sm">
        <span class="font-semibold">{{ heading }}</span> {{ message }}
      </div>
    </div>
    <div class="absolute h-0.5 bottom-0 bg-base-content left-0 transition-all" :style="barStyle">
    </div>
  </div>
</template>