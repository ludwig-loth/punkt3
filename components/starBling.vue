<script setup>
const blingActive = ref(false);
const starWobble = ref(false);

const props = defineProps({
  animation: {
    type: Boolean,
    default: false
  },
  interval: {
    type: Number,
    default: 9000
  }
});

function triggerBling() {
  blingActive.value = true;
  starWobble.value = true;
  setTimeout(() => {
    starWobble.value = false;
    blingActive.value = false;
  }, 1500); // match animation duration
}

onMounted(() => {
  if (props.animation) {
    triggerBling();
    setInterval(triggerBling, props.interval);
    return;
  }

});
</script>
<template>
  <div>
    <div class="relative flex items-center justify-center w-full h-full">
      <svg class="absolute stroke-secondary size-[175%] z-0" :class="{ 'star-bling': blingActive }"
        style="transform: scale(0);" viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 20V17.6M12 6.4V4M20 12H17.6M6.4 12H4M17.6569 6.34315L15.9598 8.0402M8.0402 15.9598L6.34315 17.6569M6.34293 6.34332L8.03999 8.04038M15.9596 15.96L17.6566 17.657"
          stroke-width="1.25" stroke-linecap="round" />
      </svg>
      <svg class="z-10 stroke-secondary fill-secondary"
        :class="{ 'star-wobble': starWobble }" viewBox="0 -0.5 25 25"
        xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M14.349 8.515L12.5 5L10.651 8.515C10.5204 8.77186 10.3313 8.99449 10.099 9.165C9.86556 9.33638 9.59543 9.45107 9.31 9.5L5.5 10.247L8.16 13.428C8.52377 13.8267 8.69542 14.3643 8.63 14.9L8.124 19L11.632 17.3C11.9026 17.1689 12.1993 17.1006 12.5 17.1C12.7821 17.1009 13.0599 17.1694 13.31 17.3L16.9 18.895L16.394 14.844C16.33 14.3095 16.502 13.7736 16.865 13.376L19.5 10.247L15.69 9.5C15.4042 9.45122 15.1337 9.33652 14.9 9.165C14.6681 8.99438 14.4793 8.77175 14.349 8.515Z"
          stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
  </div>
</template>

<style>
/* animation for star bling effect */
@keyframes starBling {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(0);
  }
}

.star-bling {
  animation: starBling 1.5s infinite;
  animation-timing-function: ease-in-out;
  animation-delay: var(--interval);
}

/* star wobble */
@keyframes starWobble {

  0% {
    transform: rotate(0deg);
    transform: scale(1);
  }

  25% {
    transform: rotate(-10deg);
  }

  50% {
    transform: scale(1.2);
  }

  75% {
    transform: rotate(10deg);
  }

  100% {
    transform: rotate(0deg);
    transform: scale(1);
  }
}

.star-wobble {
  animation: starWobble 1.5s infinite;
  animation-timing-function: ease;
  animation-delay: var(--interval);
}
</style>