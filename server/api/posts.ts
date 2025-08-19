import { getAdapter } from '../services'

export default defineEventHandler(async (event) => {
  // Backend-Wahl aus Query, Cookie oder Session
  const query = getQuery(event)
  const backend = query.backend as string || 'directus'

  const adapter = getAdapter(backend)
  return await adapter.getPosts()
})
