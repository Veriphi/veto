import { Request, Response } from 'express'

import express from 'express'
const app = express()

app.get('/version', async (request: Request, response: Response) => {
  response.send({ name: 'Veto', version: '0.0.0' })
})
