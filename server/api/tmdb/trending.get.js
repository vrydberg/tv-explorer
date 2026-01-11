const trendingTvShow = async (page, tmdbApiKey) => {
  const time_window = 'week' // can be 'day'

  const url = `https://api.themoviedb.org/3/trending/tv/${time_window}?language=en-US&page=${page}`

  const config = {
      method: 'GET',
      headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tmdbApiKey}`
      }
  }

  const tvShowData = await $fetch(url, config)
  return tvShowData
}

export default defineCachedEventHandler(async (event) => {
  const { tmdbApiKey } = useRuntimeConfig(event)
  try {
    const totalPages = 3
    const pages = []
      
    for (let i = 1; i < totalPages + 1; i++) {
      pages.push(i)
    }

    const requests = pages.map((page) => trendingTvShow(page, tmdbApiKey))

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
    
    return filteredTop24
    
  } catch (error) {
    console.log("Error: ", error)
  }
  
},

{
  maxAge: 60 * 60 * 24,
  getKey: () => 'tmdb_trending_top24'
});
