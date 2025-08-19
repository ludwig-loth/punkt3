import { queryContent } from '#content/server'

export async function getPosts() {
    const posts = await queryContent('blog').find()
    return posts
}

export async function getPost(slug: string) {
    const post = await queryContent('blog').where({ slug }).findOne()
    return post
}