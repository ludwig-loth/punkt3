class NuxtContentAdapter {

    constructor() {
        if (!process.env.NUXT_PUBLIC_API_URL) {
            throw new Error('NUXT_PUBLIC_API_URL environment variable is required')
        }
    }

    async getAdapterName() {
        return 'nuxt_content'
    }

}

export default NuxtContentAdapter