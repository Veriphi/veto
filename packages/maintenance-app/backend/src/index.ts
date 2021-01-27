import express, { Application } from 'express'
import config from './utils/config'
import serverSetup from './server'
import setupRoutes from './routes/index'

const app = express()

serverSetup(app, config, (app: Application) => {
  // TODO: Move all routes to their own folder
  setupRoutes(app)

  return app
})
