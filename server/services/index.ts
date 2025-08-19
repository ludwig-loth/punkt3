import * as directus from './directus.adapter'
// import * as supabase from './supabase.adapter'
import * as nuxt_content from './nuxt_content.adapter'

const adapters = { directus, nuxt_content }

export function getAdapter(name: string) {
    return adapters[name as keyof typeof adapters]
}