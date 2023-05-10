const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()

const cors = require('cors')

const garageRouter = require('./controllers/garage')
const engineRouter = require('./controllers/engine')
const winnersRouter = require('./controllers/winners')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const morgan = require('morgan')
const mongoose = require('mongoose')

logger.info('\x1b[42m connected to \x1b[0m', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('\x1b[42m connected to MongoDB\x1b[0m')
  })
  .catch((error) => {
    console.log('\x1b[41m error connecting to MongoDB:\x1b[0m', error.message)
  })

app.use(cors())

app.use(express.static('build'))
app.use(express.json())

morgan.token('body', function (req) {
  return JSON.stringify(req.body)
})
app.use(morgan('dev'))
app.use(morgan(' \x1b[35m :body  \x1b[0m'))

app.use('/garage', garageRouter)
app.use('/engine', engineRouter)
app.use('/winners', winnersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app




