const buildQuery = (obj) => {
  const processedQuery = Object.entries(obj)
    .filter(([key, value]) => value != null && value !== '' && (!Array.isArray(value) || value.length > 0))
    .map(([key, value]) => [key, Array.isArray(value) ? value.join('|') : value]);
  return Object.fromEntries(processedQuery);
}

const formatShow = (show) => ({
  id: show.id,
  title: show.name,
  rating: show.vote_average,
  first_date: show.first_air_date, 
  poster: show.poster_path,
})

export default defineEventHandler(async (event) => {
  const { tmdbApiKey } = useRuntimeConfig(event)
  try {
    const body = await readBody(event)
    console.log(body)
    const url = 'https://api.themoviedb.org/3/discover/tv'
    const processedQuery = buildQuery(body.filters)

    const config = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${tmdbApiKey}`,
            accept: 'application/json'
        },
        query: processedQuery
    }

    const tvShowData = await $fetch(url, config)
    const formattedTvShowData = tvShowData.results.map(show => formatShow(show))
    return formattedTvShowData

  } catch (error) {
      console.log("Error: ", error)
  }
  

})
