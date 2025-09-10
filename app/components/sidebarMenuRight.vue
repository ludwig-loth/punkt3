<script setup lang="ts">
interface Props {
  submenu: SubMenu;
  icon?: boolean;
  btns?: boolean;
  mobile?: boolean;
  active?: boolean;
}
const landingStore = useLandingStore();
const route = useRoute()

const props = withDefaults(defineProps<Props>(), {
  submenu: () => ({ items: [], heading: '' }),
  icon: true,
  btns: true,
  mobile: false,
  active: false,
});

const isActiveOrChild = (menuItemPath: string): boolean =>
  route.fullPath === menuItemPath || route.fullPath.startsWith(menuItemPath + '/')

const getParentRoute = (): string => {
  const pathSegments = route.fullPath.split('/').filter(Boolean);
  pathSegments.pop();
  return `/${pathSegments.join('/')}` || '/';
};

// Computed property to get the previous and next slugs
const navigationLinks = computed(() => {
  const currentSlug = route.params.slug;
  const si = props.submenu.items;
  const currentIndex = si.findIndex(item => item.slug === currentSlug);

  const prev = currentIndex > 0 ? si[currentIndex - 1]?.slug : null;
  const next = currentIndex < si.length - 1 ? si[currentIndex + 1]?.slug : null;

  return { prev, next };
});
</script>

<template>
  <div v-if="landingStore.landingData && active">
    <div class="z-0 w-40 p-1 text-sm rounded-sm bg-base-100 outline-2 outline-base-content">
      <h2 v-if="submenu.heading"
        class="flex flex-row items-center justify-between gap-1 p-2 mb-1 text-sm rounded-sm lg:flex-row-reverse bg-base-300">
        <div>{{ submenu.heading }}</div>
        <svg v-if="icon" width="100%" height="100%" viewBox="0 0 401 512" version="1.1"
          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
          xml:space="preserve" xmlns:serif="http://www.serif.com/"
          style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
          class="-ml-1 rotate-270 lg:rotate-180 size-5 stroke-base-content fill-base-content">
          <g transform="matrix(1,0,0,1,-59.7367,-7.59393e-14)">
            <g transform="matrix(1,0,0,1.02103,4.41063,-3.17039)">
              <path
                d="M70.956,240C99.394,255.022 409.797,255.022 440.074,240C467.103,226.589 456.158,174.37 431.659,149.87L305.644,23.856C277.977,-3.812 233.052,-3.812 205.385,23.856L79.37,149.87C54.871,174.37 44.275,225.907 70.956,240Z" />
            </g>
            <g transform="matrix(3.69478,0,0,3.90683,-9.76677,27.2044)">
              <circle cx="73.946" cy="96.763" r="27.326" />
            </g>
          </g>
        </svg>
      </h2>
      <div v-if="btns"
        class="flex flex-row items-center justify-between w-full h-[38px] gap-4 p-1 rounded-sm bg-base-200">
        <NuxtLink v-if="navigationLinks.prev" :href="`${getParentRoute()}/${navigationLinks.prev}`"
          class="flex flex-row items-center text-sm transition-all w-9 h-7 rounded-xs bg-accent outline-2 outline-base-content hover:scale-105 active:scale-95 group/btnPrev">
          <div
            class="flex items-center justify-center h-5 mx-auto transition-all w-7 rounded-xs bg-primary group-hover/btnPrev:h-7 group-hover/btnPrev:w-9">
            <svg width="100%" height="100%" viewBox="0 0 290 512" version="1.1"
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              xml:space="preserve" xmlns:serif="http://www.serif.com/"
              style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
              class="relative rotate-270 size-5 stroke-base-content fill-base-content">
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
        </NuxtLink>
        <NuxtLink v-if="navigationLinks.next" :href="`${getParentRoute()}/${navigationLinks.next}`"
          class="flex flex-row items-center ml-auto text-sm transition-all w-9 h-7 rounded-xs bg-accent outline-2 outline-base-content hover:scale-105 active:scale-95 group/btnNext">
          <div
            class="flex items-center justify-center h-5 mx-auto transition-all w-7 rounded-xs bg-primary group-hover/btnNext:h-7 group-hover/btnNext:w-9">
            <svg width="100%" height="100%" viewBox="0 0 290 512" version="1.1"
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              xml:space="preserve" xmlns:serif="http://www.serif.com/"
              style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
              class="relative rotate-90 size-5 stroke-base-content fill-base-content">
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
        </NuxtLink>
      </div>
      <div class="flex flex-col gap-0 pr-1 mb-1 overflow-y-auto max-h-62 custom-scrollbar"
        :class="submenu.items.length > 6 ? 'w-41.5' : 'w-full'">
        <div v-for="n in submenu.items" :key="n.slug">
          <NuxtLink :href="`${n.slug}`">
            <div class="relative ml-2 mr-1 font-semibold transition-all active:scale-95"
              :class="{ 'hover:scale-105': route.params.slug !== n.slug }">
              <div
                class="relative z-20 w-full p-1 my-1 transition-all border-2 rounded-sm outline-secondary bg-base-100 peer/sublink "
                :class="{ 'scale-95 bg-base-300 outline-3 cursor-default': route.params.slug === n.slug }">
                <div class="w-full truncate">
                  {{ n.title }}
                </div>
              </div>
              <div
                class="absolute z-10 inset-0 h-[calc(100%+6px)] w-[calc(100%+6px)] mx-auto -left-[3px] -top-[3px] bg-primary rounded-sm scale-x-4 origin-left peer-hover/sublink:scale-x-100 transition-transform"
                :class="{ 'hidden': route.params.slug === n.slug }">
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>


<style></style>