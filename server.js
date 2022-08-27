'use strict'

const createServer = async () => {
    const express = require('express')    
    const cors = require('cors')
    const compression = require('compression')
    const connectDB = require('./db/config/mongodb-connect')

    // Connect to database
    connectDB()

    // Route files
    const players = require('./routes/players')

    const app = express()
    const apiUrl = process.env.API_URL || '/api/v1'
    // Body parser, need these for POST and PUT request
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    // compress all responses
    app.use(compression())
    
    // Enable CORS
    app.use(cors())
    // Mount routers use path
    app.use(`${apiUrl}/players`, players)

    const PORT = process.env.PORT || 5000

    const server = app.listen(
        PORT,
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    )
}

module.exports = createServer