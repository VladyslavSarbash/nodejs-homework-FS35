const mongoose = require('mongoose')

const uri = process.env.Mango_URI

const connectDB = async () => {
  await mongoose.connect(uri)
  console.log('Connected to MongoDB was successful!')
}

module.exports = connectDB
