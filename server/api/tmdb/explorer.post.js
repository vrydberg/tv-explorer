const buildQuery = (obj) => {
  const processedQuery = Object.entries(obj)
    .filter(([key, value]) => value != null && value !== '' && (!Array.isArray(value) || value.length > 0))
    .map(([key, value]) => [key, Array.isArray(value) ? value.join('|') : value]);
  return Object.fromEntries(processedQuery);
}

const generateCacheKey = (processedQuery) => {
  const defaultFilters = ['page', 'language','sort_by', 'with_genres', 'with_original_language', 'first_air_date.gte', 'first_air_date.lte', 'vote_average.gte', 'with_runtime.gte', 'with_runtime.lte', 'vote_count.gte']

  let chunks = ['tmdb', 'explorer'];
  
  for (const filter of defaultFilters) {
    if (!Object.hasOwn(processedQuery, filter)) continue

    let value = processedQuery[filter]

    // if (typeof value === 'string' && value.includes("|")) {
    if (filter === 'with_genres') {
      value = value.split('|').sort().join('_')
    }

    const redisSafeFilter = filter.replace(/\./g, '_')
    chunks.push(`${redisSafeFilter}_${value}`) 
  } 

  const cacheKey = chunks.join("_")
  return cacheKey
}

const formatShow = (show) => ({
  id: show.id,
  title: show.name,
  rating: show.vote_average,
  first_date: show.first_air_date, 
  poster: show.poster_path,
})

export default defineCachedEventHandler(async (event) => {
  const { tmdbApiKey } = useRuntimeConfig(event)
  try {
    const body = await readBody(event)
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
    const totalPages = tvShowData?.total_pages || 1
  
    const formattedTvShowData = tvShowData.results.map(show => formatShow(show))

    return { shows: formattedTvShowData, total_pages: totalPages }

  } catch (error) {
      console.log("Error: ", error)
  }
},
{
  maxAge: 1800,
  getKey: async (event) => {
    const body = await readBody(event)
    const processedQuery = buildQuery(body.filters)
    const cacheKey = generateCacheKey(processedQuery)
    // console.log(cacheKey)
    return cacheKey
  },
  shouldBypassCache: async (event) => {
    // No need to build query as page number is always included
    const body = await readBody(event)
    const page = parseInt(body.filters.page) || 1
    
    if (page > 6) return true

    return false
  }
});

