import { createDirectus, rest, readItems } from '@directus/sdk'

const directus = createDirectus(process.env.DIRECTUS_URL!).with(rest())

export async function getPosts() {
    return await directus.request(readItems('posts'))
}