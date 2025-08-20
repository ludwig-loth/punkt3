// Available adapter types
const AVAILABLE_ADAPTERS = ['directus', 'supabase', 'nuxt_content'] as const
type AdapterName = typeof AVAILABLE_ADAPTERS[number]

// Get the configured adapter from environment variable
const ACTIVE_ADAPTER = process.env.NUXT_BACKEND_ADAPTER as AdapterName

// Validate the configured adapter - throw error if not configured correctly
try {
    if (!ACTIVE_ADAPTER) {
        throw new Error('NUXT_BACKEND_ADAPTER environment variable is not set')
    }

    if (!AVAILABLE_ADAPTERS.includes(ACTIVE_ADAPTER)) {
        throw new Error(`Invalid adapter '${ACTIVE_ADAPTER}' configured in environment. Available adapters: ${AVAILABLE_ADAPTERS.join(', ')}`)
    }
} catch (error) {
    console.error('Adapter configuration error:', error)
    throw error
}

// Cache for the loaded adapter
let adapterCache: any = null

// Dynamically import the configured adapter
async function loadAdapter() {
    if (adapterCache) {
        return adapterCache
    }

    switch (ACTIVE_ADAPTER) {
        case 'directus':
            adapterCache = await import('./directus.adapter')
            break
        case 'supabase':
            adapterCache = await import('./supabase.adapter')
            break
        case 'nuxt_content':
            adapterCache = await import('./nuxt_content.adapter')
            break
        default:
            throw new Error(`Adapter implementation for '${ACTIVE_ADAPTER}' not found`)
    }

    return adapterCache
}

export async function getAdapter(): Promise<any> {
    return await loadAdapter()
}

export function getActiveAdapter(): string {
    return ACTIVE_ADAPTER
}

export function getAvailableAdapters(): string[] {
    return [...AVAILABLE_ADAPTERS]
}