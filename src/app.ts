import * as dotenv from 'dotenv'

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import index from './express/routes'
import documents from './express/routes/documents'

import { errorMiddleware } from './express/errors'

dotenv.config()

export const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', index)
app.use('/documents', documents)

app.use(errorMiddleware)

export default app
