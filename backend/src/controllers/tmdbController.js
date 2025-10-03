// In this file define the logic for requests to the TMDB API
import { searchTvShow } from '../api/tmdb.js'

export const handleSearchTvShow = async (req, res, next) => {

    try {
        const searchValue = req.params.searchValue
        const tvShowData = await searchTvShow(searchValue)

    
        console.log(`The type of data is : ${typeof(tvShowData)}`)
        tvShowData.results.sort((a, b) => b.popularity - a.popularity);

        const top10 = tvShowData.results.splice(0, 10)

        for (let index = 0; index < 10; index++) {
            const element = tvShowData.results[index];
            console.log(`Original Name: ${element.original_name} ||  Rating: ${element.vote_average}`)
            
        }

        res.send('awesome')

    } catch (error) {
        next(error)
    }
}


