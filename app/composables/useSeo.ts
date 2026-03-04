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

  watchEffect(() => {
    const l = landing.value
    if (!l) return

    const seo = l.seo || {} as any
    const siteUrl = config.public.siteUrl ? String(config.public.siteUrl) : site.url
    const img = seo.og_image
      ? (seo.og_image.startsWith('/') ? `${siteUrl}${seo.og_image}` : seo.og_image)
      : (l.image ? (l.image.startsWith('/') ? `${siteUrl}${l.image}` : l.image) : null)

    const canonical = siteUrl?.replace(/\/$/, '') + route.fullPath

    applySeo({
      title: seo.title || l.opening_line || site.name,
      description: seo.meta_description || l.about_me_short || site.description,
      keywords: seo.keywords || undefined,
      image: img || undefined,
      noIndex: Boolean(seo.no_index),
      noFollow: Boolean(seo.no_follow),
      canonical,
    })
  })
}
