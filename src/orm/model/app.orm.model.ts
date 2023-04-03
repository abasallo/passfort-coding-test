import { ModelStatic } from 'sequelize/types/model'
import { DocumentOrmModel } from './document.orm.model'
import { ReviewOrmModel } from './review.orm.model'

export interface AppOrmModel {
  Document: ModelStatic<DocumentOrmModel>
  Review: ModelStatic<ReviewOrmModel>
}
