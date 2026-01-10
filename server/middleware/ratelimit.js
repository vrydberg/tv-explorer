
export default defineEventHandler( async (event) => {
  try {
    const path = event.path
    if (path.startsWith('/api/tmdb')) {
      const ip = getRequestIP(event, { xForwardedFor: true}) || 'anon'
      const { success } = await validateRateLimit(ip)

      if (!success) {
        throw createError({
          statusCode: 429,
          statusMessage: 'Too many requests',
          message: 'Request rate limit exceeded. Please wait before making more requests.'
        })
      }
    }
  } catch (error) {
    console.error("Rate Limit Error: ", error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'Internal server error'
    })
    
  }
})