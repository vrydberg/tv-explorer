const TMDB_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTVhODkxY2UwMWI3OGExZGI4NDNiZDg3NGRmYTM4ZCIsIm5iZiI6MTc1OTQwOTM0Mi4zNjQsInN1YiI6IjY4ZGU3NGJlOWJmZGFhZGRiOTk5MWEyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.47HvFNBpun-3pS4wTrEQJdAtw5k4jfQuk_iBtihMO2w'

const trendingTvShow = async (page) => {
  const time_window = 'week' // can be 'day'

  const url = `https://api.themoviedb.org/3/trending/tv/${time_window}?language=en-US&page=${page}`

  const config = {
      method: 'GET',
      headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TMDB_API_KEY}`
      }
  }

  const tvShowData = await $fetch(url, config)
  return tvShowData
}

export default defineEventHandler(async (event) => {
  try {
    const totalPages = 3
    const pages = []
      
    for (let i = 1; i < totalPages + 1; i++) {
      pages.push(i)
    }

    const requests = pages.map((page) => trendingTvShow(page))

    const tvShowDataPages = await Promise.all(requests)
    const tvShowData = []

    tvShowDataPages.forEach(page => {
      tvShowData.push(page.results)    
    });

    const processedShows = tvShowData.flat().filter(show => show.vote_count >= 25).sort((a, b) => b.popularity - a.popularity);
    const top24 = processedShows.splice(0, 24)

    const filteredTop24 = top24.map( (show) => ({
      id: show.id,
      title: show.name,
      rating: show.vote_average,
      first_date: show.first_air_date, 
      poster: show.poster_path,
    })) 
    
    // console.log(filteredTop20)
    return filteredTop24
} catch (error) {
    console.log("ERror: ", error)
}
  

})
