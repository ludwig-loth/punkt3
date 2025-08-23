import { getAdapter } from '../services'

export default defineEventHandler(async (event) => {
  try {
    const adapter = await getAdapter()
    const data = await adapter.getContactData()

    return data
  } catch (error) {
    console.error('Failed to fetch contact data:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch contact data'
    })
  }
})
