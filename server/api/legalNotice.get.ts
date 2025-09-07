import { getAdapter } from '../services'

export default defineEventHandler(async (event) => {
  try {
    const adapter = await getAdapter()
    const data = await adapter.getLegalNoticeData()

    return data
  } catch (error) {
    console.error('Failed to fetch Legal Notice data:', error)

  }
})

