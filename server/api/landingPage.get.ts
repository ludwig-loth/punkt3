import { getAdapter, getActiveAdapter } from '../services'

export default defineEventHandler(async (event) => {
  try {
    const adapter = await getAdapter()
    const data = await adapter.getLandingPageData()

    const activeAdapter = getActiveAdapter()
    console.log('############################');
    console.log(`\nUsing adapter: ${activeAdapter}`)
    console.log('############################');
    return data
  } catch (error) {
    console.error('Failed to fetch landing page data:', error)
  }
})