const mongoose = require('mongoose')

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
  })
  console.log(`MongoDB Connected to 👉 ${conn.connection.host}`)

  mongoose.connection.on('reconnected', () => {
    console.log('MongoDB has reconnected')
  })

  mongoose.connection.on('error', error => {
    console.log('MongoDB connection has an error', error)
    mongoose.disconnect()
  })

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB connection is disconnected')
  })
  
}

module.exports = connectDB