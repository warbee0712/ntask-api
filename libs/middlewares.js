import express from 'express'
import morgan from 'morgan'
import logger from './logger.js'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import bodyParser from 'body-parser'

module.exports = app => {
  app.set('port', 3000)
  app.use(morgan('common', {
    stream: {
      write: (message) => {
        logger.info(message)
      }
    }
  }))
  app.use(helmet())
  app.use(cors({
    origin: ['http://localhost:3001/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }))
  app.use(compression())
  app.use(bodyParser.json())
  app.use(app.auth.initialize())
  app.use((req, res, next) => {
    delete req.body.id
    next()
  })
  app.use(express.static('public'))
}
