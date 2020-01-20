import express from 'express'
import config from './utils/config'
import serverSetup from './server'

const app = express()

serverSetup(app, config)
