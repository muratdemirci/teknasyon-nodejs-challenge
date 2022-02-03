const express = require('express')
const router = express.Router()

const {
    getPlayers
  } = require('../../controllers/players')


router
.route('/')
.get(getPlayers)

module.exports = router