type BaseSeo = {
  title?: string | null
  description?: string | null
  keywords?: string | null
  image?: string | null
  noIndex?: boolean
  noFollow?: boolean
  canonical?: string
}

function applySeo({ title, description, keywords, image, noIndex, noFollow, canonical }: BaseSeo) {
  const robots = [
    noIndex ? 'noindex' : 'index',
    noFollow ? 'nofollow' : 'follow',
  ].join(', ')

  useSeoMeta({
    title: title || undefined,
    description: description || undefined,
    ogTitle: title || undefined,
    ogDescription: description || undefined,
    ogImage: image || undefined,
    robots,
  })

  useHead({
    meta: keywords ? [{ name: 'keywords', content: keywords }] : [],
    link: canonical ? [{ rel: 'canonical', href: canonical }] : [],
  })
}

export function useLandingSeo(landing: Ref<Landing | null>) {
  const config = useRuntimeConfig()
  const site = useSiteConfig()
  const route = useRoute()
  const api = String(config.public.apiURL || '')
  const languageStore = useLanguageStore()

  watchEffect(() => {
    const l = landing.value
    if (!l) return
    const current = languageStore.getCurrentLanguage?.() || 'en-US'
    const trans = l.translations?.find(t => t.languages_code === current) || l.translations?.[0]
    if (!trans) return

    const seo = trans.seo || {} as any
    const img = seo.og_image
      ? `${api}/assets/${seo.og_image}`
      : (l.image ? `${api}/assets/${l.image}` : null)

    const canonical = (config.public.siteUrl ? String(config.public.siteUrl) : site.url)?.replace(/\/$/, '') + route.fullPath

    applySeo({
      title: seo.title || trans.opening_line || site.name,
      description: seo.meta_description || trans.about_me_short || site.description,
      keywords: seo.keywords || undefined,
      image: img || undefined,
      noIndex: Boolean(seo.no_index),
      noFollow: Boolean(seo.no_follow),
      canonical,
    })
  })
}

// export function useProjectSeo(project: Ref<Project | null>) {
//   const config = useRuntimeConfig()
//   const site = useSiteConfig()
//   const api = String(config.public.apiURL || '')
//   const route = useRoute()
//   const { t } = useTranslation()

//   watchEffect(() => {
//     const p = project.value
//     if (!p) return

//     const title = t(p, 'title') ? `${t(p, 'title')}${p.year ? ` — ${p.year}` : ''}` : site.name
//     const description = t(p, 'description') || undefined
//     const image = p.post_image ? `${api}/assets/${p.post_image}` : undefined

//     const base = (config.public.siteUrl || site.url || '').replace(/\/$/, '')
//     const canonical = `${base}/portfolio/${p.slug}`

//     applySeo({
//       title,
//       description,
//       image,
//       noIndex: false,
//       noFollow: false,
//       canonical,
//     })
//   })
// }

// export function useSimplePageSeo(opts: {
//   title?: string
//   description?: string
//   image?: string | null
//   noIndex?: boolean
//   noFollow?: boolean
// }) {
//   const site = useSiteConfig()
//   const route = useRoute()
//   const config = useRuntimeConfig()
//   const canonical = (config.public.siteUrl ? String(config.public.siteUrl) : site.url)?.replace(/\/$/, '') + route.fullPath

//   applySeo({
//     title: opts.title || site.name,
//     description: opts.description || site.description,
//     image: opts.image || undefined,
//     noIndex: Boolean(opts.noIndex),
//     noFollow: Boolean(opts.noFollow),
//     canonical,
//   })
// }