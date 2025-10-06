// In this file define the logic for requests to the TMDB API
import { searchTvShow } from '../api/tmdb.js'

export const handleSearchTvShow = async (req, res, next) => {

    try {
        const searchValue = req.params.searchValue
        const tvShowData = await searchTvShow(searchValue)
        const processedShows = tvShowData.results.filter(show => show.vote_count >= 100).sort((a, b) => b.popularity - a.popularity);
        const top10 = processedShows.splice(0, 10)

        console.log(top10)

        const filteredTop10 = top10.map( (show) => ({
            id: show.id,
            title: show.name,
            rating: show.vote_average,
            first_date: show.first_air_date, 
            poster: show.poster_path,
        })) 

        res.json(filteredTop10)

    } catch (error) {
        next(error)
    }
}


