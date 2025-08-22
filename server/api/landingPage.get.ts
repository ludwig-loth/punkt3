import { getAdapter, getActiveAdapter } from '../services'

export default defineEventHandler(async (event) => {
  try {
    const adapter = await getAdapter()
    const data = await adapter.getLandingPageData()
    // const old_data = await adapter.getLandingPageData_old()

    // Log which adapter is being used for debugging
    const activeAdapter = getActiveAdapter()
    
    console.log('############################');
    console.log(`\nUsing adapter: ${activeAdapter}`)
    console.log('############################');
    return data
  } catch (error) {
    console.error('Failed to fetch landing page data:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch landing page data'
    })
  }
})
