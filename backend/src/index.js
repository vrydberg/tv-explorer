import express from 'express'
import tmdbRoutes from './routes/tmdbRoutes.js'
const app = express()
const port = 3000

app.get('/', (req, res) => {
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