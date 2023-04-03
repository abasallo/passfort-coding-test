import { initialiseSequelize } from '../orm/initialiseSequelize'
import { AppOrmModel } from '../orm/model/app.orm.model'

const TEST_CONNECTION_URL = 'sqlite://passfort-coding-test.sqlite'

let testModel: AppOrmModel

const destroyTestDatabase = (): Promise<[number, number]> =>
  Promise.all([testModel.Review.destroy({ truncate: true }), testModel.Document.destroy({ truncate: true })])

export const initialiseTestDatabase = async (): Promise<AppOrmModel> => {
  testModel = await initialiseSequelize(TEST_CONNECTION_URL)

  await destroyTestDatabase()

  await Promise.all([
    testModel.Document.create({ id: '1', title: 'title-1' }),
    testModel.Document.create({ id: '2', title: 'title-2' }),
    testModel.Document.create({ id: '3', title: 'title-3' }),

    testModel.Review.create({ id: '1', documentId: '1', content: 'text-1', timestamp: '2023-01-01T00:00:00' }),
    testModel.Review.create({ id: '2', documentId: '2', content: 'text-2', timestamp: '2022-01-01T00:00:00' }),
    testModel.Review.create({ id: '3', documentId: '2', content: 'text-2-update-1', timestamp: '2023-01-01T00:00:00' }),
    testModel.Review.create({ id: '4', documentId: '3', content: 'text-3', timestamp: '2021-01-01T00:00:00' }),
    testModel.Review.create({ id: '5', documentId: '3', content: 'text-3-update-1', timestamp: '2022-01-01T00:00:00' }),
    testModel.Review.create({ id: '6', documentId: '3', content: 'text-3-update-2', timestamp: '2023-01-01T00:00:00' })
  ])

  return testModel
}
