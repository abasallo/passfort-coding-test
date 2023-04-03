import { Review } from '../model/review'

import { matchReviewsWithTimestamp } from './matchReviewsWithTimestamp'

const reviews: Review[] = [
  { id: '4', documentId: '3', content: 'text-3', timestamp: '2021-01-01T00:00:00' },
  { id: '5', documentId: '3', content: 'text-3-update-1', timestamp: '2022-01-01T00:00:00' },
  { id: '6', documentId: '3', content: 'text-3-update-2', timestamp: '2023-01-01T00:00:00' }
]

const timestamps: string[] = [
  '2020-01-01T00:00:00',
  '2021-01-01T00:00:00',
  '2021-06-01T00:00:00',
  '2022-01-01T00:00:00',
  '2022-06-01T00:00:00',
  '2023-01-01T00:00:00',
  '2023-01-01T00:00:00'
]

const expectedResults = [undefined, 'text-3', 'text-3', 'text-3-update-1', 'text-3-update-1', 'text-3-update-2', 'text-3-update-2']

describe('matchReviewsWithTimestamp', () => {
  for (const [index, timestamp] of timestamps.entries()) {
    test(`Result is as expected: ${expectedResults[index]} for timestamp: ${timestamp}`, () => {
      expect(matchReviewsWithTimestamp(reviews, timestamp)?.content).toEqual(expectedResults[index])
    })
  }
})
