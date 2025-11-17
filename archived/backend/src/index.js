import express from 'express'
import cors from 'cors'
import tmdbRoutes from './routes/tmdbRoutes.js'
const app = express()
const port = 3001

const corsConfigOptions = {
  // origin: 'http://localhost:5173',
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(cors(corsConfigOptions))

app.get('/', (req, res) => {
    console.log("received")
    res.send("Hello world!")
})


app.use('/api/tmdb', tmdbRoutes)

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  const httpStatusCode = err.httpStatusCode ? err.httpStatusCode : 500
  const errorMessage = err.message ? err.message : 'Something broke!'

  res.status(httpStatusCode).send(errorMessage)
})


app.listen(port, () => {
  console.log(`Web server started: listening to port ${port}`)
})


//  Need to mount the core endpoints/server routes