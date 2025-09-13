import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  pages: true,
  ssr: true,
  i18n: {
    strategy: 'no_prefix', // start without changing URLs
    defaultLocale: 'en-US',
    locales: [
      { code: 'de-DE', iso: 'de-DE', name: 'Deutsch', file: 'de.json' },
      { code: 'en-US', iso: 'en-US', name: 'English', file: 'en.json' }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      fallbackLocale: 'en-US'
    }
  },
  site: {
    url: "https://<site-url>",
    name: "Site Name",
    description:
      "This is the site description.",
    defaultLocale: "de",
  },
  robots: {
    blockNonSeoBots: true,
    blockAiBots: true,
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        usePolling: true,
        interval: 100
      },
      hmr: true,
    },
  },
  nitro: {
    preset: "node-server",
  },
  runtimeConfig: {
    public: {
      apiURL: process.env.NUXT_PUBLIC_API_URL,
    },
  },
  typescript: {
    typeCheck: false,
  },
  app: {
    layoutTransition: { name: "layout", mode: "out-in" },
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      link: [
        {
          rel: "preload",
          href: "/fonts/LeagueGothic-Regular.otf",
          as: "font",
          type: "font/otf",
          crossorigin: "",
        },
        {
          rel: "preload",
          href: "/fonts/LeagueGothic-CondensedRegular.otf",
          as: "font",
          type: "font/otf",
          crossorigin: "",
        },
        {
          rel: "preload",
          href: "/fonts/league-spartan.bold.otf",
          as: "font",
          type: "font/otf",
          crossorigin: "",
        },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "192x192",
          href: "/android-chrome-192x192.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "512x512",
          href: "/android-chrome-512x512.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
  },
  modules: [
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/image",
    "@nuxtjs/seo",
    "@nuxtjs/i18n",
  ],
});