import { AppOrmModel } from '../orm/model/app.orm.model'

import { initialiseTestDatabase } from '../modules/initialiseTestDatabase'

import { addReview, getReviewsBy } from './review'
import { Review } from '../model/review'

const model: Promise<AppOrmModel> = initialiseTestDatabase()

describe('Review Services', () => {
  test('getReviewsBy', async () => {
    expect((await getReviewsBy(model, '1')).length).toEqual(1)
    expect((await getReviewsBy(model, '2')).length).toEqual(2)
    expect((await getReviewsBy(model, '3')).length).toEqual(3)
  })

  test('addReview', async () => {
    const review: Review = await addReview(model, 'New Content', '3')
    expect(review.content).toEqual('New Content')
    expect(review.timestamp).toBeDefined()
  })
})
