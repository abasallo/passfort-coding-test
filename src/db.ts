import { AppOrmModel } from './orm/model/app.orm.model'
import { initialiseSequelize } from './orm/initialiseSequelize'
import { initialiseTestDatabase } from './modules/initialiseTestDatabase'

export const model: Promise<AppOrmModel> = process.env.CONNECTION_URL
  ? initialiseSequelize(process.env.CONNECTION_URL)
  : initialiseTestDatabase()
