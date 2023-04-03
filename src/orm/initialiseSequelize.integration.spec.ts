import { AppOrmModel } from './model/app.orm.model'

import { initialiseTestDatabase } from '../modules/initialiseTestDatabase'

import { Document } from '../model/document'
import { Review } from '../model/review'

let testModel: AppOrmModel

beforeAll(async () => (testModel = await initialiseTestDatabase()))

describe('ORM Integration Test', () => {
  test('ORM is initialised', async () => {
    expect(testModel.Document).toBeDefined()
  })

  test('Document finders work as expected', async () => {
    const document: Document = await testModel.Document.findByPk(1)
    expect(document.id).toEqual(1)
    expect(document.title).toEqual('title-1')
  })

  test('Review finders work as expected', async () => {
    const review: Review = await testModel.Review.findByPk(1)
    expect(review.id).toEqual(1)
    expect(review.documentId).toEqual(1)
    expect(review.content).toEqual('text-1')
    expect(review.timestamp).toEqual('2023-01-01T00:00:00')
  })
})
