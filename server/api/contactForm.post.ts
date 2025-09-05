import { getAdapter } from '../services'

export default defineEventHandler(async (event) => {
  if (event.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    const body = await readBody(event)
    // Validate required fields
    if (!body.name || !body.mail || !body.text) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields: name, mail, text'
      })
    }

    const adapter = await getAdapter()
    await adapter.submitContactForm({
      name: body.name,
      mail: body.mail,
      text: body.text
    })

    return { success: true, message: 'Contact form submitted successfully' }
  } catch (error) {
    console.error('Failed to submit contact form:', error)

    throw createError({
      statusCode: 500,
      statusMessage: `Failed to submit contact form: ${error}`
    })
  }
})