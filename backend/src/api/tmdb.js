import { request } from './index.js'

const TMDB_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTVhODkxY2UwMWI3OGExZGI4NDNiZDg3NGRmYTM4ZCIsIm5iZiI6MTc1OTQwOTM0Mi4zNjQsInN1YiI6IjY4ZGU3NGJlOWJmZGFhZGRiOTk5MWEyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.47HvFNBpun-3pS4wTrEQJdAtw5k4jfQuk_iBtihMO2w'

export const searchTvShow= async (searchValue, page) => {
    
    const url = `https://api.themoviedb.org/3/search/tv?query=${searchValue}&page=${page}`

    console.log(url)
    
    const config = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_API_KEY}`
        }
    }

    const tvShowData = await request(url, config)
    
    return tvShowData
}


