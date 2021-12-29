const app = require('../app')
const connectDB = require('../service')

const PORT = process.env.PORT || 3000

connectDB()

const server = app.listen(PORT, () => {
  console.log(
    `Server running. Use our API on port: http://localhost:${PORT}/api/contacts`
  )
})

process.on('unhandledRejection', (error, _) => {
  if (error) {
    console.log(`error: ${error.message}`)
    server.close(() => process.exit(1))
  }
})
