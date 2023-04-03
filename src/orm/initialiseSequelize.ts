import { Sequelize } from 'sequelize'

import { initializeModel } from './initialiseModel'

import { AppOrmModel } from './model/app.orm.model'

export const initialiseSequelize = async (CONNECTION_URL: string): Promise<AppOrmModel> => {
  const sequelize: Sequelize = new Sequelize(CONNECTION_URL)
  const model = initializeModel(sequelize)
  model.Document.hasMany(model.Review)
  model.Review.belongsTo(model.Document)
  await sequelize.sync()
  return model
}
