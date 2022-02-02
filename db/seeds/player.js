const mongoose = require('mongoose')
const Player = require('../../models/player')
const casual = require('casual')

function genRandInt(min, max) {
    return casual.integer(from = min, to = max)
}

function genRandUserId(){    
    return `${genRandInt(111, 999)}-${genRandInt(111, 999)}-${genRandInt(111, 999)}`
}

// move this
require('dotenv').config()

//move this too
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
})
.then(() => {
    console.log(`MongoDB Connected:`)
})
.catch((err) => {
    console.log(err)
})

// generate 1k fake players
const fakePlayerCount = process.env.FAKE_PLAYER_COUNT || 10;
const seedPlayers = [];

for (let index = 0; index < fakePlayerCount; index++) {
    seedPlayers.push({
        userId: genRandUserId(),
        userName: casual.username.toLocaleLowerCase(),
        score: genRandInt(10000,99999),
        chips: genRandInt(0, 9999),
        age: genRandInt(13, 55)
    })
}

const seedDB = async () => {
    await Player.deleteMany({})
    await Player.insertMany(seedPlayers)
    if (process.env.NODE_ENV === 'dev') {
        console.table(seedPlayers)
        console.log('player seed add')
    }
}

seedDB().then(() =>{
    mongoose.connection.close()
    console.log('seed connection close')
})