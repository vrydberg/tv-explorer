export default defineEventHandler(async (event) => {
  
  const { tmdbApiKey } = useRuntimeConfig(event)
  try {

    const id = getRouterParam(event, 'id')
    const url = `https://api.themoviedb.org/3/tv/${id}`
    const config = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tmdbApiKey}`,
        accept: 'application/json'
      },
    }

    const show = await $fetch(url, config)

    if (!show) {
      throw createError({
        statusCode: 404,
        message: 'TV Show not found'
      })
    }

    // Validate essential fields exist, otherwise can just do safe formatting
    if (!show?.id || !show?.name || !show?.overview) {
      throw createError({
        statusCode: 404,
        message: 'TV show not found'
      })
    }

    const formattedShow = {
      id: show.id,
      title: show.name,
      overview: show.overview,
      created_by: show.created_by?.[0]?.name || null,
      rating: show.vote_average || null,
      total_votes: show.vote_count || null,
      production_companies: show.production_companies || null,
      languages: show.spoken_languages || null,
      release_year: show.first_air_date.substring(0, 4) || null,
      backdrop: show.backdrop_path || null,
      poster: show.poster_path || null,
      status: show.status || null,
      origin_country: show.origin_country?.[0] || null,
      genres: show.genres || null,
      tagline: show.tagline || null,
    }
    
    return formattedShow
  } catch (error) {
    console.error("Error (shows[id].get): ", error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'Something went wrong fetching the TV show data'
    })
    
  }
})