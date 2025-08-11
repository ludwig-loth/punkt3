<script setup>
const route = useRoute()
const router = useRouter()

const props = defineProps({
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit'].includes(value)
  },
  buttonText: {
    type: String,
    default: ''
  },
  iconPosition: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value)
  },
  icon: {
    type: String,
    default: 'send',
    validator: (value) => ['send', 'globe'].includes(value)
  },
})

const { pointerType } = usePointer()

</script>
<template>
  <button :type="type" tabindex="0"
    class="relative flex flex-row items-center p-1 text-sm font-semibold transition-all border-2 rounded-sm cursor-pointer bg-accent text-accent-content border-accent-content group/external hover:scale-105 hover:text-base-content focus:scale-103 focus:text-base-content active:scale-97 w-fit"
    :class="iconPosition === 'right' ? 'flex-row-reverse' : 'flex-row'">
    <div
      class="absolute z-10 size-7 transition-[width] origin-left  bg-primary group-hover/external:w-[calc(100%-.5rem)] group-focus/external:w-[calc(100%-.5rem)] group-hover/external:rounded-xs rounded-sm">
    </div>
    <div
      class="relative rounded-sm bg-primary *:relative *:z-20 *:p-1 *:size-7 *:stroke-accent-content">
      <svg v-if="icon === 'send'" width="100%" height="100%" viewBox="0 0 800 718" version="1.1"
        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        xml:space="preserve" xmlns:serif="http://www.serif.com/"
        style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
        class="">
        <g transform="matrix(1,0,0,1,3.55271e-15,-56.821)">
          <g id="send" transform="matrix(1.23061,0,0,1.23061,-82.0109,-86.7005)">
            <path
              d="M675.03,117.718C701.297,110.963 724.207,136.739 714.417,162.034L514.417,678.7C505.833,700.87 477.467,707.187 460.29,690.757L347.55,582.92L307.47,623C286.261,644.21 249.997,629.19 249.997,599.197L249.997,489.607L76.956,324.089C58.065,306.02 66.378,274.228 91.695,267.718L675.03,117.718ZM604.53,261.231L337.93,481.463L470.277,608.053L604.53,261.231ZM551.937,218.206L166.362,317.354L289.423,435.063L551.937,218.206Z"
              style="fill-rule:nonzero;" />
          </g>
        </g>
      </svg>
      <svg v-if="icon === 'globe'" width="100%" height="100%" viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg" fill="none">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M12 2C15 4 15.9228 8.29203 16 12C15.9228 15.708 15 20 12 22M12 2C9 4 8.07725 8.29203 8 12C8.07725 15.708 9 20 12 22M12 2C6.47715 2 2 6.47715 2 12M12 2C17.5228 2 22 6.47715 22 12M12 22C17.5229 22 22 17.5228 22 12M12 22C6.47716 22 2 17.5228 2 12M22 12C20 15 15.708 15.9228 12 16C8.29203 15.9228 4 15 2 12M22 12C20 9 15.708 8.07725 12 8C8.29203 8.07725 4 9 2 12"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </g>
      </svg>
    </div>
    <div class="z-20 px-2">{{ buttonText }}</div>
  </button>
</template>


<style></style>