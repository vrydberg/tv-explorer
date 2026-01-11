/**
 * External API request to TMDB to retrieve TV show data based on a user's search input. Retrieves most relevant
 * TV shows for a specific page.
 * @param {*} searchValue - User input query parameter
 * @param {*} page - Page number query parameter
 * @returns - Array of objects representing TV shows
 */
const searchTvShow = async (searchValue, page, tmdbApiKey) => {
  const url = `https://api.themoviedb.org/3/search/tv?query=${searchValue}&page=${page}`
  
  const config = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${tmdbApiKey}`
    }
  }

  const searchedTvShowData = await $fetch(url, config)
  
  return searchedTvShowData
}

/**
 * Event handler that is invoked when Nuxt/Nitro server engine receives a get request for this particular api endpoint.
 * Executes parallel TMDB requests to get TV show data across different pages. Returns filtered top 10 (custom).
 */
export default defineEventHandler(async (event) => {
  const { tmdbApiKey } = useRuntimeConfig(event)
  try {
    const queryParams = getQuery(event)
    const searchValue = queryParams.query
    
    const totalPages = 3
    const pages = []
      
    for (let i = 1; i < totalPages + 1; i++) {
        pages.push(i)
    }

    const requests = pages.map((page) => searchTvShow(searchValue, page, tmdbApiKey))

    const tvShowDataPages = await Promise.all(requests)
    const tvShowData = []
    
    tvShowDataPages.forEach(page => {
      tvShowData.push(page.results)    
    });

    const processedShows = tvShowData.flat().filter(show => show.vote_count >= 25).sort((a, b) => b.popularity - a.popularity);
    const top10 = processedShows.splice(0, 10)

    const filteredTop10 = top10.map( (show) => ({
        id: show.id,
        title: show.name,
        rating: show.vote_average,
        first_date: show.first_air_date, 
        poster: show.poster_path,
    })) 
    
    return filteredTop10

  } catch (error) {
      console.log("Error: ", error)
  }
  

})
