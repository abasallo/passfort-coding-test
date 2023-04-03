import { AppOrmModel } from '../orm/model/app.orm.model'
import { Review } from '../model/review'

export const getReviewsBy = async (model: Promise<AppOrmModel>, documentId: string): Promise<Review[]> => {
  return (await model).Review.findAll({ where: { documentId } })
}

export const addReview = async (model: Promise<AppOrmModel>, content: string, documentId: string): Promise<Review> => {
  return (await model).Review.create({ content, timestamp: new Date().toISOString(), documentId })
}
