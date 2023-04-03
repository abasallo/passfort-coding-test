import { AppOrmModel } from '../orm/model/app.orm.model'

import { initialiseTestDatabase } from '../modules/initialiseTestDatabase'

import { Document } from '../model/document'

import { getDocumentBy } from './document'

const model: Promise<AppOrmModel> = initialiseTestDatabase()

describe('Document Services', () => {
  test('getDocumentBy', async () => {
    const document: Document = await getDocumentBy(model, 'title-1')
    expect(document.id).toEqual(1)
    expect(document.title).toEqual('title-1')
  })
})
