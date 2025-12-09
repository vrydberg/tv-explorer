const TMDB_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTVhODkxY2UwMWI3OGExZGI4NDNiZDg3NGRmYTM4ZCIsIm5iZiI6MTc1OTQwOTM0Mi4zNjQsInN1YiI6IjY4ZGU3NGJlOWJmZGFhZGRiOTk5MWEyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.47HvFNBpun-3pS4wTrEQJdAtw5k4jfQuk_iBtihMO2w'


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
  console.log("alohamora")
  try {
    const body = await readBody(event)
    console.log(body)
    const url = 'https://api.themoviedb.org/3/discover/tv'
    const processedQuery = buildQuery(body.filters)

    const config = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${TMDB_API_KEY}`,
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
