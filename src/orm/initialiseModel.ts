import { DataTypes, Sequelize } from 'sequelize'
import { ModelStatic } from 'sequelize/types/model'
import { DocumentOrmModel } from './model/document.orm.model'
import { AppOrmModel } from './model/app.orm.model'
import { ReviewOrmModel } from './model/review.orm.model'

const TITLE_CHAR_LENGTH_LIMIT: number = process.env.TITLE_CHAR_LENGTH_LIMIT ? parseInt(process.env.TITLE_CHAR_LENGTH_LIMIT) : 50

const initialiseDocument = (sequelize: Sequelize): ModelStatic<DocumentOrmModel> =>
  sequelize.define<DocumentOrmModel>(
    'document',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: DataTypes.STRING(TITLE_CHAR_LENGTH_LIMIT), unique: true }
    },
    { timestamps: false }
  )

const initialiseReview = (sequelize: Sequelize): ModelStatic<ReviewOrmModel> =>
  sequelize.define<ReviewOrmModel>(
    'review',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      content: { type: DataTypes.STRING },
      timestamp: { type: DataTypes.STRING },
      documentId: { type: DataTypes.INTEGER }
    },
    { timestamps: false }
  )

export const initializeModel = (sequelize: Sequelize): AppOrmModel => ({
  Document: initialiseDocument(sequelize),
  Review: initialiseReview(sequelize)
})
