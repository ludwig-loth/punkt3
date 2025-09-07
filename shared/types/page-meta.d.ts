import 'nuxt/schema'
declare module 'nuxt/schema' {
  interface PageMeta {
    underConstruction?: boolean
  }
}
export {}