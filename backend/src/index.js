import express from 'express'

const app = express()
const port = 3030

app.get('/', (req, res) => {
    res.send("Hello world!")
})

app.use('/api/tmdb', tmdbRoutes)

app.listen(port, () => {
  console.log(`Web server started: listening to port ${port}`)
})


//  Need to mount the core endpoints/server routes