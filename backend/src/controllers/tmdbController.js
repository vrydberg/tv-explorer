// In this file define the logic for requests to the TMDB API
import { searchTvShow, trendingTvShow } from '../api/tmdb.js'

export const handleSearchTvShow = async (req, res, next) => {

    try {
        const searchValue = req.params.searchValue
        const totalPages = 3
        const pages = []
         
        for (let i = 1; i < totalPages + 1; i++) {
            pages.push(i)
        }

        const requests = pages.map((page) => searchTvShow(searchValue, page))

        // const tvShowData = await searchTvShow(searchValue)
        const tvShowData = []
        // Parallel requests since need to perform multiple get requests for different pages - will help with results relevance
        // Map the requests since they immediately return a promise object - then can use promise.all that returns a promise when all the subpromises are fulfilled
        Promise.all(requests).then((tvShowDataPages) => {
            tvShowDataPages.forEach(page => {
                // Each results is an array
                tvShowData.push(page.results)    
            });

            // tvShowData is an array of arrays [arr, arr, arr] - use flat() to create a copy with all the sub element
        
            const processedShows = tvShowData.flat().filter(show => show.vote_count >= 25).sort((a, b) => b.popularity - a.popularity);
            const top10 = processedShows.splice(0, 10)

            console.log(top10)

            const filteredTop10 = top10.map( (show) => ({
                id: show.id,
                title: show.name,
                rating: show.vote_average,
                first_date: show.first_air_date, 
                poster: show.poster_path,
            })) 
            
            // console.log(filteredTop10)
            res.json(filteredTop10)
        })

        

        

        
        
        // const processedShows = tvShowData.results.filter(show => show.vote_count >= 1).sort((a, b) => b.popularity - a.popularity);
        

    } catch (error) {
        next(error)
    }
}

export const handleTrendingTvShow = async (req, res, next) => {
    try {
        const totalPages = 3
        const pages = []
         
        for (let i = 1; i < totalPages + 1; i++) {
            pages.push(i)
        }

        const requests = pages.map((page) => trendingTvShow(page))

        
        const tvShowData = []
        
        Promise.all(requests).then((tvShowDataPages) => {
            tvShowDataPages.forEach(page => {
                // Each results is an array
                tvShowData.push(page.results)    
            });
        
            const processedShows = tvShowData.flat().filter(show => show.vote_count >= 25).sort((a, b) => b.popularity - a.popularity);
            const top20 = processedShows.splice(0, 20)

            const filteredTop20 = top20.map( (show) => ({
                id: show.id,
                title: show.name,
                rating: show.vote_average,
                first_date: show.first_air_date, 
                poster: show.poster_path,
            })) 
            
            res.json(filteredTop20)
        })

        

    } catch (error) {
        next(error)
    }
}


