import express from 'express'
import config from './utils/config'
import setupRoutes from './routes'
import serverSetup from './server'

const app = express()

serverSetup(app, config, setupRoutes)
