// Route handler for api/tmdb
import express from 'express'
import { handleSearchTvShow, handleTrendingTvShow } from '../controllers/tmdbController.js'

const router = express.Router()

// Root path for this route is 'api/tmdb'

// router.get('/', )

router.get('/search/:searchValue', handleSearchTvShow)

router.get('/trending', handleTrendingTvShow)

export default router;

