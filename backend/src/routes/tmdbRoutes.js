// Route handler for api/tmdb
import express from 'express'
import { handleSearchTvShow } from '../controllers/tmdbController.js'

const router = express.Router()

// Root path for this route is 'api/tmdb'

// router.get('/', )

router.get('/search/:searchValue', handleSearchTvShow)

export default router;

