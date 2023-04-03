import { AppOrmModel } from '../orm/model/app.orm.model'
import { Document } from '../model/document'

export const getDocumentBy = async (model: Promise<AppOrmModel>, title: string): Promise<Document> => {
  return (await model).Document.findOne({ where: { title } })
}
