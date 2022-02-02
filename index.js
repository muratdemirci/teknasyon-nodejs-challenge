'use strict'

const initServer = require('./server')

require('dotenv').config()

const start = async () => {
    try {
        await initServer()
    } catch (error) {
        console.error(error)
    }
}

start()