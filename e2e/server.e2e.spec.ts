import axios from 'axios'
import http from 'http'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import app from '../src/app'

const TEST_SERVER_PORT = 4001

let server: http.Server
beforeAll(async () => {
  server = app.listen({ port: TEST_SERVER_PORT }, () => console.log(`Test Server initialised on port: ${TEST_SERVER_PORT}`))
})

afterAll(() => {
  server.close()
})

describe('Server E2E tests', () => {
  describe('Health Check E2E tests', () => {
    test('Expected response for Health Check', async () => {
      const { status, statusText, data } = await axios({
        method: 'get',
        url: `http://localhost:${TEST_SERVER_PORT}/`
      })

      expect(status).toEqual(StatusCodes.OK)
      expect(statusText).toEqual(ReasonPhrases.OK)

      expect(data).toMatchSnapshot()
    })
  })

  describe('Documents E2E tests', () => {
    test('Find All Documents', async () => {
      const { status, statusText, data } = await axios({
        method: 'get',
        url: `http://localhost:${TEST_SERVER_PORT}/documents`,
        data: {
          userId: 3
        }
      })

      expect(status).toEqual(StatusCodes.OK)
      expect(statusText).toEqual(ReasonPhrases.OK)

      expect(data).toMatchSnapshot()
    })

    test('Find Document by title', async () => {
      const { status, statusText, data } = await axios({
        method: 'get',
        url: `http://localhost:${TEST_SERVER_PORT}/documents/title-1`
      })

      expect(status).toEqual(StatusCodes.OK)
      expect(statusText).toEqual(ReasonPhrases.OK)

      expect(data).toMatchSnapshot()
    })

    test('Find Review by title and timestamp', async () => {
      const { status, statusText, data } = await axios({
        method: 'get',
        url: `http://localhost:${TEST_SERVER_PORT}/documents/title-2/2024-01-01T00:00:00`
      })

      expect(status).toEqual(StatusCodes.OK)
      expect(statusText).toEqual(ReasonPhrases.OK)

      expect(data).toMatchSnapshot()
    })

    test('Latest Review by title', async () => {
      const { status, statusText, data } = await axios({
        method: 'get',
        url: `http://localhost:${TEST_SERVER_PORT}/documents/title-3/latest`
      })

      expect(status).toEqual(StatusCodes.OK)
      expect(statusText).toEqual(ReasonPhrases.OK)

      expect(data).toMatchSnapshot()
    })

    test('Add Review', async () => {
      const { status, statusText, data } = await axios({
        method: 'post',
        url: `http://localhost:${TEST_SERVER_PORT}/documents/title-3`,
        data: {
          content: 'New Content'
        }
      })

      expect(status).toEqual(StatusCodes.OK)
      expect(statusText).toEqual(ReasonPhrases.OK)

      expect(data).toMatchSnapshot({
        id: expect.any(Number),
        timestamp: expect.any(String)
      })
    })
  })
})
