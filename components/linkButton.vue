<script setup>
const route = useRoute()
const router = useRouter()

const props = defineProps({
  link: {
    type: String,
    default: '/'
  },
  linkText: {
    type: String,
    default: 'open'
  },
  iconPosition: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value)
  },
  icon: {
    type: String,
    default: 'external',
    validator: (value) => ['external', 'arrow-up', 'arrow-down'].includes(value)
  },
  internal: {
    type: Boolean,
    default: false
  },
  backBtn: {
    type: Boolean,
    default: false
  }
})

const linkTarget = computed(() => {
  if (props.internal) {
    return '_self'
  } else {
    return '_blank'
  }
})

const { pointerType } = usePointer()

function openLink(li) {
  if (props.backBtn) {
    const pathSegments = route.fullPath.split('/').filter(Boolean);
    pathSegments.pop();
    router.push(`/${pathSegments.join('/')}` || '/');
  } else if (!props.internal) {
    window.open(li, linkTarget.value);
  }
}
// function openLink(li) {
//   if (props.backBtn) {
//     const pathSegments = route.fullPath.split('/').filter(Boolean);
//     pathSegments.pop();
//     router.push(`/${pathSegments.join('/')}` || '/');
//   } else if (!props.internal) {
//     if (pointerType.value === 'mouse' || pointerType.value === null) {
//       window.open(li, linkTarget.value);
//       return;
//     } else if (pointerType.value === 'touch' || pointerType.value === 'pen') {
//       setTimeout(() => {
//         window.open(li, linkTarget);
//       }, 1000);
//     }
//   }
// }
</script>
<template>
  <NuxtLink @click="openLink(link)"
    class="relative flex flex-row items-center p-1 text-sm font-semibold transition-all border-2 rounded-sm cursor-pointer bg-accent text-accent-content border-accent-content group/external hover:scale-105 hover:text-base-content focus:scale-103 focus:text-base-content active:scale-97 w-fit"
    tabindex="0" :class="iconPosition === 'right' ? 'flex-row-reverse' : 'flex-row'">
    <div
      class="absolute z-10 w-6 h-6 transition-[width] origin-left  bg-primary group-hover/external:w-[calc(100%-.5rem)] group-focus/external:w-[calc(100%-.5rem)] group-hover/external:rounded-xs rounded-sm">
    </div>
    <div class="relative rounded-sm bg-primary">
      <svg v-if="icon === 'external'" width="100%" height="100%" viewBox="0 0 514 512" version="1.1"
        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        xml:space="preserve" xmlns:serif="http://www.serif.com/"
        style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
        class="relative z-20 p-1 size-6 fill-accent-content stroke-accent-content">
        <g transform="matrix(1,0,0,1,-0.0544218,1.23478e-14)">
          <g transform="matrix(2.35986,0,0,2.44389,5.49829,90.3025)">
            <circle cx="73.946" cy="96.763" r="27.326" />
          </g>
          <g transform="matrix(0.794715,0,0,0.794715,23.1057,66.1057)">
            <path
              d="M260.98,20L114.104,20C62.166,20 20,62.166 20,114.104L20,417.896C20,469.834 62.166,512 114.104,512L417.896,512C469.834,512 512,469.834 512,417.896L512,283.571"
              style="fill:none;stroke:black;stroke-width:98.01px;" />
          </g>
          <path
            d="M505.397,7.694C496.744,-0.96 485.69,0.035 485.69,0.035L331.637,0.294C331.637,0.294 312.686,0.711 309.617,16.824C306.906,31.061 315.083,36.976 315.083,36.976L353.892,77.655C353.892,77.655 357.592,80.779 357.584,86.44C357.576,92.102 353.921,95.181 353.921,95.181L263.629,185.473C263.629,185.473 255.995,191.576 256,203.912C256.005,216.248 263.777,222.511 263.777,222.511L286.994,245.729C286.994,245.729 294.612,253.591 305.645,253.594C318.029,253.598 324.753,245.259 324.753,245.259L414.462,155.55C414.462,155.55 417.484,152.096 423.116,152.087C428.748,152.078 431.759,155.522 431.759,155.522L477.03,198.923C477.03,198.923 485.535,208.641 500.475,202.175C513.536,196.523 512.796,182.371 512.796,182.371L513.07,27.415C513.07,27.415 514.051,16.348 505.397,7.694Z" />
        </g>
      </svg>
      <svg v-if="icon === 'arrow-up' || icon === 'arrow-down'" width="100%" height="100%"
        viewBox="0 0 290 512" version="1.1" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"
        xmlns:serif="http://www.serif.com/"
        style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
        class="relative z-20 p-1 size-6 fill-accent-content stroke-accent-content" :class="{
          'rotate-180': icon === 'arrow-down',
          'rotate-0': icon === 'arrow-up'
        }">
        <g transform="matrix(1,0,0,1,-105,4.08562e-14)">
          <g transform="matrix(2.35986,0,0,2.44389,75.4983,208.739)">
            <circle cx="73.946" cy="96.763" r="27.326" />
          </g>
          <g transform="matrix(0.190981,0,0,0.566739,129.682,41.9334)">
            <path
              d="M630,0L368.194,67.168L263.472,137.747L420.555,208.326L420.555,455.354L630,493.062L630,0Z" />
          </g>
          <g transform="matrix(-0.190981,0,0,0.566739,364.964,33.4683)">
            <path
              d="M630,0L310,48.766L130.716,187.973L392.522,205.618L444.884,487.935L630,493.062L630,0Z" />
          </g>
          <g transform="matrix(0.692918,0,0,0.695116,71.7976,-11.6442)">
            <path
              d="M257,16.751C238.084,16.751 227.089,29.878 227.089,29.878L59,198C59,198 38.744,219.101 53.001,240C65.597,258.465 81,256 81,256L167.875,258.038C167.875,258.038 175.334,257.41 181.513,263.587C187.692,269.764 187.062,277.1 187.062,277.1L187.062,473.846C187.062,473.846 185.39,488.812 198.878,502.247C212.365,515.682 227.704,514.038 227.704,514.038L278.456,514.038C278.456,514.038 295.374,514.304 307.437,502.287C320.976,488.799 319.211,472.388 319.211,472.388L319.211,276.913C319.211,276.913 318.74,269.858 324.885,263.712C331.031,257.566 338.086,258.038 338.086,258.038L435,256C435,256 454.916,257.321 464.178,234C472.276,213.612 456,199 456,199L286.94,29.878C286.94,29.878 275.916,16.751 257,16.751ZM258.61,80.447C252.213,80.447 248.276,84.876 248.276,84.876L179.322,173.849C179.322,173.849 170.88,182.043 176.872,190.825C182.141,198.55 189.286,197.837 189.286,197.837L215.028,197.729L229.462,197.729C229.462,197.729 234.968,197.266 239.528,201.825C244.089,206.385 243.624,211.799 243.624,211.799L243.624,446.968C243.624,446.968 243.146,452.367 247.697,456.919C252.249,461.471 257.648,460.992 257.648,460.992L277.001,460.992C277.001,460.992 282.521,461.475 287.101,456.896C291.684,452.315 291.197,446.599 291.197,446.599L291.197,226.708C291.197,226.708 290.849,221.501 295.385,216.965C299.922,212.428 305.129,212.777 305.129,212.777L360.448,212.777C360.448,212.777 369.819,213.014 373.724,203.181C376.77,195.513 370.459,189.157 370.459,189.157L268.943,84.876C268.943,84.876 265.007,80.447 258.61,80.447Z" />
          </g>
        </g>
      </svg>
    </div>
    <div class="z-20 px-1 pl-2">{{ linkText }}</div>
  </NuxtLink>
</template>


<style></style>