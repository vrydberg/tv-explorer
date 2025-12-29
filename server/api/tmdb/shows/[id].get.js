export default defineEventHandler(async (event) => {
  
  const { tmdbApiKey } = useRuntimeConfig(event)
  try {
    const id = getRouterParam(event, 'id')

    const show = await fetchDetails(tmdbApiKey, id)
    const ratings = await fetchRatings(tmdbApiKey, id, show.seasons_total)

    return {show, ratings}

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


const fetchDetails = async (tmdbApiKey, id) => {
  const url = `https://api.themoviedb.org/3/tv/${id}`
  const config = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tmdbApiKey}`,
      accept: 'application/json'
    },
  }

  const show = await $fetch(url, config)

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
    seasons_total: show.seasons.length || null
  }
  
  return formattedShow

}

const fetchRatings = async (tmdbApiKey, id, seasonsTotal) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tmdbApiKey}`,
      accept: 'application/json'
    }
  }

  const seasonRequests = []

  for (let i = 1; i <= seasonsTotal; i++) {
    const url = `https://api.themoviedb.org/3/tv/${id}/season/${i}`
    seasonRequests.push($fetch(url, config))
  }

  const results = await Promise.allSettled(seasonRequests)

  // console.log(JSON.stringify(results, null, 2))
  const ratings = results
    .filter(r => 
      r.status === 'fulfilled' && 
      r.value?.id && 
      r.value?.season_number != null 
    )
    .map(r => r.value)

  // Do not want to explicitly throw an error for ratings fetch - it is more of an enhancement rather than core feature
  if (ratings.length === 0) {
    return []
  }
  
  const formattedRatings = ratings.map(season => {
    return {
      season_id: season.id,
      season_number: season.season_number,
      name: season.name || 'null',
      overview: season.overview || null,
      air_date: season.air_date || null,
      poster_path: season.poster_path || null,
      episodes: (season.episodes || []).filter(ep => ep?.id && ep?.episode_number != null).map(ep => ({
        episode_id: ep.id,
        season_number: ep.season_number,
        episode_number: ep.episode_number,
        name: ep.name || null,
        overview: ep.overview || null,
        air_date: ep.air_date || null,
        runtime: ep.runtime || null,
        still_path: ep.still_path || null,
        rating: ep.vote_average ?? 0,
        total_votes: ep.vote_count ?? 0,
      }))
    }
  })

  console.log(JSON.stringify(formattedRatings, null, 2))

  return formattedRatings
}